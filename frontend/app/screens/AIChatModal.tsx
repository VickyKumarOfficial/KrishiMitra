import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface AIChatModalProps {
  visible: boolean;
  onClose: () => void;
}

// Mock chat data
const mockChatData = {
  messages: [
    {
      id: 1,
      type: 'bot',
      message: 'नमस्कार! मैं आपका AI कृषि सलाहकार हूं। कैसे मदद कर सकता हूं?',
      englishMessage: 'Hello! I am your AI farming advisor. How can I help you?',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: 2,
      type: 'user',
      message: 'मेरी फसल में पत्ते पीले हो रहे हैं',
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: 3,
      type: 'bot',
      message: 'पत्तों का पीला होना कई कारणों से हो सकता है:\n\n🌱 नाइट्रोजन की कमी\n💧 अधिक या कम पानी\n🐛 कीट-पतंगे\n🦠 बैक्टीरिया संक्रमण\n\nकृपया बताएं कि यह कौन सी फसल है और कब से यह समस्या शुरू हुई?',
      englishMessage: 'Yellow leaves can be due to several reasons:\n\n🌱 Nitrogen deficiency\n💧 Over or under watering\n🐛 Pest infestation\n🦠 Bacterial infection\n\nPlease tell me which crop this is and when did this problem start?',
      timestamp: new Date(),
    },
  ],
  quickQuestions: [
    'मौसम के बारे में जानकारी',
    'फसल की सिंचाई',
    'खाद और उर्वरक',
    'कीट-पतंगे नियंत्रण',
    'बाज़ार की कीमत',
    'मिट्टी की जांच',
  ],
};

export default function AIChatModal({ visible, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState(mockChatData.messages);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState('hindi');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'user' as const,
        message: inputText.trim(),
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'bot' as const,
          message: 'मैं आपके सवाल का जवाब तैयार कर रहा हूं...\n\n(यह एक डेमो है - वास्तविक AI एकीकरण बाद में जोड़ा जाएगा)',
          englishMessage: 'I am preparing an answer to your question...\n\n(This is a demo - real AI integration will be added later)',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would be implemented here
    if (!isRecording) {
      // Start recording
      console.log('Started voice recording (placeholder)');
    } else {
      // Stop recording and process
      console.log('Stopped voice recording (placeholder)');
    }
  };

  const renderMessage = (msg: any) => (
    <View 
      key={msg.id} 
      style={[
        styles.messageContainer,
        msg.type === 'user' ? styles.userMessage : styles.botMessage
      ]}
    >
      {msg.type === 'bot' && (
        <View style={styles.botAvatar}>
          <Ionicons name="leaf" size={16} color="#FFFFFF" />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        msg.type === 'user' ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          msg.type === 'user' ? styles.userText : styles.botText
        ]}>
          {msg.message}
        </Text>
        {msg.englishMessage && language === 'hindi' && (
          <Text style={styles.englishText}>{msg.englishMessage}</Text>
        )}
        <Text style={styles.timestamp}>
          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderQuickQuestions = () => (
    <View style={styles.quickQuestionsContainer}>
      <Text style={styles.quickQuestionsTitle}>त्वरित प्रश्न | Quick Questions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mockChatData.quickQuestions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickQuestionButton}
            onPress={() => handleQuickQuestion(question)}
          >
            <Text style={styles.quickQuestionText}>{question}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI कृषि सलाहकार | AI Farm Advisor</Text>
          <TouchableOpacity 
            style={styles.languageToggle}
            onPress={() => setLanguage(language === 'hindi' ? 'english' : 'hindi')}
          >
            <Text style={styles.languageText}>
              {language === 'hindi' ? 'EN' : 'हिं'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <ScrollView style={styles.messagesContainer}>
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Quick Questions */}
        {renderQuickQuestions()}

        {/* Input Area */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[
                styles.voiceButton,
                isRecording && styles.recordingButton
              ]}
              onPress={toggleRecording}
            >
              <Ionicons 
                name={isRecording ? 'stop' : 'mic'} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={language === 'hindi' ? 'अपना प्रश्न लिखें...' : 'Type your question...'}
              placeholderTextColor="#666666"
              multiline
              maxLength={500}
            />
            
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.disabledButton
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording... (Voice feature coming soon)</Text>
            </View>
          )}
        </KeyboardAvoidingView>
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
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#2E7D32',
    marginLeft: 'auto',
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#333333',
  },
  englishText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 8,
    opacity: 0.7,
  },
  quickQuestionsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    elevation: 2,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  quickQuestionButton: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
    marginLeft: 16,
  },
  quickQuestionText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  voiceButton: {
    backgroundColor: '#FF5722',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  recordingButton: {
    backgroundColor: '#F44336',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
});