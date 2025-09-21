import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import the main dashboard screen directly
import DashboardScreen from './screens/DashboardScreen';

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      <DashboardScreen />
    </SafeAreaProvider>
  );
}