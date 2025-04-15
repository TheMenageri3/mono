import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  console.log("Generating salt...");
  const salt = await bcrypt.genSalt(10);
  console.log("Salt generated:", salt);

  console.log("Hashing password with salt...");
  const hash = await bcrypt.hash(password, salt);
  console.log("Password hashed successfully");

  return hash;
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  console.log("Comparing passwords...");
  console.log("Input password length:", password.length);
  console.log("Hashed password length:", hashedPassword.length);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password comparison result:", isMatch);

  if (!isMatch) {
    console.log("Passwords do not match");
    throw new Error("Passwords do not match");
  }

  console.log("Passwords match");
  return true;
};
