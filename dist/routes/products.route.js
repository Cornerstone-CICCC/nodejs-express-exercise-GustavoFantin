"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const myRouter = (0, express_1.Router)();
const products = [
    {
        "id": "82921fd1-29f9-48d9-97a9-e476a167b2cd",
        "product_name": "Strawberry",
        "product_description": "Organic strawberrys from MacDonald's Farm!",
        "product_price": "3"
    }
];
//GET request for all products, available on localhost:2500/products
myRouter.get('/', (req, res) => {
    res.status(200).json(products);
});
//POST method to add products to list "products", available on localhost:2500/products *METHOD POST*
myRouter.post('/', (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
//GET request to find certain product just by ID   localhost:2500/products/:id   METHOD GET
myRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(elem => elem.id === id);
    if (!product) {
        res.status(404).send("Product not found!");
        return;
    }
    res.status(200).json(product);
});
//PUT request to update a certain product By the ID localhost:2500/products/id
myRouter.put('/:id', (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundIndex = products.findIndex(elem => elem.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found!");
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, products[foundIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[foundIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[foundIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[foundIndex].product_price });
    products[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});
//DELETE request to delete by ID
myRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundIndex = products.findIndex(elem => elem.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found!");
        return;
    }
    products.splice(foundIndex, 1);
    res.status(200).send('Product Deleted!');
});
exports.default = myRouter;
