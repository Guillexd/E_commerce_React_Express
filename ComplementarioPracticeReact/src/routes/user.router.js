import { Router } from "express";
import {
  getAllUsers,
  getOneUserByEmail,
  addOneUser,
  changeOnePassword,
} from "../controllers/user.controller.js";
import { jwtValid } from "../middleware/jwt.middleware.js";

const router = Router();
//It must be POST to recive data from req.body
router.post("/validate", jwtValid, (req, res) => {
  res.json({ status: 1 });
});
router.post("/login", getOneUserByEmail);

router.post("/register", addOneUser);

router.post("/change-password", changeOnePassword);

router.get("/logout", (req, res) => {
  return res.clearCookie("tokenJwt").json({ message: "Succesfully logout"});
});
export default router;
