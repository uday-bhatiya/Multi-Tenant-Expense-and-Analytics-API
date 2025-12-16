import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name: String,
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
}, {timestamps: true});

const Category = mongoose.model("Category", CategorySchema);

export default Category;