const csv = require('csvtojson')
const books = require('../schema/books')
const author = require('../schema/author')
const magazine = require('../schema/magazine')

const addData = (req, res) => {
    const type = req.body.type
    csv().fromFile(req.file.path).then(response => {

        if (type === "book") {
            books.insertMany(response, (err, data) => {
                if (err) {
                    res.json({
                        error: true,
                        message: "Something went wrong"
                    })
                }
                else {
                    res.json({
                        error: false,
                        message: "Books Added"
                    })
                }
            })
        }
        else if (type === "author") {
            author.insertMany(response, (err, data) => {
                if (err) {
                    res.json({
                        error: true,
                        message: "Something went wrong"
                    })
                }
                else {
                    res.json({
                        error: false,
                        message: "Authors Added"
                    })
                }
            })
        }
        else if (type === "magazine") {
            magazine.insertMany(response, (err, data) => {
                if (err) {
                    res.json({
                        error: true,
                        message: "Something went wrong"
                    })

                }
                else {
                    res.json({
                        error: false,
                        message: "Magazines Added"
                    })
                }
            })
        }
    })
}

const findData = async (req, res) => {
    try {

        const type = req.body.type
        const sort = req.body.sort
        let getData = ""
        if (type === "book") {
            if (sort === true) {
                getData = await books.find().sort({ title: 1 })
            }
            else {
                getData = await books.find()
            }

        }
        else if (type === "magazines") {
            if (sort === true) {
                getData = await magazine.find().sort({ title: 1 })
            }
            else {
                getData = await magazine.find()
            }

        }
        res.json({
            error: false,
            message: getData
        })
    }
    catch (err) {
        res.json({
            error: true,
            message: "Something went wrong"
        })
    }
}
const findByISBN = async (req, res) => {
    try {
        const type = req.body.type
        const ISBN = req.body.ISBN
        let getData = ""
        if (type === "book") {
            getData = await books.findOne({ isbn: ISBN })
        }
        else if (type === "magazines") {
            getData = await magazine.findOne({ isbn: ISBN })
        }
        if (getData === null || getData === "" || getData === undefined) {
            res.json({
                error: false,
                message: "No data exists"
            })
        }
        else {
            res.json({
                error: false,
                message: getData
            })
        }

    }
    catch (err) {
        res.json({
            error: true,
            message: "Something went wrong"
        })
    }
}
const findByEmail = async (req, res) => {
    try {
        const type = req.body.type
        const email = req.body.email
        let getData = ""
        if (type === "book") {
            getData = await books.findOne({ authors: email })
        }
        else if (type === "magazines") {
            getData = await magazine.findOne({ authors: email })
        }
        if (getData === null || getData === "" || getData === undefined) {
            res.json({
                error: false,
                message: "No data exists"
            })
        }
        else {
            res.json({
                error: false,
                message: getData
            })
        }

    }
    catch (err) {
        res.json({
            error: true,
            message: "Something went wrong"
        })
    }
}
const searchData = async (req, res) => {
    const filters = req.query.searchQuery;

    let data = []
    if (req.query.type == "books") {
        data = await books.find({ $or: [{ isbn: { $regex: '.*' + filters + '.*' } }, { authors: { $regex: '.*' + filters + '.*' } }] })
    }
    else {
        data = await magazine.find({ $or: [{ isbn: { $regex: '.*' + filters + '.*' } }, { authors: { $regex: '.*' + filters + '.*' } }] })
    }

    res.json({
        error: false,
        message: data
    })
}
const saveBooks = async (req, res) => {
    console.log(req.body)
    try {
        const bookData = {
            title: req.body.title,
            isbn: req.body.isbn,
            authors: req.body.authors,
            description: req.body.description
        }
        const saveBookData = new books(bookData)
        const addData = await saveBookData.save()
        res.json({
            error: false,
            data: addData,
            message: "Book added"
        })
    }
    catch (err) {
        res.json({
            error: true,
            data: "",
            message: "Something went wrong"
        })
    }
}
const saveMagazines = async (req, res) => {
    try {
        const magazineData = {
            isbn: req.body.isbn,
            authors: req.body.authors,
            publishedAt: req.body.publishedAt
        }
        const saveMagazineData = new magazine(magazineData)
        const addData = await saveMagazineData.save()
        res.json({
            error: false,
            data: addData,
            message: "Magazine added"
        })
    }
    catch (err) {
        res.json({
            error: true,
            data: "",
            message: "Something went wrong"
        })
    }
}

module.exports = {
    addData,
    findData,
    findByISBN,
    findByEmail,
    searchData,
    saveBooks,
    saveMagazines
}