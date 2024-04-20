import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new Schema({
  _id: { type: String },
  userId: { type: String },
  category: { type: String },
  appointmentDate: { type: Date }
},
  {
    timestamps: true
  })

schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(this.password, 10);
  return next();
});
schema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const Appointment = mongoose.model('appointments', schema, 'appointments');

export default Appointment;
