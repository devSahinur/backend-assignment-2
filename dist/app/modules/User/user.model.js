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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//create fullname schema
const FullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'First name can not me more then 50 characters'],
        validate: {
            validator: function (value) {
                const firstName = value.charAt(0).toUpperCase() + value.slice(1);
                return firstName === value;
            },
            message: '{VALUE} is not capitalized formate',
        },
    },
    lastName: { type: String, required: true, trim: true },
});
//create address schema
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
});
//create order schema
const OrderSchema = new mongoose_1.Schema({
    productName: { type: String },
    price: { type: Number, min: 0 },
    quantity: { type: Number, min: 1 },
});
//create user schema
const userSchema = new mongoose_1.Schema({
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
}, {
    toJSON: {
        virtuals: true,
    },
});
userSchema.statics.isUserExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield exports.User.findOne({ userId: id });
    return existingUser;
});
//virtual
// userSchema.virtual('fullName', async function () {})
//document middleware
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = '';
        next();
    });
});
//query middleware
userSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } }).projection({
            userId: 0,
            password: 0,
            isDeleted: 0,
            orders: 0,
        });
        next();
    });
});
userSchema.pre('findOne', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
//aggregation middleware
userSchema.pre('aggregate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
        next();
    });
});
//create model
exports.User = (0, mongoose_1.model)('user', userSchema);
