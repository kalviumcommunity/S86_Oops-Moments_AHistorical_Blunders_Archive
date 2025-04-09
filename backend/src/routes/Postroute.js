const express = require('express');
const router = express.Router();
const Posts = require('../models/post');
const auth = require('../middleware/tokenAuth')
const  { isAdmin, isAuthorAdmin } = require('../middleware/roleAuth')

// Add a new post
router.post("/add", auth,async (req, res) => {
    const { title, description, timeperiod } = req.body; 
    if (!title || !description || !timeperiod) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newpost = new Posts({
            title,
            description,
            timeperiod,
            author:req.user.id
        });

        console.log(newpost)

        await newpost.save();
        res.status(201).json({ message: "Post created successfully", post: newpost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Edit a post by ID
router.put('/edit/:id', auth, isAuthorAdmin, async (req, res) => {
    const { title, description, timeperiod } = req.body;

    if (!title && !description && !timeperiod) {
        return res.status(400).json({ message: "At least one field is required to update" });
    }
    if(req.user.admin){
        return res.json({message:"only authors can edit"})
    }

    try {
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (timeperiod !== undefined) updates.timeperiod = timeperiod;

        const updatedPost = await Posts.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});


// delete a post by id

router.delete('/delete/:id', auth,isAuthorAdmin, async (req, res) => {
    try {
        
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// to show the feed
router.get('/feed', async (req, res) => {
    try {
        const posts = await Posts.find(); 
        res.status(200).json(posts); 
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
