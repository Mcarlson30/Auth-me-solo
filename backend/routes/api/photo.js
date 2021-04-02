const express = require('express')
const asyncHandler = require("express-async-handler");

const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")
const { Photo } = require("../../db/models")
const router = express.Router();

router.get("/", asyncHandler(async function (req, res, next) {
    // const userId = +req.params.userId
    const photos = await Photo.findAll();
    res.json(photos)
}))


router.post("/", singleMulterUpload("image"), asyncHandler(async (req, res) => {

    const { userId, name } = req.body
    console.log('req.file ------', req.file)
    const photoUrl = await singlePublicFileUpload(req.file)
    console.log('photoUrl------', photoUrl)
    const newPhoto = await Photo.create({ userId, photoUrl, name })

    if (newPhoto) {
        res.json(newPhoto)
    } else {
        res.json({ success: false, message: "Something went wrong..." })
    }
}))

router.get("/:userId", asyncHandler(async function (req, res) {
    const userId = +req.params.userId
    const photos = await Photo.findAll({ where: { userId } });

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