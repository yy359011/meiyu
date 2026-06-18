/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Drama,
  Music,
  Palette,
  PenTool,
  Sparkles,
  Camera,
  Fingerprint,
  Play,
  Share2,
  Bookmark,
  Video,
  Headphones,
  Disc,
  Music2,
  ImageIcon,
  Eye,
  Calendar
} from 'lucide-react';
import { TraditionalCategory, SectionContent } from '../types';
import { TRADITIONAL_ART_DATA } from '../data';

interface TraditionalSectionProps {
  onPlayVideo: (title: string, videoUrl: string) => void;
  onNavigate?: (sectionId: string, category?: string) => void;
}

export default function TraditionalSection({ onPlayVideo, onNavigate }: TraditionalSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TraditionalCategory>(
    TraditionalCategory.CHINESE_OPERA
  );

  const categoryTabs = [
    { id: TraditionalCategory.CHINESE_OPERA, label: '戏剧', en: 'CHINESE OPERA', icon: Drama },
    { id: TraditionalCategory.MUSIC, label: '音乐', en: 'MUSIC', icon: Music },
    { id: TraditionalCategory.PAINTING, label: '美术', en: 'PAINTING', icon: Palette },
    { id: TraditionalCategory.CALLIGRAPHY, label: '书法', en: 'CALLIGRAPHY', icon: PenTool },
    { id: TraditionalCategory.DANCE, label: '舞蹈', en: 'DANCE', icon: Sparkles },
    { id: TraditionalCategory.PHOTOGRAPHY, label: '摄影', en: 'PHOTOGRAPHY', icon: Camera },
    { id: TraditionalCategory.INTANGIBLE_HERITAGE, label: '非遗', en: 'INTANGIBLE HERITAGE', icon: Fingerprint }
  ];

  const currentContent: SectionContent = TRADITIONAL_ART_DATA[activeCategory];

  // Helper when clicking list items to swap with the main display
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTagColorClass = (tag: string) => {
    switch (tag) {
      case '高腔梆子腔': return 'bg-red-600';
      case '昆腔': return 'bg-emerald-600';
      case '评剧': return 'bg-red-600';
      case '豫剧': return 'bg-amber-600';
      case '越剧': return 'bg-purple-600';
      case '湘剧': return 'bg-indigo-600';
      case '秦腔': return 'bg-rose-700';
      case '黄梅戏': return 'bg-[#d9ab6a]';
      case '川剧': return 'bg-[#b11e22]';
      case '昆曲': return 'bg-emerald-600';
      case '河北梆子': return 'bg-red-700';
      default: return 'bg-[#b11e22]';
    }
  };

  const isAudioType = (mediaType?: string) => {
    return mediaType === '音频' || mediaType === '专辑' || mediaType === '乐谱';
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20" id="traditional-art-section">
      {/* Exquisite Section Title */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#b11e22] tracking-widest">
            传统美育
          </h2>
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
        </div>
        <p className="mt-2 text-xs text-stone-500 tracking-wide">
          传承经典，感受戏曲、书法、国画等传统文化的艺术魅力
        </p>
      </div>

      {/* Tabs Selector Row - Elegant Segmented Style */}
      <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:justify-center items-stretch gap-1.5 sm:gap-3 mb-8">
        {categoryTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-300 transform cursor-pointer select-none focus:outline-none ${
                isSelected
                  ? 'bg-[#b11e22] text-white border-[#b11e22] shadow-md scale-102 font-medium'
                  : 'bg-white hover:bg-[#fff9f0] hover:text-[#b11e22] hover:border-amber-200 text-stone-600 border-stone-100'
              } ${isSelected ? 'col-span-2' : 'col-span-1'} sm:w-28`}
              id={`tab-traditional-${tab.id}`}
            >
              <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-[#fef08a]' : 'text-stone-500 hover:text-[#b11e22]'}`} />
              <span className="font-serif text-xs md:text-sm tracking-widest">{tab.label}</span>
              <span className={`hidden sm:block text-[8px] mt-0.5 tracking-tighter uppercase font-light opacity-80 ${isSelected ? 'text-red-100' : 'text-stone-400'}`}>
                {tab.en.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Beautiful China Outline Container Outlined by crimson line */}
      <div className="china-outline-box p-4 sm:p-6 md:p-8 bg-white/95 rounded-xl relative overflow-hidden transition-all duration-500">
        
        {/* Tiny Red Corner Badge Plus Icon (From reference image) */}
        <div
          onClick={() => onNavigate?.('traditional')}
          className="absolute top-0 right-0 w-8 h-8 bg-[#b11e22] flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#99161a] transition-colors z-10 antialiased"
          title="进入传统美育大数据库"
        >
          <span className="text-lg leading-none">+</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* COLUMN 1: Main Featured Card (Col 5) */}
            <div className="md:col-span-5 flex flex-col">
              {isAudioType(currentContent.mainVideo.mediaType) ? (
                <div
                  onClick={() => onNavigate?.('traditional', activeCategory)}
                  className="bg-stone-900 rounded-lg overflow-hidden border border-amber-500/25 hover:border-[#b11e22] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between relative hover:-translate-y-1"
                >
                  <div className="relative aspect-video w-full bg-stone-950 flex items-center justify-center overflow-hidden border-b border-stone-800">
                    <img
                      src={currentContent.mainVideo.coverUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover scale-125 blur-md opacity-60"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-transparent to-white/5 pointer-events-none" />
                    <div className="absolute inset-2 md:inset-2.5 border border-amber-500/10 rounded-sm pointer-events-none" />
                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 transition-transform duration-500 group-hover:scale-108 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full bg-zinc-950 flex items-center justify-center shadow-lg animate-spin"
                        style={{
                          animationDuration: '12s',
                          backgroundImage: `
                            radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                            radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                            radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                            radial-gradient(circle, transparent 65%, #222522 66%, #222522 68%, transparent 69%),
                            radial-gradient(circle, transparent 75%, #0d0f0d 76%, #0d0f0d 78%, transparent 79%),
                            radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                          `,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.65), inset 0 0 15px rgba(255,255,255,0.06), inset 0 0 35px rgba(0,0,0,0.95)'
                        }}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-50 mix-blend-overlay" />
                      </div>
                      <div className="absolute w-15 h-15 sm:w-16 sm:h-16 rounded-full border-2 border-stone-950 overflow-hidden shadow-inner flex items-center justify-center bg-stone-900 pointer-events-none">
                        <img
                          src={currentContent.mainVideo.coverUrl}
                          alt={currentContent.mainVideo.title}
                          className="w-[105%] h-[105%] object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#fcf5e9] border border-zinc-800 shadow-inner" />
                      </div>
                    </div>

                    {/* Top-right traditional gold stylus/tonearm pointer */}
                    <div className="absolute top-1.5 right-2 sm:right-3 w-10 h-14 origin-top transition-transform duration-500 group-hover:rotate-30 pointer-events-none z-10 opacity-75 group-hover:opacity-100">
                      <svg viewBox="0 0 40 60" className="w-full h-full text-amber-200" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="25" cy="10" r="3.5" fill="currentColor" />
                        <path d="M25,10 L16,34 L12,48" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="9" y="46" width="6" height="8" rx="1" fill="currentColor" />
                      </svg>
                    </div>

                    {currentContent.mainVideo.tag && (
                      <div className="absolute top-2 left-2 text-[9px] font-semibold text-white px-1.5 py-0.5 rounded shadow-sm bg-[#d9ab6a] z-10 pointer-events-none font-serif tracking-wider">
                        {currentContent.mainVideo.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-[#1e1a18] flex-1 flex flex-col justify-between">
                    <h4 className="font-serif text-[12.5px] sm:text-[13.5px] leading-snug text-stone-100 font-semibold group-hover:text-amber-300 transition-colors line-clamp-2">
                      {currentContent.mainVideo.title}
                    </h4>
                    <p className="text-[10px] text-stone-400 leading-relaxed line-clamp-2 mt-1.5">
                      {currentContent.mainVideo.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-sans border-t border-stone-800/80 pt-2 mt-2">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5 text-[#d9ab6a]" />
                        <span>1.2K 赏析</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#d9ab6a]/70" />
                        <span>3天前</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => onNavigate?.('traditional', activeCategory)}
                  className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-stone-100">
                    <img
                      src={currentContent.mainVideo.coverUrl}
                      alt={currentContent.mainVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />
                    {(currentContent.mainVideo.tag || currentContent.mainVideo.mediaType) && (
                      <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${currentContent.mainVideo.tag ? getTagColorClass(currentContent.mainVideo.tag) : 'bg-[#b11e22]'}`}>
                        {currentContent.mainVideo.tag || currentContent.mainVideo.mediaType}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                        {currentContent.mainVideo.mediaType === '视频' ? (
                          <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                        ) : (
                          <ImageIcon className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors truncate">
                      {currentContent.mainVideo.title}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                      {currentContent.mainVideo.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>1.2K</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>3天前</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMN 2: Sub Feature Card (Col 5) */}
            <div className="md:col-span-5 flex flex-col">
              {isAudioType(currentContent.subFeature.mediaType) ? (
                <div
                  onClick={() => onNavigate?.('traditional', activeCategory)}
                  className="bg-stone-900 rounded-lg overflow-hidden border border-amber-500/25 hover:border-[#b11e22] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between relative hover:-translate-y-1"
                >
                  <div className="relative aspect-video w-full bg-stone-950 flex items-center justify-center overflow-hidden border-b border-stone-800">
                    <img
                      src={currentContent.subFeature.coverUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover scale-125 blur-md opacity-60"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-transparent to-white/5 pointer-events-none" />
                    <div className="absolute inset-2 md:inset-2.5 border border-amber-500/10 rounded-sm pointer-events-none" />
                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 transition-transform duration-500 group-hover:scale-108 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full bg-zinc-950 flex items-center justify-center shadow-lg animate-spin"
                        style={{
                          animationDuration: '12s',
                          backgroundImage: `
                            radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                            radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                            radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                            radial-gradient(circle, transparent 65%, #222522 66%, #222522 68%, transparent 69%),
                            radial-gradient(circle, transparent 75%, #0d0f0d 76%, #0d0f0d 78%, transparent 79%),
                            radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                          `,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.65), inset 0 0 15px rgba(255,255,255,0.06), inset 0 0 35px rgba(0,0,0,0.95)'
                        }}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-50 mix-blend-overlay" />
                      </div>
                      <div className="absolute w-15 h-15 sm:w-16 sm:h-16 rounded-full border-2 border-stone-950 overflow-hidden shadow-inner flex items-center justify-center bg-stone-900 pointer-events-none">
                        <img
                          src={currentContent.subFeature.coverUrl}
                          alt={currentContent.subFeature.title}
                          className="w-[105%] h-[105%] object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#fcf5e9] border border-zinc-800 shadow-inner" />
                      </div>
                    </div>

                    {/* Top-right traditional gold stylus/tonearm pointer */}
                    <div className="absolute top-1.5 right-2 sm:right-3 w-10 h-14 origin-top transition-transform duration-500 group-hover:rotate-30 pointer-events-none z-10 opacity-75 group-hover:opacity-100">
                      <svg viewBox="0 0 40 60" className="w-full h-full text-amber-200" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="25" cy="10" r="3.5" fill="currentColor" />
                        <path d="M25,10 L16,34 L12,48" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="9" y="46" width="6" height="8" rx="1" fill="currentColor" />
                      </svg>
                    </div>

                    {currentContent.subFeature.tag && (
                      <div className="absolute top-2 left-2 text-[9px] font-semibold text-white px-1.5 py-0.5 rounded shadow-sm bg-[#d9ab6a] z-10 pointer-events-none font-serif tracking-wider">
                        {currentContent.subFeature.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-[#1e1a18] flex-1 flex flex-col justify-between">
                    <h4 className="font-serif text-[12.5px] sm:text-[13.5px] leading-snug text-stone-100 font-semibold group-hover:text-amber-300 transition-colors line-clamp-2">
                      {currentContent.subFeature.title}
                    </h4>
                    <p className="text-[10px] text-stone-400 leading-relaxed line-clamp-2 mt-1.5">
                      {currentContent.subFeature.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-sans border-t border-stone-800/80 pt-2 mt-2">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5 text-[#d9ab6a]" />
                        <span>890 赏析</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#d9ab6a]/70" />
                        <span>1周前</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => onNavigate?.('traditional', activeCategory)}
                  className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-stone-100">
                    <img
                      src={currentContent.subFeature.coverUrl}
                      alt={currentContent.subFeature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />
                    {(currentContent.subFeature.tag || currentContent.subFeature.mediaType) && (
                      <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${currentContent.subFeature.tag ? getTagColorClass(currentContent.subFeature.tag) : 'bg-[#b11e22]'}`}>
                        {currentContent.subFeature.tag || currentContent.subFeature.mediaType}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                        {currentContent.subFeature.mediaType === '视频' ? (
                          <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                        ) : (
                          <ImageIcon className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors truncate">
                      {currentContent.subFeature.title}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                      {currentContent.subFeature.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>890</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>1周前</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMN 3: Right Thumbnail Playlist list items (Col 2) */}
            <div className="md:col-span-2 flex flex-col space-y-3.5 h-full">
              <div className="border-b border-stone-100 pb-2">
                <h4 className="font-serif text-xs font-bold text-[#b11e22] tracking-widest uppercase">
                  更多赏析推荐
                </h4>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {currentContent.rightList.slice(0, 4).map((item, idx) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      onNavigate?.('traditional', activeCategory);
                    }}
                    className="p-1.5 rounded-lg border border-transparent hover:border-amber-100 hover:bg-[#fffcf6] flex items-center space-x-3 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="relative w-18 h-12 flex-shrink-0 rounded-md overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3.5 h-3.5 text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-stone-800 tracking-wide truncate group-hover:text-[#b11e22] transition-colors leading-snug">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {item.tag ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
                            {item.tag}
                          </span>
                        ) : item.mediaType ? (
                          <span className={`flex items-center justify-center w-4 h-4 rounded ${
                            item.mediaType === '视频' ? 'bg-blue-50 text-blue-600' :
                            item.mediaType === '音频' ? 'bg-purple-50 text-purple-600' :
                            item.mediaType === '专辑' ? 'bg-amber-50 text-amber-600' :
                            item.mediaType === '乐谱' ? 'bg-green-50 text-green-600' :
                            'bg-pink-50 text-pink-600'
                          }`}>
                            {item.mediaType === '视频' && <Video className="w-2.5 h-2.5" />}
                            {item.mediaType === '音频' && <Headphones className="w-2.5 h-2.5" />}
                            {item.mediaType === '专辑' && <Disc className="w-2.5 h-2.5" />}
                            {item.mediaType === '乐谱' && <Music2 className="w-2.5 h-2.5" />}
                            {item.mediaType === '图片' && <ImageIcon className="w-2.5 h-2.5" />}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
