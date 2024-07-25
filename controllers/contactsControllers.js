import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import contactsServices from "../services/contactsServices.js";

const getAllContacts = async (_, res) => {
  const contacts = await contactsServices.listContacts();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsServices.getContactById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsServices.removeContact(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const createContact = async (req, res) => {
  const newContact = await contactsServices.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsServices.updateContactById(id, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
