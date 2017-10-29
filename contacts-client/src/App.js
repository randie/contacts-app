import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

  homePage = () => (
    <ListContacts
      contacts={this.state.contacts}
      onDeleteContact={this.deleteContact}
    />
  )

  createPage = ({ history }) => (
    <CreateContact
      onCreateContact={newContact => {
        this.createContact(newContact)
        history.push('/')
      }}
    />
  )

  notFoundPage() {
    return <h2>404! Page not found.</h2>
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={this.homePage} />
        <Route path="/create" render={this.createPage} />
        <Route render={this.notFoundPage} />
      </Switch>
    )
  }
}

export default App;
