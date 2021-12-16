import { useState, useEffect } from "react";
import shortid from "shortid";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import * as storage from "../services/localStorage";
import styles from "../components/AppStyles.module.css";

const STORAGE_KEY = "contacts";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = storage.get(STORAGE_KEY);
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
  }, []);

  useEffect(() => storage.save(STORAGE_KEY, contacts), [contacts]);

  const onSubmitName = ({ name, number }) => {
    const contactId = shortid.generate();
    const newName = {
      id: contactId,
      name,
      number,
    };
    const compareContact = contacts.some(
      (contact) => contact.name.toLowerCase() === newName.name.toLowerCase()
    );
    if (compareContact) {
      return alert(`${name} is alredy in contacts`);
    }
    setContacts([newName, ...contacts]);
  };

  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const changeFilter = (e) => setFilter(e.target.value);

  const removeContact = (id) =>
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );

  return (
    <>
      <ContactForm onSubmit={onSubmitName} />
      <h2 className={styles.contactForm}>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      {filterContacts() ? (
        <ContactList
          contacts={filterContacts()}
          onRemoveContact={removeContact}
        />
      ) : (
        <p className={styles.contactForm}>
          Nothing found. Add contact or clear filter.
        </p>
      )}
    </>
  );
};

export default App;
