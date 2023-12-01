import mongoose from "mongoose";
import p from "passport-local-mongoose";

const userSchema = new mongoose.Schema();
userSchema.plugin(p);

export const userModel = mongoose.model("user", userSchema);