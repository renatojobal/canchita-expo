import { Player, Group, Match, Tournament } from '../types';

// Mock players data
export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Ren',
    position: 'Midfielder',
    avatar: '',
    stats: {
      goals: 15,
      assists: 8,
      matches: 25,
      wins: 18,
      losses: 5,
      draws: 2,
      yellowCards: 3,
      redCards: 0
    },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Carlos',
    position: 'Forward',
    avatar: '',
    stats: {
      goals: 22,
      assists: 5,
      matches: 25,
      wins: 18,
      losses: 5,
      draws: 2,
      yellowCards: 1,
      redCards: 0
    },
    createdAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Diego',
    position: 'Defender',
    avatar: '',
    stats: {
      goals: 3,
      assists: 12,
      matches: 24,
      wins: 17,
      losses: 5,
      draws: 2,
      yellowCards: 4,
      redCards: 1
    },
    createdAt: new Date('2024-01-17')
  },
  {
    id: '4',
    name: 'Luis',
    position: 'Goalkeeper',
    avatar: '',
    stats: {
      goals: 0,
      assists: 1,
      matches: 23,
      wins: 16,
      losses: 5,
      draws: 2,
      yellowCards: 2,
      redCards: 0
    },
    createdAt: new Date('2024-01-18')
  }
];

// Mock groups data
export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Friends Soccer Group',
    description: 'Our weekly soccer matches',
    players: mockPlayers,
    createdBy: '1',
    createdAt: new Date('2024-01-15'),
    isActive: true
  }
];

// Mock matches data
export const mockMatches: Match[] = [
  {
    id: '1',
    groupId: '1',
    teamA: [mockPlayers[0], mockPlayers[1]],
    teamB: [mockPlayers[2], mockPlayers[3]],
    scoreA: 3,
    scoreB: 2,
    status: 'completed',
    startTime: new Date('2024-10-01T15:00:00'),
    endTime: new Date('2024-10-01T16:30:00'),
    events: [
      {
        id: '1',
        type: 'goal',
        playerId: '1',
        team: 'A',
        minute: 15,
        description: 'Great shot from midfield',
        timestamp: new Date('2024-10-01T15:15:00')
      },
      {
        id: '2',
        type: 'goal',
        playerId: '2',
        team: 'A',
        minute: 23,
        description: 'Header from corner',
        timestamp: new Date('2024-10-01T15:23:00')
      }
    ],
    createdAt: new Date('2024-10-01T14:00:00')
  }
];

// Mock tournaments data
export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Weekly Cup Championship',
    groupId: '1',
    players: mockPlayers,
    format: 'single_elimination',
    status: 'upcoming',
    rounds: [],
    createdAt: new Date('2024-10-01'),
    startDate: new Date('2024-10-15')
  }
];