const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

// GET companies
// Returns list of companies, like {companies: [{code, name}, ...]}

router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
        `SELECT code, name FROM companies ORDER BY name`
        );
        return res.json({ "companies": result.rows });
  } catch (e) {
    return next(e);
  }
});

// GET /companies/[code]
// Return obj of company: {company: {code, name, description}}
// If the company given cannot be found, this should return a 404.



module.exports = router;