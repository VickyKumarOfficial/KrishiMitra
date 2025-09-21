import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AIChatModal from './AIChatModal';
import DiseaseDetectionModal from './DiseaseDetectionModal';
import CropRecommendationsScreen from './CropRecommendationsScreen';
import MarketPricesScreen from './MarketPricesScreen';
import InsightsScreen from './InsightsScreen';

// Mock data
const mockDashboardData = {
  user: {
    name: 'राम कुमार | Ram Kumar',
    location: 'Ranchi, Jharkhand',
  },
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
  growNow: [
    {
      id: 1,
      name: 'Paddy Rice',
      hindiName: 'धान',
      season: 'Kharif',
      daysToHarvest: 120,
      profitability: 'High',
      image: '🌾',
      bgColor: '#E8F5E8',
    },
    {
      id: 2,
      name: 'Maize',
      hindiName: 'मक्का',
      season: 'Kharif',
      daysToHarvest: 90,
      profitability: 'Medium',
      image: '🌽',
      bgColor: '#FFF3E0',
    },
    {
      id: 3,
      name: 'Green Vegetables',
      hindiName: 'हरी सब्जी',
      season: 'Year Round',
      daysToHarvest: 45,
      profitability: 'High',
      image: '🥬',
      bgColor: '#E3F2FD',
    },
  ],
  alerts: [
    {
      id: 1,
      type: 'critical',
      title: 'Heavy Rainfall Alert',
      message: 'भारी बारिश की चेतावनी | Heavy rain expected in 24 hours',
      bgColor: '#FFEBEE',
      borderColor: '#F44336',
    },
    {
      id: 2,
      type: 'moderate',
      title: 'Soil Moisture Low',
      message: 'मिट्टी में नमी कम | Consider irrigation for better yield',
      bgColor: '#FFF3E0',
      borderColor: '#FF9800',
    },
    {
      id: 3,
      type: 'normal',
      title: 'Optimal Growing Conditions',
      message: 'अच्छी खेती की स्थिति | Perfect conditions for crop growth',
      bgColor: '#E8F5E8',
      borderColor: '#4CAF50',
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
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Data Updated', 'Dashboard data has been refreshed');
    }, 2000);
  };

  const renderAppHeader = () => (
    <View style={styles.appHeader}>
      <Text style={styles.appName}>KrishiMitra</Text>
      <Text style={styles.appSlogan}>Your personalized AI based crop recommendation</Text>
    </View>
  );

  const renderProfileSection = () => (
    <View style={styles.profileContainer}>
      <View style={styles.profileLeft}>
        <Text style={styles.greeting}>Hello, {mockDashboardData.user.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color="#666666" />
          <Text style={styles.locationText}>{mockDashboardData.user.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.profileIcon}>
        <Ionicons name="person-circle" size={40} color="#2E7D32" />
      </TouchableOpacity>
    </View>
  );

  const renderWeatherCard = () => (
    <View style={[styles.card, styles.weatherCard]}>
      <View style={styles.cardHeader}>
        <Ionicons name={mockDashboardData.weather.icon} size={28} color="#FFFFFF" />
        <Text style={styles.weatherCardTitle}>मौसम | Weather</Text>
      </View>
      <View style={styles.weatherContent}>
        <Text style={styles.temperature}>{mockDashboardData.weather.temperature}°C</Text>
        <Text style={styles.weatherCondition}>{mockDashboardData.weather.condition}</Text>
        <View style={styles.weatherDetails}>
          <View style={styles.weatherDetailItem}>
            <Ionicons name="water" size={16} color="#FFFFFF" />
            <Text style={styles.weatherDetailLabel}>Humidity</Text>
            <Text style={styles.weatherDetailValue}>{mockDashboardData.weather.humidity}%</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Ionicons name="rainy" size={16} color="#FFFFFF" />
            <Text style={styles.weatherDetailLabel}>Rainfall</Text>
            <Text style={styles.weatherDetailValue}>{mockDashboardData.weather.rainfall}mm</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSoilHealthCard = () => (
    <View style={[styles.card, styles.soilCard]}>
      <View style={styles.cardHeader}>
        <Ionicons name="leaf" size={24} color="#2E7D32" />
        <Text style={styles.cardTitle}>मिट्टी स्वास्थ्य | Soil Health</Text>
      </View>
      <View style={styles.soilContent}>
        <View style={styles.soilScoreContainer}>
          <Text style={styles.soilScore}>{mockDashboardData.soilHealth.score}</Text>
          <Text style={styles.soilScoreLabel}>Health Score</Text>
          <Text style={styles.soilStatus}>Status: {mockDashboardData.soilHealth.status}</Text>
        </View>
        <View style={styles.soilMetrics}>
          <View style={styles.soilMetricItem}>
            <Text style={styles.metricValue}>{mockDashboardData.soilHealth.pH}</Text>
            <Text style={styles.metricLabel}>pH Level</Text>
          </View>
          <View style={styles.soilMetricItem}>
            <Text style={styles.metricValue}>{mockDashboardData.soilHealth.moisture}%</Text>
            <Text style={styles.metricLabel}>Moisture</Text>
          </View>
          <View style={styles.soilMetricItem}>
            <Text style={styles.metricValue}>{mockDashboardData.soilHealth.temperature}°C</Text>
            <Text style={styles.metricLabel}>Temperature</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderGrowNowSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>अभी क्या उगाएं? | What to grow now?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.growNowScroll}>
        {mockDashboardData.growNow.map((crop) => (
          <TouchableOpacity key={crop.id} style={[styles.growCard, {backgroundColor: crop.bgColor}]}>
            <Text style={styles.cropEmoji}>{crop.image}</Text>
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text style={styles.cropHindiName}>{crop.hindiName}</Text>
            <View style={styles.cropDetails}>
              <Text style={styles.cropSeason}>{crop.season}</Text>
              <Text style={styles.cropDays}>{crop.daysToHarvest} days</Text>
              <View style={[styles.profitabilityBadge, {
                backgroundColor: crop.profitability === 'High' ? '#4CAF50' : '#FF9800'
              }]}>
                <Text style={styles.profitabilityText}>{crop.profitability} Profit</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'Crops':
        return <CropRecommendationsScreen />;
      case 'Market':
        return <MarketPricesScreen />;
      case 'Insights':
        return <InsightsScreen />;
      default:
        return (
          <ScrollView
            style={styles.scrollView}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {renderWeatherCard()}
            {renderSoilHealthCard()}
            {renderAlertsCard()}
            {renderQuickActions()}
          </ScrollView>
        );
    }
  };

  const renderBottomTabs = () => (
    <View style={styles.bottomTabs}>
      <TouchableOpacity
        style={[styles.tab, currentScreen === 'Dashboard' && styles.activeTab]}
        onPress={() => setCurrentScreen('Dashboard')}
      >
        <Ionicons
          name={currentScreen === 'Dashboard' ? 'home' : 'home-outline'}
          size={24}
          color={currentScreen === 'Dashboard' ? '#2E7D32' : '#8A8A8A'}
        />
        <Text style={[styles.tabText, currentScreen === 'Dashboard' && styles.activeTabText]}>
          डैशबोर्ड
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentScreen === 'Crops' && styles.activeTab]}
        onPress={() => setCurrentScreen('Crops')}
      >
        <Ionicons
          name={currentScreen === 'Crops' ? 'leaf' : 'leaf-outline'}
          size={24}
          color={currentScreen === 'Crops' ? '#2E7D32' : '#8A8A8A'}
        />
        <Text style={[styles.tabText, currentScreen === 'Crops' && styles.activeTabText]}>
          फसल सुझाव
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentScreen === 'Market' && styles.activeTab]}
        onPress={() => setCurrentScreen('Market')}
      >
        <Ionicons
          name={currentScreen === 'Market' ? 'analytics' : 'analytics-outline'}
          size={24}
          color={currentScreen === 'Market' ? '#2E7D32' : '#8A8A8A'}
        />
        <Text style={[styles.tabText, currentScreen === 'Market' && styles.activeTabText]}>
          बाज़ार भाव
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentScreen === 'Insights' && styles.activeTab]}
        onPress={() => setCurrentScreen('Insights')}
      >
        <Ionicons
          name={currentScreen === 'Insights' ? 'cloud' : 'cloud-outline'}
          size={24}
          color={currentScreen === 'Insights' ? '#2E7D32' : '#8A8A8A'}
        />
        <Text style={[styles.tabText, currentScreen === 'Insights' && styles.activeTabText]}>
          मिट्टी मौसम
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {currentScreen === 'Dashboard' && 'डैशबोर्ड | Dashboard'}
          {currentScreen === 'Crops' && 'फसल सुझाव | Crop Recommendations'}
          {currentScreen === 'Market' && 'बाज़ार भाव | Market Prices'}
          {currentScreen === 'Insights' && 'मिट्टी और मौसम | Soil & Weather'}
        </Text>
      </View>

      {/* Current Screen Content */}
      <View style={styles.content}>
        {renderCurrentScreen()}
      </View>

      {/* Bottom Navigation */}
      {renderBottomTabs()}

      {/* Floating Action Button for AI Chat */}
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
  header: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  bottomTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#E8F5E8',
  },
  tabText: {
    fontSize: 10,
    color: '#8A8A8A',
    marginTop: 4,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#2E7D32',
    fontWeight: 'bold',
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