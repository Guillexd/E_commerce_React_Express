import {
  getUsers,
  getUserByEmail,
  addUser,
  changePassword,
} from "../services/user.services.js";
import { comparePasswords, hashPassword, generateToken } from "../utils/utils.js";

export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.json({ state: 1, users });
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}

export async function getOneUserByEmail(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {

    const user = await getUserByEmail(email);
    const isPassword = await comparePasswords(password, user.password);
 
    if(isPassword){
      //we generate a token, httpOnly becuase of security in frontend and maxAge(1h) due to have same expiration time with generated token from util.js
      const token = generateToken(user);
      return res.cookie('tokenJwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60}).json({ state: 1, user });
    }
    else res.json({ state: 0, err: "User not found" });

  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}

export async function addOneUser(req, res) {
  const { first_name, last_name, age, email, password } = req.body;
  if (!first_name || !last_name || !age || !email || !password)
    return res.json({ state: 0, err: "Data is missing" });
  if (!parseInt(age)) return res.json({ state: 0, err: "Age is incorrect" });
  const propsNewUser = { first_name, last_name, age, email };
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await addUser({
      ...propsNewUser,
      password: hashedPassword,
    });
    //newUser.keyValue?.email is from an error due to an equal email in mongoatlas
    if (newUser.keyValue?.email == email)
      res.json({ state: 0, err: "Email is already registered." });
    else res.json({ state: 1, user: newUser });
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}

export async function changeOnePassword(req, res) {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword)
    return res.json({ state: 0, err: "Data is missing" });
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.json({ state: 0, err: "User not found" });
    const isPassword = await comparePasswords(oldPassword, user.password);
    if (isPassword) {
      const modifiedUser = await changePassword(email, newPassword);
      res.json({ state: 1, user: modifiedUser });
    } else {
      res.json({ state: 0, err: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}
