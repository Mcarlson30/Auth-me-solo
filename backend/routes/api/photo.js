const express = require('express')
const asyncHandler = require("express-async-handler");
const { Photo, User, Comment } = require('../../db/models');


const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")
const router = express.Router();

router.get("/", asyncHandler(async function (req, res, next) {
    const photos = await Photo.findAll({
        include: {
            model: User
        }
    });
    res.json(photos)
}))

router.get("/photo/:photoId", asyncHandler(async function (req, res) {
    const photoId = (req.params.photoId)
    const photos = await Photo.findOne({
        include: [{
            model: User
        },
        {
            model: Comment
        }
        ],
        where: { id: photoId }
    });
    console.log('photoId-------------', photos)
    res.json(photos)
}))


router.post("/", singleMulterUpload("image"), asyncHandler(async (req, res) => {

    const { userId, name } = req.body
    const photoUrl = await singlePublicFileUpload(req.file)
    const newPhoto = await Photo.create({ userId, photoUrl, name })

    if (newPhoto) {
        res.json(newPhoto)
    } else {
        res.json({ success: false, message: "Something went wrong..." })
    }
}))

router.get("/:userId", asyncHandler(async function (req, res) {
    const userId = +req.params.userId
    const photos = await Photo.findAll({
        include: [{
            model: User
        },
        {
            model: Comment
        }
        ],
        where: { userId }
    });

    res.json(photos)
}))

router.delete("/delete/:userId/:photoId", asyncHandler(async (req, res) => {
    const photoId = parseInt(req.params.photoId, 10);
    const userId = parseInt(req.params.userId, 10);
    const photo = await Photo.findByPk(photoId);
    await photo.destroy();

    const photos = await Photo.findAll({
        where: {
            userId
        }
    })
    res.json({ photos })
}));




module.exports = router;