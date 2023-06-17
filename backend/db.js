const mongoose = require('mongoose')
const mongoURI = process.env.REACT_APP_MONGODB_STRING

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('connected to mongo successfully')
    })
}

module.exports = connectToMongo