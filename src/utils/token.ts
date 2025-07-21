import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET);
};
