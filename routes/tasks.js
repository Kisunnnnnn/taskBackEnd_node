const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { addData, findData, findByISBN, findByEmail, searchData, saveBooks, saveMagazines } = require('../controllers/tasks')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Math.random() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/addData', upload.single('addBooks'), addData)
router.post('/getData', findData)
router.post('/findByISBN', findByISBN)
router.post('/findByEmail', findByEmail)
router.get('/searchData', searchData)
router.post('/saveBooks', saveBooks)
router.post('/saveMagazine', saveMagazines)
module.exports = router