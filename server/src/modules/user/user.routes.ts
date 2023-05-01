import { verifyAuthToken } from "@/utils/tokenHandler";
import express from "express";
import login from "./controllers/login";
import logout from "./controllers/logout";
import me from "./controllers/me";
import refreshToken from "./controllers/refreshToken";
import register from "./controllers/register";
import { validateRegister } from "./validators./validateRegister";

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/me", verifyAuthToken, me);

export default router;
