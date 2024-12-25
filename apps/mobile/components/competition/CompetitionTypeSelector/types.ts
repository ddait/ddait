import { ComponentProps } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export type CompetitionType = 'oneOnOne' | 'history' | 'friend';

export interface CompetitionTypeInfo {
  id: CompetitionType;
  title: string;
  description: string;
  icon: ComponentProps<typeof FontAwesome>['name'];
}

export interface CompetitionTypeSelectorProps {
  onSelect: (type: CompetitionType) => void;
  disabled?: boolean;
  selectedType?: CompetitionType;
} 