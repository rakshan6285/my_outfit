import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ComingSoonScreenProps {
  title: string;
}

const ComingSoonScreen: React.FC<ComingSoonScreenProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title} screen coming soon... </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    paddingHorizontal: 20, 
  },
});

export default ComingSoonScreen;
