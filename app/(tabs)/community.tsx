import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Search, MessageCircle, UserPlus, Award, MapPin } from 'lucide-react-native';

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');

  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'following', label: 'Following' },
    { id: 'groups', label: 'Groups' },
  ];

  const communityMembers = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Environmental Activist',
      location: 'San Francisco, CA',
      points: 2450,
      eventsJoined: 15,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      badges: ['Top Volunteer', 'Tree Planter'],
    },
    {
      id: '2',
      name: 'Green Valley NGO',
      role: 'Organization',
      location: 'Los Angeles, CA',
      points: 5680,
      eventsJoined: 45,
      avatar: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      badges: ['Event Organizer', 'Community Leader'],
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      role: 'Volunteer',
      location: 'Austin, TX',
      points: 1230,
      eventsJoined: 8,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: false,
      badges: ['Beach Cleaner'],
    },
  ];

  const groups = [
    {
      id: '1',
      name: 'Ocean Protectors',
      description: 'Dedicated to marine conservation and beach cleanup initiatives',
      members: 234,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Marine Conservation',
    },
    {
      id: '2',
      name: 'Urban Gardeners',
      description: 'Creating green spaces in urban environments',
      members: 189,
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Urban Greening',
    },
  ];

  const renderDiscoverContent = () => (
    <>
      {/* Featured Members */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Members</Text>
        {communityMembers.map((member) => (
          <TouchableOpacity key={member.id} style={styles.memberCard}>
            <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
            
            <View style={styles.memberInfo}>
              <View style={styles.memberHeader}>
                <Text style={styles.memberName}>{member.name}</Text>
                {member.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.memberRole}>{member.role}</Text>
              
              <View style={styles.memberLocation}>
                <MapPin size={14} color="#6B7280" strokeWidth={2} />
                <Text style={styles.locationText}>{member.location}</Text>
              </View>

              <View style={styles.memberStats}>
                <View style={styles.statItem}>
                  <Award size={16} color="#F59E0B" strokeWidth={2} />
                  <Text style={styles.statText}>{member.points} pts</Text>
                </View>
                <View style={styles.statItem}>
                  <Users size={16} color="#22C55E" strokeWidth={2} />
                  <Text style={styles.statText}>{member.eventsJoined} events</Text>
                </View>
              </View>

              <View style={styles.badges}>
                {member.badges.map((badge, index) => (
                  <View key={index} style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.memberActions}>
              <TouchableOpacity style={styles.connectButton}>
                <UserPlus size={18} color="#22C55E" strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <MessageCircle size={18} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Community Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Groups</Text>
        {groups.map((group) => (
          <TouchableOpacity key={group.id} style={styles.groupCard}>
            <Image source={{ uri: group.image }} style={styles.groupImage} />
            <View style={styles.groupContent}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupCategory}>{group.category}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
              <View style={styles.groupStats}>
                <Users size={16} color="#6B7280" strokeWidth={2} />
                <Text style={styles.groupMembersText}>{group.members} members</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" strokeWidth={2} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search community..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'discover' && renderDiscoverContent()}
        {activeTab === 'following' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Start following community members to see their updates here</Text>
          </View>
        )}
        {activeTab === 'groups' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Join groups to connect with like-minded environmentalists</Text>
          </View>
        )}
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
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
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  memberCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberName: {
    fontSize: 16,
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
  memberRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  memberLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  memberStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  memberActions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: 80,
    height: 80,
  },
  groupContent: {
    flex: 1,
    padding: 16,
  },
  groupName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  groupCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#22C55E',
    marginBottom: 6,
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  groupStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupMembersText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});