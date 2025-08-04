export interface WasteProvider {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  services: WasteService[];
  location: string;
  latitude?: number;
  longitude?: number;
  rating: number;
  reviews_count: number;
  contact_phone: string;
  contact_email: string;
  verified: boolean;
  operating_hours: string;
  created_at: string;
}

export interface WasteService {
  id: string;
  type: 'plastic' | 'metal' | 'glass' | 'paper' | 'organic' | 'hazardous' | 'general';
  name: string;
  description: string;
  price_per_kg?: number;
  pickup_fee?: number;
  minimum_quantity?: number;
}

export interface WasteBooking {
  id: string;
  user_id: string;
  provider_id: string;
  service_type: string;
  estimated_weight: number;
  pickup_address: string;
  pickup_date: string;
  pickup_time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_amount?: number;
  notes?: string;
  created_at: string;
  provider: WasteProvider;
}