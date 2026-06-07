import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar, faBolt, faHeart, faEye, faCircleCheck,
  faUserPlus, faCalendarCheck, faUsers,
  faCode, faMicrophone, faPen, faBriefcase,
  faLocationDot, faClock, faQuoteLeft, faArrowRight, faTrophy, faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BadgesButton } from './badges-button'
import { BookSessionBar } from './book-session-bar'

// ─── Data ─────────────────────────────────────────────────────────────────────

const creator = {
  name: 'Arjun Sharma',
  bio: 'Design Career Coach · UI/UX Lead at Razorpay',
  bioLong: [
    "I've been a Design Lead for 7 years, interviewed 200+ candidates, and reviewed 500+ portfolios. I've hired designers at three startups and know exactly what separates callbacks from rejections.",
    "My students have landed roles at Razorpay, Zepto, Swiggy, CRED, and more — most with zero prior design background. I teach only what gets people hired. Nothing else.",
  ],
  location: 'Bengaluru, India',
  avatar: '/images/experts/expert-1.png',
  rating: 4.9,
  reviewCount: 127,
  students: 847,
  sessions: 312,
  yearsExp: 7,
  brandColorLight: '#ede9fe',
  skills: [
    { label: 'UI/UX Design', icon: faPen as IconDefinition },
    { label: 'Career Coaching', icon: faBriefcase as IconDefinition },
    { label: 'Figma & Design Systems', icon: faCode as IconDefinition },
    { label: 'Team Management', icon: faUsers as IconDefinition },
    { label: 'Public Speaking', icon: faMicrophone as IconDefinition },
  ],
}

const companies = ['Zepto', 'Swiggy', 'Razorpay', 'CRED', 'Meesho', 'PhonePe']

// ─── Offering cards ───────────────────────────────────────────────────────────

type BadgeVariant = 'urgency' | 'open' | 'new' | 'promo'
interface OfferingCard {
  id: string; title: string; category: string; image: string
  price: number; rating: number; likes: number; views: string
  badge?: string; badgeVariant?: BadgeVariant
}
const badgeStyles: Record<BadgeVariant, string> = {
  urgency: 'bg-red-500 text-white',
  open: 'bg-emerald-500 text-white',
  new: 'bg-blue-500 text-white',
  promo: 'bg-amber-500 text-white',
}

const courses: OfferingCard[] = [
  { id: 'course-1', title: 'Figma for Complete Beginners', category: 'UI Design', image: '/showcase/course-preview.png', price: 1299, rating: 4.9, likes: 517, views: '12.4k', badge: 'Bestseller', badgeVariant: 'promo' },
  { id: 'course-2', title: 'Think Like a Product Designer', category: 'Product Thinking', image: '/creator-profiles/create-course.png', price: 1799, rating: 4.8, likes: 389, views: '8.9k', badge: 'New', badgeVariant: 'new' },
  { id: 'course-3', title: 'Design Systems That Scale', category: 'Advanced Design', image: '/showcase/start-teaching-today.png', price: 2499, rating: 5.0, likes: 875, views: '5.2k' },
  { id: 'course-4', title: 'Portfolio That Gets Callbacks', category: 'Career', image: '/creator-profiles/second-section-image.png', price: 999, rating: 4.9, likes: 623, views: '9.1k', badge: 'Hot', badgeVariant: 'promo' },
  { id: 'course-5', title: 'Freelance UI Design in 30 Days', category: 'Freelancing', image: '/categories/category-1.png', price: 1499, rating: 4.7, likes: 445, views: '6.3k' },
  { id: 'course-6', title: 'UX Research for Beginners', category: 'UX Research', image: '/categories/category-2.jpeg', price: 1199, rating: 4.8, likes: 312, views: '4.7k' },
]
const sessions: OfferingCard[] = [
  { id: 'session-1', title: 'Portfolio & Career Review', category: '1:1 Call · 60 min', image: '/showcase/expert-session.png', price: 2500, rating: 4.9, likes: 248, views: '89 booked', badge: '3 slots left', badgeVariant: 'urgency' },
  { id: 'session-2', title: 'Design Career Accelerator', category: '4-Week Program', image: '/creator-profiles/sessions.png', price: 8000, rating: 5.0, likes: 134, views: '34 booked', badge: '1 spot left', badgeVariant: 'urgency' },
  { id: 'session-3', title: 'Figma Crash Course Call', category: '1:1 Call · 30 min', image: '/creator-profiles/himesh.jpeg', price: 1200, rating: 4.8, likes: 192, views: '52 booked' },
]
const groups: OfferingCard[] = [
  { id: 'group-1', title: 'Design Job Hunters', category: 'Community · Monthly', image: '/creator-profiles/join-community.png', price: 499, rating: 4.9, likes: 312, views: '48 members', badge: 'Open', badgeVariant: 'open' },
  { id: 'group-2', title: 'Senior Designer Mastermind', category: 'Community · Monthly', image: '/showcase/resources-library.png', price: 999, rating: 5.0, likes: 198, views: '22 members', badge: '3 spots left', badgeVariant: 'urgency' },
  { id: 'group-3', title: 'Weekly Portfolio Clinic', category: 'Group · Weekly', image: '/categories/category-3.jpg', price: 299, rating: 4.8, likes: 245, views: '31 members', badge: 'Open', badgeVariant: 'open' },
]


// ─── Reviews ──────────────────────────────────────────────────────────────────

interface Review {
  id: string; name: string; initials: string
  role: string; before: string; after: string
  rating: number; text: string
}
const reviews: Review[] = [
  { id: '1', name: 'Priya Nair', initials: 'PN', role: 'Product Designer at Zepto', before: 'Marketing Executive', after: '₹18L/year', rating: 5, text: 'I had zero design background. Arjun told me exactly what to fix. Got my first offer 6 weeks after our session.' },
  { id: '2', name: 'Karan Mehta', initials: 'KM', role: 'Freelance UI Designer', before: 'IT Support Engineer', after: '₹90K/month', rating: 5, text: 'No padding, no filler — just the stuff that actually matters. Quit my old job 3 months later.' },
  { id: '3', name: 'Ananya Reddy', initials: 'AR', role: 'Senior UX at PhonePe', before: 'Graphic Designer', after: '₹24L/year', rating: 5, text: "I'd been stuck at the same salary for 3 years. One portfolio audit session and I had 2 competing offers." },
  { id: '4', name: 'Vikram Singh', initials: 'VS', role: 'UI Lead at Meesho', before: 'Web Developer', after: '₹28L/year', rating: 5, text: 'The career roadmap Arjun gave me was worth 10x the session price. Absolute clarity on what to do next.' },
]

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const faqs: { q: string; a: string }[] = [
  { q: 'What happens in a 1:1 session?', a: 'We meet on Google Meet for 30 or 60 minutes. I review your portfolio, give you a prioritised list of changes, and answer career questions. You leave with a clear action plan.' },
  { q: 'How do I book and pay?', a: "Click Book Now, pick a slot, pay via UPI, card, or net banking. You'll get a calendar invite instantly." },
  { q: 'Can I reschedule?', a: 'Yes — up to 24 hours before the session, at no charge. Use the link in your confirmation email.' },
  { q: 'Do I need prior design experience?', a: "No. Most students started with zero design background. The only requirement is that you're serious about a career switch." },
  { q: 'Will I get a certificate?', a: "Course enrollments include a completion certificate. 1:1 sessions don't — but the portfolio you build will speak louder." },
]

// ─── Components ──────────────────────────────────────────────────────────────

function OfferingCard({ item }: { item: OfferingCard }): React.ReactElement {
  return (
    <div className="flex flex-col group rounded-[16px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 bg-white cursor-pointer p-1.5 pb-3">
      <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-gray-100 mb-3">
        <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
        {item.badge && item.badgeVariant && (
          <span className={cn('absolute top-3 left-3 text-[10px] font-bold px-2.5 py-[4px] rounded-full uppercase tracking-wide shadow-sm', badgeStyles[item.badgeVariant])}>
            {item.badge}
          </span>
        )}
      </div>
      <div className="px-2 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2">{item.title}</p>
          <span className="font-bold text-[14px] text-gray-900 whitespace-nowrap">₹{item.price.toLocaleString()}</span>
        </div>
        <p className="text-[12px] text-gray-500 mb-3 font-medium">{item.category}</p>
        <div className="flex items-center justify-between text-[12px] text-gray-500 mt-auto pt-2 border-t border-gray-50">
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faStar} className="size-3.5 text-amber-400" />
            <span className="font-bold text-gray-700">{item.rating}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium"><FontAwesomeIcon icon={faHeart} className="size-3.5 text-red-400" />{item.likes}</span>
            <span className="flex items-center gap-1.5 font-medium"><FontAwesomeIcon icon={faEye} className="size-3.5" />{item.views}</span>
          </span>
        </div>
      </div>
    </div>
  )
}


function ReviewCard({ review }: { review: Review }): React.ReactElement {
  return (
    <div className="rounded-[16px] border border-gray-200/80 p-6 bg-white flex flex-col gap-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <p className="text-[14px] leading-[1.6] text-gray-700 font-medium">
        {review.text}
      </p>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-[#111] flex items-center justify-center text-[11px] font-bold text-white shrink-0">
          {review.initials}
        </div>
        <div>
          <p className="text-[13px] font-bold text-gray-900 leading-tight mb-0.5">{review.name}</p>
          <p className="text-[12px] text-gray-400 font-medium leading-tight">{review.role}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreatorProfilePage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white pb-20 sm:pb-0 font-sans">
      {/* ══════════ 1. HERO ══════════ */}
      <div className="w-full h-[160px] sm:h-[220px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #e0e7ff 40%, #ddd6fe 70%, #c7d2fe 100%)' }}>
        <div className="absolute top-1/2 left-[32%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[160px] rounded-full bg-violet-500/30 blur-[40px]" />
        <div className="absolute top-1/2 left-[22%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[120px] rounded-full bg-indigo-500/30 blur-[30px]" />
      </div>

      <div className="page-container mx-auto relative">
        {/* Profile Header */}
        <div className="px-5 sm:px-10 pb-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-[64px] sm:-mt-[96px] relative z-10 gap-6 md:gap-0">

            {/* Left side (Avatar + Info) */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="w-[128px] h-[128px] sm:w-[192px] sm:h-[192px] rounded-[32px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-white shadow-sm bg-gray-200 overflow-hidden shrink-0 relative">
                <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
              </div>

              <div className="pb-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-[24px] sm:text-[28px] font-extrabold text-gray-900 tracking-tight leading-none">{creator.name}</h1>
                    <span className="bg-[#111] text-white text-[10px] font-bold px-2 py-[3px] rounded-[6px] flex items-center gap-1 shrink-0 mt-0.5">
                      PRO <FontAwesomeIcon icon={faBolt} className="size-[9px] text-amber-400" />
                    </span>
                  </div>
                  <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100 cursor-pointer">
                    <FontAwesomeIcon icon={faShareNodes} className="size-4" />
                  </button>
                </div>
                <p className="text-[14px] sm:text-[15px] text-gray-500 leading-snug mb-3 font-medium max-w-lg">
                  {creator.bio} <br className="hidden sm:block" />
                  based in {creator.location}
                </p>

                <div className="flex items-center gap-3.5 mb-5">
                  <a href="#" className="text-gray-400 hover:text-[#1DA1F2] transition-colors"><FontAwesomeIcon icon={faTwitter} className="size-4 sm:size-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><FontAwesomeIcon icon={faLinkedin} className="size-4 sm:size-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-[#FF0000] transition-colors"><FontAwesomeIcon icon={faYoutube} className="size-4 sm:size-5" /></a>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button className="bg-[#111] hover:bg-black text-white px-6 py-2 rounded-[10px] text-[13px] font-semibold transition-colors flex-1 sm:flex-none text-center">
                    Follow
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-6 py-2 rounded-[10px] text-[13px] font-semibold transition-colors flex-1 sm:flex-none text-center">
                    Get in touch
                  </button>
                  <button className="sm:hidden flex items-center justify-center w-9 h-9 rounded-[10px] bg-gray-50 border border-gray-200 text-gray-500 transition-colors">
                    <FontAwesomeIcon icon={faShareNodes} className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side (Badges & Stats) */}
            <div className="flex flex-col md:items-end gap-6 md:pb-2 pt-4 md:pt-0 w-full md:w-auto">
              <div className="flex flex-col md:items-end w-full">
                <BadgesButton />
              </div>

              <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
                <div className="text-left md:text-center">
                  <p className="text-[12px] text-gray-400 font-bold mb-1">Students</p>
                  <p className="text-[20px] sm:text-[24px] font-extrabold text-gray-900 leading-none">{creator.students}</p>
                </div>
                <div className="text-left md:text-center">
                  <p className="text-[12px] text-gray-400 font-bold mb-1">Sessions</p>
                  <p className="text-[20px] sm:text-[24px] font-extrabold text-gray-900 leading-none">{creator.sessions}</p>
                </div>
                <div className="text-left md:text-center">
                  <p className="text-[12px] text-gray-400 font-bold mb-1">Rating</p>
                  <p className="text-[20px] sm:text-[24px] font-extrabold text-gray-900 leading-none flex items-baseline gap-1">
                    {creator.rating} <span className="text-[14px] text-gray-400 font-bold">/5</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══════════ 2. TABS & OFFERINGS ══════════ */}
        <div className="mt-6">
          <Tabs defaultValue="all">
            <div className="border-b border-gray-100 px-5 sm:px-10 overflow-x-auto no-scrollbar">
              <TabsList className="h-auto gap-6 sm:gap-8 bg-transparent p-0 justify-start min-w-max flex pb-px">
                {[
                  { value: 'all', label: 'All Services', count: courses.length + sessions.length + groups.length },
                  { value: 'sessions', label: '1:1 Calls', count: sessions.length },
                  { value: 'courses', label: 'Digital Products', count: courses.length },
                  { value: 'groups', label: 'Communities', count: groups.length },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none px-0 py-3.5 text-[14px] font-bold text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2.5px] data-[state=active]:border-gray-900 transition-all flex-none h-auto"
                  >
                    {tab.label}
                    {tab.count > 0 && <sup className="ml-0.5 text-[10px] font-semibold">{tab.count}</sup>}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="bg-gray-50/30 pt-8 pb-12">
              <TabsContent value="all" className="mt-0 px-5 sm:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[...sessions, ...courses, ...groups].map((item) => <OfferingCard key={item.id} item={item} />)}
                </div>
              </TabsContent>
              <TabsContent value="sessions" className="mt-0 px-5 sm:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sessions.map((item) => <OfferingCard key={item.id} item={item} />)}
                </div>
              </TabsContent>
              <TabsContent value="courses" className="mt-0 px-5 sm:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {courses.map((item) => <OfferingCard key={item.id} item={item} />)}
                </div>
              </TabsContent>
              <TabsContent value="groups" className="mt-0 px-5 sm:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groups.map((item) => <OfferingCard key={item.id} item={item} />)}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* ══════════ 3. ABOUT (Editorial Premium) ══════════ */}
        <div className="px-5 sm:px-10 py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left: Huge typography */}
            <div className="lg:w-[45%] shrink-0">
              <span className="inline-block px-3.5 py-1.5 bg-gray-100 text-gray-900 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-6">
                About the creator
              </span>
              <h2 className="text-3xl sm:text-[40px] lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-8">
                The coach who&apos;s been in the room
              </h2>
              <div className="space-y-5 text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-medium">
                {creator.bioLong.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Right: Skills, Companies & Video Bento */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Premium Video Block */}
                <div className="rounded-[20px] overflow-hidden bg-black aspect-[4/3] sm:aspect-auto sm:h-[220px] relative group shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
                  <video controls className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" src="/videos/demo.mp4" poster={creator.avatar} />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full pointer-events-none">
                    Intro Video
                  </div>
                </div>

                {/* Companies Block */}
                <div className="bg-[#fafafa] border border-gray-100 rounded-[20px] p-6 flex flex-col justify-center">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Students Placed At</p>
                  <div className="flex flex-wrap gap-2">
                    {companies.map((c) => (
                      <span key={c} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[12px] font-bold text-gray-700 shadow-sm cursor-default">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Skills Block */}
                <div className="bg-[#fafafa] border border-gray-100 rounded-[20px] p-6 flex flex-col justify-center">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Core Expertise</p>
                  <div className="flex flex-col gap-3.5">
                    {creator.skills.map((s) => (
                      <div key={s.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 shrink-0">
                          <FontAwesomeIcon icon={s.icon} className="size-3.5 text-gray-900" />
                        </div>
                        <span className="text-[13.5px] font-bold text-gray-800">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Block */}
                <div className="bg-gray-900 rounded-[20px] p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <h3 className="text-[18px] font-extrabold mb-2 relative z-10">Book a 1:1 Session</h3>
                    <p className="text-[13px] text-gray-400 font-medium mb-6 relative z-10 leading-snug">Get a personalised action plan to land your dream design role.</p>
                  </div>
                  <button className="w-full bg-white text-black hover:bg-gray-100 rounded-[10px] px-4 py-3 text-[13px] font-extrabold transition-all active:scale-95 flex items-center justify-center gap-2 relative z-10">
                    <FontAwesomeIcon icon={faCalendarCheck} className="size-3.5" />
                    Book Session — ₹2,500
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* ══════════ 5. REVIEWS ══════════ */}
        <div className="px-5 sm:px-10 py-16 sm:py-24 bg-[#fafafa] border-t border-gray-100">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <span className="bg-gray-200/60 text-gray-500 text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight">
              What people are saying
            </h2>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((r) => (
              <div key={r.id} className="break-inside-avoid mb-6">
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ 6. FAQ ══════════ */}
        <div className="px-5 sm:px-10 py-16 sm:py-24 bg-[#fafafa]">
          <div className="max-w-5xl mx-auto bg-white border border-gray-200/60 rounded-[24px] p-6 sm:p-12 md:p-14 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              
              {/* Left Column: Heading */}
              <div className="md:w-[35%] shrink-0">
                <h2 className="text-3xl sm:text-[34px] font-semibold text-gray-900 tracking-tight mb-3">
                  FAQs
                </h2>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[240px]">
                  Guiding you through our procedures and services
                </p>
              </div>

              {/* Right Column: Accordion */}
              <div className="flex-1 flex flex-col">
                <Accordion multiple={false} className="space-y-3">
                  {faqs.map((f, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="bg-[#fafafa] border border-gray-200/70 rounded-[10px] px-5 overflow-hidden transition-colors hover:bg-gray-50"
                    >
                      <AccordionTrigger className="text-[14px] font-medium text-gray-900 py-4 text-left hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[13.5px] text-gray-600 leading-relaxed pb-4 font-normal">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-8 text-center md:text-right">
                  <p className="text-[11px] text-gray-400 font-medium">
                    Still got questions? <a href="#" className="underline hover:text-gray-700 transition-colors">hi@creonex.in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <BookSessionBar name={creator.name} />
    </div>
  )
}

