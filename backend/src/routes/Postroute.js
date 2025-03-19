const express = require('express');
const router = express.Router();
const Posts = require('../models/post');

// Add a new post
router.post("/add", async (req, res) => {
    const { title, description, timeperiod } = req.body; 
    if (!title || !description || !timeperiod) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newpost = new Posts({
            title,
            description,
            timeperiod
        });

        await newpost.save();
        res.status(201).json({ message: "Post created successfully", post: newpost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Edit a post by ID
router.put('/edit/:id', async (req, res) => {
    const { title, description, timeperiod } = req.body; // Fixed destructuring
    if (!title && !description && !timeperiod) {
        return res.status(400).json({ message: "At least one field is required to update" });
    }

    try {
        const updatedPost = await Posts.findByIdAndUpdate(
            req.params.id, 
            { title, description, timeperiod }, 
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

router.delete('/delete/:id', async (req, res) => {
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
