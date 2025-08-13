 const express = require('express');
 const {userRegister,userLogin,getProfile}=require('../controllers/auth.controller');
const {verifyBody,verifyToken} =require('../middleware/auth.middleware');

const router = express.Router();

router.post("/register", verifyBody,userRegister);
router.post("/login",userLogin);
router.get("/me", verifyToken, getProfile);

module.exports = router;