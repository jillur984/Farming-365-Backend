import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const userRegister = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!name) return res.json({ success: false, message: "name is Required" });
    if (!email)
      return res.json({ success: false, message: "email is Required" });
    if (!password)
      return res.json({ success: false, message: "password is Required" });
    // Check if the user already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User is Already Existing",
      });
    }
    // email validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a Valid Email Address",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    // use for more authenticate
    //     if (!passwordRegex.test(password)) {
    //   return res.json({
    //     success: false,
    //     message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    //   });
    // }

    // now use easy only

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password need at least 8 Charater",
      });
    }

    // hashed passowrd

    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);

    // register a new User

    const newUser = new userModel({
      name,
      email,
      password: encryptPassword,
      role,
    });
    await newUser.save();
    return res.json({
      success: true,
      message: "User is Registration Succesfully",
      user: newUser,
    });
  } catch (error) {
    console.log("user registration error", error);
    return res.json({ success: false, message: error?.message });
  }
};

const userLogin=async(req,res)=>{
try {
    const { email, password } = req.body;

    const user=await userModel.findOne({email})
     if (!user) return res.status(400).json({ message: 'Invalid credentials' });
     const isMatch=await bcrypt.compare(password,user.password)
     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
     const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
      res.status(200).json({ token, message: 'Logged in successfully' });
} catch (error) {
     res.status(500).json({ message: 'Error logging in', error: error.message });
}

}

export{userRegister,userLogin};
