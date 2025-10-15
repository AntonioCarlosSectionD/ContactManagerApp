import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContacts } from '../../utils/ContactContext';
import { formatContactName, searchContacts } from '../../data/contactsData';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactListScreen = () => {
  const navigation = useNavigation();
  const { contacts, loading, deleteContact, toggleFavorite } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <LoadingSpinner />;

  const filteredContacts = searchContacts(contacts, searchTerm);

  const handleDelete = id => {
    Alert.alert('Delete Contact', 'Are you sure you want to delete this contact?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteContact(id) },
    ]);
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={[GlobalStyles.card, styles.contactCard]}
      onPress={() => navigation.navigate('ContactDetails', { contactId: item.id })}
      accessible={true}
      accessibilityLabel={`${item.firstName} ${item.lastName} contact card`}
      accessibilityHint="Tap to view details">
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{formatContactName(item)}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          accessibilityLabel={item.favorite ? 'Unfavorite contact' : 'Favorite contact'}>
          <Icon
            name={item.favorite ? 'star' : 'star-border'}
            size={24}
            color={item.favorite ? Colors.accent : Colors.text.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item.id)} accessibilityLabel="Delete contact">
          <Icon name="delete" size={24} color={Colors.accent} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={Colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor={Colors.text.secondary}
          value={searchTerm}
          onChangeText={setSearchTerm}
          accessible={true}
          accessibilityLabel="Search bar"
          accessibilityHint="Enter a name, company, or email to filter contacts"
        />
      </View>

      {filteredContacts.length === 0 ? (
        <View style={[GlobalStyles.centered, { marginTop: 50 }]}>
          <Text style={{ color: Colors.text.secondary }}>No contacts found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts.sort((a, b) =>
            formatContactName(a).localeCompare(formatContactName(b))
          )}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: Spacing.lg }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    margin: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Fonts.medium,
    color: Colors.text.primary,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  company: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
  },
  email: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});

export default ContactListScreen;