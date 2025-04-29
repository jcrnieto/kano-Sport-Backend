import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';
import dotenv from 'dotenv';

dotenv.config();

export const loginAdminController = async (req: Request, res: Response): Promise<any> =>  {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ error: 'Usuario o contraseña inválido' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña inválido' });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error interno al hacer login' });
  }
};

