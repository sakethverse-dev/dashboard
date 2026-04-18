export interface UserData {
  name: string;
  role: string;
  house: string;
}

export interface EventData {
  id?: string;
  title: string;
  club: string;
  formLink: string;
  deadline: string;
  winnerHouse?: string;
}

export interface CampusEvent {
  id?: string;
  title: string;
  club: string;
  date: string;
  status: 'live' | 'upcoming' | 'past';
  location?: string;
  description?: string;
  winner?: string;
}

export interface AnnouncementData {
  id?: string;
  title: string;
  content: string;
}

export interface HouseData {
  id?: string;
  name: string;
  points: number;
}

export interface ShoutoutData {
  id?: string;
  student: string;
  event: string;
  message: string;
  likes?: number;
}
