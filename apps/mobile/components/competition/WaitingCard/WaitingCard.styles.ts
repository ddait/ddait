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
  waitingIndicator: {
    marginVertical: 20,
  },
  opponentInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  opponentName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  opponentLevel: {
    fontSize: 16,
    marginBottom: 4,
  },
  opponentWinRate: {
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
}); 