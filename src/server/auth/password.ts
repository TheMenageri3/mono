import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    throw new Error("Invalid password");
  }
  return true;
}
