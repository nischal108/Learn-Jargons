// interface User {
//     name:String,
//     age:number,
// }

// function ageSumCalculator (user1:User,user2:User):number {
//     return user1.age+ user2.age;
// }

// const ageSum = ageSumCalculator({name:"Nischal",age:12},{name:'Manish',age:23})

// // console.log(ageSum);

// interface Users {
//     name:String,
//     age:number,
//     DOB:Date,
//     gender:"male" | "female",
//     DOJ :Date
// }

// type normaltype = Pick<Users,"name"|"age">

// const user:normaltype = {
//     name:"Nischal",
//     age:12
// }

// type updatedUser = Partial<Users>;

// const user1:updatedUser =  {
//     name:"hello"
// }

// const apikey:Readonly<String> = "hello";

// type readUser = Readonly <Users>;


import express from 'express';
const app = express();
import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.number().int().nonnegative({ message: "Age must be a non-negative integer" }).optional(),
});

type userType = z.infer<typeof userSchema>;