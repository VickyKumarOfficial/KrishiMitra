import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock crop recommendation data
const mockRecommendations = {
  currentSeason: 'Kharif 2025',
  location: 'Jharkhand, India',
  recommendations: [
    {
      id: 1,
      name: 'Paddy Rice',
      hindiName: 'धान',
      confidence: 92,
      profitability: 85,
      yieldForecast: '4.2 tons/hectare',
      profit: '₹45,000/hectare',
      reasons: [
        'High soil moisture content (45%)',
        'Optimal pH level (6.8)',
        'Favorable monsoon prediction',
        'High market demand expected',
      ],
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      duration: '120-130 days',
      waterRequirement: 'High',
      marketPrice: '₹2,200/quintal',
    },
    {
      id: 2,
      name: 'Maize',
      hindiName: 'मक्का',
      confidence: 88,
      profitability: 78,
      yieldForecast: '6.8 tons/hectare',
      profit: '₹38,000/hectare',
      reasons: [
        'Good drainage conditions',
        'Suitable temperature range',
        'Growing export demand',
        'Disease-resistant varieties available',
      ],
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      duration: '90-110 days',
      waterRequirement: 'Medium',
      marketPrice: '₹1,850/quintal',
    },
    {
      id: 3,
      name: 'Sugarcane',
      hindiName: 'गन्ना',
      confidence: 75,
      profitability: 82,
      yieldForecast: '65 tons/hectare',
      profit: '₹52,000/hectare',
      reasons: [
        'Long-term profitability',
        'Guaranteed government purchase',
        'Suitable climate conditions',
        'Processing facilities nearby',
      ],
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      duration: '12-18 months',
      waterRequirement: 'High',
      marketPrice: '₹340/quintal',
    },
  ],
  rotationSuggestions: [
    {
      year: 'Year 1',
      crop: 'Paddy → Wheat',
      benefits: 'Nitrogen fixation and soil health improvement',
    },
    {
      year: 'Year 2',
      crop: 'Legumes → Maize',
      benefits: 'Soil nutrient restoration and pest control',
    },
    {
      year: 'Year 3',
      crop: 'Fallow → Green manure',
      benefits: 'Soil rehabilitation and organic matter increase',
    },
  ],
};

export default function CropRecommendationsScreen() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const renderConfidenceBar = (confidence: number) => (
    <View style={styles.confidenceContainer}>
      <Text style={styles.confidenceLabel}>Confidence: {confidence}%</Text>
      <View style={styles.confidenceBarBackground}>
        <View 
          style={[
            styles.confidenceBarFill, 
            { 
              width: `${confidence}%`,
              backgroundColor: confidence >= 80 ? '#4CAF50' : confidence >= 60 ? '#FF9800' : '#F44336'
            }
          ]} 
        />
      </View>
    </View>
  );

  const renderProfitabilityIndicator = (profitability: number) => (
    <View style={styles.profitabilityContainer}>
      <Ionicons 
        name={profitability >= 80 ? 'trending-up' : profitability >= 60 ? 'remove' : 'trending-down'} 
        size={16} 
        color={profitability >= 80 ? '#4CAF50' : profitability >= 60 ? '#FF9800' : '#F44336'} 
      />
      <Text style={[
        styles.profitabilityText,
        { color: profitability >= 80 ? '#4CAF50' : profitability >= 60 ? '#FF9800' : '#F44336' }
      ]}>
        {profitability >= 80 ? 'High Profit' : profitability >= 60 ? 'Medium Profit' : 'Low Profit'}
      </Text>
    </View>
  );

  const renderCropCard = (crop: any) => (
    <TouchableOpacity 
      key={crop.id} 
      style={styles.cropCard}
      onPress={() => setSelectedCrop(selectedCrop?.id === crop.id ? null : crop)}
    >
      <View style={styles.cropCardHeader}>
        <View style={styles.cropInfo}>
          <Text style={styles.cropName}>{crop.name}</Text>
          <Text style={styles.cropHindiName}>{crop.hindiName}</Text>
        </View>
        <View style={styles.cropMetrics}>
          <Text style={styles.yieldText}>{crop.yieldForecast}</Text>
          <Text style={styles.profitText}>{crop.profit}</Text>
        </View>
      </View>
      
      {renderConfidenceBar(crop.confidence)}
      {renderProfitabilityIndicator(crop.profitability)}
      
      {selectedCrop?.id === crop.id && (
        <View style={styles.cropDetails}>
          <Text style={styles.detailsTitle}>क्यों सुझाया गया? | Why Recommended?</Text>
          {crop.reasons.map((reason: string, index: number) => (
            <View key={index} style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.reasonText}>{reason}</Text>
            </View>
          ))}
          
          <View style={styles.cropSpecs}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Duration:</Text>
              <Text style={styles.specValue}>{crop.duration}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Water Need:</Text>
              <Text style={styles.specValue}>{crop.waterRequirement}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Market Price:</Text>
              <Text style={styles.specValue}>{crop.marketPrice}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderRotationSuggestions = () => (
    <View style={styles.rotationCard}>
      <Text style={styles.sectionTitle}>फसल चक्र | Crop Rotation Plan</Text>
      {mockRecommendations.rotationSuggestions.map((rotation, index) => (
        <View key={index} style={styles.rotationItem}>
          <Text style={styles.rotationYear}>{rotation.year}</Text>
          <Text style={styles.rotationCrop}>{rotation.crop}</Text>
          <Text style={styles.rotationBenefits}>{rotation.benefits}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.seasonText}>{mockRecommendations.currentSeason}</Text>
          <Text style={styles.locationText}>📍 {mockRecommendations.location}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>सुझाई गई फसलें | Recommended Crops</Text>
        
        {mockRecommendations.recommendations.map(renderCropCard)}
        
        {renderRotationSuggestions()}
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
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  seasonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
    marginTop: 8,
  },
  cropCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  cropCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  cropHindiName: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  cropMetrics: {
    alignItems: 'flex-end',
  },
  yieldText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  profitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 2,
  },
  confidenceContainer: {
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  confidenceBarBackground: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  confidenceBarFill: {
    height: 6,
    borderRadius: 3,
  },
  profitabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profitabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cropDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reasonText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  cropSpecs: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  specLabel: {
    fontSize: 12,
    color: '#666666',
  },
  specValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  rotationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    elevation: 3,
  },
  rotationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rotationYear: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  rotationCrop: {
    fontSize: 16,
    color: '#333333',
    marginVertical: 4,
  },
  rotationBenefits: {
    fontSize: 12,
    color: '#666666',
  },
});