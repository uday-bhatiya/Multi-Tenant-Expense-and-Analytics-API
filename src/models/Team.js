import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema({
    name: String,
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    totalExpense: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Team = mongoose.model("Team", TeamSchema);

export default Team;