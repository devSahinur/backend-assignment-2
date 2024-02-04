"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const FullNameValidationSchema = zod_1.default.object({
    firstName: zod_1.default
        .string()
        .min(1)
        .max(50)
        .refine((value) => value[0].toUpperCase() + value.slice(1) === value, {
        message: 'First name should be capitalized',
    }),
    lastName: zod_1.default.string().min(1).max(50),
});
const AddressValidationSchema = zod_1.default.object({
    street: zod_1.default.string().min(1).max(100),
    city: zod_1.default.string().min(1).max(50),
    country: zod_1.default.string().min(1).max(50),
});
// const OrderValidationSchema = z.object({
//   productName: z.string().min(1).max(100).optional(),
//   price: z.number().min(0).optional(),
//   quantity: z.number().min(1).optional(),
// })
const UserValidationSchema = zod_1.default.object({
    userId: zod_1.default.number(),
    username: zod_1.default.string().min(1).max(50),
    password: zod_1.default
        .string()
        .min(6)
        .refine((value) => /[A-Z]/.test(value) && /\d/.test(value), {
        message: 'Password must contain at least one uppercase letter and one digit',
    }),
    fullName: FullNameValidationSchema,
    age: zod_1.default.number().min(0),
    email: zod_1.default.string().email(),
    isActive: zod_1.default.boolean(),
    hobbies: zod_1.default.array(zod_1.default.string().min(1).max(50)),
    address: AddressValidationSchema,
    // orders: z.array(OrderValidationSchema),
});
exports.default = UserValidationSchema;
