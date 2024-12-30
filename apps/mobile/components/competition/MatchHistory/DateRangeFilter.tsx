import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { createStyles } from './styles';
import { DateRangeFilterProps } from './types';

export function DateRangeFilter({ range, onRangeChange }: DateRangeFilterProps) {
  const styles = createStyles();
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');

  const handlePress = (mode: 'start' | 'end') => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const newRange = {
        ...range,
        [pickerMode === 'start' ? 'startDate' : 'endDate']: selectedDate,
      };
      onRangeChange(newRange);
    }
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={() => handlePress('start')}>
        <Text style={styles.dateText}>
          {format(range.startDate, 'yyyy.MM.dd', { locale: ko })}
        </Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>~</Text>
      <TouchableOpacity onPress={() => handlePress('end')}>
        <Text style={styles.dateText}>
          {format(range.endDate, 'yyyy.MM.dd', { locale: ko })}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={pickerMode === 'start' ? range.startDate : range.endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)} // 1년 전
        />
      )}
    </View>
  );
} 