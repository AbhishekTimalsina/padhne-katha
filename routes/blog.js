const router= require("express").Router();
const blogController= require("../controllers/blog")
const isLogged= require("../middleware/is-logged")

router.get("/new",isLogged,  blogController.getAddBlog)

router.post("/add-post",isLogged, blogController.postNewBlog)

router.get("/:id",blogController.getBlog);

router.delete("/:id",isLogged, blogController.deleteBlog)

router.get("/:id/edit",isLogged, blogController.getEditBlog)

router.put("/:id/edit",isLogged, blogController.updateEditBlog)
module.exports = router;
