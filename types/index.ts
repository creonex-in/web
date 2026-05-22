import type { ComponentType } from "react";

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
  Icon: ComponentType<{ className?: string }>;
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

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
