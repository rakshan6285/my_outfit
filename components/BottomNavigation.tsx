import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabType = 'home' | 'profile' | 'saved';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { key: 'home', label: 'Home', active: 'home-sharp', inactive: 'home-outline' },
  { key: 'profile', label: 'Profile', active: 'person-sharp', inactive: 'person-outline' },
  { key: 'saved', label: 'Saved', active: 'bookmark-sharp', inactive: 'bookmark-outline' },
] as const;

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => (
  <View style={styles.container}>
    {tabs.map(({ key, label, active, inactive }) => {
      const isActive = activeTab === key;
      return (
        <TouchableOpacity
          key={key}
          style={styles.tab}
          onPress={() => onTabChange(key)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isActive ? active : inactive}
            size={24}
            color={isActive ? '#1F2937' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, isActive && styles.activeTabText]}>{label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    height: 70,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 2,
  },
  activeTabText: {
    color: '#1F2937',
    fontWeight: '600',
  },
});

export default BottomNavigation;
