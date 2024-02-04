import express from 'express'
import { userController } from './user.controller'

const route = express.Router()
//user created route
route.post('/', userController.createUser)
//all user get route
route.get('/', userController.getAllUser)
//single user get route
route.get('/:userId', userController.getSingleUser)
//user update route
route.put('/:userId', userController.updateSingleUser)
//order create route
route.patch('/:userId/orders', userController.addOrder)
//order get route
route.get('/:userId/orders', userController.getOrder)
//get totalPrice route
route.get('/:userId/orders/total-price', userController.getTotalPrice)
//user deleted route
route.delete('/:userId', userController.deleteUser)
export const userRoute = route
