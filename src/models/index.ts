import mongoose = require("mongoose")
import config = require("../config")

mongoose.connect(config["mongo_url"])

import user from './user'
import post from './post'
import category from './category'

export const users = user()
export const posts = post()
export const categories = category()