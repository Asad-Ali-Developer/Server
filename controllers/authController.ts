import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const Register = async (req: Request, res: Response) => {

    const { username, email, phone, password, IdFileLink } = req.body;

    try {

        const userExists = await userModel.findOne({ email });


        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const newUser = await userModel.create({
            username,
            email,
            phone,
            IdFileLink: IdFileLink || '',  // Handle optional field
            password: hash,
        });


        const token = jwt.sign(
            { email: newUser.email, _id: newUser._id },
            'tenant-data-record',
            { expiresIn: '12d' } // Consider setting an expiration time
        );


        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'User created successfully', token });


    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });


        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }


        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }



        const token = jwt.sign(
            { username: user.username, email: user.email, _id: user._id, isAdmin: user.isAdmin },
            'tenant-data-record',
            { expiresIn: '12d' }
        );



        // res.cookie('token', token, { httpOnly: true });


        res.status(200).json({
            message: 'Login successful',
            token,
            id: user._id,
            isAdmin: user.isAdmin,
        });


    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




const User = async (req: Request, res: Response) => {
    try {
        const userData = req.user;

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.status(200).json({ userData });


    } catch (error) {
        console.error('User retrieval error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default { Register, Login, User };
