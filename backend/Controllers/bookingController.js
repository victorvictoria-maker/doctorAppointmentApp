import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js ";
import Booking from "../models/BookingSchema.js";

export const makeBooking = async (req, res) => {
  try {
    // get doctor to be booked
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    // create new booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
    });

    // send the booking to databse
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully made booking" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error making booking" });
  }
};
