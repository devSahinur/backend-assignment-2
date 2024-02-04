import { TOrder, TUser } from './user.interface'
import { User } from './user.model'
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exists')
  }
  const createdUser = await User.create(userData)
  const result = await User.findById(createdUser._id).select([
    '-password',
    '-orders',
    '-isDeleted',
  ])

  return result
}
const getAllUserFromDB = async () => {
  const result = await User.find({}, { userId: 0 })
  return result
}
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne(
    { userId },
    { password: 0, isDeleted: 0, orders: 0 },
  )
  return result
}
const updateSingleUserFromDB = async (userId: string, userData: TUser) => {
  const result = await User.updateOne(
    { userId: userId },
    {
      $set: userData,
    },
  )
  return result
}

const addOrderIntoDB = async (userId: string, orderData: TOrder) => {
  const result = await User.updateOne({ userId: userId }, { $push: orderData })
  return result
}
const getOrderFromDB = async (userId: string) => {
  const result = await User.findOne({ userId }, { orders: 1 })
  return result
}
const getTotalPriceFromDB = async (userId: string) => {
  const result = await User.aggregate([
    {
      $match: { userId: Number(userId) },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ])
  return result[0].totalPrice
}
const deletedUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  addOrderIntoDB,
  getOrderFromDB,
  getTotalPriceFromDB,
  deletedUserFromDB,
}
