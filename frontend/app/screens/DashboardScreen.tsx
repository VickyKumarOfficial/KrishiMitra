import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AIChatModal from './AIChatModal';
import DiseaseDetectionModal from './DiseaseDetectionModal';

// Mock data
const mockDashboardData = {
  weather: {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 68,
    rainfall: 5.2,
    icon: 'partly-sunny',
  },
  soilHealth: {
    score: 78,
    pH: 6.8,
    moisture: 45,
    temperature: 24,
    status: 'Good',
  },
  alerts: [
    {
      id: 1,
      type: 'critical',
      title: 'Heavy Rainfall Alert',
      message: 'भारी बारिश की चेतावनी | Heavy rain expected in 24 hours',
      severity: '🔴',
    },
    {
      id: 2,
      type: 'moderate',
      title: 'Soil Moisture Low',
      message: 'मिट्टी में नमी कम | Consider irrigation for better yield',
      severity: '🟠',
    },
    {
      id: 3,
      type: 'normal',
      title: 'Optimal Growing Conditions',
      message: 'अच्छी खेती की स्थिति | Perfect conditions for crop growth',
      severity: '🟢',
    },
  ],
  quickStats: {
    activeCrops: 3,
    harvestDue: 15,
    marketPrice: '₹2,340',
    lastSync: '10 min ago',
  },
};

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showDiseaseDetection, setShowDiseaseDetection] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Data Updated', 'Dashboard data has been refreshed');
    }, 2000);
  };

  const renderWeatherCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name={mockDashboardData.weather.icon} size={24} color="#2E7D32" />
        <Text style={styles.cardTitle}>मौसम | Weather</Text>
      </View>
      <View style={styles.weatherContent}>
        <Text style={styles.temperature}>{mockDashboardData.weather.temperature}°C</Text>
        <Text style={styles.weatherCondition}>{mockDashboardData.weather.condition}</Text>
        <View style={styles.weatherDetails}>
          <View style={styles.weatherDetailItem}>
            <Text style={styles.weatherDetailLabel}>Humidity</Text>
            <Text style={styles.weatherDetailValue}>{mockDashboardData.weather.humidity}%</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Text style={styles.weatherDetailLabel}>Rainfall</Text>
            <Text style={styles.weatherDetailValue}>{mockDashboardData.weather.rainfall}mm</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSoilHealthCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="leaf" size={24} color="#2E7D32" />
        <Text style={styles.cardTitle}>मिट्टी स्वास्थ्य | Soil Health</Text>
      </View>
      <View style={styles.soilContent}>
        <View style={styles.soilScoreContainer}>
          <Text style={styles.soilScore}>{mockDashboardData.soilHealth.score}</Text>
          <Text style={styles.soilScoreLabel}>Health Score</Text>
        </View>
        <View style={styles.soilDetails}>
          <View style={styles.soilDetailRow}>
            <Text style={styles.soilDetailLabel}>pH Level:</Text>
            <Text style={styles.soilDetailValue}>{mockDashboardData.soilHealth.pH}</Text>
          </View>
          <View style={styles.soilDetailRow}>
            <Text style={styles.soilDetailLabel}>Moisture:</Text>
            <Text style={styles.soilDetailValue}>{mockDashboardData.soilHealth.moisture}%</Text>
          </View>
          <View style={styles.soilDetailRow}>
            <Text style={styles.soilDetailLabel}>Temperature:</Text>
            <Text style={styles.soilDetailValue}>{mockDashboardData.soilHealth.temperature}°C</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAlertsCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="warning" size={24} color="#FF9800" />
        <Text style={styles.cardTitle}>अलर्ट | Alerts</Text>
      </View>
      {mockDashboardData.alerts.map((alert) => (
        <View key={alert.id} style={styles.alertItem}>
          <Text style={styles.alertSeverity}>{alert.severity}</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>त्वरित कार्य | Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setShowDiseaseDetection(true)}
        >
          <Ionicons name="camera" size={24} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Disease Check</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setShowAIChat(true)}
        >
          <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
          <Text style={styles.quickActionText}>AI Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Ionicons name="analytics" size={24} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Price Trends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Ionicons name="calendar" size={24} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Crop Calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {renderWeatherCard()}
        {renderSoilHealthCard()}
        {renderAlertsCard()}
        {renderQuickActions()}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAIChat(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modals */}
      <AIChatModal 
        visible={showAIChat} 
        onClose={() => setShowAIChat(false)} 
      />
      <DiseaseDetectionModal
        visible={showDiseaseDetection}
        onClose={() => setShowDiseaseDetection(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 8,
  },
  weatherContent: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 12,
    color: '#666666',
  },
  weatherDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  soilContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soilScoreContainer: {
    alignItems: 'center',
    marginRight: 24,
  },
  soilScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  soilScoreLabel: {
    fontSize: 12,
    color: '#666666',
  },
  soilDetails: {
    flex: 1,
  },
  soilDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  soilDetailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  soilDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  alertSeverity: {
    fontSize: 20,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  alertMessage: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quickActionButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2E7D32',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});