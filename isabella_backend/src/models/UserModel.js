const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required
    },

    userEmail:{
        type: String,
        required
    },

    userNumber:{
        type: String,
        required
    },

    
})