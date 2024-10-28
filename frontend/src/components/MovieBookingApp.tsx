// frontend/src/components/MovieBookingApp.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WebSocketMessage {
    type: 'stream' | 'tool' | 'error' | 'complete';
    content?: string;
    data?: any;
    message?: string;
}

interface UserMessage {
    message: string;
}

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
}

const MovieBookingApp: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentStream, setCurrentStream] = useState<string>('');
    const [logMessages, setLogMessages] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    // System Logs用のref追加
    const logsEndRef = useRef<HTMLDivElement>(null);
    const reconnectInterval = useRef<number | null>(null);

    // WebSocket接続を管理する関数
    const connectWebSocket = () => {
        try {
            const websocket = new WebSocket(import.meta.env.VITE_WS_URL);

            websocket.onopen = () => {
                console.log('Connected to server');
                setIsConnected(true);
                setLogMessages(prev => [...prev, 'WebSocket接続が確立されました']);

                // 接続成功したら再接続インターバルをクリア
                if (reconnectInterval.current) {
                    clearInterval(reconnectInterval.current);
                    reconnectInterval.current = null;
                }
            };

            websocket.onmessage = (event: MessageEvent) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);
                    console.log('Received message:', message);

                    switch (message.type) {
                        case 'stream':
                            if (message.content) {
                                setCurrentStream(prev => {
                                    const updatedStream = prev + message.content;
                                    console.log('stream: ' + updatedStream);
                                    return updatedStream;
                                });
                            }
                            break;

                        case 'tool':
                            if (message.data) {
                                setLogMessages(prev => [
                                    ...prev,
                                    `Tool call: ${JSON.stringify(message.data, null, 2)}`
                                ]);
                            }
                            break;

                        case 'complete':
                            // console.log('complete: ' + currentStream);
                            // if (message.content) {
                            //     setCurrentStream(prev => {
                            //         const updatedStream = prev + message.content;
                            //         console.log('stream2: ' + updatedStream);
                            //         return updatedStream;
                            //     });
                            // }

                            // if (currentStream.trim()) {
                            const now = new Date().toLocaleTimeString();
                            setChatHistory(prev => [...prev, {
                                role: 'assistant',
                                content: message.content,
                                timestamp: now
                            }]);
                            //}
                            setIsProcessing(false);
                            setLogMessages(prev => [...prev, '応答が完了しました']);
                            break;

                        case 'error':
                            setChatHistory(prev => [...prev, {
                                role: 'system',
                                content: message.message || 'エラーが発生しました',
                                timestamp: new Date().toLocaleTimeString()
                            }]);
                            //setCurrentStream('');
                            setIsProcessing(false);
                            setLogMessages(prev => [...prev, `エラー: ${JSON.stringify(message.message, null, 2)}`]);
                            break;
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                    setLogMessages(prev => [...prev, `メッセージパースエラー: ${error}`]);
                    setIsProcessing(false);
                }
            };

            websocket.onerror = error => {
                console.error('WebSocket error:', error);
                setIsConnected(false);
                setLogMessages(prev => [...prev, `WebSocketエラー: ${JSON.stringify(error, null, 2)}`]);
                setIsProcessing(false);
            };

            websocket.onclose = () => {
                console.log('Disconnected from server');
                setIsConnected(false);
                setLogMessages(prev => [...prev, 'WebSocket接続が切断されました']);
                setIsProcessing(false);

                // 再接続インターバルの設定
                if (!reconnectInterval.current) {
                    reconnectInterval.current = window.setInterval(() => {
                        console.log('Attempting to reconnect...');
                        setLogMessages(prev => [...prev, '再接続を試みています...']);
                        connectWebSocket();
                    }, 5000);
                }
            };

            ws.current = websocket;
        } catch (error) {
            console.error('WebSocket connection error:', error);
            setLogMessages(prev => [...prev, `接続エラー: ${error}`]);
            setIsConnected(false);
        }
    };
    useEffect(() => {
        connectWebSocket();

        // クリーンアップ関数
        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current);
                reconnectInterval.current = null;
            }
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, currentStream]);

    // ログメッセージ用のスクロール効果を追加
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logMessages]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !ws.current || isProcessing || !isConnected) return;

        const message: UserMessage = {
            message: userInput.trim()
        };

        setChatHistory(prev => [...prev, {
            role: 'user',
            content: userInput.trim(),
            timestamp: new Date().toLocaleTimeString()
        }]);

        setCurrentStream('');
        setIsProcessing(true);
        setLogMessages(prev => [...prev, `ユーザー入力: ${userInput.trim()}`]);

        try {
            ws.current.send(JSON.stringify(message));
            setUserInput('');
        } catch (error) {
            console.error('Error sending message:', error);
            setLogMessages(prev => [...prev, `送信エラー: ${error}`]);
            setIsProcessing(false);
        }
    };

    const renderChatMessage = (message: ChatMessage) => {
        let bgColor = '';

        switch (message.role) {
            case 'user':
                bgColor = 'bg-blue-100';
                break;
            case 'assistant':
                bgColor = 'bg-green-100';
                break;
            case 'system':
                bgColor = 'bg-red-100';
                break;
        }

        return (
            <div className={`p-4 rounded-lg ${bgColor} mb-4`}>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                        {message.role === 'user' ? 'あなた' :
                            message.role === 'assistant' ? 'AI' :
                                'システム'}
                    </span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
        );
    };

    // 接続状態を表示するコンポーネント
    const ConnectionStatus: React.FC = () => (
        <div className={`flex items-center justify-center px-2 py-1 rounded-full text-xs ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-200' : 'bg-red-200'
                }`} />
            {isConnected ? '接続中' : '未接続'}
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* チャットUI - 左側50% */}
            <div className="w-1/2 h-full bg-white flex flex-col border-r border-gray-200">
                {/* ヘッダー */}
                <div className="h-14 px-4 bg-white border-b border-gray-200 flex items-center">
                    <ConnectionStatus />
                    <h1 className="text-xl font-bold flex-grow text-center">Chat</h1>
                </div>

                {/* チャット履歴 */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {chatHistory.map((message, index) => (
                            <div key={index}>
                                {renderChatMessage(message)}
                            </div>
                        ))}
                        {/* 入力中のメッセージ表示 */}
                        {currentStream.trim() && isProcessing && (
                            <div className="p-4 rounded-lg bg-green-100 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">AI</span>
                                    <span className="text-xs text-gray-500 animate-pulse">
                                        入力中...
                                    </span>
                                </div>
                                <p className="whitespace-pre-wrap">{currentStream}</p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* 入力フォーム */}
                <div className="h-20 p-4 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <Input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="メッセージを入力..."
                            className="flex-1"
                            disabled={isProcessing || !isConnected}
                        />
                        <Button
                            type="submit"
                            disabled={!userInput.trim() || isProcessing || !isConnected}
                            className={`px-4 py-2 rounded ${!userInput.trim() || !isConnected
                                ? 'bg-gray-300 cursor-not-allowed'
                                : isProcessing
                                    ? 'bg-gray-400 cursor-wait'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            {!isConnected ? '未接続' : isProcessing ? '応答中...' : '送信'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* ログビュー - 右側50% */}
            <div className="w-1/2 h-full bg-white flex flex-col">
                {/* ヘッダー */}
                <div className="h-14 px-4 bg-white border-b border-gray-200 flex items-center justify-center">
                    <h2 className="text-xl font-bold">System Logs</h2>
                </div>

                {/* ログ内容 */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {logMessages.map((log, index) => (
                            <div
                                key={index}
                                className="text-sm text-gray-600 border-b border-gray-100 py-1"
                            >
                                <span className="text-gray-400 mr-2">
                                    {new Date().toLocaleTimeString()}
                                </span>
                                {log}
                            </div>
                        ))}
                        {/* スクロール用の要素を追加 */}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieBookingApp;