import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Search, Filter, MapPin, Star, Phone, Truck, Recycle } from 'lucide-react-native';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: Truck },
    { id: 'plastic', label: 'Plastic', icon: Recycle },
    { id: 'metal', label: 'Metal', icon: Recycle },
    { id: 'glass', label: 'Glass', icon: Recycle },
    { id: 'paper', label: 'Paper', icon: Recycle },
  ];

  const providers = [
    {
      id: '1',
      name: 'EcoWaste Solutions',
      description: 'Professional waste management and recycling services for residential and commercial clients.',
      rating: 4.8,
      reviewsCount: 156,
      location: 'Downtown Area',
      distance: '2.3 km',
      services: ['plastic', 'metal', 'glass'],
      logo: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      priceRange: '$15-50',
      responseTime: '< 2 hours',
    },
    {
      id: '2',
      name: 'Green Cycle Co.',
      description: 'Specialized in organic waste composting and sustainable disposal methods.',
      rating: 4.6,
      reviewsCount: 89,
      location: 'West Side',
      distance: '3.1 km',
      services: ['paper', 'organic'],
      logo: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      priceRange: '$20-40',
      responseTime: '< 4 hours',
    },
    {
      id: '3',
      name: 'Metro Recyclers',
      description: 'Fast pickup service for all types of recyclable materials with competitive pricing.',
      rating: 4.4,
      reviewsCount: 203,
      location: 'East District',
      distance: '4.7 km',
      services: ['plastic', 'metal', 'glass', 'paper'],
      logo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: false,
      priceRange: '$10-35',
      responseTime: '< 6 hours',
    },
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || provider.services.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const getServiceColor = (service: string) => {
    const colors: { [key: string]: string } = {
      plastic: '#3B82F6',
      metal: '#6B7280',
      glass: '#10B981',
      paper: '#F59E0B',
      organic: '#22C55E',
    };
    return colors[service] || '#6B7280';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" strokeWidth={2} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search waste services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                activeCategory === category.id && styles.activeCategoryChip
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <IconComponent 
                size={16} 
                color={activeCategory === category.id ? '#ffffff' : '#6B7280'} 
                strokeWidth={2} 
              />
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Providers List */}
      <ScrollView 
        style={styles.providersList}
        showsVerticalScrollIndicator={false}
      >
        {filteredProviders.map((provider) => (
          <TouchableOpacity key={provider.id} style={styles.providerCard}>
            <View style={styles.providerHeader}>
              <Image source={{ uri: provider.logo }} style={styles.providerLogo} />
              <View style={styles.providerInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  {provider.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.ratingRow}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                  <Text style={styles.rating}>{provider.rating}</Text>
                  <Text style={styles.reviewsText}>({provider.reviewsCount} reviews)</Text>
                </View>

                <View style={styles.locationRow}>
                  <MapPin size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.locationText}>{provider.location} • {provider.distance}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.providerDescription}>{provider.description}</Text>

            <View style={styles.servicesContainer}>
              {provider.services.map((service) => (
                <View 
                  key={service} 
                  style={[
                    styles.serviceTag,
                    { backgroundColor: `${getServiceColor(service)}15` }
                  ]}
                >
                  <Text style={[styles.serviceText, { color: getServiceColor(service) }]}>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.providerFooter}>
              <View style={styles.priceInfo}>
                <Text style={styles.priceLabel}>Price Range</Text>
                <Text style={styles.priceRange}>{provider.priceRange}</Text>
                <Text style={styles.responseTime}>Response: {provider.responseTime}</Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={18} color="#6B7280" strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginLeft: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeCategoryChip: {
    backgroundColor: '#22C55E',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginLeft: 6,
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  providersList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  providerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  providerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  verifiedBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  verifiedText: {
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  providerDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  serviceTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  providerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  priceRange: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  responseTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#22C55E',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookButton: {
    backgroundColor: '#22C55E',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bookButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});