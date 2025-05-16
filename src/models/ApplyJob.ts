import mongoose, { Model, model, Schema, Types } from "mongoose"; 

export interface ApplyJobDocument{
    job: Types.ObjectId | {
        _id: Types.ObjectId;
        title: string;
        description: string;
        category: string;
        salary: string;
        jobType: string;
        benefits: string;
        requirements: string;
        city: string;
        address: string;
        phone: string;
        remote: boolean;
    };
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