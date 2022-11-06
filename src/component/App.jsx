import React, { Component } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import './App.css';
import { nanoid } from 'nanoid';
class App extends Component {
  state = {
    contacts: [
      { id: '1', name: 'Яна', number: '123123' },

      { id: '2', name: 'Илья', number: '09547177553' },

      { id: '3', name: 'Денис', number: '1654651321' },

      { id: '4', name: 'Настя', number: '355332225' },
    ],

    filter: '',
  };


  componentDidUpdate(prevProps, prevState){
    console.log(prevState)
    if(this.state.contacts !== prevState.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  componentDidMount(){
    console.log(localStorage.getItem('contacts'))
    this.setState({contacts:JSON.parse(localStorage.getItem('contacts')) })
  }

  addContacts = (name, number) => {
    const id = nanoid();
    const contactArr = { name, number, id };
    let error = false;
    this.state.contacts.forEach(el => {
      if (el.name === name) {
        alert(`${name} is already in contact`);
        return (error = true);
      }
    });

    if (!error) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactArr],
      }));
    }
  };

  filterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };

  deletContact = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>

        <ContactForm addContacts={this.addContacts} />
        <h2>Contacts</h2>
        {this.state.contacts.length !== 0 ?
        <Filter value={this.state.filter} onChange={this.filterChange} />
          : <p>You don't have contact</p>
      }
        <ContactList
          onClick={this.deletContact}
          contacts={this.getFilteredContacts()}
        />
      
      </>
    );
  }
}

export default App;
