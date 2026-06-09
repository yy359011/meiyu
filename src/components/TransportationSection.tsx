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
  Mountain,
  Award,
  Smile,
  Play
} from 'lucide-react';
import { TransportationCategory, SectionContent } from '../types';
import { TRANSPORTATION_ART_DATA } from '../data';

interface TransportationSectionProps {
  onPlayVideo: (title: string, videoUrl: string) => void;
  onNavigate?: (sectionId: string) => void;
}

export default function TransportationSection({ onPlayVideo, onNavigate }: TransportationSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TransportationCategory>(
    TransportationCategory.ETIQUETTE
  );

  const categoryTabs = [
    { id: TransportationCategory.HUMANITIES_HISTORY, label: '人文历史', en: 'HUMANITIES & HISTORY', icon: Compass },
    { id: TransportationCategory.ENGINEERING, label: '工程建筑', en: 'ENGINEERING', icon: Hammer },
    { id: TransportationCategory.VEHICLE_STYLING, label: '交通工具造型', en: 'VEHICLE STYLING', icon: Train },
    { id: TransportationCategory.LANDSCAPE, label: '道路环境景观', en: 'LANDSCAPE', icon: Mountain },
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
            className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start"
          >
            {/* COLUMN 1: Large Video Player/Header (Col 5) */}
            <div className="md:col-span-5 flex flex-col space-y-4">
              <div className="relative aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden group shadow-md border border-neutral-100 bg-stone-100">
                <img
                  src={currentContent.mainVideo.coverUrl}
                  alt={currentContent.mainVideo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                
                {/* Backdrop shadow */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

                {/* Pulsing Play Button */}
                <button
                  onClick={() => onPlayVideo(currentContent.mainVideo.title, currentContent.mainVideo.videoUrl || '')}
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#b11e22]/90 hover:bg-[#b11e22] text-white flex items-center justify-center shadow-xl hover:scale-108 transition-all duration-300 cursor-pointer focus:outline-none"
                  aria-label="播放视频"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>

                {/* Video Info overlay at bottom */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-amber-200 uppercase font-mono tracking-widest">
                  视频来源: {currentContent.mainVideo.source}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 tracking-wide hover:text-[#b11e22] transition-colors leading-snug">
                  {currentContent.mainVideo.title}
                </h3>
                <div className="mt-2.5 p-3.5 bg-stone-50 border-l-2 border-[#b11e22] rounded-r-md">
                  <p className="text-xs text-stone-600 tracking-wide leading-relaxed">
                    <strong className="text-[#b11e22] font-semibold">简介：</strong>
                    {currentContent.mainVideo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Sub Featured Feature Highlight (Col 5) */}
            <div className="md:col-span-5 flex flex-col space-y-4">
              <div className="relative aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden shadow-md border border-neutral-100">
                <img
                  src={currentContent.subFeature.coverUrl}
                  alt={currentContent.subFeature.title}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
              </div>

              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 tracking-wide leading-snug">
                  {currentContent.subFeature.title}
                </h3>
                <div className="mt-2.5 p-3.5 bg-amber-50/40 border-l-2 border-amber-400 rounded-r-md">
                  <p className="text-xs text-stone-600 tracking-wide leading-relaxed">
                    <strong className="text-amber-700 font-semibold">简介：</strong>
                    {currentContent.subFeature.description}
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Right Thumbnail Playlist (Col 2) */}
            <div className="md:col-span-2 flex flex-col space-y-3.5">
              <div className="border-b border-stone-100 pb-2">
                <h4 className="font-serif text-xs font-bold text-[#b11e22] tracking-widest uppercase">
                  推荐专题与实物文创
                </h4>
              </div>
              
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {currentContent.rightList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onPlayVideo(item.title, 'https://assets.mixkit.co/videos/preview/mixkit-acoustic-guitar-player-close-up-of-hands-33425-large.mp4');
                    }}
                    className="p-1.5 rounded-lg border border-transparent hover:border-amber-100 hover:bg-[#fffcf6] flex items-center space-x-3 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="relative w-18 h-12 flex-shrink-0 rounded-md overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3.5 h-3.5 text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-stone-800 tracking-wide truncate group-hover:text-[#b11e22] transition-colors leading-snug">
                        {item.title}
                      </p>
                      <span className="text-[9px] text-[#b11e22] font-mono mt-0.5 block tracking-widest select-none opacity-80 md:group-hover:opacity-100">
                        {activeCategory} · 推荐
                      </span>
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
