export class WebSocketService {
    private static instance: WebSocketService;
    private ws: WebSocket | null = null;
    private messageHandlers: ((data: any) => void)[] = [];

    private constructor() { }

    static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    connect(url: string): void {
        if (this.ws) {
            this.ws.close();
        }

        this.ws = new WebSocket(url);
        this.setupWebSocket();
    }

    private setupWebSocket(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            console.log('WebSocket Connected');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.messageHandlers.forEach(handler => handler(data));
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket Disconnected');
        };
    }

    addMessageHandler(handler: (data: any) => void): void {
        this.messageHandlers.push(handler);
    }

    removeMessageHandler(handler: (data: any) => void): void {
        this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    }

    sendMessage(message: any): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}
