import mongoose, { Schema, Model } from 'mongoose';
import { Types } from 'mongoose';
import { IDocument } from './Document.model';

export interface IUser extends Document {
    _id: string;
    name: string;
    clerkId: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    documents: Types.ObjectId[] | IDocument[];
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    documents: [
        { type: Schema.Types.ObjectId, ref: 'Document' }
    ]
}, { timestamps: true })

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;