"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_route_1 = __importDefault(require("./routes/products.route"));
dotenv_1.default.config();
//create a server 
const app = (0, express_1.default)();
//Router path to products
app.use(express_1.default.json());
app.use('/products', products_route_1.default);
//Fallback
app.use((req, res, next) => {
    res.status(404).send("Something went wrong...");
});
// Starting server PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
