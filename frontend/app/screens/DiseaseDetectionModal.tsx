import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface DiseaseDetectionModalProps {
  visible: boolean;
  onClose: () => void;
}

// Mock disease detection results
const mockDiseaseResults = {
  disease: 'Leaf Blight',
  hindiName: 'पत्ता धब्बा रोग',
  confidence: 87,
  severity: 'Moderate',
  description: 'A fungal disease that affects the leaves, causing brown spots and yellowing.',
  hindiDescription: 'एक कवक रोग जो पत्तियों को प्रभावित करता है, भूरे धब्बे और पीलापन का कारण बनता है।',
  symptoms: [
    'Brown circular spots on leaves',
    'Yellowing around the spots',
    'Leaf wilting in severe cases',
  ],
  hindiSymptoms: [
    'पत्तियों पर भूरे गोल धब्बे',
    'धब्बों के चारों ओर पीलापन',
    'गंभीर मामलों में पत्ती मुरझाना',
  ],
  treatment: [
    'Apply copper-based fungicide',
    'Improve air circulation',
    'Remove affected leaves',
    'Avoid overhead watering',
  ],
  hindiTreatment: [
    'कॉपर आधारित फंगीसाइड का छिड़काव करें',
    'हवा का संचार बढ़ाएं',
    'प्रभावित पत्तियों को हटा दें',
    'ऊपर से पानी देने से बचें',
  ],
  prevention: [
    'Crop rotation every 2-3 years',
    'Use disease-resistant varieties',
    'Maintain proper plant spacing',
    'Regular field monitoring',
  ],
  hindiPrevention: [
    'हर 2-3 साल में फसल चक्र करें',
    'रोग प्रतिरोधी किस्मों का उपयोग करें',
    'उचित पौधों की दूरी बनाए रखें',
    'नियमित खेत की निगरानी करें',
  ],
};

export default function DiseaseDetectionModal({ visible, onClose }: DiseaseDetectionModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockDiseaseResults | null>(null);
  const [language, setLanguage] = useState('hindi');

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to analyze your crop images.'
      );
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(base64Image);
      analyzeImage(base64Image);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to take photos of your crops.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(base64Image);
      analyzeImage(base64Image);
    }
  };

  const analyzeImage = (imageBase64: string) => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(mockDiseaseResults);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResults(null);
    setIsAnalyzing(false);
  };

  const renderImagePicker = () => (
    <View style={styles.imagePickerContainer}>
      <Text style={styles.title}>
        {language === 'hindi' 
          ? 'फसल की तस्वीर अपलोड करें | Upload Crop Image'
          : 'Upload Crop Image | फसल की तस्वीर अपलोड करें'
        }
      </Text>
      <Text style={styles.subtitle}>
        {language === 'hindi'
          ? 'रोग की पहचान के लिए पत्तियों की स्पष्ट तस्वीर लें'
          : 'Take clear photos of leaves for disease identification'
        }
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
          <Ionicons name="camera" size={32} color="#FFFFFF" />
          <Text style={styles.buttonText}>
            {language === 'hindi' ? 'कैमरा' : 'Camera'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
          <Ionicons name="images" size={32} color="#FFFFFF" />
          <Text style={styles.buttonText}>
            {language === 'hindi' ? 'गैलरी' : 'Gallery'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAnalyzing = () => (
    <View style={styles.analyzingContainer}>
      <View style={styles.loadingSpinner}>
        <Ionicons name="leaf" size={48} color="#4CAF50" />
      </View>
      <Text style={styles.analyzingText}>
        {language === 'hindi' 
          ? 'AI विश्लेषण हो रहा है...\nकृपया प्रतीक्षा करें'
          : 'AI Analysis in progress...\nPlease wait'
        }
      </Text>
      <Text style={styles.analyzingSubtext}>
        (Demo: Real AI model will be integrated later)
      </Text>
    </View>
  );

  const renderResults = () => {
    if (!results) return null;
    
    const getSeverityColor = (severity: string) => {
      switch (severity.toLowerCase()) {
        case 'high': case 'severe': return '#F44336';
        case 'moderate': case 'medium': return '#FF9800';
        case 'low': case 'mild': return '#4CAF50';
        default: return '#666666';
      }
    };

    return (
      <ScrollView style={styles.resultsContainer}>
        {/* Disease Information */}
        <View style={styles.resultCard}>
          <View style={styles.diseaseHeader}>
            <Text style={styles.diseaseName}>
              {language === 'hindi' ? results.hindiName : results.disease}
            </Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <Text style={[
                styles.confidenceValue,
                { color: results.confidence >= 80 ? '#4CAF50' : '#FF9800' }
              ]}>
                {results.confidence}%
              </Text>
            </View>
          </View>
          
          <View style={styles.severityContainer}>
            <Ionicons 
              name="warning" 
              size={16} 
              color={getSeverityColor(results.severity)} 
            />
            <Text style={[
              styles.severityText,
              { color: getSeverityColor(results.severity) }
            ]}>
              Severity: {results.severity}
            </Text>
          </View>
          
          <Text style={styles.description}>
            {language === 'hindi' ? results.hindiDescription : results.description}
          </Text>
        </View>

        {/* Symptoms */}
        <View style={styles.resultCard}>
          <Text style={styles.sectionTitle}>
            {language === 'hindi' ? 'लक्षण | Symptoms' : 'Symptoms | लक्षण'}
          </Text>
          {(language === 'hindi' ? results.hindiSymptoms : results.symptoms).map((symptom, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="ellipse" size={6} color="#666666" />
              <Text style={styles.listText}>{symptom}</Text>
            </View>
          ))}
        </View>

        {/* Treatment */}
        <View style={styles.resultCard}>
          <Text style={styles.sectionTitle}>
            {language === 'hindi' ? 'उपचार | Treatment' : 'Treatment | उपचार'}
          </Text>
          {(language === 'hindi' ? results.hindiTreatment : results.treatment).map((treatment, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="medical" size={16} color="#4CAF50" />
              <Text style={styles.listText}>{treatment}</Text>
            </View>
          ))}
        </View>

        {/* Prevention */}
        <View style={styles.resultCard}>
          <Text style={styles.sectionTitle}>
            {language === 'hindi' ? 'रोकथाम | Prevention' : 'Prevention | रोकथाम'}
          </Text>
          {(language === 'hindi' ? results.hindiPrevention : results.prevention).map((prevention, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="shield-checkmark" size={16} color="#2196F3" />
              <Text style={styles.listText}>{prevention}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.newAnalysisButton} onPress={resetAnalysis}>
          <Text style={styles.newAnalysisText}>
            {language === 'hindi' ? 'नई तस्वीर जांचें' : 'Analyze New Image'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {language === 'hindi' 
              ? 'रोग पहचान | Disease Detection'
              : 'Disease Detection | रोग पहचान'
            }
          </Text>
          <TouchableOpacity 
            style={styles.languageToggle}
            onPress={() => setLanguage(language === 'hindi' ? 'english' : 'hindi')}
          >
            <Text style={styles.languageText}>
              {language === 'hindi' ? 'EN' : 'हिं'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        {selectedImage && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>
          {!selectedImage && renderImagePicker()}
          {isAnalyzing && renderAnalyzing()}
          {results && renderResults()}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
  },
  closeButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  languageToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imagePreview: {
    height: 200,
    backgroundColor: '#000000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  imagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 120,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingSpinner: {
    marginBottom: 24,
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 12,
  },
  analyzingSubtext: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#666666',
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  newAnalysisButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  newAnalysisText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});