import PropTypes from "prop-types";
import styles from "./FilterStyle.module.css";

export default function Filter({ onChangeValue, filter }) {
  return (
    <div className={styles.filterContainer}>
      Find contacts by name
      <input
        className={styles.filterInput}
        type="text"
        value={filter}
        onChange={onChangeValue}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};
