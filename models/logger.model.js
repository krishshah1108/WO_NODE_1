import mongoose from 'mongoose';

const loggerSchema = new mongoose.Schema(
  {
    level: { type: String, required: true },
    message: { type: String, required: true },
    meta: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      method: { type: String, required: true },
      url: { type: String, required: true },
      statusCode: { type: Number, required: true },
    },
  },
  { timestamps: true, versionKey: false },
);

const Logger = mongoose.model('Logger', loggerSchema);
export default Logger;
