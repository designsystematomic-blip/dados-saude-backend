import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export class UserController {
  static async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
      const user = await UserService.createUser(email, password, name);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: "Erro ao registrar usuário" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha inválida" });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  }

  static async list(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }
}
