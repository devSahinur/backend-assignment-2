import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TOrder, TUser, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

//create fullname schema
const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'First name can not me more then 50 characters'],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1)
        return firstName === value
      },
      message: '{VALUE} is not capitalized formate',
    },
  },
  lastName: { type: String, required: true, trim: true },
})

//create address schema
const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
})

//create order schema
const OrderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number, min: 0 },
  quantity: { type: Number, min: 1 },
})
//create user schema
const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'User id is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: FullNameSchema,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    hobbies: {
      type: [String],
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    orders: {
      type: [OrderSchema],
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)
userSchema.statics.isUserExist = async (id: number) => {
  const existingUser = await User.findOne({ userId: id })
  return existingUser
}
//virtual
// userSchema.virtual('fullName', async function () {})

//document middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})
userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})
//query middleware
userSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } }).projection({
    userId: 0,
    password: 0,
    isDeleted: 0,
    orders: 0,
  })
  next()
})
userSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
//aggregation middleware
userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})
//create model
export const User = model<TUser, UserModel>('user', userSchema)
