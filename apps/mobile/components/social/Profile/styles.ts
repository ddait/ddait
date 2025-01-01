import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  // UserInfo styles
  userInfoContainer: {
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  experienceBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginTop: 8,
  },
  experienceFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // ActivityStats styles
  statsContainer: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    margin: 8,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  // Achievements styles
  achievementsContainer: {
    padding: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#E5E5E5',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  achievementProgress: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  // Settings styles
  settingsContainer: {
    flex: 1,
  },
  settingSection: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
    color: '#666666',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    marginLeft: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  pickerItem: {
    padding: 12,
    borderRadius: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#10B981',
  },
  pickerItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  pickerItemTextSelected: {
    color: '#FFFFFF',
  },
}); 