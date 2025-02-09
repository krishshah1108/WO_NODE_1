import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: String, required: true, match: [/^\d{6}$/, 'Invalid zip code'] },
    },
    contact: { type: String, required: true, match: [/^\d{10}$/, 'Invalid phone number'] },
    status: { type: String, required: true, enum: ['active', 'inactive'] },
  },
  { timestamps: true, versionKey: false },
);

const Company = mongoose.model('Company', companySchema);
export default Company;
