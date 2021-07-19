const express = require('express');

const router = express.Router();
const db = require('../utils/db');
const customerModel = require('../models/customer.model');

router.get('/', async function(req, res) {
    const rows = await customerModel.findAll();
    res.json(rows);
});

router.get('/:id', async function(req, res) {
    const id = +req.params.id || 0;

    const customer = await customerModel.findById(id);

    if(customer === null) {
        return res.status(204).end();
    }
    res.json(customer);
});

router.post('/',async function(req, res) {
    const customer = req.body;

    const result = await customerModel.add(customer);

    customer.customer_id = result[0];
    res.status(201).json(actor);
});

router.delete('/:id',async function(req, res) {
    const id = +req.params.id || 0;

    if(id === 0) {
        return res.json({
            message: "No Customer Deleted"
        });
    }

    const affected_rows = await customerModel.del(id);
    if(affected_rows === 0) {
        return res.json({
            message: "No Customer Deleted"
        });
    }
    res.json({
        message: "Customer Deleted"
    });
});

router.patch('/',async function(req, res) {
    const customer = req.body;

    const id = customer.customer_id;
    delete customer.customer_id;

    const affected_rows = await customerModel.patch(id, customer);
    if(affected_rows === 0) {
        return res.status(304).end();
    }
    res.json(customer);
});

module.exports = router;