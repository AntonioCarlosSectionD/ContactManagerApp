import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors, GlobalStyles } from '../../styles/globalStyles';

const LoadingSpinner = () => (
  <View style={[GlobalStyles.container, GlobalStyles.centered]}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

export default LoadingSpinner;
