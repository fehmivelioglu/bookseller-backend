const Category = require("../models/category.model");
const response = require("../response");
const {validationResult}=require("express-validator");
//GET https://localhost/api/category
exports.list = (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) {
            return new response(null, err).error500(res);
        }
        return new response(categories, null).success(res);
    });
};
//GET https://localhost/api/category/categoryId(12345648)
exports.getById = (req, res) => {
    Category.findById(req.params.category_id, (err, category) => {
        if (err) {
            return new response(null,err).error500(res);
        }
        if(category){
        return new response(category, null).success(res);
    }
        else{
            return new response().notFound(res);}
    });
};
//POST https://localhost/api/category
exports.create = (req, res) => {
    let errors=validationResult(req);
    if(!errors.isEmpty()){
        return new response(null,errors.array()).error400(res);
    }
    var category = new Category();
    category.name = req.body.name;
    category.save((err) => {
        if (err) {
            return new response(null, err).error500(res);
        }
        return new response(category, null).created(res);
    });
};
//PUT https://localhost/api/category/categoryId(13245678)
exports.update = (req, res) => {
    let errors=validationResult(req);
      if(!errors.isEmpty()){
          return new response(null,errors.array()).error400(res);
      }
    Category.findById(req.params.category_id, (err, category) => {
      
        if (err) {
            return new response(null,err).error500(res);
        }
        if(!category){return new response().notFound(res);}

        category.name = req.body.name;
        category.save((err) => {
            if (err) {
                return new response(null, err).error500(res);
            }
            
            return new response(category, null).success(res);
        
   
    });
    });
};
//DELETE https://localhost/api/category/categoryId(13245678)
exports.delete = (req, res) => {
    Category.findOneAndDelete(
        { _id: req.params.category_id },
        (err, category) => {
            if (err) {
                return new response(null, err).error500(res);
            }
            if (!category) {
                return new response().notFound(res);
            }
            return new response(category, null).success(res);
        }
    );
};
