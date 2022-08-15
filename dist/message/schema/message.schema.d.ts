import * as mongoose from 'mongoose';
export declare const MessageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    sender: mongoose.Schema.Types.ObjectId;
    message: string;
    users?: any[];
}>;
