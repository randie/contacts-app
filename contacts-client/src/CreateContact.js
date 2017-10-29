import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const newContact = serializeForm(event.target, { hash: true });
    typeof this.props.onCreateContact === 'function' &&
      this.props.onCreateContact(newContact);
  }

  render() {
    return (
      <div>
        <Link to="/" className="close-create-contact">Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            name='avatarURL'
            maxHeight={64}
            className='create-contact-avatar-input'
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact;