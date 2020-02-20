let router = require("express").Router();
let categoryController = require("./controllers/categoryController");
let bookController=require("./controllers/bookController")

const {check}=require("express-validator");

//http://localhost/api/category
router.route("/category").get(categoryController.list).post([check("name").notEmpty().withMessage("name alanı boş olamaz")],
categoryController.create);
//http://localhost/api/category/categoryId
router.route("/category/:category_id").get(categoryController.getById).put([check("name").notEmpty().withMessage("yeni name girilmedi")],categoryController.update).delete(categoryController.delete);



var bookValidation=new Array(
check("title").notEmpty().withMessage("title kısmı boş olamaz"),
check("author").notEmpty().withMessage("author kısmı boş olamaz"),
check("price").notEmpty().withMessage("price kısmı boş olamaz").isFloat().withMessage("price değeri sayı olmalıdır"),
check("stock").notEmpty().withMessage("stock kısmı boş olamaz").isInt().withMessage("stock değeri sayı olmalıdır"),
check("picture").notEmpty().withMessage("picture kısmı boş olamaz"),
check("categoryBy").notEmpty().withMessage("categoryBy kısmı boş olamaz"));
router.route("/book").get(bookController.list).post([bookValidation],bookController.create);
router.route("/book/:book_id").get(bookController.getById).put([bookValidation],bookController.update).delete(bookController.delete);
router.route("/books/:category_id").get(bookController.listByCategoryId);
router.route("/book/saveImage").post(bookController.upload.single("picture"),bookController.saveImage);
module.exports = router;
