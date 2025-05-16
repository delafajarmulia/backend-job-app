import User from "../models/User";
import { AuthRequest } from "../utils/types";
import { JWT_SECRET } from "../utils/variables";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try {
        // Create new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        // If user creation fails, send error response
        if (!newUser) {
            res.status(400).json({
                message: 'Gagal register user'
            });
            return
        }

        // Send success response
        res.status(201).json({
            message: 'Register berhasil',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
        return
    } catch (error) {
        // Handle any errors during the registration process
        res.status(500).json({
            message: 'Terjadi kesalahan saat mendaftar',
            error: error
        });
        return
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(403).json({
            message: 'Email atau Password wajib diisi'
        });
        return
    }

    const currentUser = await User.findOne({ email });

    if (!currentUser) {
        res.status(403).json({
            message: 'Email atau Password salah'
        });
        return
    }

    // Generate token
    const token = jwt.sign({
        id: currentUser._id
    }, JWT_SECRET);

    res.status(200).json({
        user: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email
        },
        token
    });
    return
};

export const getUser = async(req: AuthRequest<any, any, any, any>, res: Response) => {
    res.status(200).send(req.user)
    return
}