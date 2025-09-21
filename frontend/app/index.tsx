import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import DashboardScreen from './screens/DashboardScreen';
import CropRecommendationsScreen from './screens/CropRecommendationsScreen';
import MarketPricesScreen from './screens/MarketPricesScreen';
import InsightsScreen from './screens/InsightsScreen';
import AIChatModal from './screens/AIChatModal';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any;
              
              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Crops') {
                iconName = focused ? 'leaf' : 'leaf-outline';
              } else if (route.name === 'Market') {
                iconName = focused ? 'analytics' : 'analytics-outline';
              } else if (route.name === 'Insights') {
                iconName = focused ? 'cloud' : 'cloud-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2E7D32',
            tabBarInactiveTintColor: '#8A8A8A',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopColor: '#E0E0E0',
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
            },
            headerStyle: {
              backgroundColor: '#2E7D32',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={{ title: 'डैशबोर्ड | Dashboard' }}
          />
          <Tab.Screen 
            name="Crops" 
            component={CropRecommendationsScreen} 
            options={{ title: 'फसल सुझाव | Crop Recommendations' }}
          />
          <Tab.Screen 
            name="Market" 
            component={MarketPricesScreen} 
            options={{ title: 'बाज़ार भाव | Market Prices' }}
          />
          <Tab.Screen 
            name="Insights" 
            component={InsightsScreen} 
            options={{ title: 'मिट्टी और मौसम | Soil & Weather' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}