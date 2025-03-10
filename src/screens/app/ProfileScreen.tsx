// src/screens/app/ProfileScreen.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './ProfileScreen.styles';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.nameText}>{userInfo?.name || 'User'}</Text>
        <Text style={styles.emailText}>{userInfo?.email || 'No email'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>User ID:</Text>
          <Text style={styles.infoValue}>{userInfo?.id || 'N/A'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
