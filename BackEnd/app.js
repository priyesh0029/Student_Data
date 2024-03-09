import express from "express"
import dotenv from "dotenv"
import expressConfig from "./config/config.js"
import mainRouter from "./routes/mainRouter.js";
import cors from "cors"
// import pool from "./config/dbConfig.js";
dotenv.config()

const PORT = process.env.PORT
const app = express()

const corsOptions = {
	origin: 'http://localhost:5174', 
	methods: ['GET','POST','PUT','DELETE'], 
  };

app.use(cors(corsOptions));


expressConfig(app,express)

app.use('/api/v1',mainRouter(express))

app.listen(PORT,()=>{
	console.log("app listening on port "+PORT);
})

// pool.connect()