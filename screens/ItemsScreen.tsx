import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from '../types';

interface ItemsScreenProps {
  items: Item[];
}

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemSpacing = 12;
const horizontalPadding = 16;
const itemWidth =
  (width - horizontalPadding * 2 - itemSpacing * (numColumns - 1)) /
  numColumns;

const ItemsScreen: React.FC<ItemsScreenProps> = ({ items = [] }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [saved, setSaved] = useState<{ [key: string]: boolean }>({});


  // const filterOptions = useMemo(() => {
  //   const allOptions = new Set<string>();
  //   items.forEach((item) => {
  //     if (item.style && Array.isArray(item.style)) {
  //       item.style.forEach((style) => allOptions.add(style));
  //     }
  //     if (item.category) allOptions.add(item.category);
  //     if (item.color) allOptions.add(item.color);
  //   });
  //   return Array.from(allOptions);
  // }, [items]);

  // Apply filters
  const filteredItems = useMemo(() => {
    if (!items || !Array.isArray(items)) return [];
    if (selectedFilters.length === 0) return items;
    return items.filter(
      (item) =>
        selectedFilters.some(
          (filter) =>
            (item.style &&
              Array.isArray(item.style) &&
              item.style.includes(filter)) ||
            item.category === filter ||
            item.color === filter
        )
    );
  }, [items, selectedFilters]);

  const toggleSave = (id: string) => {
    setSaved((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const isEven = index % 2 === 0;
    const isSaved = saved[item.id];

    return (
      <TouchableOpacity
        style={[
          styles.itemCard,
          {
            width: itemWidth,
            marginRight: isEven ? itemSpacing : 0,
          },
        ]}
        activeOpacity={0.95}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.itemImage}
            resizeMode="cover"
          />

          {/* Save Icon */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => toggleSave(item.id)}
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          {item.price && (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>${item.price}</Text>
            </View>
          )}
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemLabel}>{item.subcategory}</Text>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.dropdownFilter}>
          <Text style={styles.dropdownText}>Type v</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownFilter}>
          <Text style={styles.dropdownText}>Style v</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownFilter}>
          <Text style={styles.dropdownText}>Mood v</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownFilter}>
          <Text style={styles.dropdownText}>Color v</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: itemSpacing }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: horizontalPadding,
    paddingTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dropdownFilter: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  listContainer: {
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: itemSpacing,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: itemWidth * 1.3,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 6,
    borderRadius: 20,
  },
  priceTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    color: '#1F2937',
    fontSize: 12,
    fontWeight: '600',
  },
  itemInfo: {
    padding: 12,
  },
  itemLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 18,
  },
});

export default ItemsScreen;
