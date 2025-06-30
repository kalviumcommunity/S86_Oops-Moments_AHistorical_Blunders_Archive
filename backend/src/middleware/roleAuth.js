const posts = require('../models/post');

const isAdmin = (req, res, next) => {
    const isAdmin = req.user.admin;
    console.log(isAdmin)
    if (!isAdmin) {
        return res.status(403).json({ message: "Admin access only" }); 
    }
    next();
};


const isAuthorAdmin = async (req, res, next) => {
    try {
      const post = await posts.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
     
      if (!post.author || !req.user?.id) {
        return res.status(500).json({ message: "Post author or user ID missing"});
      }
  
      const isAuthor = post.author.toString() === req.user.id;
      const isAdmin = req.user.admin;
  
      if (!isAuthor && !isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  

module.exports = { isAdmin, isAuthorAdmin };
