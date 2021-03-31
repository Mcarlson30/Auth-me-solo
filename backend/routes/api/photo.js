const express = require('express')
const asyncHandler = require("express-async-handler");

const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")
const { Photo } = require("../../db/models")
const router = express.Router();


router.post("/photo", singleMulterUpload("image"), asyncHandler(async (req, res) => {

    const { userId } = req.body
    const photoURL = await singlePublicFileUpload(req.file)
    const newPhoto = await Photo.create({ userId: +userId, photoURL: photoURL })

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




module.exports = router;