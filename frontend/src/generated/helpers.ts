export const MessageToJson = (message: any): string => {
    return JSON.stringify(message);
};

export const JsonToMessage = <T extends object>(messageType: any, json: string): T => {
    try {
        const data = JSON.parse(json);
        // Protocol Buffersのメッセージ型に変換
        return messageType.fromJSON(data) as T;
    } catch (error) {
        console.error('Error parsing message:', error);
        throw error;
    }
};
