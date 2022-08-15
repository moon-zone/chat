export declare class ChatGateway {
    server: any;
    sendMessage(message: {
        from: string;
        to: string;
        msg: string;
    }): void;
}
