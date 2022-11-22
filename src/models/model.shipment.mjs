import mongoose from 'mongoose'
const { Schema } = mongoose

const ShipmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'customer' },
    userName: String,
    userPhone: { type: String, default: '' },
    address: { type: String, default: '' },
    wardName: { type: String, default: '' },
    districtName: { type: String, default: '' },
    provinceName: { type: String, default: '' },
    paymentMethod: { type: String, default: 'COD' },
    carrieName: { type: String, default: 'T-Express' },
    expectedDelivery: { type: Date, default: () => new Date(+new Date() + 3 * 24 * 60 * 60 * 1000) },
  },
  {
    timestamps: true,
    collection: 'shipment',
  }
)

export default mongoose.model('shipment', ShipmentSchema)
