import mongoose, { Schema, Model } from 'mongoose';
import { Types } from 'mongoose';

export interface IDocument extends Document {
    _id: string;
    title: string;
    ownerId: string;
    content: any;
    collaborators: {
        userId: Types.ObjectId;
        role: 'viewer' | 'editor';
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
    title: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: Schema.Types.Mixed, default: {} },
    collaborators: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            role: { type: String, enum: ['viewer', 'editor'], default: 'editor' },
        }
    ],
}, { timestamps: true });

const Document: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
export default Document;