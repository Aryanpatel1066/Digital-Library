 const express = require('express');
 const {userRegister,userLogin}=require('../controllers/auth.controller');
const {verifyBody,verifyToken} =require('../middleware/auth.middleware');

const router = express.Router();

router.post("/register", verifyBody,userRegister);
router.post("/login",userLogin);

module.exports = router;