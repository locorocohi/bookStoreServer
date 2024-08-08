const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
import errorHandler from "./errors/errorHandler";
import mainRouter from "./routes/mainRouter";

// обновить 

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'static')))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(cors());
app.use('/api', mainRouter);
app.use(errorHandler);

export default app;
