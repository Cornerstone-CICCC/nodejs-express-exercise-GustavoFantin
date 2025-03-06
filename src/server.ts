import express, { NextFunction, Request, Response } from 'express'
import dotenv from "dotenv"
import myRouter from './routes/products.route'
dotenv.config()

//create a server 
const app = express()

//Router path to products
app.use(express.json())
app.use('/products', myRouter)

//Fallback
app.use((req: Request, res:Response, next:NextFunction) => {
  res.status(404).send("Something went wrong...")
})



// Starting server PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})