// You need to define the schema for a reservation
// The fields you require are:
// associated user
// quantity of guests
// restaurant name
// date and time of reservation (you can do these as separate fields if you wish) 

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
{
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true

},
numberOfGuest : {
type : Number,
required: true
},

restaurent: {
    type: String,
    required: true
}},
{ timestamps:true}

);

module.exports = mongoose.model('Reservation', ReservationSchema);