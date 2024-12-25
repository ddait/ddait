import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createStyles } from './CompetitionTypeSelector.styles';
import { CompetitionType, CompetitionTypeInfo, CompetitionTypeSelectorProps } from './types';

const COMPETITION_TYPES: CompetitionTypeInfo[] = [
  {
    id: 'oneOnOne',
    title: '1:1 대결',
    description: '실시간으로 다른 사용자와 대결하세요',
    icon: 'users',
  },
  {
    id: 'history',
    title: '과거 기록과 대결',
    description: '나의 과거 기록에 도전하세요',
    icon: 'history',
  },
  {
    id: 'friend',
    title: '친구 대결',
    description: '친구를 초대하여 함께 운동하세요',
    icon: 'user-plus',
  },
];

export function CompetitionTypeSelector({
  onSelect,
  disabled = false,
  selectedType,
}: CompetitionTypeSelectorProps) {
  const styles = createStyles();

  const handleSelect = (type: CompetitionType) => {
    if (!disabled) {
      onSelect(type);
    }
  };

  return (
    <View style={styles.container} testID="competition-type-selector">
      {COMPETITION_TYPES.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.typeCard,
            selectedType === type.id && styles.typeCardSelected,
            disabled && styles.typeCardDisabled,
          ]}
          onPress={() => handleSelect(type.id)}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={type.title}
          accessibilityState={{ selected: selectedType === type.id }}
        >
          <View
            style={[
              styles.iconContainer,
              selectedType === type.id && styles.iconContainerSelected,
            ]}
          >
            <FontAwesome
              name={type.icon}
              style={[
                styles.icon,
                selectedType === type.id && styles.iconSelected,
              ]}
              testID={`competition-type-${type.id}-icon`}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.title,
                selectedType === type.id && styles.titleSelected,
              ]}
            >
              {type.title}
            </Text>
            <Text
              style={[
                styles.description,
                selectedType === type.id && styles.descriptionSelected,
              ]}
            >
              {type.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
} 