/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Home,
  Palette,
  Train,
  Calendar,
  Image as ImageIcon,
  Menu,
  X,
  User,
  ChevronDown,
  Award,
  BookOpen,
  LogOut,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenProfile?: () => void;
  onLogout?: () => void;
  avatarUrl?: string | null;
}

function DefaultAvatarSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="98" fill="#f5e6c8" />
      <path d="M 40 70 Q 70 50 100 60 Q 130 45 160 75 L 160 95 Q 130 80 100 90 Q 70 80 40 95 Z" fill="#b7c5e0" opacity="0.55" />
      <path d="M 35 115 Q 65 95 100 105 Q 135 90 165 118 L 165 140 Q 135 115 100 130 Q 65 115 35 140 Z" fill="#6a8fbf" opacity="0.55" />
      <path d="M 40 160 Q 75 140 100 150 Q 130 135 160 160 L 160 180 L 40 180 Z" fill="#d9a066" opacity="0.7" />
      <g transform="rotate(-35 85 95)">
        <rect x="70" y="40" width="10" height="90" rx="3" fill="#8aa3c9" />
        <rect x="70" y="40" width="10" height="30" rx="3" fill="#5f7ba5" />
        <polygon points="75,25 68,45 82,45" fill="#e07a3c" />
        <ellipse cx="75" cy="33" rx="5" ry="5" fill="#f4a565" opacity="0.7" />
        <rect x="70" y="70" width="10" height="8" fill="#5f7ba5" />
      </g>
      <g transform="rotate(30 125 100)">
        <rect x="118" y="35" width="8" height="100" rx="3" fill="#b0a5dc" />
        <rect x="118" y="35" width="8" height="25" rx="3" fill="#7c6fb0" />
        <polygon points="122,20 115,40 129,40" fill="#d9a066" />
        <ellipse cx="122" cy="28" rx="4" ry="4" fill="#f4c78d" opacity="0.8" />
      </g>
      <ellipse cx="140" cy="120" rx="40" ry="32" fill="#fff8e7" stroke="#8aa3c9" strokeWidth="3" />
      <ellipse cx="140" cy="120" rx="30" ry="23" fill="#fff8e7" stroke="#8aa3c9" strokeWidth="2" />
      <ellipse cx="135" cy="113" rx="10" ry="8" fill="#d9a066" opacity="0.85" />
      <ellipse cx="150" cy="108" rx="8" ry="6" fill="#b0a5dc" opacity="0.85" />
      <ellipse cx="148" cy="125" rx="9" ry="7" fill="#e07a3c" opacity="0.7" />
      <ellipse cx="132" cy="128" rx="7" ry="5" fill="#6a8fbf" opacity="0.75" />
      <ellipse cx="125" cy="118" rx="5" ry="4" fill="#8aa3c9" opacity="0.8" />
      <ellipse cx="155" cy="118" rx="5" ry="4" fill="#d9a066" opacity="0.7" />
      <g fill="#4a5a85">
        <ellipse cx="65" cy="145" rx="6" ry="10" />
        <rect x="62" y="145" width="6" height="25" rx="2" />
        <path d="M 68 145 Q 78 148 80 158 L 80 163 Q 75 168 68 163 Z" />
      </g>
      <g fill="#6a8fbf">
        <polygon points="155,50 155,42 163,42 163,52 172,52 172,62 163,62 163,75 155,75 155,65 145,65 145,55 155,55" />
      </g>
    </svg>
  );
}

export default function Header({ activeSection, onNavigate, onOpenSearch, onOpenProfile, onLogout, avatarUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'traditional', label: '传统美育', icon: Palette },
    { id: 'transport', label: '交通美育', icon: Train },
    { id: 'events', label: '活动中心', icon: Calendar },
    { id: 'gallery', label: '美育展厅', icon: ImageIcon },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg h-20 transition-all duration-300 border-b border-[#921417] bg-[#b11e22] text-white">
      {/* Absolute top decorative divider */}
      <div className="w-full h-1 bg-[#d9ab6a] opacity-80" />

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Branding / Logo Area */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 group text-left focus:outline-none"
          id="btn-logo"
        >
          <div className="w-11 h-11 rounded-full bg-white overflow-hidden border-2 border-[#d9ab6a] shadow-inner transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
            <img 
              src={new URL('../assets/images/school_logo_1780889988563.png', import.meta.url).href} 
              alt="学院Logo" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
            />
          </div>
          <div>
            <span className="block font-serif text-xs sm:text-base font-bold tracking-wider text-shadow-sm leading-tight">
              职业教育美育教育资源及管理平台
            </span>
            <span className="block text-[7px] sm:text-[8px] tracking-wide text-red-100 uppercase opacity-90 font-sans">
              VOCATIONAL AESTHETIC EDUCATION RESOURCES & MANAGEMENT PLATFORM
            </span>
          </div>
        </button>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-md font-sans text-sm tracking-wide font-medium flex items-center space-x-1.5 transition-all duration-200 focus:outline-none hover:text-[#fef08a] ${
                  isActive ? 'text-white bg-[#99161a] border border-[#d9ab6a]/30' : 'text-neutral-100 hover:bg-[#a1181c]'
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className="w-4 h-4 opacity-80" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#d9ab6a]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action / Profile Icons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Trigger Panel */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-[#a1181c] text-red-50 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#d9ab6a]/50"
            aria-label="搜索美育项目"
            id="btn-search-desk"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Profile Area */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#d9ab6a]/50 rounded-full py-1 px-3 hover:bg-[#a1181c] transition-all bg-[#a1181c]/40 border border-[#d9ab6a]/20"
              id="btn-profile"
            >
              <div className="w-8 h-8 rounded-full border border-[#d9ab6a] overflow-hidden flex items-center justify-center shadow-sm bg-[#fff8e7]">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="用户头像" className="w-full h-full object-cover" />
                ) : (
                  <DefaultAvatarSVG />
                )}
              </div>
              <span className="text-sm font-medium text-red-50">张美育</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#fef08a] transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-60 bg-[#fffdfa] rounded-lg shadow-xl text-stone-800 border border-amber-100 overflow-hidden z-20"
                  >
                    <div className="px-4.5 py-4 bg-[#fdf8ee] border-b border-amber-50">
                      <p className="font-semibold text-stone-800 text-sm">张美育 (Zhang Meiyu)</p>
                      <p className="text-xs text-stone-500 truncate">lensasayam@gmail.com</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { onOpenProfile?.(); setProfileDropdownOpen(false); }}
                        className="w-full px-4.5 py-2.5 text-left text-xs text-stone-700 hover:bg-[#fcf8f0] flex items-center space-x-3 transition-colors"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        <span>个人中心</span>
                      </button>
                    </div>

                    <div className="border-t border-amber-50/80 py-1">
                      <button
                        onClick={() => { setProfileDropdownOpen(false); onLogout?.(); }}
                        className="w-full px-4.5 py-2.5 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>退出当前中心</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Action Area */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-1.5 rounded-full hover:bg-[#a1181c] text-red-100"
            aria-label="搜索项目"
            id="btn-search-mob"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-[#a1181c] transition-colors"
            aria-label="切换菜单"
            id="btn-hamburger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide down/up) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-20 bg-black z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute left-0 right-0 bg-[#b11e22] text-white overflow-hidden shadow-2xl border-b border-[#a1181c] z-40 lg:hidden"
            >
              <div className="px-4 py-4 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4.5 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-[#99161a] text-white border-l-4 border-[#d9ab6a]'
                          : 'text-neutral-100 hover:bg-[#a1181c]'
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <div className="border-t border-[#99161a] pt-4.5 pb-2 mt-4">
                  <div className="flex items-center space-x-3 px-4.5">
                    <div className="w-10 h-10 rounded-full border border-[#d9ab6a] overflow-hidden bg-[#fff8e7] flex items-center justify-center">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="用户头像" className="w-full h-full object-cover" />
                      ) : (
                        <DefaultAvatarSVG />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">张美育</h4>
                      <p className="text-[11px] text-neutral-300">中高阶美育实践学员</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
