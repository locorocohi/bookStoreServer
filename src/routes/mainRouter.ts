const express = require('express')
import users from './usersRouter'
const mainRouter = express.Router()

mainRouter.use('/user', users)

export default mainRouter