import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../../theme';
import { ProgressBar } from '../ProgressBar/ProgressBar';

export interface ExerciseCardProps {
  title: string;
  type: string;
  duration: number;
  calories: number;
  status: 'not_started' | 'in_progress' | 'completed';
  progress?: number;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ExerciseCard({
  title,
  type,
  duration,
  calories,
  status,
  progress,
  onPause,
  onResume,
  onStop,
  style,
}: ExerciseCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{duration} min</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={styles.statValue}>{calories} kcal</Text>
        </View>
      </View>
      {status === 'in_progress' && (
        <ProgressBar
          testID="progress-bar"
          value={progress}
          size="small"
          color="#007AFF"
        />
      )}
      <View style={styles.footer}>
        {status === 'not_started' && (
          <TouchableOpacity onPress={onResume} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        {status === 'in_progress' && (
          <>
            <TouchableOpacity onPress={onPause} style={styles.button}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onStop} style={[styles.button, styles.stopButton]}>
              <Text style={[styles.buttonText, styles.stopButtonText]}>Stop</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'completed' && (
          <TouchableOpacity onPress={onResume} style={styles.button}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  type: {
    fontSize: 14,
    color: '#757575',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stats: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  stopButtonText: {
    color: '#FFFFFF',
  },
}); 