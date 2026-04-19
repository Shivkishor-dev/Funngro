/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, DollarSign, ArrowRight, Star, Users, CheckCircle, Menu, X, SendHorizontal, ChevronLeft, Share2, Timer, ChevronDown, Search, Lightbulb, CheckCircle2, Zap, Layout, FileText, Smartphone, BarChart3, Target } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  id: string;
  title: string;
  company: string;
  earnings: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  timeRequired?: string;
  description?: string;
  steps?: string[];
}

// --- Logo Component ---
function FunngroLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center bg-white rounded-full p-1 shadow-sm border border-neutral-50", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Bar Chart Background */}
        <g className="text-emerald-300 fill-current opacity-80">
          <rect x="30" y="38" width="6" height="15" rx="1" />
          <rect x="42" y="32" width="6" height="21" rx="1" />
          <rect x="54" y="27" width="6" height="26" rx="1" />
          <rect x="66" y="22" width="6" height="31" rx="1" />
        </g>

        {/* Paper Plane - Primary Shape */}
        <path 
           d="M25 55 L85 45 L50 78 Z" 
           className="text-emerald-500 fill-current" 
        />
        {/* Paper Plane - Fold detail */}
        <path 
           d="M25 55 L85 45 L45 62 Z" 
           className="text-emerald-400 fill-current" 
        />
        {/* Paper Plane - Bottom crease */}
        <path 
           d="M45 62 L85 45 L50 68 Z" 
           className="text-emerald-600 fill-current" 
        />

        {/* Curved Arrow with Click Rings */}
        <g className="text-emerald-600">
           {/* Click Rings at start */}
           <circle cx="30" cy="80" r="6" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" />
           <circle cx="30" cy="80" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-60" />
           <circle cx="30" cy="80" r="2" fill="currentColor" />
           
           {/* The Curve */}
           <path 
             d="M38 82 Q 55 92 82 72" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="3.5" 
             strokeLinecap="round" 
           />
           {/* The Arrowhead */}
           <path 
             d="M75 72 L83 71 L81 79" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="3.5" 
             strokeLinecap="round" 
             strokeLinejoin="round" 
           />
        </g>
      </svg>
    </div>
  );
}

// --- Mock Data ---
const MOCK_PROJECTS: Project[] = [
  {
    id: 'revamp',
    title: 'Funngro Website Revamp',
    company: 'Funngro',
    earnings: '₹0',
    category: 'Design',
    difficulty: 'Intermediate',
    tags: ['Web Design', 'UI/UX', 'SEO'],
    timeRequired: '3 days',
    description: 'Create Smart Website for Funngro!! Your work will help us to understand your skills and company projects will be awarded to you based on your talent.',
    steps: [
      'Go to current Funngro site.',
      'Click in Company/Teen page and create a 2 page design for Funngro.',
      'Also ensure to implement SEO friendly content.'
    ]
  },
  {
    id: '1',
    title: 'Social Media Strategy for Eco-Brand',
    company: 'GreenPulse',
    earnings: '₹2,500',
    category: 'Marketing',
    difficulty: 'Beginner',
    tags: ['Social Media', 'Content Creation'],
  },
  {
    id: '2',
    title: 'Logo Redesign for Tech Startup',
    company: 'NexusAI',
    earnings: '₹5,000',
    category: 'Design',
    difficulty: 'Intermediate',
    tags: ['Branding', 'Vector Art'],
  },
  {
    id: '3',
    title: 'User Testing for Mobile App',
    company: 'SwiftPay',
    earnings: '₹1,500',
    category: 'Research',
    difficulty: 'Beginner',
    tags: ['Feedback', 'UX'],
  },
  {
    id: '4',
    title: 'Blog Content Writing (Tech)',
    company: 'CodeMag',
    earnings: '₹3,000',
    category: 'Writing',
    difficulty: 'Intermediate',
    tags: ['SEO', 'Technical Writing'],
  },
];

// --- Components ---

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <FunngroLogo className="w-11 h-11 shadow-emerald-100 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black tracking-tighter text-neutral-900">Funngro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/teen" className={cn("text-sm font-bold uppercase tracking-widest hover:text-emerald-600 transition-colors", location.pathname === '/teen' ? "text-emerald-600" : "text-neutral-600")}>
            Teens
          </Link>
          <a href="#" className="text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-emerald-600 transition-colors">Companies</a>
          <a href="#" className="text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-emerald-600 transition-colors">Resources</a>
          <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/10">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-neutral-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <Link to="/teen" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">For Teens</Link>
            <a href="#" className="text-lg font-bold">For Companies</a>
            <a href="#" className="text-lg font-bold">Resources</a>
            <button className="bg-emerald-600 text-white w-full py-4 rounded-2xl font-bold text-lg">Download App</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function LandingPage() {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Star size={14} fill="currentColor" />
              Empowering 1 Million+ Teens
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-neutral-900 leading-[0.9] tracking-tight mb-8 font-heading">
              EARN WHILE <br />
              <span className="text-emerald-600 italic">YOU LEARN.</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-xl mb-12 leading-relaxed">
              FunnGro connects ambitious teens with real projects from top companies. Build your portfolio, learn professional skills, and start your financial journey today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/teen" className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 group hover:gap-4 transition-all">
                Become a Teen Pro <ArrowRight size={20} />
              </Link>
              <button className="bg-white border-2 border-neutral-200 text-neutral-900 px-8 py-4 rounded-2xl font-bold text-lg hover:border-neutral-900 transition-colors">
                Hire a Talent
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/teen${i}/100/100`} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <p className="font-bold text-neutral-900">4.8/5 Star Rating</p>
                <p className="text-sm text-neutral-500">by 50,000+ app users</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Graphic / App Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-neutral-900 w-[320px] h-[640px] mx-auto rounded-[3rem] p-4 shadow-2xl border-8 border-neutral-800">
               <div className="bg-neutral-50 w-full h-full rounded-[2rem] overflow-hidden p-6 relative">
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-10 h-10 bg-neutral-200 rounded-full" />
                     <FunngroLogo className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black mb-6">Your Earnings</h3>
                  <div className="bg-emerald-600 text-white p-6 rounded-3xl mb-8 shadow-lg shadow-emerald-200">
                    <p className="text-sm opacity-80 mb-1">Total Balance</p>
                    <p className="text-3xl font-black">₹12,450.00</p>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-400 uppercase tracking-widest mb-4">Active Projects</h4>
                  <div className="space-y-4">
                     {[1, 2].map(i => (
                       <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                            <Briefcase size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Design Track</p>
                            <p className="text-xs text-green-600 font-bold">In Progress</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-200/50 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce cursor-default">
               <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <DollarSign size={20} />
               </div>
               <div>
                  <p className="text-sm font-black">Payment Received</p>
                  <p className="text-xs text-neutral-500">from Tata Motors</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<GraduationCap size={40} className="text-emerald-600" />}
              title="Learn Real Skills"
              description="Get certified in marketing, design, tech, and more through live workshops."
            />
            <FeatureCard 
              icon={<Briefcase size={40} className="text-emerald-600" />}
              title="Real Projects"
              description="Work on actual projects from listed companies and startups."
              highlight
            />
            <FeatureCard 
              icon={<DollarSign size={40} className="text-emerald-600" />}
              title="Earn Money"
              description="Get paid directly into your wallet for every successful contribution."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, highlight }: { icon: ReactNode, title: string, description: string, highlight?: boolean }) {
  return (
    <div className={cn(
      "p-10 rounded-[2.5rem] transition-all duration-300",
      highlight ? "bg-neutral-900 text-white scale-105 shadow-2xl shadow-black/20" : "bg-neutral-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-neutral-100"
    )}>
      <div className="mb-8">{icon}</div>
      <h3 className="text-2xl font-black mb-4">{title}</h3>
      <p className={cn("text-lg", highlight ? "text-neutral-400" : "text-neutral-600")}>{description}</p>
    </div>
  );
}

function TeenPortal() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const categories = ['All', 'Marketing', 'Design', 'Writing', 'Research'];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Teen-Specific Hero */}
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-neutral-900 mb-6 tracking-tight font-heading"
          >
            FunnGro for <span className="text-emerald-600">Teens</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 text-xl leading-relaxed"
          >
            Work with top companies, build professional skills, and start your journey to financial independence.
          </motion.p>
        </header>

        {/* The Three Pillars Section */}
        <section className="mb-32">
          <div className="grid md:grid-cols-3 gap-6">
             {[
               { icon: <Briefcase className="text-emerald-600" />, title: "Real Projects", desc: "No busy work. Real tasks from companies like Tata and Nexus." },
               { icon: <GraduationCap className="text-emerald-600" />, title: "Skill Development", desc: "Gain certifications and hands-on experience that schools don't teach." },
               { icon: <DollarSign className="text-emerald-600" />, title: "Earn Money", desc: "Your skills are valuable. Get paid directly into your wallet." }
             ].map((pillar, i) => (
               <motion.div 
                 key={pillar.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-xl transition-all"
               >
                 <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                    {pillar.icon}
                 </div>
                 <h3 className="font-black text-xl mb-2">{pillar.title}</h3>
                 <p className="text-neutral-500 font-medium leading-relaxed">{pillar.desc}</p>
               </motion.div>
             ))}
          </div>
        </section>

        <div className="border-t border-neutral-200 pt-20">
          <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-4xl font-black text-neutral-900 mb-2 tracking-tight font-heading">Available Gigs</h2>
              <p className="text-neutral-500 font-medium">Pick a project that matches your skills and start earning.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search projects or companies..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-neutral-200 rounded-2xl py-3 pl-12 pr-6 w-full font-bold text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 transition-all outline-none"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap",
                      filter === cat 
                        ? "bg-black text-white shadow-lg shadow-black/20" 
                        : "bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PROJECTS.filter(p => {
              const matchesCategory = filter === 'All' || p.category === filter;
              const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    p.company.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesCategory && matchesSearch;
            }).length > 0 ? (
              MOCK_PROJECTS.filter(p => {
                const matchesCategory = filter === 'All' || p.category === filter;
                const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      p.company.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
              }).map(project => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={project.id}
                  className="bg-white p-8 rounded-[2rem] border border-neutral-200 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all flex flex-col h-full group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-emerald-100 text-emerald-700 w-12 h-12 rounded-2xl flex items-center justify-center font-black">
                      {project.category[0]}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Est. Earnings</p>
                      <p className="text-xl font-black text-neutral-900">{project.earnings}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-neutral-900 mb-2 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">{project.company}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-neutral-400" />
                        <span className="text-xs font-bold text-neutral-500">12 Applicants</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/project/${project.id}`);
                        }}
                        className="text-emerald-600 font-black text-sm flex items-center gap-1 group/btn"
                      >
                        View Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-neutral-300" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 mb-2">No projects found</h3>
                <p className="text-neutral-500">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilter('All');
                  }}
                  className="mt-6 text-emerald-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  </div>
  );
}

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = MOCK_PROJECTS.find(p => p.id === id);

  if (!project) return <div className="pt-32 px-6 text-center">Project not found</div>;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold font-display tracking-tight uppercase">Project details</h1>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <DollarSign size={28} />
             </div>
             <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Earning</p>
                <p className="text-2xl font-black text-green-400">{project.earnings}</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Timer size={28} />
             </div>
             <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Time Required</p>
                <p className="text-2xl font-black text-green-400">{project.timeRequired || 'Varies'}</p>
             </div>
          </div>
        </div>

        {/* Project Content Card */}
        <div className="bg-[#1E293B] rounded-[2.5rem] p-1 shadow-2xl border border-slate-700/50 mb-8 overflow-hidden">
           {/* Section 1: Title & Share */}
           <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black leading-tight max-w-[80%] font-heading">{project.title}</h2>
                <button className="text-green-400 hover:scale-110 transition-transform">
                   <Share2 size={24} />
                </button>
              </div>

              {/* Description Accordion (Mocked as static for now based on image) */}
              <div className="bg-[#0F172A]/50 rounded-3xl border border-slate-700/30 overflow-hidden mb-6">
                 <div className="p-5 flex items-center justify-between border-b border-slate-700/30">
                    <span className="font-bold text-slate-300">Project Description:</span>
                    <ChevronDown size={20} className="text-green-400 rotate-180" />
                 </div>
                 <div className="p-6">
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>
                 </div>
              </div>

              {/* Steps Accordion */}
              <div className="bg-[#0F172A]/50 rounded-3xl border border-slate-700/30 overflow-hidden">
                 <div className="p-5 flex items-center justify-between border-b border-slate-700/30">
                    <span className="font-bold text-slate-300">Steps</span>
                    <ChevronDown size={20} className="text-green-400 rotate-180" />
                 </div>
                 <div className="p-8 space-y-8">
                    {project.steps?.map((step, idx) => (
                      <div key={idx} className="flex gap-6 items-start">
                         <div className="w-10 h-10 shrink-0 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center text-sm font-bold text-slate-400">
                            {idx + 1}
                         </div>
                         <p className="text-slate-200 font-medium leading-tight pt-1">
                            {step}
                         </p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Global Action Footer (Simplified based on image structure) */}
        <div className="text-center space-y-4 pt-4">
           <button className="text-xl font-bold hover:text-green-400 transition-colors">Start Project</button>
           <button className="w-full py-5 bg-[#34D399] hover:bg-[#10B981] text-slate-900 rounded-3xl font-black text-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all">
              Earn {project.earnings}
           </button>
        </div>
      </div>
    </div>
  );
}

function SuccessGuide() {
  const steps = [
    {
      title: "Choose the Right Project",
      desc: "Browse the Teen Portal and pick a project that aligns with your current skills or one you want to learn. Don't be afraid to start small with 'Beginner' tasks.",
      icon: <Layout className="text-emerald-600" size={32} />
    },
    {
      title: "Understand the Requirements",
      desc: "Read the project description carefully. In the Project Details page, pay close attention to the requested steps and deliverables.",
      icon: <FileText className="text-emerald-600" size={32} />
    },
    {
      title: "Submit High-Quality Work",
      desc: "First impressions matter. Ensure your design or content is polished, professional, and follows all specified guidelines before hitting submit.",
      icon: <Zap className="text-emerald-600" size={32} />
    },
    {
      title: "Professional Communication",
      desc: "When interacting with companies, maintain a professional tone. Respond promptly to feedback and clarify any doubts immediately.",
      icon: <Smartphone className="text-emerald-600" size={32} />
    }
  ];

  const bestPractices = [
    "Build a Diverse Portfolio: Work across different categories to show versatility.",
    "Consistency is Key: Regularly complete projects to build your rating and earn trust.",
    "Learn from Feedback: Every piece of advice from a company is a chance to grow.",
    "Stay SEO-Friendly: For writing and design, always think about how your work will be found online."
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200"
          >
            <Lightbulb className="text-emerald-600" size={40} />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-neutral-900 mb-6 font-heading tracking-tight">Success Guide for Teens</h1>
          <p className="text-neutral-500 text-xl max-w-2xl mx-auto">
            Everything you need to know about starting your project journey on FunnGro and becoming a top-tier teen professional.
          </p>
        </header>

        {/* Step-by-Step Guide */}
        <section className="mb-24">
          <h2 className="text-3xl font-black mb-12 font-heading">The Road to Success</h2>
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-xl transition-all"
              >
                <div className="shrink-0 w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Step 0{idx + 1}</span>
                    <h3 className="text-2xl font-black text-neutral-900">{step.title}</h3>
                  </div>
                  <p className="text-neutral-500 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-neutral-900 text-white p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-12 font-heading flex items-center gap-4">
              <Star className="text-emerald-500" fill="currentColor" />
              Pro Tips & Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {bestPractices.map((tip, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1">
                    <CheckCircle2 className="text-emerald-500" size={24} />
                  </div>
                  <p className="text-neutral-400 font-medium text-lg leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Decor */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px]" />
        </section>

        <div className="mt-20 text-center">
          <Link to="/teen" className="inline-flex items-center gap-2 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-neutral-800 transition-all active:scale-95 shadow-xl shadow-black/20">
            Ready to Start? View Projects <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <FunngroLogo className="w-12 h-12 shadow-emerald-100 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black tracking-tighter text-neutral-900 uppercase">Funngro</span>
            </Link>
            <p className="text-neutral-500 max-w-sm mb-2 leading-relaxed font-medium">
              Developing a generation of financially independent and skilled creators. Join the movement.
            </p>
            <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-8 italic opacity-80">"It's Fun to Grow up"</p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                  <span className="sr-only">{social}</span>
                  <Star size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-8">For Teens</h4>
            <ul className="space-y-4">
              <li><Link to="/teen" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Find Projects</Link></li>
              <li><Link to="/guide" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Success Guide</Link></li>
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Skill Tracks</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Earning Guide</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Certifications</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-8">For Companies</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Hire Talent</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Post Project</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-emerald-600 font-medium transition-colors">Pricing</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-neutral-100 gap-6">
          <p className="text-sm text-neutral-400 font-medium">&copy; 2026 FunnGro. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/teen" element={<TeenPortal />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/guide" element={<SuccessGuide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
