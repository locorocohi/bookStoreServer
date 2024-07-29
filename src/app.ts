const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
import mainRouter from "./routes/mainRouter"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors())
app.use('/api', mainRouter);

export default app;
