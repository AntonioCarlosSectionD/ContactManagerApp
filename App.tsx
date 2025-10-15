// @ts-nocheck

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactProvider } from './src/utils/ContactContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen';
import { Colors } from './src/styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ContactProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ContactList"
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}>
            <Stack.Screen
              name="ContactList"
              component={ContactListScreen}
              options={({ navigation }) => ({
                title: 'Contacts',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddContact')}
                    style={{ marginRight: 15 }}>
                    <Icon name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContactScreen}
              options={{ title: 'Add Contact' }}
            />
            <Stack.Screen
              name="ContactDetails"
              component={ContactDetailsScreen}
              options={{ title: 'Contact Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactProvider>
    </SafeAreaProvider>
  );
};

export default App;
