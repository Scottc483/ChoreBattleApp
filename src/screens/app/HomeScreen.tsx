// src/screens/app/HomeScreen.tsx
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, SectionList, SectionListData } from 'react-native';

import styles from './HomeScreen.styles';
import { AuthContext } from '../../context/AuthContext';
import { AppTabParamList } from '../../types/navigation.types';
import AssignedChoresList from '../../components/AssignedChoresList';
import HouseholdMembers from '../../components/HouseholdMembers';

type HomeScreenNavigationProp = BottomTabNavigationProp<AppTabParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface HouseholdData {
  id: string;
  name: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  members: {
    id: string;
    name: string;
    email: string;
    totalPoints: number;
  }[];
  _count: {
    members: number;
    chores: number;
    rewards: number;
  };
}

interface Chore {
  id: string;
  title: string;
  description: string;
  rank: {
    id: string;
    name: string;
    displayName: string;
    pointValue: number;
    isSystem: boolean;
  };
  frequency: {
    id: string;
    name: string;
    displayName: string;
    daysInterval: number;
    isSystem: boolean;
  };
  isComplete: boolean;
  nextReset: string;
  currentStreak: number;
  totalCompletions: number;
  assignedTo: {
    id: string;
    name: string;
  } | null;
  createdBy: {
    id: string;
    name: string;
  };
  lastCompletion: string | null;
}

// Define section data types
type SectionItem = {
  type: 'members' | 'chores';
  id: string;
};

type Section = {
  title: string;
  data: SectionItem[];
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { userInfo, authAxios } = useContext(AuthContext);
  const [householdData, setHouseholdData] = useState<HouseholdData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assignedChores, setAssignedChores] = useState<Chore[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHouseholdData = async (): Promise<void> => {
    try {
      setError(null);
      
      // Check if user belongs to a household
      if (userInfo?.household?.id) {
        const response = await authAxios.get(`/households/?id=${userInfo.household.id}`);
        
        // Set the household data from the nested structure
        setHouseholdData(response.data.household);
      } else {
        setHouseholdData(null);
      }
    } catch (err) {
      console.log('Error fetching household data: ', err);
      setError('Failed to load household data. Please try again.');
    }
  };

  const fetchChores = async () => {
    try {
      const response = await authAxios.get('/chores');
      
      if (response.data && Array.isArray(response.data)) {
        // Filter chores to only show those assigned to the current user
        const userChores = response.data.filter(
          chore => chore.assignedTo && chore.assignedTo.id === userInfo?.id
        );
        setAssignedChores(userChores);
      }
    } catch (err) {
      console.error('Error fetching chores:', err);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchHouseholdData(), fetchChores()]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [userInfo]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchAllData();
  };

  const navigateToCreateHousehold = () => {
    navigation.navigate('CreateHousehold');
  };

  const navigateToJoinHousehold = () => {
    navigation.navigate('JoinHousehold');
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!householdData) {
    return (
      <View style={styles.noHouseholdContainer}>
        <Text style={styles.welcomeText}>Welcome, {userInfo?.name || 'User'}</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Text style={styles.sectionTitle}>You're not part of any household yet</Text>
        <Text style={styles.instructionText}>Join an existing household or create a new one:</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Join Household"
            onPress={navigateToJoinHousehold}
            color="#007BFF"
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Create Household" 
            onPress={navigateToCreateHousehold}
            color="#28a745"
          />
        </View>
      </View>
    );
  }

  // Prepare the sections for the SectionList
  const sections: Section[] = [
    {
      title: 'Members',
      data: [{ type: 'members', id: 'members-section' }]
    },
    {
      title: 'Your Assigned Chores',
      data: [{ type: 'chores', id: 'chores-section' }]
    }
  ];

  // Render household home screen with integrated components
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {userInfo?.name || 'User'}</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Text style={styles.householdName}>{householdData.name}</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{householdData._count.members}</Text>
          <Text style={styles.statLabel}>Members</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{householdData._count.chores}</Text>
          <Text style={styles.statLabel}>Chores</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{householdData._count.rewards}</Text>
          <Text style={styles.statLabel}>Rewards</Text>
        </View>
      </View>
      
      {/* Main content using SectionList */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        renderItem={({ item }) => {
          if (item.type === 'members') {
            return <HouseholdMembers members={householdData.members} />;
          } else if (item.type === 'chores') {
            return <AssignedChoresList 
                      chores={assignedChores} 
                      navigation={navigation} 
                    />;
          }
          return null;
        }}
        stickySectionHeadersEnabled={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={styles.sectionListContent}
      />
    </View>
  );
};

export default HomeScreen;