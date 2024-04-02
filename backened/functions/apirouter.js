const express = require('express');
const router = express.Router();
// const serverless = require('serverless-http');
const app = express();
const Product = require('../models/product');



//get all employees
router.get('/ListOfProducts' , async(req,res) => {
    try{
        let products = await Product.find();
        res.status(200).json(products)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }
});

//get single employe
router.get('/ListOfProducts/:id' , async(req,res) => {
    try{
        let productID = req.params.id
        let product = await Product.findById(productID);
        res.status(200).json(product)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }
})

//create a product 
//to configure express to recive form data, go to index.js and write express.json and express.urlencoded etc
router.post('/ListOfProducts' , async(req,res) => {
    try{
        let newproduct = {
            name : req.body.name,
            image : req.body.image,
            price : req.body.price,
            quantity : req.body.quantity,
            info : req.body.info
        }
        //produc exists or not check
        let product  = await Product.findOne({name:newproduct.name });
        if(product){
            return express.res.status(500).json({
                msg: 'already exists'
            })
        }
        product = new Product(newproduct)
        product = await product.save(); //insert product to database
        res.status(200).json(newproduct)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }
});

//update a product
router.put('/ListOfProducts/:id' , async(req,res) => {
    let productID = req.params.id
    try{
        let updateproduct = {
            name : req.body.name,
            image : req.body.image,
            price : req.body.price,
            quantity : req.body.quantity,
            info : req.body.info
        }
        let product = await Product.findById(productID);
        if(!product){
            return res.status(401).json({
                msg:'no product found'
            })
        }
        //update
        product = await Product.findByIdAndUpdate(productID , {
            $set : updateproduct
        }, {new:true})
        res.status(200).json(product)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }
})

//delete a product
router.delete('/ListOfProducts/:id' , async(req,res) => {
    try{
        let productID = req.params.id
        let deletedproduct = await Product.findById(productID);
        if(!deletedproduct){
            return res.status(401).json({
                msg:'no product found'
            })
        }

        //delete
         deletedproduct = await Product.findByIdAndDelete(productID);
        res.status(200).json(deletedproduct)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg: err.message
        })
    }
})



module.exports = router;

