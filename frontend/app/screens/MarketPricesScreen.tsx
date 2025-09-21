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
import { LineChart } from 'react-native-gifted-charts';

// Mock market data
const mockMarketData = {
  selectedCrop: 'Paddy Rice',
  currentPrice: 2340,
  priceChange: '+5.2%',
  trend: 'up',
  lastUpdated: '2 hours ago',
  priceHistory: [
    { value: 2180, label: '7 days ago' },
    { value: 2210, label: '6 days ago' },
    { value: 2185, label: '5 days ago' },
    { value: 2250, label: '4 days ago' },
    { value: 2290, label: '3 days ago' },
    { value: 2320, label: '2 days ago' },
    { value: 2340, label: 'Today' },
  ],
  crops: [
    {
      name: 'Paddy Rice',
      hindiName: 'धान',
      price: 2340,
      change: '+5.2%',
      trend: 'up',
      unit: 'quintal',
    },
    {
      name: 'Wheat',
      hindiName: 'गेहूं',
      price: 2100,
      change: '+2.1%',
      trend: 'up',
      unit: 'quintal',
    },
    {
      name: 'Maize',
      hindiName: 'मक्का',
      price: 1850,
      change: '-1.3%',
      trend: 'down',
      unit: 'quintal',
    },
    {
      name: 'Sugarcane',
      hindiName: 'गन्ना',
      price: 340,
      change: '+0.8%',
      trend: 'up',
      unit: 'quintal',
    },
    {
      name: 'Cotton',
      hindiName: 'कपास',
      price: 5680,
      change: '+3.4%',
      trend: 'up',
      unit: 'quintal',
    },
    {
      name: 'Soybean',
      hindiName: 'सोयाबीन',
      price: 4250,
      change: '-2.1%',
      trend: 'down',
      unit: 'quintal',
    },
  ],
  mandis: [
    {
      name: 'Ranchi Mandi',
      distance: '5 km',
      price: 2340,
      transport: 50,
      netPrice: 2290,
    },
    {
      name: 'Jamshedpur Mandi',
      distance: '45 km',
      price: 2380,
      transport: 120,
      netPrice: 2260,
    },
    {
      name: 'Dhanbad Mandi',
      distance: '65 km',
      price: 2420,
      transport: 150,
      netPrice: 2270,
    },
  ],
};

export default function MarketPricesScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCrop, setSelectedCrop] = useState('Paddy Rice');

  const timeframes = [
    { key: '7d', label: '7 Days' },
    { key: '14d', label: '14 Days' },
    { key: '30d', label: '30 Days' },
  ];

  const renderPriceChart = () => (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>{selectedCrop} Price Trend</Text>
        <Text style={styles.currentPrice}>₹{mockMarketData.currentPrice.toLocaleString()}</Text>
      </View>
      
      <View style={styles.priceChange}>
        <Ionicons 
          name={mockMarketData.trend === 'up' ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={mockMarketData.trend === 'up' ? '#4CAF50' : '#F44336'} 
        />
        <Text style={[
          styles.priceChangeText,
          { color: mockMarketData.trend === 'up' ? '#4CAF50' : '#F44336' }
        ]}>
          {mockMarketData.priceChange}
        </Text>
        <Text style={styles.lastUpdated}>Last updated: {mockMarketData.lastUpdated}</Text>
      </View>

      <View style={styles.timeframeSelector}>
        {timeframes.map((timeframe) => (
          <TouchableOpacity
            key={timeframe.key}
            style={[
              styles.timeframeButton,
              selectedTimeframe === timeframe.key && styles.selectedTimeframe
            ]}
            onPress={() => setSelectedTimeframe(timeframe.key)}
          >
            <Text style={[
              styles.timeframeText,
              selectedTimeframe === timeframe.key && styles.selectedTimeframeText
            ]}>
              {timeframe.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <LineChart
        data={mockMarketData.priceHistory}
        width={300}
        height={200}
        color="#2E7D32"
        thickness={3}
        hideDataPoints={false}
        dataPointsColor="#2E7D32"
        dataPointsRadius={4}
        hideRules={false}
        rulesColor="#E0E0E0"
        backgroundColor="#FFFFFF"
        yAxisColor="#E0E0E0"
        xAxisColor="#E0E0E0"
        yAxisTextStyle={{ color: '#666666', fontSize: 10 }}
        xAxisLabelTextStyle={{ color: '#666666', fontSize: 8 }}
      />
    </View>
  );

  const renderCropsList = () => (
    <View style={styles.cropsCard}>
      <Text style={styles.sectionTitle}>फसल भाव | Crop Prices</Text>
      {mockMarketData.crops.map((crop, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.cropItem,
            selectedCrop === crop.name && styles.selectedCropItem
          ]}
          onPress={() => setSelectedCrop(crop.name)}
        >
          <View style={styles.cropInfo}>
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text style={styles.cropHindiName}>{crop.hindiName}</Text>
          </View>
          <View style={styles.cropPriceInfo}>
            <Text style={styles.cropPrice}>₹{crop.price.toLocaleString()}</Text>
            <Text style={styles.cropUnit}>per {crop.unit}</Text>
            <View style={styles.cropChange}>
              <Ionicons 
                name={crop.trend === 'up' ? 'trending-up' : 'trending-down'} 
                size={12} 
                color={crop.trend === 'up' ? '#4CAF50' : '#F44336'} 
              />
              <Text style={[
                styles.cropChangeText,
                { color: crop.trend === 'up' ? '#4CAF50' : '#F44336' }
              ]}>
                {crop.change}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMandiComparison = () => (
    <View style={styles.mandiCard}>
      <Text style={styles.sectionTitle}>मंडी तुलना | Mandi Comparison</Text>
      <Text style={styles.mandiSubtitle}>Prices for {selectedCrop}</Text>
      
      {mockMarketData.mandis.map((mandi, index) => (
        <View key={index} style={styles.mandiItem}>
          <View style={styles.mandiInfo}>
            <Text style={styles.mandiName}>{mandi.name}</Text>
            <Text style={styles.mandiDistance}>📍 {mandi.distance}</Text>
          </View>
          <View style={styles.mandiPricing}>
            <Text style={styles.mandiPrice}>₹{mandi.price}</Text>
            <Text style={styles.transportCost}>- ₹{mandi.transport} (transport)</Text>
            <Text style={styles.netPrice}>= ₹{mandi.netPrice} net</Text>
          </View>
        </View>
      ))}
      
      <View style={styles.bestDealContainer}>
        <Ionicons name="star" size={16} color="#FF9800" />
        <Text style={styles.bestDealText}>
          Best deal: {mockMarketData.mandis[0].name} (₹{mockMarketData.mandis[0].netPrice} net)
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderPriceChart()}
        {renderCropsList()}
        {renderMandiComparison()}
      </ScrollView>
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
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceChangeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 12,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666666',
  },
  timeframeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  selectedTimeframe: {
    backgroundColor: '#2E7D32',
  },
  timeframeText: {
    fontSize: 12,
    color: '#666666',
  },
  selectedTimeframeText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  cropsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cropItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedCropItem: {
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  cropHindiName: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  cropPriceInfo: {
    alignItems: 'flex-end',
  },
  cropPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  cropUnit: {
    fontSize: 10,
    color: '#666666',
  },
  cropChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cropChangeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  mandiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  mandiSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
  },
  mandiItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mandiInfo: {
    flex: 1,
  },
  mandiName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  mandiDistance: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  mandiPricing: {
    alignItems: 'flex-end',
  },
  mandiPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  transportCost: {
    fontSize: 10,
    color: '#F44336',
    marginTop: 2,
  },
  netPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 2,
  },
  bestDealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bestDealText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF9800',
    marginLeft: 4,
  },
});