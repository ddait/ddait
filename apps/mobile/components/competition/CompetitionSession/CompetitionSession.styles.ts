import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playerInfo: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  playerLevel: {
    fontSize: 14,
    opacity: 0.8,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 8,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  progressContainer: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingVertical: 20,
  },
  resultDisplay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  resultText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 