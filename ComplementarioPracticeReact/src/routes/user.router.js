import { Router } from "express";
import { getAllUsers, getOneUserByEmail, addOneUser, changeOnePassword } from "../controllers/user.controller.js";

const router = Router();
//It must be POST to recive data from req.body
router.post("/login", getOneUserByEmail);

router.post("/register", addOneUser);

router.post("/change-password", changeOnePassword)

// router.get("/logout", (req, res) => {
//   req.session.destroy(err=>{
//     if(err) console.log(err);
//     else res.redirect('/view/login');
//   })
// });
export default router;
