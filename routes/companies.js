const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");
const slugify = require("slugify");

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

router.get("/:code", async (req, res, next) => {
    try {
        let code = req.params.code;

        const compResult = await db.query(
            `SELECT code, name, description
            FROM companies
            WHERE code = $1`,
            [code]
        );

        const invResult = await db.query(
            `SELECT id FROM invoices 
            WHERE comp_code = $1`,
            [code]
        )

        if (compResult.rows.length === 0) {
            throw new ExpressError(`No such company: ${code}`, 404)
        }

        const company = compResult.rows[0];
        const invoices = invResult.rows;

        company.invoices = invoices.map(inv => inv.id);

        return res.json({"company": company});

    } catch(e) {
        return next(e);
    }
});

// POST /companies
// Adds a company.
// Needs to be given JSON like: {code, name, description}
// Returns obj of new company: {company: {code, name, description}}

router.post("/", async (req, res, next) => {
    try {
        let {name, description} = req.body;
        let code = slugify
    } catch(e) {
        return next(e);
    }
});

router.put("/:code", async (req, res, next) => {
    try {

    } catch(e) {
        return next(e);
    }
});

router.delete("/:code", async (req, res, next) => {
    try {

    } catch(e) {
        return next(e);
    }
});

module.exports = router;