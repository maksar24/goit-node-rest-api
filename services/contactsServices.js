import { where } from "sequelize";
import User from "../db/models/User.js";

const listContacts = () => User.findAll();

const addContact = (data) => User.create(data);

const getContactById = (id) => User.findByPk(id);

const removeContact = async (id) => {
  const contact = await User.findByPk(id);

  if (!contact) {
    return null;
  }

  await User.destroy({
    where: {
      id,
    },
  });

  return contact;
};

const updateContactById = async (id, data) => {
  const contact = await User.findByPk(id);

  if (!contact) {
    return null;
  }

  return contact.update(data, {
    returning: true,
  });
};

const updateStatusContact = async (id, { favorite }) => {
  const contact = await User.findByPk(id);

  if (!contact) {
    return null;
  }

  return contact.update(
    { favorite },
    {
      returning: true,
    }
  );
};

export default {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContactById,
  updateStatusContact,
};
