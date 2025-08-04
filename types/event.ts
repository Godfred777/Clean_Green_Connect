export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'cleanup' | 'greening' | 'educational' | 'recycling';
  date: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
  max_participants: number;
  current_participants: number;
  organizer_id: string;
  organizer: {
    full_name: string;
    avatar_url?: string;
    verified: boolean;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  before_photos: string[];
  after_photos: string[];
  created_at: string;
  participants: EventParticipant[];
  tags: string[];
}

export interface EventParticipant {
  user_id: string;
  user: {
    full_name: string;
    avatar_url?: string;
  };
  joined_at: string;
  status: 'registered' | 'attended' | 'no_show';
}