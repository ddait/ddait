import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  matchingIndicator: {
    marginVertical: 20,
  },
  waitTimeText: {
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    color: '#FF4444',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
}); 