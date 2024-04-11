import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    return res.status(201).send({ user });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: 'Login failed, user not found.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: 'Login failed, incorrect password.' });
    }

    // Use the environment variable for the JWT secret
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default { register, login };