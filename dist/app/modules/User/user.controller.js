"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const userValidation_1 = __importDefault(require("./userValidation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const validationData = userValidation_1.default.parse(userData);
        const result = yield user_service_1.userService.createUserIntoDB(validationData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { user: userData } = req.body;
        const validationData = userValidation_1.default.parse(userData);
        const result = yield user_service_1.userService.updateSingleUserFromDB(userId, validationData);
        if (result.modifiedCount > 0) {
            const updatedUser = yield user_service_1.userService.getSingleUserFromDB(userId);
            return res
                .status(200)
                .json({ message: 'User updated successfully!', data: updatedUser });
        }
        else {
            return res
                .status(404)
                .json({ message: 'User not found or no changes applied' });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error,
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        const result = yield user_service_1.userService.addOrderIntoDB(userId, orderData);
        if (result.modifiedCount > 0) {
            const updatedData = yield user_service_1.userService.getOrderFromDB(userId);
            return res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: updatedData,
            });
        }
        else {
            return res
                .status(404)
                .json({ message: 'User not found or no changes applied' });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error,
        });
    }
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.getOrderFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.getTotalPriceFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: result,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.deletedUserFromDB(userId);
        if (result.modifiedCount > 0) {
            const updatedUser = yield user_service_1.userService.getSingleUserFromDB(userId);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: updatedUser,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    addOrder,
    getOrder,
    getTotalPrice,
    deleteUser,
};
