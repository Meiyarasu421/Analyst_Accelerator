/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  Database, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Search, 
  Bell, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  FileText, 
  Layers, 
  Terminal,
  Menu,
  X,
  Star,
  Download,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Mock Data
const COURSES = [
  { 
    id: 1, 
    title: 'SQL for Data Analysis', 
    category: 'Database', 
    level: 'Beginner', 
    duration: '12h', 
    rating: 4.9, 
    students: '12.4k',
    progress: 65,
    icon: Database,
    color: 'bg-blue-500'
  },
  { 
    id: 2, 
    title: 'Python Data Science Boot Camp', 
    category: 'Programming', 
    level: 'Intermediate', 
    duration: '24h', 
    rating: 4.8, 
    students: '8.2k',
    progress: 20,
    icon: Code,
    color: 'bg-emerald-500'
  },
  { 
    id: 3, 
    title: 'Statistics Fundamentals', 
    category: 'Mathematics', 
    level: 'Beginner', 
    duration: '8h', 
    rating: 4.7, 
    students: '5.1k',
    progress: 0,
    icon: TrendingUp,
    color: 'bg-amber-500'
  },
  { 
    id: 4, 
    title: 'Data Visualization with Tableau', 
    category: 'Visualization', 
    level: 'Intermediate', 
    duration: '15h', 
    rating: 4.9, 
    students: '9.8k',
    progress: 0,
    icon: PieChart,
    color: 'bg-rose-500'
  },
];

const LEARNING_PATH = [
  { step: 1, title: 'Excel Mastery', status: 'completed' },
  { step: 2, title: 'SQL Foundations', status: 'in-progress' },
  { step: 3, title: 'Statistics for Analysts', status: 'locked' },
  { step: 4, title: 'Python for Data Science', status: 'locked' },
  { step: 5, title: 'BI Tools (Tableau/PowerBI)', status: 'locked' },
];

const WEEKLY_PROGRESS = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 0.5 },
  { day: 'Fri', hours: 2.1 },
  { day: 'Sat', hours: 4.5 },
  { day: 'Sun', hours: 3.0 },
];

// Components
const NavItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group w-full",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon size={20} className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-400")} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const CourseCard = ({ course }: { course: typeof COURSES[0], key?: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group"
  >
    <div className={cn("h-32 flex items-center justify-center relative", course.color)}>
      <course.icon size={48} className="text-white/80 group-hover:scale-110 transition-transform" />
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
        {course.level}
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{course.category}</p>
        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
      </div>
      
      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {course.duration}
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          {course.rating}
        </div>
        <div className="flex items-center gap-1">
          <Award size={14} />
          {course.students}
        </div>
      </div>

      {course.progress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              className="h-full bg-indigo-500"
            />
          </div>
        </div>
      )}

      <button className="w-full py-2.5 bg-slate-50 text-slate-900 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
        {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
        <ChevronRight size={16} />
      </button>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('My Learning');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50 lg:relative"
          >
            <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-inner">
                <BarChart3 size={24} />
              </div>
              <h1 className="text-xl font-bold font-display tracking-tight text-slate-900">DataAcademy</h1>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden ml-auto p-2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <NavItem icon={BookOpen} label="My Learning" active={activeTab === 'My Learning'} onClick={() => setActiveTab('My Learning')} />
              <NavItem icon={Layers} label="Course Catalog" active={activeTab === 'Course Catalog'} onClick={() => setActiveTab('Course Catalog')} />
              <NavItem icon={TrendingUp} label="Learning Paths" active={activeTab === 'Learning Paths'} onClick={() => setActiveTab('Learning Paths')} />
              <NavItem icon={Terminal} label="Practice Lab" active={activeTab === 'Practice Lab'} onClick={() => setActiveTab('Practice Lab')} />
              <NavItem icon={Award} label="Certificates" active={activeTab === 'Certificates'} onClick={() => setActiveTab('Certificates')} />
            </nav>

            <div className="p-6 mt-auto">
              <div className="bg-indigo-900 rounded-2xl p-5 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                  <Award size={64} />
                </div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Premium</p>
                <h4 className="font-bold mb-3 text-sm">Access Real-world Datasets</h4>
                <button className="w-full bg-white text-indigo-900 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
                  Go Premium
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search for courses, tools, or topics..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-sm w-96 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Jordan Smith</p>
                <p className="text-xs font-medium text-slate-500">Aspiring Data Analyst</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src="https://picsum.photos/seed/jordan/100/100" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Learning Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 data-grid">
          {/* Welcome Section */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-slate-900 font-display tracking-tight">Keep it up, Jordan!</h2>
              <p className="text-slate-500 font-medium">You've completed 4 lessons this week. You're on a 5-day streak.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Star size={20} className="text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Points</p>
                  <p className="text-sm font-bold text-slate-900">1,240 XP</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Award size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Badges</p>
                  <p className="text-sm font-bold text-slate-900">12 Earned</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column: Courses & Progress */}
            <div className="xl:col-span-2 space-y-8">
              {/* Continue Learning */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-display">Continue Learning</h3>
                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {COURSES.slice(0, 2).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>

              {/* Study Activity */}
              <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Study Activity</h3>
                    <p className="text-sm text-slate-500">Learning hours over the past 7 days</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
                    <button className="px-3 py-1.5 text-xs font-bold bg-white text-indigo-600 rounded-md shadow-sm">Week</button>
                    <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">Month</button>
                  </div>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={WEEKLY_PROGRESS}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#4f46e5" 
                        strokeWidth={3}
                        dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* Recommended for you */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">Recommended for you</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {COURSES.slice(2, 4).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Roadmap & Resources */}
            <div className="space-y-8">
              {/* Learning Roadmap */}
              <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 font-display mb-6">Analyst Roadmap</h3>
                <div className="space-y-6 relative">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100" />
                  {LEARNING_PATH.map((step) => (
                    <div key={step.step} className="flex items-start gap-4 relative">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10",
                        step.status === 'completed' ? "bg-emerald-500 text-white" : 
                        step.status === 'in-progress' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : 
                        "bg-slate-100 text-slate-400"
                      )}>
                        {step.status === 'completed' ? <CheckCircle2 size={16} /> : step.step}
                      </div>
                      <div className="pt-1">
                        <h4 className={cn(
                          "text-sm font-bold",
                          step.status === 'locked' ? "text-slate-400" : "text-slate-800"
                        )}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {step.status === 'completed' ? 'Mastered' : 
                           step.status === 'in-progress' ? 'Current Step' : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
                  View Full Roadmap
                </button>
              </section>

              {/* Resource Library */}
              <section className="bg-slate-900 rounded-3xl p-8 text-white">
                <h3 className="text-lg font-bold font-display mb-6">Resource Library</h3>
                <div className="space-y-4">
                  {[
                    { title: 'SQL Cheat Sheet', icon: FileText },
                    { title: 'Pandas Documentation', icon: ExternalLink },
                    { title: 'Sample Datasets', icon: Download },
                    { title: 'Interview Questions', icon: MessageSquare },
                  ].map((resource, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-indigo-500 transition-colors">
                          <resource.icon size={18} />
                        </div>
                        <span className="text-sm font-bold">{resource.title}</span>
                      </div>
                      <ChevronRight size={16} className="text-white/40 group-hover:text-white" />
                    </button>
                  ))}
                </div>
              </section>

              {/* Practice Lab Promo */}
              <section className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Terminal size={120} />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold font-display leading-tight">Ready to test your skills?</h3>
                  <p className="text-indigo-100 text-sm">Open the Practice Lab to solve real-world data challenges in our cloud environment.</p>
                  <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                    Launch Practice Lab
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
