import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }],
    settings: {
        currency: {
            type: String,
            default: "INR"
        },
        timezone: String
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;