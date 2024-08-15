import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import contactsServices from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  const query = { owner };

  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }

  const contacts = await contactsServices.listContacts(query, { page, limit });
  res.json(contacts);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const newContact = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(newContact);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsServices.getContactById({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsServices.removeContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsServices.updateContactById(
    { id, owner },
    req.body
  );
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsServices.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  createContact: ctrlWrapper(createContact),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactStatus: ctrlWrapper(updateContactStatus),
};
