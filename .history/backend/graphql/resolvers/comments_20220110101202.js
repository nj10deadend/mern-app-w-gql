require('dotenv').config({path: '../../config/.env'})
const Comment = require('../../models/Comment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');