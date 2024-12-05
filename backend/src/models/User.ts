import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    username: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;