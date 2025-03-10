// src/screens/app/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/common.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  householdName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  errorText: {
    color: colors.danger,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    color: colors.text.primary,
    backgroundColor: '#F5F7FA',
  },
  sectionListContent: {
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  noHouseholdContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: colors.text.secondary,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  buttonSpacer: {
    height: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  choreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  choreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  choreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  pointsContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    color: '#0277BD',
    fontWeight: '600',
    fontSize: 14,
  },
  choreDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  choreFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  frequencyText: {
    fontSize: 12,
    color: '#888',
  },
});

export default styles;