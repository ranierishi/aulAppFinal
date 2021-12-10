import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './hooks/AuthState';
import Navigation from './Navigation';

export default function App() {
  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  )
}

