import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F7FA',
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
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      backgroundColor: '#FFFFFF',
      margin: 16,
      borderRadius: 12,
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
    },
  });
  
  
export default styles;
