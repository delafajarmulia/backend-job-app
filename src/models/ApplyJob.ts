import mongoose, { Model, model, Schema, Types } from "mongoose"; 

interface ApplyJobDocument {
    job: Types.ObjectId;
    user: Types.ObjectId;
    fullname: string;
    resumeUrl: string;
    contactPhone: string;
    createdAt: Date;
    updatedAt: Date;
}

const ApplyJobSchema = new Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        resumeUrl: {
            type: String,
            required: true,
            trim: true
        },
        contactPhone: {
            type: String,
            required: true,
            trim: true
        },
    }, 
    {
        timestamps: true
    }
)

export default model('ApplyJob', ApplyJobSchema) as Model<ApplyJobDocument>