import { useState } from "react";
import shortid from "shortid";
import styles from "./ContactFormStyles.module.css";
import PropTypes from "prop-types";

const contactForm = ({ onSubmit }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [number, setNumber] = useState("");

  const handleChange = (key, value) => {
    if (key === "name") {
      setName(value);
    }
    if (key === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    setName("");
    setNumber("");
  };
  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>PhoneBook</h1>
      <label className={styles.label} htmlFor={nameInputId}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          id={nameInputId}
          className={styles.formInput}
        />
      </label>
      <label className={styles.label} htmlFor={numberInputId}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          id={numberInputId}
          className={styles.formInput}
        />
      </label>
      <button className={styles.formButton} type="submit">
        Add Contact
      </button>
    </form>
  );
};

contactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default contactForm;
