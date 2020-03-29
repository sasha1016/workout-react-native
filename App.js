import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Layout from './Layout/'

export default function App() {
  return (
    <Layout/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
