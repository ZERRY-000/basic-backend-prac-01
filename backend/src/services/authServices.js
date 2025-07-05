import bcrypt from "bcryptjs";
import UserModel from "../database/userModel.js";

async function register(request, response) {
  const { username, password } = request.body;
  const hashedPassword = bcrypt.hashSync(password, 1);
  console.log(username, hashedPassword);
  try {
    const user_instance = await UserModel.create({
      username: username,
      password: hashedPassword,
    });
    response.status(201).json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      response.status(400).json({ error: "Username already exists" });
    } else {
      response.status(500).json({ status: "failed" });
    }
  }
}

export { register };
