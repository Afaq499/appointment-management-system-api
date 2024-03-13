import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new Schema({
  _id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  status: {
    type: String,
    default: 'PENDING'
  },
  email: {
    type: String,
    unique: true
  },
  phone: { type: String },
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: Number },
    country: { type: String },
  },
  role: {
    type: String,
    default: 'user'
  }
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

const Users = mongoose.model('users', schema, 'users');

export default Users;
