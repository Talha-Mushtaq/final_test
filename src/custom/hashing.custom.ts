import bcrypt from "bcrypt";

export const hashingPassword = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashing = await bcrypt.hash(pass, salt);
  return hashing;
};

export const matchingPassword = async (
  userPass: string,
  dbPass: string
): Promise<boolean> => {
  const matching = await bcrypt.compare(userPass, dbPass);
  return matching;
};
