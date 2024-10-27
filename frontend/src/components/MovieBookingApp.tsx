import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ServerMessage,
    UserRequest,
    ChatMessage,
    ProgressUpdate,
    ProgressFrame,
    SystemStatus,
    Theater,
    MovieRecommendation
} from '../generated/movie_booking';
import { MessageToJson, JsonToMessage } from '../generated/helpers';

interface WebSocketMessage {
    data: string;
}

const MovieBookingApp: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState<ProgressUpdate | null>(null);
    const [frames, setFrames] = useState<ProgressFrame[]>([]);
    const ws = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const websocket = new WebSocket(import.meta.env.VITE_WS_URL);

        websocket.onopen = () => {
            console.log('Connected to server');
        };

        websocket.onmessage = (event: WebSocketMessage) => {
            try {
                const serverMessage = JsonToMessage(ServerMessage, event.data);
                handleServerMessage(serverMessage);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('Disconnected from server');
        };

        ws.current = websocket;

        return () => {
            websocket.close();
        };
    }, []);

    const handleServerMessage = (message: ServerMessage) => {
        console.log(message);
        if (message.chat) {
            setMessages(prev => [...prev, message.message.chat]);
        } else if (message.progress) {
            setProgress(message.message.progress);
        } else if (message.frame) {
            const frame = message.message.frame;
            const frameData = JSON.parse(new TextDecoder().decode(frame.data));
            setFrames(prev => [...prev, { ...frame, data: frameData }]);
        } else if (message.status) {
            const status = message.status;
            //setIsProcessing(status.status === SystemStatus.status.PROCESSING);
            setMessages(prev => [...prev, message.status.message]);

            // if (status.status === SystemStatus.status.ERROR && status.message) {
            //     setMessages(prev => [
            //         ...prev,
            //         {
            //             type: 'chat',
            //             role: ChatMessage.Role.SYSTEM,
            //             content: status.message
            //         } as ChatMessage
            //     ]);
            // }

        } else {
            console.log("error handleServerMessage");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isProcessing || !ws.current) return;

        const request: UserRequest = {
            type: 'user_request',
            message: userInput
        };

        ws.current.send(MessageToJson(request));
        setUserInput('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFrameAction = async (action: { type: string; frameId: number }) => {
        if (!ws.current || isProcessing) return;

        const request: UserRequest = {
            type: 'user_request',
            message: JSON.stringify(action)
        };

        ws.current.send(MessageToJson(request));
    };

    const renderFrame = (frame: ProgressFrame) => {
        const data = frame.data;

        switch (frame.frame_type) {
            case ProgressFrame.FrameType.THEATERS:
                return (
                    <Card className="p-4">
                        <h2 className="text-xl font-bold mb-4">近くの映画館</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {(data as Theater[]).map(theater => (
                                <Card
                                    key={theater.id}
                                    className="p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => frame.action && handleFrameAction({
                                        type: frame.action.type,
                                        frameId: theater.id
                                    })}
                                >
                                    <div className="flex space-x-4">
                                        <img
                                            src={theater.image_url}
                                            alt={theater.name}
                                            className="w-32 h-24 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-bold">{theater.name}</h3>
                                            <p className="text-sm text-gray-600">{theater.address}</p>
                                            <p className="text-sm">距離: {theater.distance}km</p>
                                            <div className="flex gap-2 mt-2">
                                                {theater.screens.map(screen => (
                                                    <span
                                                        key={screen}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                                    >
                                                        {screen}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>
                );

            case ProgressFrame.FrameType.RECOMMENDATIONS:
                return (
                    <Card className="p-4">
                        <h2 className="text-xl font-bold mb-4">おすすめ映画</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {(data as MovieRecommendation[]).map(movie => (
                                <Card
                                    key={movie.movie_id}
                                    className="p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => frame.action && handleFrameAction({
                                        type: frame.action.type,
                                        frameId: movie.movie_id
                                    })}
                                >
                                    <div className="flex space-x-4">
                                        <img
                                            src={movie.poster_url}
                                            alt={movie.title}
                                            className="w-40 h-60 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg">{movie.title}</h3>
                                            <div className="mt-2">
                                                <div className="text-lg font-bold text-blue-600">
                                                    マッチ度: {movie.score}%
                                                </div>
                                                <div className="mt-2 space-y-1">
                                                    {movie.match_reasons.map((reason, i) => (
                                                        <p key={i} className="text-sm text-gray-600">
                                                            • {reason}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <h4 className="font-bold mb-1">上映時間</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {movie.schedule.map((time, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded"
                                                        >
                                                            {time}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>
                );

            // 他のフレームタイプの実装...

            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* チャットUI - 左側30% */}
            <div className="w-3/10 h-full border-r border-gray-200 bg-white flex flex-col">
                {/* メッセージ表示エリア */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded ${message.role === ChatMessage.Role.SYSTEM
                                    ? 'bg-gray-100'
                                    : message.role === ChatMessage.Role.AGENT
                                        ? 'bg-blue-100'
                                        : 'bg-green-100'
                                    }`}
                            >
                                <p className="text-sm text-gray-500">
                                    {new Date().toLocaleTimeString()}
                                </p>
                                <p>{message.content}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* 進捗バー */}
                {progress && (
                    <div className="px-4 py-2 border-t border-gray-200">
                        <div className="text-sm text-gray-600">{progress.status}</div>
                        <div className="w-full bg-gray-200 h-2 rounded">
                            <div
                                className="bg-blue-600 h-2 rounded"
                                style={{ width: `${progress.progress}%` }}
                            />
                        </div>
                        {progress.detail && (
                            <div className="text-xs text-gray-500 mt-1">{progress.detail}</div>
                        )}
                    </div>
                )}

                {/* 入力フォーム */}
                <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <Input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="メッセージを入力..."
                            className="flex-1"
                            disabled={isProcessing}
                        />
                        <Button
                            type="submit"
                            disabled={isProcessing || !userInput.trim()}
                            className={isProcessing ? 'opacity-50' : ''}
                        >
                            送信
                        </Button>
                    </form>
                </div>
            </div>

            {/* 進捗フレーム - 右側70% */}
            <div className="w-7/10 h-full bg-white overflow-y-auto p-4 space-y-4">
                {frames.map((frame, index) => (
                    <div key={index} className="animate-fadeIn">
                        {renderFrame(frame)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieBookingApp;

// helpers.ts (Protocol Buffersメッセージの変換ヘルパー)
// export const MessageToJson = (message: any): string => {
//     return JSON.stringify(message);
// };

// export const JsonToMessage = <T extends object>(messageType: any, json: string): T => {
//     try {
//         const data = JSON.parse(json);
//         // Protocol Buffersのメッセージ型に変換
//         return messageType.fromJSON(data) as T;
//     } catch (error) {
//         console.error('Error parsing message:', error);
//         throw error;
//     }
// };

// アニメーション用のTailwind CSS設定
// tailwind.config.js に追加
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
*/

// 型定義の拡張 (types/index.ts)
// declare module '@/components/ui/*' {
//     export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
//     export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
//     export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
// }