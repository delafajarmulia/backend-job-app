import { compare, hash } from "bcrypt";
import { Model, model, ObjectId, Schema, Types } from "mongoose";
import { ApplyJobDocument } from "./ApplyJob";

export interface userDocument {
    name: string,
    email: string,
    password: string

    applyJobs?: Types.DocumentArray<ApplyJobDocument>
}

interface Methods {
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<userDocument, {}, Methods>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [5, "username minimal 5 karakter"]
    },    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },    
    password: {
        type: String,
        required: [true, 'password harus diisi'],
        minlength: [6, "Password minimal 6 karakter"]
    },
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await hash(this.password, 10)
    }

    next()
})

userSchema.methods.comparePassword = async function (password) {
    const result = await compare(password, this.password)

    return result
}

userSchema.virtual('applyJobs', {
    ref: 'ApplyJob',
    localField: '_id',
    foreignField: 'user'
})

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

export default model("User", userSchema) as Model<userDocument, {}, Methods>