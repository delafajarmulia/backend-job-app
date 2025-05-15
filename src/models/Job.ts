import mongoose, { Model, model, Schema, Types } from "mongoose";

interface JobDocument {
    title: string;
    description?: string;
    category: Types.ObjectId;
    salary: string;
    jobType: string;
    benefits: string;
    requirements: string;
    city: string;
    address: string;
    phone: string;
    remote: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const JobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        salary: {
            type: String,
            required: true,
            trim: true
        },
        jobType: {
            type: String,
            required: true,
            trim: true
        },
        benefits: {
            type: String,
            required: true,
            trim: true
        },
        requirements: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        remote: {
            type: Boolean,
            required: true,
            trim: true
        },
    },
    {
        timestamps: true
    }
)

export default model('Job', JobSchema) as Model<JobDocument>