export interface HouseholdData {
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