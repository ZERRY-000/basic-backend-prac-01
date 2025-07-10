import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../database/userModel.js";

async function register(request, response) {
  const { username, password } = request.body;
  const hashedPassword = bcrypt.hashSync(password, 1);
  try {
    const user_instance = await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    
    response.status(201).json({ message: "ok"});
  } catch (error) {
    if (error.code === 11000) {
      response.status(400).json({ error: "Username already exists" });
    } else {
      response.status(500).json({ status: "failed" });
    }
  }
}

async function login(request, response) {
  const {username, password} = request.body;

  // find(username) -> compare(password)/ error -> complete/ error
  const user = await UserModel.findOne({username: username});
  // console.log("user (print from authServices) :", user);

  if(!user) return response.status(401).json({message: "Your username or password is invalid"});
  console.log(user);
  const passwordIsValid = bcrypt.compareSync(password, user.password); // (input_password, encrypted_password) 
  if(!passwordIsValid) return response.json({message: "Your username or password is invalid"});
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3m'});
  return response.json({message: "ok", user_id: user._id, token});

  
}

export { register, login };
