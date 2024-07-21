const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({ 
    username: { type: String, required: [true, "Please add the user name"] },
    email: { type: String, required: [true, "Please add the email address"], unique: true },
    password: { type: String, required: [true, "Please add the password"], unique: true },
    
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
