import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onClick }) => (
  <ul>
    {contacts.map(({ name, number, id }) => (
      <li className={css.contactElement} id={id} key={Math.random()}>
        <span className={css.span__name}>{name}:</span>
        {number}

        <button type="button" onClick={() => onClick(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ContactList;
