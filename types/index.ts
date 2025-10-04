// Player types
export interface Player {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  stats: PlayerStats;
  createdAt: Date;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  yellowCards: number;
  redCards: number;
}

// Group types
export interface Group {
  id: string;
  name: string;
  description?: string;
  players: Player[];
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}

// Match types
export interface Match {
  id: string;
  groupId: string;
  teamA: Player[];
  teamB: Player[];
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  startTime: Date;
  endTime?: Date;
  events: MatchEvent[];
  createdAt: Date;
}

export type MatchStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface MatchEvent {
  id: string;
  type: MatchEventType;
  playerId: string;
  team: 'A' | 'B';
  minute: number;
  description?: string;
  timestamp: Date;
}

export type MatchEventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution';

// Tournament types
export interface Tournament {
  id: string;
  name: string;
  groupId: string;
  players: Player[];
  format: TournamentFormat;
  status: TournamentStatus;
  rounds: TournamentRound[];
  winner?: Player;
  createdAt: Date;
  startDate: Date;
  endDate?: Date;
}

export type TournamentFormat = 'single_elimination' | 'double_elimination' | 'round_robin' | 'group_stage_knockout';
export type TournamentStatus = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';

export interface TournamentRound {
  id: string;
  roundNumber: number;
  matches: Match[];
  name: string; // e.g., "Quarterfinals", "Group A", etc.
  isGroupStage: boolean;
}