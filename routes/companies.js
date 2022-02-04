const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError");

let router = new express.Router();

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`)
    } catch {
        return next(e)
    }
})



module.exports = router;