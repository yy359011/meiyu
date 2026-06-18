/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Hammer,
  Train,
  Award,
  Smile,
  Play,
  Video,
  Headphones,
  ImageIcon,
  Eye,
  Calendar
} from 'lucide-react';
import { TransportationCategory, SectionContent } from '../types';
import { TRANSPORTATION_ART_DATA } from '../data';

interface TransportationSectionProps {
  onPlayVideo: (title: string, videoUrl: string) => void;
  onNavigate?: (sectionId: string) => void;
}

export default function TransportationSection({ onPlayVideo, onNavigate }: TransportationSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TransportationCategory>(
    TransportationCategory.HUMANITIES_HISTORY
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTagColorClass = (tag: string) => {
    switch (tag) {
      case '丝绸之路': return 'bg-amber-600';
      case '驿站': return 'bg-stone-600';
      case '运河': return 'bg-blue-600';
      case '桥梁': return 'bg-emerald-600';
      case '隧道': return 'bg-slate-600';
      case '高铁': return 'bg-red-600';
      case '航空': return 'bg-sky-600';
      case '公路': return 'bg-orange-600';
      case '生态': return 'bg-green-600';
      case '标志': return 'bg-indigo-600';
      case '车票': return 'bg-purple-600';
      case '礼仪': return 'bg-pink-600';
      default: return 'bg-[#b11e22]';
    }
  };

  const categoryTabs = [
    { id: TransportationCategory.HUMANITIES_HISTORY, label: '人文历史', en: 'HUMANITIES & HISTORY', icon: Compass },
    { id: TransportationCategory.ENGINEERING, label: '工程建筑', en: 'ENGINEERING', icon: Hammer },
    { id: TransportationCategory.VEHICLE_STYLING, label: '交通工具造型', en: 'VEHICLE STYLING', icon: Train },
    { id: TransportationCategory.VISUAL_CULTURE, label: '交通视觉文创', en: 'VISUAL CULTURE', icon: Award },
    { id: TransportationCategory.ETIQUETTE, label: '行为礼仪', en: 'ETIQUETTE', icon: Smile }
  ];

  const currentContent: SectionContent = TRANSPORTATION_ART_DATA[activeCategory];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20" id="transportation-art-section">
      {/* Exquisite Section Title */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#b11e22] tracking-widest">
            交通美育
          </h2>
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
        </div>
        <p className="mt-2 text-xs text-stone-500 tracking-wide">
          探索交通工程中的美学元素，感受桥梁、高铁、航空的结构之美
        </p>
      </div>

      {/* Tabs Selector Row - Segmented Style */}
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center items-stretch gap-1.5 sm:gap-3 mb-8">
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
              } col-span-1 sm:w-36`}
              id={`tab-transportation-${tab.id}`}
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

      {/* Beautiful China Outline Container */}
      <div className="china-outline-box p-4 sm:p-6 md:p-8 bg-white/95 rounded-xl relative overflow-hidden transition-all duration-500">
        
        {/* Tiny Red Corner Badge Plus Icon */}
        <div
          onClick={() => onNavigate?.('transport')}
          className="absolute top-0 right-0 w-8 h-8 bg-[#b11e22] flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#99161a] transition-colors z-10 antialiased"
          title="进入交通美育大数据库"
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
            {/* COLUMN 1: Main Featured Video Card (Col 5) */}
            <div className="md:col-span-5 flex flex-col">
              <div
                onClick={() => onPlayVideo(currentContent.mainVideo.title, currentContent.mainVideo.videoUrl || '')}
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
            </div>

            {/* COLUMN 2: Sub Feature Video Card (Col 5) */}
            <div className="md:col-span-5 flex flex-col">
              <div
                onClick={() => onPlayVideo(currentContent.subFeature.title, currentContent.subFeature.videoUrl || '')}
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
            </div>

            {/* COLUMN 3: Right Thumbnail Playlist (Col 2) */}
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
                    onClick={() => onPlayVideo(item.title, 'https://assets.mixkit.co/videos/preview/mixkit-acoustic-guitar-player-close-up-of-hands-33425-large.mp4')}
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
                        {item.tag && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
                            {item.tag}
                          </span>
                        )}
                        {!item.tag && item.mediaType && (
                          <span className={`flex items-center justify-center w-4 h-4 rounded ${
                            item.mediaType === '视频' ? 'bg-blue-50 text-blue-600' :
                            'bg-pink-50 text-pink-600'
                          }`}>
                            {item.mediaType === '视频' && <Video className="w-2.5 h-2.5" />}
                            {item.mediaType === '图片' && <ImageIcon className="w-2.5 h-2.5" />}
                          </span>
                        )}
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
