var express = require('express');
var validator = require('validator');
var Booking = require('../models/booking');
var Event = require('../models/event');

const router = express.Router();

let isNumber = (val) => !isNaN(parseInt(val))
let isStrLetterAndSpaces = (val) => val.match(/^[a-zA-Z ]+$/);

let createBooking = async (booking) => {
    const session = await Event.startSession();
    await session.startTransaction();
    try {
      let event = await Event.findById(booking.eventId).exec();
      if(!event){
            throw new Error(`No such Event with id ${booking.eventId} exists`);
      }
      if(event.noOfSeats < booking.noOfSeats){
            throw new Error(`Available seats is ${event.noOfSeats}. You are asking for ${booking.noOfSeats}`);
      }
      const opts = { session };
      // creating booking object
      await Booking(booking).save(opts);
      // updating seats in event object
      await Event.findOneAndUpdate(
                      { _id: booking.eventId }, { $inc: { noOfSeats: -booking.noOfSeats } }, opts);
      await session.commitTransaction();
      await session.endSession();
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error; 
    }
}

router.get('/eventSearch', (req, res) => {
    Event.find({ "name": { "$regex": req.query.name, "$options": "i" } }, function (err, events) {
        events = typeof events === undefined ? {} : events;
        res.send(events);
    });
});

router.get('/event', (req, res) => {
  Event.find({}, function (err, events) {
      events = typeof events === undefined ? {} : events;
      res.send(events);
  });
});

router.get('/event/:id', async (req, res) => {
  const id = req.params.id;
  try{
    var event = await Event.findById(id).exec();
  }catch(error){
    res.status(400).send(error);
  }
  if(!event){
    res.status(404).send({});
  }else{
    res.status(200).send(event);  
  }
});

router.post('/booking', async(req, res) => {
  let { name, email, phoneNumber, noOfSeats, attendees, eventId } = req.body;

  console.log(req.body)
  // validating name
  if(!isStrLetterAndSpaces(name)){
    res.status(400).json({"type": "error", "error": "Name should contain only alphabets and spaces"});
    return     
  }
  
  // validating email
  if(!validator.isEmail(email)){
      res.status(400).json({"type": "error", "error": "Email is not valid"});
      return
  }

  // validating phone number
  if(!validator.isMobilePhone(phoneNumber)){
    res.status(400).json({"type": "error", "error": "Phone Number is not valid"});
    return
  }

  // validating phone number
  if(!(isNumber(noOfSeats) && noOfSeats <= 6 && noOfSeats > 0)){
    res.status(400).json({"type": "error", "error": "No.of seats should be number and in range[1,6]"});
    return
  }

  // validating attendees
  let error_messages = [];
  let isError = false;
  if(!Array.isArray(attendees)){
    res.status(400).json({"type": "error", "error": "Attendees should be array"});
    return
  }
  if(attendees.length !== noOfSeats - 1){
    res.status(400).json({"type": "error", "error": `No.of Attendees should be ${noOfSeats-1}`});
    return
  }
  for(let attendee of attendees){
      if(!isStrLetterAndSpaces(attendee)){
        error_messages.push(`${attendee} should contain only letters and spaces`);
        isError = true;
      }
  }
  if(isError){
    res.status(400).json({"type": "error", "error": error_messages});
    return
  }

  // creating booking object
  try{
      await createBooking(req.body);
      res.status(201).json({"type": "success", "payload": req.body, "message": "Booking created"})
  } catch(error) {
      res.status(400).json({"type": "error","error": error.message});
  }
});

module.exports = router;