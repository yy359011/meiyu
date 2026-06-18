/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronRight, ArrowLeft, Home, Search, Palette, Sparkles, BookOpen, GraduationCap, Play, Volume2, Image as ImageIcon, FileText } from 'lucide-react';
import { GALLERY_DATA, GalleryItem } from '../data';

interface ExhibitionGalleryPageProps {
  onSelectItem?: (item: GalleryItem) => void;
  onBackToHome?: () => void;
}

export default function ExhibitionGalleryPage({ onSelectItem, onBackToHome }: ExhibitionGalleryPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('全部');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['全部', '审美实践', '优秀作品', '获奖作品', '校园美育'];
  const mediaTypeFilters = [
    { id: '全部', label: '全部', icon: Sparkles },
    { id: '视频', label: '视频', icon: Play },
    { id: '图片', label: '图片', icon: ImageIcon },
    { id: '音频', label: '音频', icon: Volume2 },
    { id: 'PDF', label: '文档', icon: FileText }
  ];

  // Slogan based on selected category
  const categorySlogan = useMemo(() => {
    switch (activeFilter) {
      case '审美实践':
        return '以美育人 以文化人 实践出真知';
      case '优秀作品':
        return '佳作荟萃 尽展芳华 美育结硕果';
      case '获奖作品':
        return '荣耀绽放 才华横溢 美育谱新篇';
      case '校园美育':
        return '书香校园 美育浸润 文化育新人';
      default:
        return '汇聚少年佳作 绽放美育光彩';
    }
  }, [activeFilter]);

  const filteredData = useMemo(() => {
    let data = GALLERY_DATA;
    
    // 一级分类筛选（基于subCategory）
    if (activeFilter !== '全部') {
      data = data.filter(item => item.subCategory === activeFilter);
    }

    // 媒体类型筛选
    if (mediaTypeFilter !== '全部') {
      const mediaTypeMap: Record<string, string> = {
        '视频': 'video',
        '图片': 'image',
        '音频': 'audio',
        'PDF': 'pdf'
      };
      const targetType = mediaTypeMap[mediaTypeFilter];
      if (targetType) {
        data = data.filter(item => item.mediaType === targetType);
      }
    }

    // 搜索过滤
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.author.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    
    return data;
  }, [activeFilter, mediaTypeFilter, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '全部': GALLERY_DATA.length };
    filters.slice(1).forEach(f => {
      counts[f] = GALLERY_DATA.filter(item => item.subCategory === f).length;
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

      {/* Hero Banner — tab navigation OVERLAY on image */}
      <div
        className="w-full relative bg-cover bg-center text-white shadow-inner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7)), url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=A%20grand%20art%20gallery%20exhibition%20hall%20with%20elegant%20white%20walls%2C%20multiple%20framed%20oil%20paintings%20and%20watercolor%20artworks%20displayed%20on%20walls%2C%20warm%20ambient%20lighting%2C%20polished%20wooden%20floor%2C%20visitors%20appreciating%20art%2C%20classical%20and%20modern%20art%20mixed%20exhibition%20space%2C%20cinematic%20wide%20angle%20shot&image_size=landscape_16_9')`
        }}
      >
        <div className="absolute inset-0 bg-[#b11e22]/10" />

        <div className="relative z-10">
          {/* Tab Navigation — overlay on the hero image */}
          <div className="w-full border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-1 sm:space-x-4 md:space-x-8 overflow-x-auto py-4 scrollbar-none">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSearchQuery('');
                  }}
                  className={`py-1.5 px-4 text-sm sm:text-base font-serif tracking-widest relative transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    activeFilter === filter
                      ? 'text-white font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{filter}</span>
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="galleryTabIndicator"
                      className="absolute -bottom-4 left-4 right-4 h-0.5 bg-[#b11e22]"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Box */}
          <div className="max-w-4xl mx-auto text-center space-y-6 pt-10 pb-10 px-4">
            <motion.p
              key={categorySlogan}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="tracking-widest font-serif text-xl sm:text-3xl font-semibold text-shadow-md text-amber-100"
            >
              {categorySlogan}
            </motion.p>
          </div>

          {/* Media Type Filters - 二级分类标签 */}
          <div className="max-w-4xl mx-auto px-4 pb-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {mediaTypeFilters.map((filter) => {
                const Icon = filter.icon;
                const isSelected = mediaTypeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setMediaTypeFilter(filter.id)}
                    className={`flex items-center justify-center px-5 py-2.5 rounded-full border text-center transition-all duration-300 cursor-pointer select-none focus:outline-none ${
                      isSelected
                        ? 'bg-[#b11e22] text-white border-transparent shadow-md font-medium'
                        : 'bg-transparent text-white/70 border-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isSelected ? 'text-white' : 'text-white/60'}`} />
                    <span className="font-serif text-xs sm:text-sm tracking-wider">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

        {/* Core Block Title */}
        <div className="flex items-center space-x-3 border-b border-amber-200/50 pb-4 mb-8">
          <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-800 tracking-wider">
            {activeFilter === '全部' ? '美育展厅资源库' : `${activeFilter}资源库`}
          </h3>
          <span className="text-xs text-stone-400 bg-amber-50 border border-amber-100/50 rounded px-2 font-mono">
            {filteredData.length} 件作品
          </span>
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
                          crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Left Tag Badge */}
                  {item.subCategory && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm bg-[#b11e22] font-serif tracking-wider">
                      {item.subCategory}
                    </span>
                  )}

                  {/* Animated hover play ornament overlay */}
                  <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                      {item.mediaType === 'video' ? (
                        <Play className="w-5 h-5 fill-current" />
                      ) : item.mediaType === 'audio' ? (
                        <Volume2 className="w-5 h-5" />
                      ) : item.mediaType === 'pdf' ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                    </div>
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
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#b11e22]">{item.author} | {item.category}</span>
                    <span className="text-[#b11e22] flex items-center space-x-1">
                      <span>查看详情</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-24 bg-white rounded-lg border border-dashed border-amber-200">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-bounce" />
            <p className="font-serif text-sm text-stone-600 font-medium">未检索到与筛选、检索条件相符的美育作品课题。</p>
            <p className="text-xs text-stone-400 mt-1">您可以试着切换其他分类或清除搜索条件。</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
