import PropTypes from 'prop-types';

const ContactListItem = ({ name, phone, onRemove }) => {
  return (
    <li>
      {name}: {phone} <button onClick={onRemove}>Delete</button>
    </li>
  );
};

const ContactList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ul>
      {contacts.map(({ id, name, phone }) => (
        <ContactListItem
          key={id}
          name={name}
          phone={phone}
          onRemove={() => onRemove(id)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ContactList;
