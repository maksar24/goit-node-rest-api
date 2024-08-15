import Contact from "../db/models/Contact.js";

const listContacts = (query = {}, { page = 1, limit = 20 }) => {
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;

  return Contact.findAll({
    where: query,
    offset,
    limit: normalizedLimit,
  });
};

const addContact = (data) => Contact.create(data);

const getContactById = (query) =>
  Contact.findOne({
    where: query,
  });

const removeContact = async (query) => {
  const contact = await getContactById(query);

  if (!contact) {
    return null;
  }

  await Contact.destroy({
    where: query,
  });

  return contact;
};

const updateContactById = async (query, data) => {
  const contact = await getContactById(query);

  if (!contact) {
    return null;
  }

  return contact.update(data, {
    returning: true,
  });
};

const updateStatusContact = async (query, { favorite }) => {
  const contact = await getContactById(query);

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
