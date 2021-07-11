var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  },
  pictureUrl: {
    type: String,
    required: true
  },
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;