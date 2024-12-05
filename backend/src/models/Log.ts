import { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
    ip: string;
    datetime: Date;
    endpoint: string;
    requestType: string;
    authorization: string | undefined;
    params: any;
    body: any;
    statusCode: number;
    stackTrace?: string;
}

const logSchema = new Schema<ILog>({
    ip: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
    endpoint: { type: String, required: true },
    requestType: { type: String, required: true },
    authorization: { type: String },
    params: { type: Schema.Types.Mixed, default: {} },
    body: { type: Schema.Types.Mixed, default: {} },
    statusCode: { type: Number, required: true },
    stackTrace: { type: String }
});

const Log = model<ILog>('Log', logSchema);

export default Log;
