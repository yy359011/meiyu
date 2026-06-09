/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { GALLERY_DATA, GalleryItem } from '../data';

interface ExhibitionGalleryPageProps {
  onSelectItem?: (item: GalleryItem) => void;
  onBackToHome?: () => void;
}

export default function ExhibitionGalleryPage({ onSelectItem, onBackToHome }: ExhibitionGalleryPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  const filters = ['全部', '音乐', '美术', '书法', '戏曲', '舞蹈'];

  const filteredData = useMemo(() => {
    return activeFilter === '全部'
      ? GALLERY_DATA
      : GALLERY_DATA.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '全部': GALLERY_DATA.length };
    filters.slice(1).forEach(f => {
      counts[f] = GALLERY_DATA.filter(item => item.category === f).length;
    });
    return counts;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fbf9f4]"
    >
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-amber-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-stone-600 hover:text-[#b11e22] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-serif">返回首页</span>
              </button>
              <span className="text-stone-300">|</span>
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-stone-600 hover:text-[#b11e22] transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-serif">首页</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-5 bg-[#b11e22] rounded-sm" />
              <span className="font-serif text-sm font-bold text-stone-800 tracking-wider">美育展厅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[200px] sm:h-[250px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
          alt="美育展厅"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#fbf9f4]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-wider">
              美育展厅
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-serif">
              在这里，孩子们天马行空的双手，连接着中国传统文化与未来的重工业奇迹
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title with red accent bar */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 tracking-wider">
            作品展览
          </h2>
          <span className="text-xs text-stone-400 font-serif ml-2">
            共 {filteredData.length} 件作品
          </span>
        </div>

        {/* Filter Menu Row */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#b11e22] text-white shadow-md border border-[#b11e22]'
                  : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 hover:border-[#b11e22]/30'
              }`}
            >
              {filter}
              <span className="ml-1.5 text-[10px] opacity-70">({categoryCounts[filter]})</span>
            </button>
          ))}
        </div>

        {/* Grid displays items */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => onSelectItem?.(item)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-amber-100/50 hover:border-[#b11e22]/20 transition-all duration-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-[#b11e22] font-semibold tracking-wider shadow-sm">
                    {item.category}
                  </div>

                  {/* Award Badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[11px] text-white flex items-center justify-end space-x-1">
                      <span>查看详情</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-serif text-sm font-bold text-stone-800 mb-2 line-clamp-1">
                    《{item.title}》
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-medium text-[#b11e22]">{item.author}</span>
                    <span>{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-stone-300" />
            </div>
            <p className="text-stone-400 font-serif">暂无该分类的作品</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
