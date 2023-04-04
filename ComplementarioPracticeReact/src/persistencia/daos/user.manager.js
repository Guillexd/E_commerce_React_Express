import { userModel } from "../models/users.model.js";
import { comparePasswords, hashPassword } from "../../utils/utils.js";

export default class UserManager {
  
  async getUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (err) {
      return err;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (err) {
      return err;
    }
  }

  async addUser(propsNewUser) {
    try {
      const user = await userModel.create(propsNewUser);
      return user;
    } catch (err) {
      return err;
    }
  }

  async changePassword(propsToChangePassword) {
    const { email, hashedNewPassword } = propsToChangePassword;
    try {
      const userModified = await userModel.findOneAndUpdate(
        { email },
        { password: hashedNewPassword },
        { new: true }
      );
      return userModified;
    } catch (err) {
      return err;
    }
  }

  // async updateUser() {
  //   try {
  //   } catch (err) {
  //     console.log(`Error in updateUser from UserManager: ${err}`);
  //   }
  // }

  // async deleteUser() {
  //   try {
  //   } catch (err) {
  //     console.log(`Error in deleteUser from UserManager: ${err}`);
  //   }
  // }
}
