import PropTypes from "prop-types";
import styles from "./ContactListStyles.module.css";

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul className={styles.contacts}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={styles.list}>
          {name} : {number}
          {
            <button
              type="button"
              name="delete"
              onClick={() => onRemoveContact(id)}
              className={styles.listBtn}
            >
              delete
            </button>
          }
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
