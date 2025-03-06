import { Request, Response, Router } from "express";
import { Product } from "../types/product";
import { v4 as uuidv4 } from "uuid";


const myRouter = Router()

const products: Product[] = [   //array to store all products registered
    {
        "id": "82921fd1-29f9-48d9-97a9-e476a167b2cd",
        "product_name": "Strawberry",
        "product_description": "Organic strawberrys from MacDonald's Farm!",
        "product_price": "3"
    }
] 



//GET request for all products, available on localhost:2500/products
myRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json(products)
})

//POST method to add products to list "products", available on localhost:2500/products *METHOD POST*
myRouter.post('/', (req: Request<{}, {},Omit<Product, 'id'>>, res: Response) => {
    const newProduct = {
        id: uuidv4(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    }

    products.push(newProduct)
    res.status(201).json(newProduct)
})

//GET request to find certain product just by ID   localhost:2500/products/:id   METHOD GET
myRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const product = products.find(elem => elem.id === id)

    if (!product) {
        res.status(404).send("Product not found!")
        return
    }

    res.status(200).json(product)
})


//PUT request to update a certain product By the ID localhost:2500/products/id
myRouter.put('/:id', (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
    const { id } = req.params
    const foundIndex = products.findIndex(elem => elem.id === id)
    if(foundIndex === -1) {
        res.status(404).send("Product not found!")
        return
    }

    const updatedProduct = {
        ...products[foundIndex],
        product_name: req.body.product_name ?? products[foundIndex].product_name,
        product_description: req.body.product_description ?? products[foundIndex].product_description,
        product_price: req.body.product_price ?? products[foundIndex].product_price
    }

    products[foundIndex] = updatedProduct
    res.status(200).json(updatedProduct)

})


//DELETE request to delete by ID
myRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundIndex = products.findIndex(elem => elem.id === id)

    if(foundIndex === -1) {
        res.status(404).send("Product not found!")
        return
    }

    products.splice(foundIndex, 1)
    res.status(200).send('Product Deleted!')
})
 




export default myRouter