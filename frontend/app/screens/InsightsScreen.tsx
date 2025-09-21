import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock insights data
const mockInsightsData = {
  soil: {
    moisture: 45,
    pH: 6.8,
    temperature: 24,
    nitrogen: 78,
    phosphorus: 65,
    potassium: 82,
    organicMatter: 3.2,
    healthScore: 78,
    status: 'Good',
    recommendations: [
      'मिट्टी में नाइट्रोजन की मात्रा बढ़ाने की जरूरत | Need to increase nitrogen content',
      'जैविक खाद का उपयोग करें | Use organic fertilizers',
      'pH स्तर संतुलित है | pH level is balanced',
    ],
  },
  weather: {
    current: {
      temperature: 28,
      humidity: 68,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      uvIndex: 7,
      visibility: 10,
    },
    forecast: [
      {
        day: 'Today',
        high: 32,
        low: 24,
        condition: 'Partly Cloudy',
        humidity: 68,
        rainfall: 0,
        icon: 'partly-sunny',
      },
      {
        day: 'Tomorrow',
        high: 30,
        low: 22,
        condition: 'Rainy',
        humidity: 85,
        rainfall: 15,
        icon: 'rainy',
      },
      {
        day: 'Day 3',
        high: 29,
        low: 21,
        condition: 'Heavy Rain',
        humidity: 90,
        rainfall: 45,
        icon: 'thunderstorm',
      },
      {
        day: 'Day 4',
        high: 31,
        low: 23,
        condition: 'Cloudy',
        humidity: 75,
        rainfall: 5,
        icon: 'cloudy',
      },
      {
        day: 'Day 5',
        high: 33,
        low: 25,
        condition: 'Sunny',
        humidity: 60,
        rainfall: 0,
        icon: 'sunny',
      },
    ],
  },
  alerts: [
    {
      id: 1,
      type: 'critical',
      title: 'Heavy Rainfall Warning',
      message: 'भारी बारिश की चेतावनी - अगले 48 घंटों में 50mm+ बारिश संभावित',
      severity: '🔴',
      action: 'Cover crops and ensure proper drainage',
    },
    {
      id: 2,
      type: 'moderate',
      title: 'Soil Moisture Alert',
      message: 'मिट्टी में नमी कम - सिंचाई की आवश्यकता',
      severity: '🟠',
      action: 'Schedule irrigation within 24 hours',
    },
    {
      id: 3,
      type: 'normal',
      title: 'Optimal Growing Temperature',
      message: 'आदर्श तापमान - फसल वृद्धि के लिए उत्तम स्थिति',
      severity: '🟢',
      action: 'Continue current farming practices',
    },
  ],
};

export default function InsightsScreen() {
  const [selectedTab, setSelectedTab] = useState('soil');

  const renderSoilGauge = (label: string, value: number, unit: string = '%') => {
    const getColor = (val: number) => {
      if (val >= 70) return '#4CAF50';
      if (val >= 50) return '#FF9800';
      return '#F44336';
    };

    return (
      <View style={styles.gaugeContainer}>
        <View style={styles.gaugeCircle}>
          <Text style={[styles.gaugeValue, { color: getColor(value) }]}>
            {value}{unit}
          </Text>
        </View>
        <Text style={styles.gaugeLabel}>{label}</Text>
      </View>
    );
  };

  const renderSoilInsights = () => (
    <View style={styles.tabContent}>
      <View style={styles.soilHealthCard}>
        <View style={styles.soilHealthHeader}>
          <Text style={styles.soilHealthTitle}>मिट्टी स्वास्थ्य स्कोर | Soil Health Score</Text>
          <Text style={styles.soilHealthScore}>{mockInsightsData.soil.healthScore}/100</Text>
        </View>
        <Text style={[
          styles.soilHealthStatus,
          { color: mockInsightsData.soil.healthScore >= 70 ? '#4CAF50' : '#FF9800' }
        ]}>
          Status: {mockInsightsData.soil.status}
        </Text>
      </View>

      <View style={styles.soilMetricsGrid}>
        {renderSoilGauge('Moisture', mockInsightsData.soil.moisture)}
        {renderSoilGauge('pH Level', mockInsightsData.soil.pH, '')}
        {renderSoilGauge('Temp', mockInsightsData.soil.temperature, '°C')}
        {renderSoilGauge('Nitrogen', mockInsightsData.soil.nitrogen)}
        {renderSoilGauge('Phosphorus', mockInsightsData.soil.phosphorus)}
        {renderSoilGauge('Potassium', mockInsightsData.soil.potassium)}
      </View>

      <View style={styles.recommendationsCard}>
        <Text style={styles.recommendationsTitle}>सुझाव | Recommendations</Text>
        {mockInsightsData.soil.recommendations.map((rec, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Ionicons name="bulb" size={16} color="#FF9800" />
            <Text style={styles.recommendationText}>{rec}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderWeatherForecast = () => (
    <View style={styles.tabContent}>
      <View style={styles.currentWeatherCard}>
        <Text style={styles.currentWeatherTitle}>वर्तमान मौसम | Current Weather</Text>
        <View style={styles.currentWeatherContent}>
          <Text style={styles.currentTemp}>{mockInsightsData.weather.current.temperature}°C</Text>
          <Text style={styles.currentCondition}>{mockInsightsData.weather.current.condition}</Text>
        </View>
        <View style={styles.currentWeatherDetails}>
          <View style={styles.weatherDetailItem}>
            <Ionicons name="water" size={16} color="#2196F3" />
            <Text style={styles.weatherDetailText}>{mockInsightsData.weather.current.humidity}% Humidity</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Ionicons name="speedometer" size={16} color="#9C27B0" />
            <Text style={styles.weatherDetailText}>{mockInsightsData.weather.current.windSpeed} km/h Wind</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Ionicons name="sunny" size={16} color="#FF9800" />
            <Text style={styles.weatherDetailText}>UV Index {mockInsightsData.weather.current.uvIndex}</Text>
          </View>
        </View>
      </View>

      <View style={styles.forecastCard}>
        <Text style={styles.forecastTitle}>7-दिन पूर्वानुमान | 7-Day Forecast</Text>
        {mockInsightsData.weather.forecast.map((day, index) => (
          <View key={index} style={styles.forecastItem}>
            <View style={styles.forecastDay}>
              <Text style={styles.forecastDayText}>{day.day}</Text>
              <Ionicons name={day.icon} size={24} color="#2E7D32" />
            </View>
            <View style={styles.forecastDetails}>
              <Text style={styles.forecastTemp}>{day.high}° / {day.low}°</Text>
              <Text style={styles.forecastCondition}>{day.condition}</Text>
              {day.rainfall > 0 && (
                <Text style={styles.forecastRain}>🌧️ {day.rainfall}mm</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.tabContent}>
      <Text style={styles.alertsTitle}>मौसम अलर्ट | Weather Alerts</Text>
      {mockInsightsData.alerts.map((alert) => (
        <View key={alert.id} style={[
          styles.alertCard,
          { 
            borderLeftColor: alert.type === 'critical' ? '#F44336' : 
                           alert.type === 'moderate' ? '#FF9800' : '#4CAF50'
          }
        ]}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertSeverity}>{alert.severity}</Text>
            <Text style={styles.alertTitle}>{alert.title}</Text>
          </View>
          <Text style={styles.alertMessage}>{alert.message}</Text>
          <View style={styles.alertAction}>
            <Ionicons name="information-circle" size={16} color="#2196F3" />
            <Text style={styles.alertActionText}>Action: {alert.action}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'soil':
        return renderSoilInsights();
      case 'weather':
        return renderWeatherForecast();
      case 'alerts':
        return renderAlerts();
      default:
        return renderSoilInsights();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'soil' && styles.activeTab]}
          onPress={() => setSelectedTab('soil')}
        >
          <Ionicons 
            name="leaf" 
            size={20} 
            color={selectedTab === 'soil' ? '#FFFFFF' : '#666666'} 
          />
          <Text style={[styles.tabText, selectedTab === 'soil' && styles.activeTabText]}>
            Soil
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'weather' && styles.activeTab]}
          onPress={() => setSelectedTab('weather')}
        >
          <Ionicons 
            name="cloud" 
            size={20} 
            color={selectedTab === 'weather' ? '#FFFFFF' : '#666666'} 
          />
          <Text style={[styles.tabText, selectedTab === 'weather' && styles.activeTabText]}>
            Weather
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'alerts' && styles.activeTab]}
          onPress={() => setSelectedTab('alerts')}
        >
          <Ionicons 
            name="warning" 
            size={20} 
            color={selectedTab === 'alerts' ? '#FFFFFF' : '#666666'} 
          />
          <Text style={[styles.tabText, selectedTab === 'alerts' && styles.activeTabText]}>
            Alerts
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#2E7D32',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  soilHealthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  soilHealthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  soilHealthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  soilHealthScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  soilHealthStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  soilMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  gaugeContainer: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 16,
  },
  gaugeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gaugeValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  gaugeLabel: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
  recommendationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  currentWeatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  currentWeatherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  currentWeatherContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  currentCondition: {
    fontSize: 16,
    color: '#666666',
  },
  currentWeatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  forecastDay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  forecastDayText: {
    fontSize: 14,
    color: '#333333',
    marginRight: 12,
    minWidth: 60,
  },
  forecastDetails: {
    alignItems: 'flex-end',
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  forecastCondition: {
    fontSize: 12,
    color: '#666666',
  },
  forecastRain: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 2,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertSeverity: {
    fontSize: 20,
    marginRight: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  alertAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  alertActionText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 4,
    fontStyle: 'italic',
  },
});