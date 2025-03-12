"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const signUpController_1 = require("../controllers/signUpController");
const signInController_1 = require("../controllers/signInController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
router.post("/register", signUpController_1.register);
router.post("/login", signInController_1.login);
router.get('/profile', authMiddleware_1.authMiddleware, (req, res) => {
    res.json({ "message": "Profile" });
});
exports.default = router;
