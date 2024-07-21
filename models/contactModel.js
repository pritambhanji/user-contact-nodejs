const mongoose = require("mongoose")


const contactSchema = new mongoose.Schema({ 
    name: { type: String, required: [true, "Please add the contact name"] },
    email: { type: String, required: [true, "Please add the email address"], unique: true },
    phone: { type: String, required: [true, "Please add the phone number"], unique: true },
    
}, { timestamps: true });


module.exports = mongoose.model("Contact", contactSchema);
