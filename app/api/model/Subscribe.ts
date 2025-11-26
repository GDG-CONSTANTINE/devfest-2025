import mongoose from 'mongoose';

const SubscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent model recompilation in development (HMR)
const Subscribe =
  mongoose.models.Subscribe || mongoose.model('Subscribe', SubscribeSchema);

export default Subscribe;
