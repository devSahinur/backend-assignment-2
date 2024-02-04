"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
//user created route
route.post('/', user_controller_1.userController.createUser);
//all user get route
route.get('/', user_controller_1.userController.getAllUser);
//single user get route
route.get('/:userId', user_controller_1.userController.getSingleUser);
//user update route
route.put('/:userId', user_controller_1.userController.updateSingleUser);
//order create route
route.patch('/:userId/orders', user_controller_1.userController.addOrder);
//order get route
route.get('/:userId/orders', user_controller_1.userController.getOrder);
//get totalPrice route
route.get('/:userId/orders/total-price', user_controller_1.userController.getTotalPrice);
//user deleted route
route.delete('/:userId', user_controller_1.userController.deleteUser);
exports.userRoute = route;
