import { Model } from 'mongoose';
import { Response } from 'express';
import { AddMessageDto, GetMessageDto } from './dto/message.dto';
import { Message } from './interface/message.interface';
export declare class MessageService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    getMessage(res: Response, { from, to }: GetMessageDto): Promise<Response>;
    addMessage(res: Response, { from, to, message }: AddMessageDto): Promise<Response>;
}
