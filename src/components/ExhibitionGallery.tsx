/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronRight } from 'lucide-react';
import { GALLERY_DATA, GalleryItem } from '../data';

interface ExhibitionGalleryProps {
  onSelectItem?: (item: GalleryItem) => void;
  onViewAll?: () => void;
}

export default function ExhibitionGallery({ onSelectItem, onViewAll }: ExhibitionGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  const filters = ['全部', '审美实践', '优秀作品', '获奖作品', '校园美育'];

  const filteredData = activeFilter === '全部'
    ? GALLERY_DATA.slice(0, 6)
    : GALLERY_DATA.filter(item => item.subCategory === activeFilter).slice(0, 6);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20" id="art-gallery-section">
      {/* Title block — unified style with decorative lines */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#b11e22] tracking-widest">
            美育展厅
          </h2>
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
        </div>
        <p className="mt-2 text-xs text-stone-500 font-serif tracking-wide max-w-md">
          在这里，孩子们天马行空的双手，连接着中国传统文化与未来的重工业奇迹，见证最年轻的艺术之芽。
        </p>
      </div>

      {/* Filter Menu Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8" id="gallery-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
              activeFilter === filter
                ? 'bg-[#b11e22] text-white shadow-md border border-[#b11e22]'
                : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200'
            }`}
            id={`filter-gallery-${filter}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid displays items */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              onClick={() => onSelectItem?.(item)}
              className="group relative bg-[#fffdfa] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-amber-100/50 aspect-4-3 flex flex-col justify-end text-white cursor-pointer h-[280px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 select-none"
                referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
              />

              {/* Category tag top left */}
              {item.subCategory && (
                <span className={`absolute top-3 left-3 z-20 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${
                  item.subCategory === '审美实践' ? 'bg-blue-500' :
                  item.subCategory === '优秀作品' ? 'bg-amber-500' :
                  item.subCategory === '获奖作品' ? 'bg-[#b11e22]' :
                  item.subCategory === '校园美育' ? 'bg-emerald-500' :
                  'bg-stone-500'
                }`}>
                  {item.subCategory}
                </span>
              )}

              {/* Gradient cover card shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-transparent transition-all z-10" />

              <div className="p-5 z-20 flex flex-col relative">
                <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide block">
                  《{item.title}》
                </h3>

                <div className="flex items-center justify-between mt-2.5 text-[11px] text-stone-200/90 font-sans">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-medium text-[#fef08a]">{item.author}</span>
                    <span className="text-stone-300 text-[10px]">|</span>
                    <span>{item.category}</span>
                  </div>
                  
                  {/* Small tag icon */}
                  <span className="text-[10px] text-amber-200 flex items-center space-x-0.5">
                    <span>查看详情</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={onViewAll}
          className="group flex items-center space-x-2 px-8 py-3 rounded-full bg-[#b11e22] text-white hover:bg-[#99161a] transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <span className="font-serif text-sm tracking-wider">查看更多</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
