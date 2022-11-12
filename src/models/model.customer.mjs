import mongoose from 'mongoose'
const { Schema } = mongoose

const providerData = new Schema({
  providerId: String,
  uid: String,
  displayName: String,
  email: String,
  phoneNumber: String,
  photoURL: String,
})

const CustomerModel = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    role: { type: Number, default: 0 },
    emailVerified: Boolean,
    isAnonymous: Boolean,
    photoURL: String,
    providerData: [providerData],
    createdAt: String,
    lastLoginAt: String,
    apiKey: String,
    appName: String,
  },
  {
    timestamps: true,
    collection: 'customer',
  }
)

export default mongoose.model('customer', CustomerModel)
