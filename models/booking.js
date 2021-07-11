var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  },
  attendee: {
    type: Array,
    required: true
  },
  eventId: {
    type: String,
    required: true
  }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;