import { Types } from 'mongoose';
export declare class AddMessageDto {
    readonly from: Types.ObjectId;
    readonly to: Types.ObjectId;
    readonly message: string;
}
export declare class GetMessageDto {
    readonly from: Types.ObjectId;
    readonly to: Types.ObjectId;
}
