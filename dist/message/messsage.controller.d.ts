import { Response } from 'express';
import { AddMessageDto, GetMessageDto } from './dto/message.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessage(res: Response, getMessage: GetMessageDto): Promise<Response>;
    addMessage(res: Response, addMessage: AddMessageDto): Promise<Response>;
}
