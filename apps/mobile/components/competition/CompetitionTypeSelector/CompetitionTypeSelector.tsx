import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
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
    id: 'group',
    title: '그룹 챌린지',
    description: '여러 사용자와 함께 도전하세요',
    icon: 'users',
  },
  {
    id: 'ranking',
    title: '랭킹전',
    description: '주간/월간 랭킹에 도전하세요',
    icon: 'trophy',
  },
  {
    id: 'history',
    title: '과거 기록 도전',
    description: '나의 과거 기록에 도전하세요',
    icon: 'history',
  },
];

export function CompetitionTypeSelector({
  onSelect,
  disabled = false,
  selectedType,
}: CompetitionTypeSelectorProps) {
  const styles = createStyles();
  const scaleAnims = React.useRef(
    COMPETITION_TYPES.map(() => new Animated.Value(1))
  ).current;

  const handlePressIn = (index: number) => {
    Animated.spring(scaleAnims[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scaleAnims[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSelect = (type: CompetitionType, index: number) => {
    if (!disabled) {
      handlePressOut(index);
      onSelect(type);
    }
  };

  return (
    <View style={styles.container} testID="competition-type-selector">
      <View style={styles.grid}>
        {COMPETITION_TYPES.map((type, index) => (
          <Animated.View
            key={type.id}
            style={[
              styles.gridItem,
              { transform: [{ scale: scaleAnims[index] }] },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.typeCard,
                selectedType === type.id && styles.typeCardSelected,
                disabled && styles.typeCardDisabled,
              ]}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              onPress={() => handleSelect(type.id, index)}
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
          </Animated.View>
        ))}
      </View>
    </View>
  );
} 