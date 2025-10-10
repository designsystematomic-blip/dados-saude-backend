import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export function generateToken(payload: object) {
  console.log("SECRET", SECRET);
  return jwt.sign(payload, SECRET, { expiresIn: "12h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
