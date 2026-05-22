import {
  FaPaintBrush,
  FaCode,
  FaBullhorn,
  FaChartPie,
  FaPenNib,
  FaRocket,
  FaCamera,
  FaMusic,
} from "react-icons/fa";
import type { Course, Expert, Category, Stat, Step, Testimonial, FAQ } from "@/types";

export const STATS: Stat[] = [
  { value: "50K+", label: "Active Learners" },
  { value: "1,200+", label: "Expert Mentors" },
  { value: "3,500+", label: "Courses & Workshops" },
  { value: "4.8★", label: "Average Rating" },
];

export const CATEGORIES: Category[] = [
  { id: "design", label: "UI/UX Design", Icon: FaPaintBrush, count: 240, accent: "indigo" },
  { id: "dev", label: "Development", Icon: FaCode, count: 520, accent: "orange" },
  { id: "marketing", label: "Marketing", Icon: FaBullhorn, count: 180, accent: "green" },
  { id: "finance", label: "Finance", Icon: FaChartPie, count: 150, accent: "purple" },
  { id: "content", label: "Content Creation", Icon: FaPenNib, count: 210, accent: "indigo" },
  { id: "startup", label: "Startups", Icon: FaRocket, count: 130, accent: "orange" },
  { id: "photo", label: "Photography", Icon: FaCamera, count: 95, accent: "green" },
  { id: "music", label: "Music", Icon: FaMusic, count: 88, accent: "purple" },
];

export const FEATURED_COURSES: Course[] = [
  {
    id: "1",
    title: "Complete UI/UX Design Bootcamp 2025",
    instructor: "Arjun Sharma",
    instructorAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    category: "Design",
    rating: 4.9,
    price: 1499,
  },
  {
    id: "2",
    title: "Full-Stack Development with React & Node.js",
    instructor: "Priya Mehta",
    instructorAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    category: "Development",
    rating: 4.8,
    price: 1999,
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass for India",
    instructor: "Rohan Gupta",
    instructorAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    category: "Marketing",
    rating: 4.7,
    price: 999,
  },
  {
    id: "4",
    title: "Financial Planning & Investing for Beginners",
    instructor: "Sneha Kapoor",
    instructorAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    category: "Finance",
    rating: 4.8,
    price: 1299,
  },
];

export const FEATURED_EXPERTS: Expert[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    title: "Senior Product Designer at Razorpay",
    avatar: "",
    domain: "UI/UX Design",
    rating: 4.9,
    sessions: 312,
  },
  {
    id: "2",
    name: "Priya Mehta",
    title: "Full-Stack Engineer, Ex-Flipkart",
    avatar: "",
    domain: "Development",
    rating: 4.8,
    sessions: 248,
  },
  {
    id: "3",
    name: "Rohan Gupta",
    title: "Growth Marketer & Startup Advisor",
    avatar: "",
    domain: "Marketing",
    rating: 4.7,
    sessions: 195,
  },
  {
    id: "4",
    name: "Sneha Kapoor",
    title: "SEBI-certified Financial Planner",
    avatar: "",
    domain: "Finance",
    rating: 4.9,
    sessions: 420,
  },
];

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: "01",
    title: "Discover your path",
    description:
      "Browse thousands of courses and expert profiles across every creative and professional domain.",
  },
  {
    number: "02",
    title: "Learn or book a session",
    description:
      "Enroll in self-paced courses or book a 1-on-1 mentorship session with a verified expert.",
  },
  {
    number: "03",
    title: "Grow with real guidance",
    description:
      "Get feedback, build projects, and unlock your next opportunity with hands-on mentorship.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Kavya Reddy",
    role: "UI Designer, Bangalore",
    avatar: "",
    quote:
      "Creonex connected me with a Razorpay designer who reviewed my portfolio in a single session. I landed my first design job within 3 weeks.",
    rating: 5,
  },
  {
    id: "2",
    name: "Aditya Nair",
    role: "Freelance Developer, Kochi",
    avatar: "",
    quote:
      "The React course here is hands-down better than anything on Udemy. Real projects, real feedback, and a community that actually helps.",
    rating: 5,
  },
  {
    id: "3",
    name: "Meera Joshi",
    role: "Content Creator, Mumbai",
    avatar: "",
    quote:
      "Booked three sessions with a growth marketing expert. My Instagram went from 2K to 18K followers in two months. Insane ROI.",
    rating: 5,
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How is Creonex different from other learning platforms?",
    answer:
      "Creonex combines self-paced courses with live 1-on-1 mentorship from verified industry professionals across India. You don't just watch videos — you get real guidance from people doing the work right now.",
  },
  {
    question: "How do I book a session with an expert?",
    answer:
      "Browse expert profiles, check their availability, and book a slot directly. Sessions are conducted via video call. Payment is held securely until after the session.",
  },
  {
    question: "Are the courses and sessions available in regional languages?",
    answer:
      "Yes! Many of our experts offer sessions in Hindi, Tamil, Telugu, Kannada, and other regional languages. You can filter by language on the expert search page.",
  },
  {
    question: "What if I'm not satisfied with a session?",
    answer:
      "We offer a full refund within 24 hours of a session if you're not satisfied. Our support team reviews each case and processes refunds within 2–3 business days.",
  },
  {
    question: "Can I become an expert on Creonex?",
    answer:
      "Absolutely. If you have professional expertise and want to teach or mentor, apply through our 'Become a Creator' page. We review applications within 5–7 business days.",
  },
];
