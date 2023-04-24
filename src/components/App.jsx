import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { Layout } from './Layout/Layout';
import { ContactForm } from './Phonebook/Phonebook';
import { ContactList } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onInput = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  onSearchList = () =>
    [...this.state.contacts].filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter onSearch={this.onInput} />
        <ContactList
          contactsList={this.onSearchList()}
          onDelete={this.onDelete}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
