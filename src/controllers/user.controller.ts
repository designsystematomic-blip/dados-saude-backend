import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { UserRepository } from "../repository/user/user.repository";

export class UserController {
  static async register(req: Request, res: Response) {
    const { user } = req.body;

    console.log("user controller", user);

    const mandatory = {
      email: user.email,
      password: user.password,
      cpf: user.cpf,
    };

    const optional = {
      name: user.name,
      sex: user.sex,
      socialName: user.socialName,
      birthDate: user.birthDate,
      bloodType: user.bloodType,
      phone: user.phone,
    };

    try {
      const user = await UserRepository.createUser({
        ...mandatory,
        ...optional,
      });

      res.status(201).json(user);
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
}
