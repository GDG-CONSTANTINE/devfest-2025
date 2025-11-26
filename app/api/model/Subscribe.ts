import mongoose from 'mongoose';

const SubscribeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
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
