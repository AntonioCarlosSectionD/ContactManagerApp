import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Colors, GlobalStyles } from '../../styles/globalStyles';

const CustomButton = ({ title, onPress, loading, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    style={[GlobalStyles.button, disabled && { opacity: 0.6 }]}>
    {loading ? (
      <ActivityIndicator color={Colors.text.light} />
    ) : (
      <Text style={GlobalStyles.buttonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default CustomButton;
