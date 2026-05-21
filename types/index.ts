export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  category: string;
  rating: number;
  price: number;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  domain: string;
  rating: number;
  sessions: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
  accent: "indigo" | "orange" | "green" | "purple";
}

export interface Stat {
  value: string;
  label: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
