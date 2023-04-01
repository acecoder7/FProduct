
import Product from "../model/product.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";


//Create Product
export const createProduct = async (req,res) => {
    try{
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "product",
      });
      const newProductData = {
        desc: req.body.desc,
        name: req.body.name,
        mrp: req.body.mrp,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        image: req.body.image,
        
      };
  
      const post = await Product.create(newProductData);
  
      res.status(201).json({
        success: true,
        message: "Product created",
        post
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};


//Delete Post
export const deleteProduct = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
        }
    
        if (post.owner.toString() !== req.user.id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id);
    
        await post.remove();
    
        const user = await User.findById(req.user.id);
    
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
    
        await user.save();
    
        res.status(200).json({
          success: true,
          message: "Post deleted",
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};



export const getallProduct = async (req,res)=>{
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();
    try{
      const product = await apiFeatures.query;
        //const post = await Post.find().populate("owner");
        res.status(200).json({
          success: true,
          product,
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};



//Get User Posts
export const getSingleProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};