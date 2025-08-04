export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'volunteer' | 'waste_provider' | 'ngo' | 'government';
  avatar_url?: string;
  points: number;
  created_at: string;
  phone?: string;
  location?: string;
  bio?: string;
  verified: boolean;
}

export interface UserProfile extends User {
  events_joined: number;
  events_created: number;
  achievements: Achievement[];
  connections: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked_at: string;
}