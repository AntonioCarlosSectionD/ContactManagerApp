import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContacts } from '../../utils/ContactContext';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';
import { formatContactName } from '../../data/contactsData';

const ContactDetailsScreen = ({ route }) => {
  const { contactId } = route.params;
  const { contacts } = useContacts();
  const contact = contacts.find(c => c.id === contactId);
  if (!contact) return <Text>Contact not found</Text>;

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: contact.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{formatContactName(contact)}</Text>
        <Text style={styles.info}>Email: {contact.email}</Text>
        <Text style={styles.info}>Phone: {contact.phone}</Text>
        <Text style={styles.info}>Company: {contact.company}</Text>
        <Text style={styles.info}>Notes: {contact.notes || 'N/A'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: { alignItems: 'center', padding: Spacing.lg },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: Spacing.md },
  name: { fontSize: Fonts.large, fontWeight: 'bold', color: Colors.text.primary },
  info: { fontSize: Fonts.medium, color: Colors.text.secondary, marginVertical: 4 },
});

export default ContactDetailsScreen;