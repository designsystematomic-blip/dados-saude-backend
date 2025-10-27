import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt";
import { UserRepository } from "../repository/user/user.repository";

export class UserController {
  static async register(req: Request, res: Response) {
    const { user } = req.body;
    const mandatory = {
      email: user.email,
      password: user.password,
      cpf: user.cpf,
    };

    const optional = {
      name: user.name,
      sex: user.sex,
      socialName: user.socialName,
      birthDate: new Date(user.birthDate),
      bloodType: user.bloodType,
      phone: user.phone,
    };

    try {
      const user = await UserRepository.createUser({
        ...mandatory,
        ...optional,
      });

      const token = generateToken({ id: user.id, email: user.email });

      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ error: "Erro ao registrar usuário" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha inválida" });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  }

  static async list(req: Request, res: Response) {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  }

  static async getUnique(req: Request, res: Response) {
    try {

      const { token } = req.body;
      const check = verifyToken(token);

      if (!check) return res.status(400).json({ error: "Token inválido" });

      const tokenStr = JSON.stringify(check);
      const tokenData = JSON.parse(tokenStr);

      const userId = tokenData?.id;
      if (!userId) return res.status(401).json({ error: "Token inválido" });
      
      const user = await UserRepository.findById(userId);

      res.json(user);

    } catch (error) {
      return res.status(400).json({ error })
    }

  }
}
