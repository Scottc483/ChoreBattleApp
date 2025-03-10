// src/components/AssignedChoresList.tsx
import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import styles from './AssignedChoresList.styles';

interface Rank {
  id: string;
  name: string;
  displayName: string;
  pointValue: number;
  isSystem: boolean;
}

interface Frequency {
  id: string;
  name: string;
  displayName: string;
  daysInterval: number;
  isSystem: boolean;
}

interface User {
  id: string;
  name: string;
}

interface Chore {
  id: string;
  title: string;
  description: string;
  rank: Rank;
  frequency: Frequency;
  isComplete: boolean;
  nextReset: string;
  currentStreak: number;
  totalCompletions: number;
  assignedTo: User | null;
  createdBy: User;
  lastCompletion: string | null;
}

interface AssignedChoresListProps {
  navigation: any;
  chores: Chore[];
}

const AssignedChoresList: React.FC<AssignedChoresListProps> = ({ navigation, chores }) => {
  const { userInfo } = useContext(AuthContext);

  const renderChoreItem = ({ item }: { item: Chore }) => {
    const formattedNextReset = new Date(item.nextReset).toLocaleDateString();
    
    return (
      <TouchableOpacity 
        style={styles.choreCard}
        onPress={() => navigation.navigate('ChoreDetails', { choreId: item.id })}
      >
        <View style={styles.choreHeader}>
          <Text style={styles.choreTitle}>{item.title}</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{item.rank.pointValue} pts</Text>
          </View>
        </View>
        
        <Text style={styles.choreDescription}>{item.description}</Text>
        
        <View style={styles.choreFooter}>
          <Text style={styles.frequencyText}>
            {item.frequency.displayName} • Reset: {formattedNextReset}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {chores.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No chores assigned to you</Text>
        </View>
      ) : (
        <FlatList
          data={chores}
          renderItem={renderChoreItem}
          keyExtractor={item => item.id}
          scrollEnabled={false} // Disable scrolling to avoid nested scrollable views
        />
      )}
    </View>
  );
};


export default AssignedChoresList;