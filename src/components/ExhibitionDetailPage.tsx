/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, User, FileText, BookOpen, Home, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, X, Bookmark, Award, ThumbsUp, Play, Pause, Volume2, Download, Maximize2, Eye } from 'lucide-react';
import { GalleryItem, GALLERY_DATA } from '../data';

interface ExhibitionDetailPageProps {
  item: GalleryItem;
  onBack: () => void;
  onNavigateHome: () => void;
}

export default function ExhibitionDetailPage({ item, onBack, onNavigateHome }: ExhibitionDetailPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);

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

  const openLightbox = () => {
    setShowLightbox(true);
    setScale(1);
    setRotation(0);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = '';
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fbf9f4]"
    >
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-1 text-sm">
              <button
                onClick={onNavigateHome}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-[#b11e22] transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">首页</span>
              </button>
              <span className="text-stone-300 mx-1">›</span>
              <button
                onClick={onBack}
                className="text-stone-600 hover:text-[#b11e22] transition-colors cursor-pointer"
              >
                <span className="font-medium">美育展厅</span>
              </button>
              <span className="text-stone-300 mx-1">›</span>
              <span className="text-[#b11e22] font-medium">
                {item.category}
              </span>
            </div>
            
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 text-stone-500 hover:text-[#b11e22] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">返回资源库</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Left/Right Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Content based on mediaType (2/3) */}
          <div className="lg:w-2/3 space-y-6">
            {item.mediaType === 'video' ? (
              <VideoLeftPanel item={item} />
            ) : item.mediaType === 'audio' ? (
              <AudioLeftPanel item={item} />
            ) : item.mediaType === 'pdf' ? (
              <PdfLeftPanel item={item} />
            ) : (
              <ImageLeftPanel
                item={item}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                isAutoPlaying={isAutoPlaying}
                setIsAutoPlaying={setIsAutoPlaying}
                allImages={allImages}
                hasMultipleImages={hasMultipleImages}
                showLightbox={showLightbox}
                setShowLightbox={setShowLightbox}
                scale={scale}
                setScale={setScale}
                rotation={rotation}
                setRotation={setRotation}
                openLightbox={openLightbox}
                closeLightbox={closeLightbox}
              />
            )}
          </div>

          {/* Right: Information (1/3) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-1/3"
          >
            {/* Work Title */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              《{item.title}》
            </h1>

            {/* Category Tags, Like & Favorite */}
            <div className="flex items-center justify-end flex-wrap gap-2 mb-6">
              {item.subCategory && (
                <span className="inline-flex items-center bg-[#b11e22]/10 text-[#b11e22] text-xs font-semibold px-3 py-1 rounded-full border border-[#b11e22]/20">
                  {item.subCategory}
                </span>
              )}
              <span className="inline-flex items-center bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                {item.category}
              </span>
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                }}
                className={`flex-shrink-0 flex items-center space-x-1.5 text-xs font-semibold py-1.5 px-3.5 rounded-full border transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-red-50 border-red-300 text-red-600'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-red-400 hover:text-red-600'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? '已点赞' : '点赞'}</span>
                <span className="text-[10px] opacity-70">{likeCount}</span>
              </button>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`flex-shrink-0 flex items-center space-x-1.5 text-xs font-semibold py-1.5 px-3.5 rounded-full border transition-all cursor-pointer ${
                  isFavorited
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                <span>{isFavorited ? '已收藏' : '收藏'}</span>
              </button>
            </div>

            {/* 作者介绍 */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-5 h-5 text-[#b11e22]" />
                <h2 className="font-serif text-lg font-bold text-[#b11e22]">作者介绍</h2>
              </div>
              <p className="text-stone-700 leading-relaxed text-base font-serif">
                {item.author}，{item.authorBio}
              </p>
            </div>

            {/* 作品介绍 */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#b11e22]" />
                <h2 className="font-serif text-lg font-bold text-[#b11e22]">作品介绍</h2>
              </div>
              <p className="text-stone-700 leading-relaxed text-base font-serif">
                {item.description}
              </p>
            </div>

            {/* 作品声明 */}
            <div className="bg-[#fafafa]/70 border border-stone-200/50 rounded-2xl p-5">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-stone-800" />
                <h2 className="font-serif text-lg font-bold text-stone-800">作品声明</h2>
              </div>
              <p className="text-stone-700 leading-relaxed text-sm font-serif">
                {item.declaration}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== 视频左侧面板 ==================== */
function VideoLeftPanel({ item }: { item: GalleryItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(245);
  const [activeVideo, setActiveVideo] = useState(item);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const relatedVideos = GALLERY_DATA.filter(
    (g) => g.mediaType === 'video' && g.id !== item.id
  );
  const allVideos = [item, ...relatedVideos];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) { setIsPlaying(false); return 0; }
          return prev + 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, duration]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.floor(ratio * duration));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* 16:9 视频播放器 */}
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0">
            <img src={activeVideo.image} alt={activeVideo.title} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" crossOrigin="anonymous" />
          </div>
          <button onClick={() => setIsPlaying(!isPlaying)} className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              {isPlaying ? <Pause className="w-8 h-8 text-white" fill="white" /> : <Play className="w-8 h-8 text-white ml-1" fill="white" />}
            </motion.div>
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
            <div ref={progressRef} onClick={handleProgressClick} className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group">
              <div className="h-full bg-[#b11e22] rounded-full relative" style={{ width: `${(currentTime / duration) * 100}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex items-center justify-between text-white/80 text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 视频列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#b11e22] rounded-full" />
            <h3 className="text-sm font-semibold text-stone-900 font-serif">视频列表</h3>
          </div>
          <span className="text-xs text-stone-400">共 {allVideos.length} 个视频</span>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          {allVideos.map((video, idx) => (
            <button key={video.id} onClick={() => { setActiveVideo(video); setCurrentTime(0); setIsPlaying(false); }}
              className={`flex gap-3 p-3 rounded-xl text-left transition-all ${activeVideo.id === video.id ? 'ring-2 ring-amber-400 bg-amber-50/50' : 'hover:bg-stone-50'}`}>
              <div className="relative w-24 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                <img src={video.image} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                {activeVideo.id === video.id && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 px-2 py-0.5 bg-red-500 text-white text-xs font-medium">正在播放</div>
                  </>
                )}
                <div className="absolute bottom-0 right-0 px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded-tl">
                  {idx % 2 === 0 ? '15:20' : '22:15'}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium text-stone-900 font-serif mb-1.5 ${activeVideo.id === video.id ? 'text-[#b11e22]' : ''}`}>
                  {video.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {['1.2K', '4.5k', '8.9k', '2.1k', '1.5k'][idx] || '1.2K'} 观看
                  </span>
                  {idx > 0 && <span>·</span>}
                  {idx > 0 && <span>{['3天前', '1周前', '2周前', '1个月前'][idx - 1]}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== 音频左侧面板 ==================== */
function AudioLeftPanel({ item }: { item: GalleryItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(198);
  const [activeAudio, setActiveAudio] = useState(item);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const relatedAudios = GALLERY_DATA.filter(
    (g) => g.mediaType === 'audio' && g.id !== item.id
  );
  const allAudios = [item, ...relatedAudios];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) { setIsPlaying(false); return 0; }
          return prev + 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, duration]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.floor(ratio * duration));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* 音频播放器 */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-[#b11e22] via-amber-600 to-amber-400">
          <img src={activeAudio.image} alt={activeAudio.title} className="w-full h-full object-cover mix-blend-overlay opacity-40" referrerPolicy="no-referrer" crossOrigin="anonymous" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={isPlaying ? { rotate: 360 } : { rotate: 0 }} transition={isPlaying ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
              className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-2xl">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img src={activeAudio.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-end justify-center gap-[3px] h-12 mb-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const h = isPlaying ? Math.random() * 80 + 20 : 20 + Math.sin(i * 0.5) * 15;
              return <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-[#b11e22] to-amber-400 transition-all duration-300" style={{ height: `${h}%`, opacity: i / 40 < currentTime / duration ? 1 : 0.3 }} />;
            })}
          </div>
          <div ref={progressRef} onClick={handleProgressClick} className="w-full h-1.5 bg-stone-100 rounded-full cursor-pointer mb-3 group">
            <div className="h-full bg-[#b11e22] rounded-full relative transition-all" style={{ width: `${(currentTime / duration) * 100}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#b11e22] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-400 mb-5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => setCurrentTime(Math.max(0, currentTime - 10))} className="text-stone-400 hover:text-stone-600 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-[#b11e22] hover:bg-[#991a1d] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#b11e22]/30 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" fill="white" /> : <Play className="w-6 h-6 ml-0.5" fill="white" />}
            </motion.button>
            <button onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))} className="text-stone-400 hover:text-stone-600 transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* 音频列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#b11e22] rounded-full" />
            <h3 className="text-sm font-semibold text-stone-900 font-serif">音频列表</h3>
          </div>
          <span className="text-xs text-stone-400">共 {allAudios.length} 个音频</span>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          {allAudios.map((audio, idx) => (
            <button key={audio.id} onClick={() => { setActiveAudio(audio); setCurrentTime(0); setIsPlaying(false); }}
              className={`flex gap-3 p-3 rounded-xl text-left transition-all ${activeAudio.id === audio.id ? 'ring-2 ring-amber-400 bg-amber-50/50' : 'hover:bg-stone-50'}`}>
              <div className="relative w-24 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                <img src={audio.image} alt={audio.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                {activeAudio.id === audio.id && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 px-2 py-0.5 bg-red-500 text-white text-xs font-medium">正在播放</div>
                  </>
                )}
                <div className="absolute bottom-0 right-0 px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded-tl">
                  {idx % 2 === 0 ? '3:18' : '4:45'}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium text-stone-900 font-serif mb-1.5 ${activeAudio.id === audio.id ? 'text-[#b11e22]' : ''}`}>
                  {audio.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {['5.2K', '3.8k', '2.1k', '1.5k'][idx] || '5.2K'} 播放
                  </span>
                  {idx > 0 && <span>·</span>}
                  {idx > 0 && <span>{['5天前', '2周前', '1个月前'][idx - 1]}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== PDF左侧面板 ==================== */
function PdfLeftPanel({ item }: { item: GalleryItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(12);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const relatedDocs = GALLERY_DATA.filter(
    (g) => g.mediaType === 'pdf' && g.id !== item.id
  );
  const allDocs = [item, ...relatedDocs];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* PDF 预览区 */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(prev => Math.max(prev - 25, 25))} className="p-2 rounded-lg hover:bg-stone-200 transition-colors text-stone-600"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-stone-500 min-w-[50px] text-center">{zoom}%</span>
            <button onClick={() => setZoom(prev => Math.min(prev + 25, 200))} className="p-2 rounded-lg hover:bg-stone-200 transition-colors text-stone-600"><ZoomIn className="w-4 h-4" /></button>
            <div className="w-px h-5 bg-stone-200 mx-1" />
            <button onClick={() => setRotation(prev => (prev + 90) % 360)} className="p-2 rounded-lg hover:bg-stone-200 transition-colors text-stone-600"><RotateCw className="w-4 h-4" /></button>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 rounded-lg hover:bg-stone-200 transition-colors text-stone-600"><Maximize2 className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-stone-200 transition-colors text-stone-600 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-stone-500">{currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-stone-200 transition-colors text-stone-600 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className={`relative bg-stone-100 flex items-center justify-center ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90' : 'min-h-[500px]'}`} onClick={() => isFullscreen && setIsFullscreen(false)}>
          <div className="relative bg-white shadow-lg" style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, transition: 'transform 0.3s ease', maxWidth: isFullscreen ? '90%' : '100%' }}>
            <div className="w-[595px] h-[842px] max-w-full bg-white p-12 relative">
              <div className="absolute top-6 left-12 right-12 flex items-center justify-between">
                <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#b11e22]" /><span className="text-xs font-serif text-stone-400">美育教育资源库</span></div>
                <span className="text-xs font-serif text-stone-400">第 {currentPage} 页</span>
              </div>
              <div className="mt-8 space-y-6">
                <div className="text-center mb-10">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 mb-3">{item.title}</h2>
                  <div className="w-16 h-0.5 bg-[#b11e22] mx-auto mb-4" />
                  <p className="text-sm text-stone-500">{item.category}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-1/3 aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
                      <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-serif text-lg font-semibold text-stone-800">一、概述</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                      <p className="text-sm text-stone-600 leading-relaxed">本资源为{item.category}类美育教学资料，适用于课堂教学及自主学习。</p>
                    </div>
                  </div>
                  <div className="border-t border-stone-100 pt-4">
                    <h3 className="font-serif text-lg font-semibold text-stone-800 mb-3">二、主要内容</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                          <span className="w-5 h-5 rounded-full bg-[#b11e22]/10 text-[#b11e22] text-xs flex items-center justify-center font-medium">{i}</span>
                          <span>教学要点 {i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-4 bg-stone-100 rounded w-3/4" />
                    <div className="h-4 bg-stone-100 rounded w-5/6" />
                    <div className="h-4 bg-stone-100 rounded w-2/3" />
                    <div className="h-32 bg-stone-100 rounded mt-4" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 left-12 right-12 flex items-center justify-center">
                <span className="text-xs font-serif text-stone-400">— {currentPage} —</span>
              </div>
            </div>
          </div>
          {isFullscreen && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">点击任意位置退出全屏</div>}
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors"><ThumbsUp className="w-3.5 h-3.5" />点赞</button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors"><Bookmark className="w-3.5 h-3.5" />收藏</button>
          </div>
        </div>
      </div>

      {/* 文档列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-50">
          <h3 className="text-sm font-semibold text-stone-900 font-serif">文档列表</h3>
        </div>
        <div className="divide-y divide-stone-50">
          {allDocs.map((doc, idx) => (
            <div key={doc.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-stone-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-stone-400 w-5">{idx + 1}</span>
                  <p className="text-sm font-medium text-stone-900 truncate font-serif">{doc.title}</p>
                </div>
                <p className="text-xs text-stone-400 ml-7">{doc.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== 图片左侧面板 ==================== */
function ImageLeftPanel({ item, currentIndex, setCurrentIndex, isAutoPlaying, setIsAutoPlaying, allImages, hasMultipleImages, showLightbox, setShowLightbox, scale, setScale, rotation, setRotation, openLightbox, closeLightbox }: {
  item: GalleryItem;
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (v: boolean) => void;
  allImages: string[];
  hasMultipleImages: boolean;
  showLightbox: boolean;
  setShowLightbox: (v: boolean) => void;
  scale: number;
  setScale: (fn: (prev: number) => number) => void;
  rotation: number;
  setRotation: (fn: (prev: number) => number) => void;
  openLightbox: () => void;
  closeLightbox: () => void;
}) {
  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + allImages.length) % allImages.length);
    setIsAutoPlaying(false);
  };
  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % allImages.length);
    setIsAutoPlaying(false);
  };
  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] cursor-pointer" onClick={openLightbox}>
            <AnimatePresence mode="wait">
              <motion.img key={currentIndex} src={allImages[currentIndex]} alt={`${item.title} - ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}
                className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {hasMultipleImages && (
              <>
                <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"><ChevronRight className="w-6 h-6" /></button>
              </>
            )}
            {hasMultipleImages && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                <span className="text-white/70 text-xs font-serif">{currentIndex + 1} / {allImages.length}</span>
              </div>
            )}
          </div>
          {hasMultipleImages && (
            <div className="bg-black/80 backdrop-blur-md p-4">
              <div className="flex gap-3 overflow-x-auto scrollbar-none">
                {allImages.map((img, index) => (
                  <button key={index} onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${index === currentIndex ? 'border-[#b11e22] ring-2 ring-[#b11e22]/30' : 'border-white/20 hover:border-white/50'}`}>
                    <img src={img} alt={`缩略图 ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full Screen Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"><X className="w-5 h-5" /></button>
            {hasMultipleImages && (
              <>
                <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"><ChevronRight className="w-6 h-6" /></button>
              </>
            )}
            <motion.div className="max-w-[90vw] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <motion.img key={`${currentIndex}-${rotation}-${scale}`} src={allImages[currentIndex]} alt={`${item.title} - ${currentIndex + 1}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                style={{ transform: `scale(${scale}) rotate(${rotation}deg)`, maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                className="mx-auto" referrerPolicy="no-referrer" crossOrigin="anonymous" />
            </motion.div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4">
              <button onClick={(e) => { e.stopPropagation(); setScale(prev => Math.max(prev - 0.25, 0.5)); }} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
              <span className="text-white/70 text-sm font-medium min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
              <button onClick={(e) => { e.stopPropagation(); setScale(prev => Math.min(prev + 0.25, 3)); }} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
              <span className="w-px h-8 bg-white/20" />
              <button onClick={(e) => { e.stopPropagation(); setRotation(prev => prev + 90); }} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"><RotateCw className="w-5 h-5" /></button>
            </div>
            {hasMultipleImages && <div className="absolute bottom-8 right-8 text-white/70 text-sm">{currentIndex + 1} / {allImages.length}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
