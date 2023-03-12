const express = require("express")
const router = express.Router()
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

const login = require('./login/login')
const users = require('./users/users')
const categories = require('./categories/categories')
const apps = require('./apps/apps')
const advertisement = require('./advertisements/advertisements')
const action = require('./action/action')
const filterAd = require('./filterAds/filterAds')

router
    .post('/login', login.LOGIN)
    .post('/register', login.REGISTER)

    .get('/users', users.GET)
    .put('/editUser', users.PUT)
    .delete('/deleteUser', users.DELETE)

    .get('/categories', categories.GET)
    .post('/addCategory', categories.POST)
    .put('/editCategory', categories.PUT)
    .delete('/delete', categories.DELETE)

    .get('/apps', apps.GET_APP_SIDE)
    .post('/addApp', FileUpload.single('photo'), apps.POST)
    .put('/editApp', FileUpload.single('photo'), apps.PUT)
    .put('/editAppStatus', apps.PUT_STATUS)
    .delete('deleteApp', apps.DELETE_APP)

    .get('/advertisements', advertisement.GET)
    .post('/addAdvertisement', advertisement.POST)
    .put('./editAdvertisement', advertisement.PUT)
    .delete('/deleteAdvertisement', advertisement.DELETE)

    .get('/action', action.GET)
    .get('/addAction', action.POST)

    .get('/filterAd', filterAd.GET);

module.exports = router   