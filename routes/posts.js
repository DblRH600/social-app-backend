import express from 'express'
import Post from '../config/Post.js'
import { authMiddleware } from '../utils/auth.js'

const router = express.Router()

router.use(authMiddleware)

/**
 * Default route
 */
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id })

        res.json(posts)
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})

/**
 * POST route to create new post
 */
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            author: req.user._id
        })

        res.json(newPost)
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})