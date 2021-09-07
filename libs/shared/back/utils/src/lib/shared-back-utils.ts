import { hash, compare } from "bcrypt"

export function generateHash(payload: string): Promise<string> {
  return  hash(payload, 12);
}

export function compareHash(payload: string, hashed:string): Promise<boolean> {
  return  compare(payload, hashed);
}
