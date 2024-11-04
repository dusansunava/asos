import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<[string, string]> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return [salt, hashedPassword];
}

export async function checkPasswords(existingPassword: string, inputPassword: string, salt: string) {
    const hashedInputPassword = await bcrypt.hash(inputPassword, salt);
    return existingPassword === hashedInputPassword;
}