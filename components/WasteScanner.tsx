import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Camera, Upload, X } from 'lucide-react-native';

interface WasteScannerProps {
  visible: boolean;
  onClose: () => void;
}

export default function WasteScanner({ visible, onClose }: WasteScannerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  const mockScanWaste = async () => {
    setScanning(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = {
        type: 'plastic',
        recyclable: true,
        confidence: 0.92,
        recommendations: [
          'This plastic bottle is recyclable',
          'Clean it before recycling',
          'Check local recycling guidelines'
        ],
        suggestedProviders: [
          { name: 'EcoWaste Solutions', distance: '2.3 km' },
          { name: 'Green Cycle Co.', distance: '3.1 km' }
        ]
      };
      
      setScanResult(mockResults);
      setScanning(false);
    }, 2000);
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Waste Scanner</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {!selectedImage && !scanResult && (
          <View style={styles.content}>
            <View style={styles.instructions}>
              <Text style={styles.instructionText}>
                Take a photo or upload an image of waste to get AI-powered disposal recommendations
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  // In a real implementation, this would open the camera
                  setSelectedImage('https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400');
                }}
              >
                <Camera size={32} color="#22C55E" strokeWidth={2} />
                <Text style={styles.actionButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  // In a real implementation, this would open the gallery
                  setSelectedImage('https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400');
                }}
              >
                <Upload size={32} color="#3B82F6" strokeWidth={2} />
                <Text style={styles.actionButtonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedImage && !scanResult && (
          <View style={styles.content}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={mockScanWaste}
              disabled={scanning}
            >
              <Text style={styles.scanButtonText}>
                {scanning ? 'Analyzing...' : 'Scan Waste'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {scanResult && (
          <View style={styles.content}>
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Scan Results</Text>
              
              <View style={styles.wasteTypeContainer}>
                <Text style={styles.wasteType}>
                  {scanResult.type.charAt(0).toUpperCase() + scanResult.type.slice(1)}
                </Text>
                <Text style={styles.confidence}>
                  {Math.round(scanResult.confidence * 100)}% confidence
                </Text>
              </View>

              <View style={[
                styles.recyclableStatus,
                { backgroundColor: scanResult.recyclable ? '#F0FDF4' : '#FEF2F2' }
              ]}>
                <Text style={[
                  styles.recyclableText,
                  { color: scanResult.recyclable ? '#22C55E' : '#EF4444' }
                ]}>
                  {scanResult.recyclable ? 'Recyclable ✓' : 'Not Recyclable ✗'}
                </Text>
              </View>

              <View style={styles.recommendations}>
                <Text style={styles.recommendationsTitle}>Recommendations:</Text>
                {scanResult.recommendations.map((rec: string, index: number) => (
                  <Text key={index} style={styles.recommendationItem}>• {rec}</Text>
                ))}
              </View>

              <View style={styles.providers}>
                <Text style={styles.providersTitle}>Nearby Providers:</Text>
                {scanResult.suggestedProviders.map((provider: any, index: number) => (
                  <TouchableOpacity key={index} style={styles.providerItem}>
                    <Text style={styles.providerName}>{provider.name}</Text>
                    <Text style={styles.providerDistance}>{provider.distance}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.newScanButton}
              onPress={() => {
                setSelectedImage(null);
                setScanResult(null);
              }}
            >
              <Text style={styles.newScanButtonText}>Scan Another Item</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  instructions: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#166534',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    width: '45%',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
  },
  scanButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wasteType: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  confidence: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  recyclableStatus: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  recyclableText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  recommendations: {
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  recommendationItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  providers: {
    marginBottom: 16,
  },
  providersTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  providerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  providerName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  providerDistance: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  newScanButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  newScanButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    textAlign: 'center',
  },
});