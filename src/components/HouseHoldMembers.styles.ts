import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 16,
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    memberAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E3F2FD',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    avatarText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0277BD',
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    memberEmail: {
      fontSize: 12,
      color: '#666',
    },
    pointsContainer: {
      alignItems: 'center',
    },
    pointsValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0277BD',
    },
    pointsLabel: {
      fontSize: 12,
      color: '#666',
    },
    emptyText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      padding: 16,
    },
  });

  export default styles;