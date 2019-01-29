import * as React from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-navigation';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default function SafeContainer(props: SafeAreaViewProps) {
  return (
    <SafeAreaView {...props} style={styles.safeContainer} />
  );
}
