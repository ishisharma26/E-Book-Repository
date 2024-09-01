const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to your Product model
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            default: 1
          }
        }
      ],
    bookingId: { type: String, required: true },
    date: { type: Date ,default:Date.now},
    total: { type: String },
    add:{type:String},
    status:{type:String,default:"Pending"}
});

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;
