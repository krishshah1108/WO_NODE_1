import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    designation: {
      type: String,
      required: true,
      enum: ['SUPER_ADMIN', 'MANAGER', 'TEAM_LEADER', 'DEVELOPER']
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    isVerified: { type: Boolean, default: false },
    reporters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    code: { type: Number, default: null },
    refreshToken: { type: String, default: '' }
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model('User', userSchema);
export default User;
