import { Router } from "express";
import login from "./controllers/login";
import logout from "./controllers/logout";
import me from "./controllers/me";
import refreshToken from "./controllers/refreshToken";
import register from "./controllers/register";
import { validateRegister } from "./validators./validateRegister";
import { loginGuard } from "./utils/loginGuard";
import { sanitize } from "@/utils/sanitizeInput";
import { authenticationGuard } from "@/utils/authenticationGuard";
import { searchUser } from "./controllers/search";

const router = Router();

router.get("/", sanitize, searchUser);

router.post("/login", loginGuard, sanitize, login);
router.post("/register", sanitize, validateRegister, register);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/me", authenticationGuard, me);

router.post("/test/:key/:slug", sanitize, (req, res) => {
  return res.json({
    query: req.query,
    param: req.params,
    body: req.body,
  });
});

export default router;
