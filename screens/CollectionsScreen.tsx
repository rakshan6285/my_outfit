import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Collection } from '../types';

interface CollectionsScreenProps {
  collections: Collection[];
}

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemSpacing = 12;
const horizontalPadding = 16;
const itemWidth =
  (width - horizontalPadding * 2 - itemSpacing * (numColumns - 1)) /
  numColumns;

const CollectionsScreen: React.FC<CollectionsScreenProps> = ({ collections }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);



  const filteredCollections = useMemo(() => {
    if (!collections || !Array.isArray(collections)) return [];
    if (selectedFilters.length === 0) return collections;
    return collections.filter(
      (collection) =>
        collection.tags &&
        Array.isArray(collection.tags) &&
        selectedFilters.some((filter) => collection.tags.includes(filter))
    );
  }, [collections, selectedFilters]);

  const renderCollection = ({ item, index }: { item: Collection; index: number }) => {
    const isEven = index % 2 === 0;

    return (
      <TouchableOpacity
        style={[
          styles.collectionCard,
          {
            width: itemWidth,
            marginRight: isEven ? itemSpacing : 0,
          },
        ]}
        activeOpacity={0.95}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.coverImage }}
            style={styles.collectionImage}
            resizeMode="cover"
          />
          <View style={styles.saveButton}>
            <Ionicons name="bookmark" size={18} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.collectionInfo}>
          <Text style={styles.collectionTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemCount}>{item.itemCount} items</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.addNewButton}>
          <Text style={styles.addNewText}>+ Add new</Text>
        </TouchableOpacity>

        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes('work') && styles.activeFilterButton,
            ]}
            onPress={() => {
              if (selectedFilters.includes('work')) {
                setSelectedFilters(selectedFilters.filter((f) => f !== 'work'));
              } else {
                setSelectedFilters([...selectedFilters, 'work']);
              }
            }}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilters.includes('work') && styles.activeFilterButtonText,
              ]}
            >
              Work
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes('leisure') && styles.activeFilterButton,
            ]}
            onPress={() => {
              if (selectedFilters.includes('leisure')) {
                setSelectedFilters(selectedFilters.filter((f) => f !== 'leisure'));
              } else {
                setSelectedFilters([...selectedFilters, 'leisure']);
              }
            }}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilters.includes('leisure') && styles.activeFilterButtonText,
              ]}
            >
              Leisure
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes('designer') && styles.activeFilterButton,
            ]}
            onPress={() => {
              if (selectedFilters.includes('designer')) {
                setSelectedFilters(selectedFilters.filter((f) => f !== 'designer'));
              } else {
                setSelectedFilters([...selectedFilters, 'designer']);
              }
            }}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilters.includes('designer') && styles.activeFilterButtonText,
              ]}
            >
              Designer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredCollections}
        renderItem={renderCollection}
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
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  addNewButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  addNewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  filterButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterButton: {
    backgroundColor: '#1F2937',
    borderColor: '#1F2937',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  collectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: itemSpacing,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: itemWidth * 1.3,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },
  collectionInfo: {
    padding: 12,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default CollectionsScreen;
