/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, User, FileText, BookOpen, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data';

interface ExhibitionDetailPageProps {
  item: GalleryItem;
  onBack: () => void;
  onNavigateHome: () => void;
}

export default function ExhibitionDetailPage({ item, onBack, onNavigateHome }: ExhibitionDetailPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 获取所有图片，优先使用images数组，否则用单张image
  const allImages = item.images && item.images.length > 0 
    ? item.images 
    : [item.image];

  const hasMultipleImages = allImages.length > 1;

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying || !hasMultipleImages) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, hasMultipleImages, allImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
    setIsAutoPlaying(false);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

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
                onClick={onBack}
                className="flex items-center space-x-2 text-stone-600 hover:text-[#b11e22] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-serif">返回展厅</span>
              </button>
              <span className="text-stone-300">|</span>
              <button
                onClick={onNavigateHome}
                className="flex items-center space-x-2 text-stone-600 hover:text-[#b11e22] transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-serif">首页</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-5 bg-[#b11e22] rounded-sm" />
              <span className="font-serif text-sm font-bold text-stone-800 tracking-wider">作品详情</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-lg mb-8"
        >
          {/* Main Image Container */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={allImages[currentIndex]}
                alt={`${item.title} - ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-[#fef08a] font-semibold tracking-wider border border-white/20">
                {item.category}
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                《{item.title}》
              </h1>
              <div className="flex items-center space-x-3 text-stone-200">
                <span className="font-medium text-[#fef08a]">{item.author}</span>
                <span className="text-stone-400">·</span>
                <span className="text-sm">{item.category}作品</span>
              </div>
            </div>

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
                  aria-label="上一张"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
                  aria-label="下一张"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Progress Indicator */}
            {hasMultipleImages && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                <span className="text-white/70 text-xs font-serif">
                  {currentIndex + 1} / {allImages.length}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="bg-black/80 backdrop-blur-md p-4">
              <div className="flex gap-3 overflow-x-auto scrollbar-none">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      index === currentIndex
                        ? 'border-[#b11e22] ring-2 ring-[#b11e22]/30'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`缩略图 ${index + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 作品介绍 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-amber-100/50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#b11e22]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#b11e22]" />
              </div>
              <h2 className="font-serif text-lg font-bold text-stone-800">作品介绍</h2>
            </div>
            <p className="text-stone-600 leading-relaxed text-sm">
              {item.description}
            </p>
          </motion.div>

          {/* 作者信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-amber-100/50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#b11e22]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#b11e22]" />
              </div>
              <h2 className="font-serif text-lg font-bold text-stone-800">作者信息</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-stone-500 mb-1">作者姓名</p>
                <p className="font-medium text-stone-700">{item.author}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500 mb-1">作者介绍</p>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {item.authorBio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 作品声明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-amber-100/50 hover:shadow-md transition-shadow md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#b11e22]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#b11e22]" />
              </div>
              <h2 className="font-serif text-lg font-bold text-stone-800">作品声明</h2>
            </div>
            <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100/50">
              <p className="text-stone-600 leading-relaxed text-sm">
                {item.declaration}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 bg-[#b11e22] text-white rounded-lg hover:bg-[#99161a] transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif text-sm">返回展厅</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
