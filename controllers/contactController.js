const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Private

const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        res.status(400).json({ message: "All fields are required" });
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    
    res.status(201).json(contact);
})

//@desc Get a Contact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ contact, message: `Get contact for ${req.params.id}` });
})

//@desc Update a Contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    if (!contact) {
        res.status(404).json({ message: "Contact not found" });
    }
    res.status(201).json({ message: `Updated contact for ${req.params.id}` });
})

//@desc delete a Contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404).json({ message: "Contact not found" });
    }
    await Contact.remove(req.params.id);
    res.status(201).json({ message: `Contact deleted for ${req.params.id}` });
});

module.exports = {
    getAllContacts,
    getContact,
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
}