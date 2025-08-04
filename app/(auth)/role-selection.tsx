import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Users, Truck, Building, Shield } from 'lucide-react-native';

const roles = [
  {
    id: 'volunteer',
    title: 'Volunteer',
    description: 'Join cleanup events and green initiatives in your community',
    icon: Users,
    color: '#22C55E',
  },
  {
    id: 'waste_provider',
    title: 'Waste Management Provider',
    description: 'Offer waste collection and recycling services',
    icon: Truck,
    color: '#3B82F6',
  },
  {
    id: 'ngo',
    title: 'NGO/Organization',
    description: 'Organize events and environmental programs',
    icon: Building,
    color: '#8B5CF6',
  },
  {
    id: 'government',
    title: 'Government Institution',
    description: 'Coordinate municipal environmental initiatives',
    icon: Shield,
    color: '#F59E0B',
  },
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      // Here you would update the user's role in the database
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you'd like to contribute to our environmental mission
        </Text>
      </View>

      <ScrollView style={styles.rolesContainer} showsVerticalScrollIndicator={false}>
        {roles.map((role) => {
          const IconComponent = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                isSelected && { ...styles.selectedCard, borderColor: role.color }
              ]}
              onPress={() => setSelectedRole(role.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${role.color}15` }]}>
                <IconComponent size={32} color={role.color} strokeWidth={2} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
              <View style={[
                styles.radioButton,
                isSelected && { ...styles.selectedRadio, backgroundColor: role.color }
              ]} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity 
        style={[
          styles.continueButton,
          !selectedRole && styles.disabledButton
        ]} 
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  rolesContainer: {
    flex: 1,
    marginBottom: 24,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginLeft: 12,
  },
  selectedRadio: {
    borderColor: 'transparent',
  },
  continueButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 48,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },
});