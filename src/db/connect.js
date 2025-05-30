const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDB`)
    } catch (err) {
        console.log('Error connecting to MongoDB', err.message)
    }
};

module.exports = connectDB