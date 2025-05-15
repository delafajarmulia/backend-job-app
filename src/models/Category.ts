import { Model, model,Schema } from "mongoose";

interface categoryDocument {
    name: string,
    description?: string,
    createdAt: Date,
    updatedAt: Date
}

const CategorySchema = new Schema<categoryDocument>({
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "category name minimal 2 karakter"]
        },    
        description: {
            type: String,
        },    
    }, 
    {
        timestamps: true
    }
)

CategorySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'category'
})

CategorySchema.set('toObject', { virtuals: true })
CategorySchema.set('toJSON', { virtuals: true})

export default model("Category", CategorySchema) as Model<categoryDocument>