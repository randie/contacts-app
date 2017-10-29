import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as api from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    api.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  deleteContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    api.remove(contact);
  }

  createContact(newContact) {
    api.create(newContact).then(contact => {
      this.setState(currentState => ({
        contacts: [...currentState.contacts, contact]
      }));
    });
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.deleteContact}
          />
        )} />
        <Route path="/create" render={({ history }) => (
          <CreateContact
            onCreateContact={newContact => {
              this.createContact(newContact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App;
