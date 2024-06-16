import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { createToken } from "@services/jwt.service";

export interface UserDocument extends mongoose.Document {
  comparePassword: (pHash: string, text: string) => Promise<boolean>;
  email: string;
  password: string;
  name: string;
  user_id: string;
  _id: mongoose.Types.ObjectId;
  genAccessToken: () => string;
  genRefreshToken: () => string;
  refresh_token: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    user_id: { type: String },
    refresh_token: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    this.user_id = this._id.toString();
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare the passed password with the value in the database. A model method.
userSchema.methods["comparePassword"] = function (pHash: string, text: string) {
  return bcrypt.compare(text, pHash);
};

// Generate an access token for the user. A model method.
userSchema.methods["genAccessToken"] = function () {
  const user = this as UserDocument;
  const expiresIn = "1h";
  return createToken({ user_id: user.user_id, email: user.email }, expiresIn);
};

// Generate a refresh token for the user. A model method.
userSchema.methods["genRefreshToken"] = function () {
  const user = this as UserDocument;
  const expiresIn = "7d";
  return createToken({ user_id: user.user_id, email: user.email }, expiresIn);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
