import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleContacts } from '../data/contactsData';

// Create a context for contact management
const ContactContext = createContext();

// Custom hook to easily use the contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

// Provider component to wrap around your app
export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load contacts from AsyncStorage when the app starts
  useEffect(() => {
    loadContacts();
  }, []);

  // Fetch stored contacts or initialize with sample data
  const loadContacts = async () => {
    try {
      const stored = await AsyncStorage.getItem('contacts');
      if (stored) {
        setContacts(JSON.parse(stored));
      } else {
        // Initialize with sample data on first run
        setContacts(sampleContacts);
        await AsyncStorage.setItem('contacts', JSON.stringify(sampleContacts));
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
      setContacts(sampleContacts); // Fallback to sample data
    } finally {
      setLoading(false);
    }
  };

  // Save contacts to AsyncStorage
  const saveContacts = async (newContacts) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
    } catch (error) {
      console.error('Failed to save contacts:', error);
    }
  };

  // Add a new contact
  const addContact = async (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      favorite: false,
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);

    return newContact;
  };

  // Update an existing contact
  const updateContact = async (contactId, contactData) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...contactData } : contact
    );

    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
  };

  // Delete a contact by ID
  const deleteContact = async (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
  };

  // Toggle the "favorite" status of a contact
  const toggleFavorite = async (contactId) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
    );

    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
  };

  // Expose state and actions to components
  const value = {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    refreshContacts: loadContacts,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};
