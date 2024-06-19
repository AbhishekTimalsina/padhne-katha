const router= require("express").Router();
const userController= require("../controllers/user")


router.get("/user/:id",userController.getUserProfile)


module.exports= router;
