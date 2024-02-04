import z from 'zod'
const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => value[0].toUpperCase() + value.slice(1) === value, {
      message: 'First name should be capitalized',
    }),
  lastName: z.string().min(1).max(50),
})

const AddressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
})

// const OrderValidationSchema = z.object({
//   productName: z.string().min(1).max(100).optional(),
//   price: z.number().min(0).optional(),
//   quantity: z.number().min(1).optional(),
// })

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(50),
  password: z
    .string()
    .min(6)
    .refine((value) => /[A-Z]/.test(value) && /\d/.test(value), {
      message:
        'Password must contain at least one uppercase letter and one digit',
    }),
  fullName: FullNameValidationSchema,
  age: z.number().min(0),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(50)),
  address: AddressValidationSchema,
  // orders: z.array(OrderValidationSchema),
})
export default UserValidationSchema
