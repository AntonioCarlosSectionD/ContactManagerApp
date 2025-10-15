import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { useContacts } from '../../utils/ContactContext';
import { validateContact } from '../../data/contactsData';
import { GlobalStyles, Spacing } from '../../styles/globalStyles';

const AddContactScreen = ({ navigation }) => {
  const { addContact } = useContacts();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    const { isValid, errors } = validateContact(form);
    if (!isValid) return setErrors(errors);

    setLoading(true);
    await addContact(form);
    setLoading(false);
    Alert.alert('Success', 'Contact added successfully');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView
        contentContainerStyle={{ padding: Spacing.md }}
        keyboardShouldPersistTaps="handled">
        <CustomInput
          label="First Name"
          value={form.firstName}
          onChangeText={v => handleChange('firstName', v)}
          error={errors.firstName}
        />
        <CustomInput
          label="Last Name"
          value={form.lastName}
          onChangeText={v => handleChange('lastName', v)}
          error={errors.lastName}
        />
        <CustomInput
          label="Email"
          value={form.email}
          onChangeText={v => handleChange('email', v)}
          keyboardType="email-address"
          error={errors.email}
        />
        <CustomInput
          label="Phone"
          value={form.phone}
          onChangeText={v => handleChange('phone', v)}
          keyboardType="phone-pad"
          error={errors.phone}
        />
        <CustomInput
          label="Company"
          value={form.company}
          onChangeText={v => handleChange('company', v)}
        />
        <CustomInput
          label="Notes"
          value={form.notes}
          multiline
          onChangeText={v => handleChange('notes', v)}
        />
        <View style={{ marginTop: Spacing.lg }}>
          <CustomButton title="Add Contact" onPress={handleSubmit} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddContactScreen;