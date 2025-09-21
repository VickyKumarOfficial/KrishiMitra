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
    forecast: [
      {
        day: 'Tomorrow',
        temp: 30,
        condition: 'Sunny',
        icon: 'sunny',
        rain: 0,
      },
      {
        day: 'Day 3',
        temp: 26,
        condition: 'Rainy',
        icon: 'rainy',
        rain: 15,
      },
      {
        day: 'Day 4',
        temp: 29,
        condition: 'Cloudy',
        icon: 'cloudy',
        rain: 2,
      },
    ],
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');

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
      <TouchableOpacity 
        style={styles.profileIcon}
        onPress={() => setShowProfileMenu(true)}
      >
        <Ionicons name="person-circle" size={40} color="#2E7D32" />
      </TouchableOpacity>
    </View>
  );

  const renderProfileModal = () => (
    <Modal visible={showProfileMenu} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.profileModal}>
          <View style={styles.profileModalHeader}>
            <Text style={styles.profileModalTitle}>Profile Settings</Text>
            <TouchableOpacity onPress={() => setShowProfileMenu(false)}>
              <Ionicons name="close" size={24} color="#666666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.profileOption} onPress={() => Alert.alert('Personal Details', 'Feature coming soon!')}>
              <Ionicons name="person" size={20} color="#2E7D32" />
              <Text style={styles.profileOptionText}>Personal Details</Text>
              <Ionicons name="chevron-forward" size={16} color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileOption} onPress={() => Alert.alert('Theme', 'Available themes:\n• Light\n• Dark\n• System Default')}>
              <Ionicons name="color-palette" size={20} color="#2E7D32" />
              <Text style={styles.profileOptionText}>Theme</Text>
              <Ionicons name="chevron-forward" size={16} color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileOption} 
              onPress={() => {
                const newLang = selectedLanguage === 'hindi' ? 'english' : 'hindi';
                setSelectedLanguage(newLang);
                Alert.alert('Language Changed', `Language switched to ${newLang === 'hindi' ? 'Hindi' : 'English'}`);
              }}
            >
              <Ionicons name="language" size={20} color="#2E7D32" />
              <Text style={styles.profileOptionText}>Languages</Text>
              <Text style={styles.profileOptionSubtext}>{selectedLanguage === 'hindi' ? 'हिंदी' : 'English'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileOption} onPress={() => Alert.alert('Farm Details', 'Manage your farm information')}>
              <Ionicons name="leaf" size={20} color="#2E7D32" />
              <Text style={styles.profileOptionText}>Farm Details</Text>
              <Ionicons name="chevron-forward" size={16} color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileOption} onPress={() => Alert.alert('Help & Support', '24/7 support available\nCall: 1800-123-4567')}>
              <Ionicons name="help-circle" size={20} color="#2E7D32" />
              <Text style={styles.profileOptionText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={16} color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileOption} onPress={() => Alert.alert('Contact Us', 'Email: support@krishimitra.com\nPhone: +91-9876543210')}>
              <Ionicons name="mail" size={20} color="#2E7D32" />
              <Text style={styles.profileOptionText}>Contact Us</Text>
              <Ionicons name="chevron-forward" size={16} color="#999999" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderWeatherCard = () => (
    <View style={[styles.card, styles.weatherCard]}>
      <View style={styles.cardHeader}>
        <Ionicons name={mockDashboardData.weather.icon} size={28} color="#FFFFFF" />
        <Text style={styles.weatherCardTitle}>मौसम | Weather</Text>
      </View>
      <View style={styles.weatherContent}>
        <View style={styles.mainWeather}>
          <Text style={styles.temperature}>{mockDashboardData.weather.temperature}°C</Text>
          <Text style={styles.weatherCondition}>{mockDashboardData.weather.condition}</Text>
        </View>
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
        
        {/* 3-Day Forecast */}
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>3-Day Forecast</Text>
          <View style={styles.forecastRow}>
            {mockDashboardData.weather.forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>{day.day}</Text>
                <Ionicons name={day.icon} size={20} color="#FFFFFF" />
                <Text style={styles.forecastTemp}>{day.temp}°</Text>
                {day.rain > 0 && (
                  <Text style={styles.forecastRain}>{day.rain}mm</Text>
                )}
              </View>
            ))}
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
      <View style={styles.growNowContainer}>
        {mockDashboardData.growNow.map((crop) => (
          <TouchableOpacity 
            key={crop.id} 
            style={[styles.growCardFlex, {backgroundColor: crop.bgColor}]}
            onPress={() => Alert.alert(`${crop.name} Details`, `Season: ${crop.season}\nHarvest in: ${crop.daysToHarvest} days\nProfitability: ${crop.profitability}`)}
          >
            <View style={styles.cropImageContainer}>
              <Text style={styles.cropEmoji}>{crop.image}</Text>
            </View>
            <View style={styles.cropInfoContainer}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropHindiName}>{crop.hindiName}</Text>
              <View style={styles.cropMetrics}>
                <Text style={styles.cropSeason}>{crop.season}</Text>
                <Text style={styles.cropDays}>{crop.daysToHarvest} days</Text>
              </View>
            </View>
            <View style={styles.cropProfitContainer}>
              <View style={[styles.profitabilityBadge, {
                backgroundColor: crop.profitability === 'High' ? '#4CAF50' : '#FF9800'
              }]}>
                <Text style={styles.profitabilityText}>{crop.profitability}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#999999" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAlertsCard = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>अलर्ट | Alerts</Text>
      {mockDashboardData.alerts.map((alert) => (
        <View key={alert.id} style={[styles.alertCard, {
          backgroundColor: alert.bgColor,
          borderLeftColor: alert.borderColor,
        }]}>
          <Text style={[styles.alertTitle, {color: alert.borderColor}]}>{alert.title}</Text>
          <Text style={styles.alertMessage}>{alert.message}</Text>
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
          <Ionicons name="camera" size={20} color="#2E7D32" />
          <Text style={styles.quickActionText}>Disease Check</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setShowAIChat(true)}
        >
          <Ionicons name="chatbubble" size={20} color="#2E7D32" />
          <Text style={styles.quickActionText}>AI Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setCurrentScreen('Market')}
        >
          <Ionicons name="analytics" size={20} color="#2E7D32" />
          <Text style={styles.quickActionText}>Price Trends</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => Alert.alert('Crop Calendar', 'View planting and harvesting schedules\n\n📅 Kharif Season: June-Oct\n📅 Rabi Season: Nov-April\n📅 Zaid Season: April-June')}
        >
          <Ionicons name="calendar" size={20} color="#2E7D32" />
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
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {renderAppHeader()}
            {renderProfileSection()}
            {renderWeatherCard()}
            {renderSoilHealthCard()}
            {renderGrowNowSection()}
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
      {renderProfileModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FDF9',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 2,
  },
  // App Header Styles
  appHeader: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 4,
    width: '100%',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  appSlogan: {
    fontSize: 12,
    color: '#C8E6C9',
    textAlign: 'center',
    marginTop: 4,
  },
  // Profile Section
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 2,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  profileIcon: {
    padding: 4,
  },
  // Bottom Navigation
  bottomTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E8F5E8',
    borderTopWidth: 2,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#E8F5E8',
  },
  tabText: {
    fontSize: 9,
    color: '#8A8A8A',
    marginTop: 2,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  // Section Styles
  section: {
    marginHorizontal: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
    marginBottom: 6,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 8,
  },
  weatherCard: {
    backgroundColor: '#4CAF50',
  },
  weatherCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  soilCard: {
    backgroundColor: '#FFFFFF',
  },
  // Weather Card Styles
  weatherContent: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  weatherCondition: {
    fontSize: 14,
    color: '#C8E6C9',
    marginBottom: 12,
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
    fontSize: 10,
    color: '#C8E6C9',
    marginTop: 2,
  },
  weatherDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Soil Health Styles
  soilContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soilScoreContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  soilScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  soilScoreLabel: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  soilStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 2,
  },
  soilMetrics: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  soilMetricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  metricLabel: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    marginTop: 2,
  },
  // Grow Now Section
  growNowScroll: {
    paddingLeft: 4,
  },
  growCard: {
    width: 120,
    padding: 12,
    borderRadius: 16,
    marginRight: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cropEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  cropName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 2,
  },
  cropHindiName: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 6,
  },
  cropDetails: {
    alignItems: 'center',
    width: '100%',
  },
  cropSeason: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  cropDays: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 4,
  },
  profitabilityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  profitabilityText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Alert Styles
  alertCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  quickActionButton: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickActionText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  // Weather Forecast Styles
  mainWeather: {
    alignItems: 'center',
    marginBottom: 12,
  },
  forecastContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  forecastTitle: {
    fontSize: 12,
    color: '#C8E6C9',
    marginBottom: 8,
    textAlign: 'center',
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  forecastItem: {
    alignItems: 'center',
    flex: 1,
  },
  forecastDay: {
    fontSize: 9,
    color: '#C8E6C9',
    marginBottom: 4,
  },
  forecastTemp: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  forecastRain: {
    fontSize: 8,
    color: '#81C784',
    marginTop: 2,
  },
  // Grow Now List Styles
  growNowContainer: {
    paddingHorizontal: 4,
  },
  growCardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cropImageContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cropInfoContainer: {
    flex: 1,
  },
  cropMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cropProfitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Profile Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  profileModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: '70%',
  },
  profileModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  profileOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  profileOptionSubtext: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#2E7D32',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});