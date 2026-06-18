/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Home, Search, Eye, FileText,
  Music, Image as ImageIcon, Film, File,
  BookOpen, Palette, Brush, Theater, Mic2, ChevronRight
} from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'audio' | 'image' | 'document';
  format: string;
  size: string;
  thumbnail: string;
  description: string;
  downloads: number;
  views: number;
}

export const RESOURCE_DATA: ResourceItem[] = [
  {
    id: 'res-1', title: '国画入门技法教程', category: '美术', type: 'video',
    format: 'MP4', size: '256MB', downloads: 1280, views: 5600,
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400&auto=format&fit=crop',
    description: '系统讲解国画基础技法，包括用笔、用墨、调色等核心知识点。'
  },
  {
    id: 'res-2', title: '楷书基本笔画教学', category: '书法', type: 'video',
    format: 'MP4', size: '180MB', downloads: 960, views: 4200,
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&auto=format&fit=crop',
    description: '从永字八法入手，逐一讲解楷书基本笔画的书写要领。'
  },
  {
    id: 'res-3', title: '古筝名曲赏析集', category: '音乐', type: 'audio',
    format: 'MP3', size: '85MB', downloads: 2100, views: 8900,
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop',
    description: '精选十首经典古筝曲目，附带演奏技法解析。'
  },
  {
    id: 'res-4', title: '京剧脸谱图案集', category: '戏曲', type: 'image',
    format: 'PNG', size: '120MB', downloads: 750, views: 3400,
    thumbnail: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=400&auto=format&fit=crop',
    description: '收录50种经典京剧脸谱高清图案，附色彩寓意说明。'
  },
  {
    id: 'res-5', title: '民族舞蹈基本功训练', category: '舞蹈', type: 'video',
    format: 'MP4', size: '320MB', downloads: 680, views: 2900,
    thumbnail: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=400&auto=format&fit=crop',
    description: '涵盖身韵、步伐、旋转等民族舞蹈基本功系统训练内容。'
  },
  {
    id: 'res-6', title: '素描静物写生指南', category: '美术', type: 'document',
    format: 'PDF', size: '45MB', downloads: 1560, views: 6800,
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=400&auto=format&fit=crop',
    description: '图文并茂的素描静物写生教程，适合初学者自学使用。'
  },
  {
    id: 'res-7', title: '行书临摹字帖精选', category: '书法', type: 'document',
    format: 'PDF', size: '68MB', downloads: 1890, views: 7200,
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400&auto=format&fit=crop',
    description: '精选王羲之、颜真卿等名家行书字帖，可直接打印临摹。'
  },
  {
    id: 'res-8', title: '戏曲唱腔入门教学', category: '戏曲', type: 'audio',
    format: 'MP3', size: '95MB', downloads: 520, views: 2100,
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop',
    description: '从气息控制到咬字归韵，系统讲解戏曲唱腔基础知识。'
  },
  {
    id: 'res-9', title: '水彩画技法演示', category: '美术', type: 'video',
    format: 'MP4', size: '210MB', downloads: 1100, views: 4800,
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop',
    description: '演示湿画法、干画法、渐变法等水彩核心技法。'
  },
  {
    id: 'res-10', title: '古典舞身韵教程', category: '舞蹈', type: 'video',
    format: 'MP4', size: '280MB', downloads: 890, views: 3700,
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop',
    description: '提、沉、冲、靠、含、腆、移、旁提——古典舞八大身韵元素详解。'
  },
  {
    id: 'res-11', title: '中国传统乐器鉴赏', category: '音乐', type: 'document',
    format: 'PDF', size: '52MB', downloads: 1340, views: 5100,
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=400&auto=format&fit=crop',
    description: '图文介绍琵琶、二胡、笛子等20种传统乐器的构造与音色特点。'
  },
  {
    id: 'res-12', title: '篆刻入门手册', category: '书法', type: 'document',
    format: 'PDF', size: '38MB', downloads: 670, views: 2600,
    thumbnail: 'https://images.unsplash.com/photo-1579783928121-7d1ca606c2f6?q=80&w=400&auto=format&fit=crop',
    description: '从选石、写稿到刻制、钤印，篆刻艺术零基础入门指南。'
  }
];

const CATEGORIES = ['全部', '美术', '书法', '音乐', '戏曲', '舞蹈'];
const TYPE_FILTERS = ['全部', '视频', '音频', '图片', '文档'];

const categoryIcons: Record<string, typeof Palette> = {
  '美术': Palette, '书法': Brush, '音乐': Music,
  '戏曲': Theater, '舞蹈': Mic2
};

const typeIcons: Record<string, typeof Film> = {
  video: Film, audio: Music, image: ImageIcon, document: FileText
};

interface ResourceListPageProps {
  onBackToHome?: () => void;
  onSelectItem?: (item: ResourceItem) => void;
}

export default function ResourceListPage({ onBackToHome, onSelectItem }: ResourceListPageProps) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeType, setActiveType] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return RESOURCE_DATA.filter(item => {
      const matchCategory = activeCategory === '全部' || item.category === activeCategory;
      const typeMap: Record<string, string> = { '视频': 'video', '音频': 'audio', '图片': 'image', '文档': 'document' };
      const matchType = activeType === '全部' || item.type === typeMap[activeType];
      const matchSearch = !searchQuery || item.title.includes(searchQuery) || item.description.includes(searchQuery);
      return matchCategory && matchType && matchSearch;
    });
  }, [activeCategory, activeType, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '全部': RESOURCE_DATA.length };
    CATEGORIES.slice(1).forEach(c => {
      counts[c] = RESOURCE_DATA.filter(item => item.category === c).length;
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
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#fbf9f4]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            以美育人 · 资源汇聚
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto mb-8"
          >
            汇集美术、书法、音乐、戏曲、舞蹈五大门类的优质教学资源，助力美育教育发展
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索资源名称或关键词..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/95 text-stone-800 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/30 shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-serif cursor-pointer transition-all ${
                    activeCategory === cat
                      ? 'bg-[#b11e22] text-white shadow-md'
                      : 'bg-white text-stone-600 hover:bg-amber-50 border border-amber-100/50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                  {cat !== '全部' && (
                    <span className={`text-xs ${activeCategory === cat ? 'text-white/70' : 'text-stone-400'}`}>
                      ({categoryCounts[cat]})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Type Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {TYPE_FILTERS.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all ${
                  activeType === type
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredData.map((item, index) => {
              const TypeIcon = typeIcons[item.type];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/20 hover:shadow-lg transition-all group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white text-xs">
                        <TypeIcon className="w-3 h-3" />
                        {item.format}
                      </span>
                    </div>
                    {/* Size */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white/80 text-xs">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#b11e22]/10 text-[#b11e22] text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-stone-800 text-sm mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    {/* Stats & Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-3 text-stone-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                        </span>
                      </div>
                      <button 
                        onClick={() => onSelectItem?.(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#b11e22] text-white text-xs hover:bg-[#99161a] transition-colors cursor-pointer"
                      >
                        查看
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-stone-300" />
            </div>
            <p className="text-stone-400 font-serif">暂无匹配的资源</p>
            <p className="text-stone-300 text-sm mt-1">请尝试其他筛选条件</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
