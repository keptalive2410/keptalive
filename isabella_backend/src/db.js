const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri || typeof mongoUri !== 'string') {
        console.error('MongoDB Connection Failed: MONGO_URI is missing from .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri.trim(), {
            family: 4,                       // ← force IPv4
            serverSelectionTimeoutMS: 30000, // wait longer before failing
            socketTimeoutMS: 45000,
            retryWrites: true,
        });

        console.log('MongoDB Connection Successful');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

module.exports = mongoDB;