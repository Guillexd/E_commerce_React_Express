import UserManager from "../persistencia/daos/user.manager.js";
import { hashPassword } from "../utils/utils.js";

const userManger = new UserManager();

export async function getUsers() {
  try {
    const users = await userManger.getUsers();
    return users;
  } catch (err) {
    return err;
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await userManger.getUserByEmail(email);
    return user;
  } catch (err) {
    return err;
  }
}

export async function addUser(propsNewUser) {
  try {
    const newUser = await userManger.addUser(propsNewUser);
    return newUser;
  } catch (err) {
    return err;
  }
}

export async function changePassword(email, newPassword) {
  try {
    const hashedNewPassword = await hashPassword(newPassword);
    const user = await userManger.changePassword({email, hashedNewPassword});
    return user;
  } catch (err) {
    return err;
  }
}
