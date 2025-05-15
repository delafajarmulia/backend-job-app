import { Model, model,Schema } from "mongoose";

interface categoryDocument {
    name: String,
    description?: String,
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

export default model("Category", CategorySchema) as Model<categoryDocument>