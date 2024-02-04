import { Request, Response } from 'express'
import { userService } from './user.service'
import UserValidationSchema from './userValidation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const validationData = UserValidationSchema.parse(userData)
    const result = await userService.createUserIntoDB(validationData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.getSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { user: userData } = req.body
    const validationData = UserValidationSchema.parse(userData)
    const result = await userService.updateSingleUserFromDB(
      userId,
      validationData,
    )
    if (result.modifiedCount > 0) {
      const updatedUser = await userService.getSingleUserFromDB(userId)
      return res
        .status(200)
        .json({ message: 'User updated successfully!', data: updatedUser })
    } else {
      return res
        .status(404)
        .json({ message: 'User not found or no changes applied' })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const orderData = req.body
    const result = await userService.addOrderIntoDB(userId, orderData)
    if (result.modifiedCount > 0) {
      const updatedData = await userService.getOrderFromDB(userId)
      return res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: updatedData,
      })
    } else {
      return res
        .status(404)
        .json({ message: 'User not found or no changes applied' })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}
const getOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.getOrderFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.getTotalPriceFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.deletedUserFromDB(userId)
    if (result.modifiedCount > 0) {
      const updatedUser = await userService.getSingleUserFromDB(userId)
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: updatedUser,
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  addOrder,
  getOrder,
  getTotalPrice,
  deleteUser,
}
