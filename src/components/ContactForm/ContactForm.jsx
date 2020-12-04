import { Component } from 'react';

import shortid from 'shortid';

import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: shortid.generate(), name, phone });

    this.resetForm();
  };

  validateForm = () => {
    const { name, phone } = this.state;
    const { onCheckUnique } = this.props;

    if (!name || !phone) {
      alert('Some field is empty!');
      return false;
    }

    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, phone } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={this.handleChangeForm}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={this.handleChangeForm}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCheckUnique: PropTypes.func.isRequired,
};

export default ContactForm;
