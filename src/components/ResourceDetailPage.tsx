import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, Download, Eye, ChevronLeft, ChevronRight, Volume2, FileText, Image as ImageIcon, X, ZoomIn, ZoomOut, RotateCw, Maximize2, Bookmark, ThumbsUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { RESOURCE_DATA } from './ResourceListPage';
import type { ResourceItem } from './ResourceListPage';

interface ResourceDetailPageProps {
  item: ResourceItem;
  onBack: () => void;
}

export default function ResourceDetailPage({ item, onBack }: ResourceDetailPageProps) {
  // 获取同类资源列表
  const relatedResources = RESOURCE_DATA.filter(
    (r) => r.type === item.type && r.id !== item.id
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20"
    >
      {/* 顶部导航 */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回资源库</span>
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <TypeIcon type={item.type} />
            <span className="text-sm text-gray-500">{item.category}</span>
          </div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：根据类型渲染不同布局 */}
          <div className="flex-1 min-w-0">
            {item.type === 'video' && (
              <VideoSection item={item} relatedResources={relatedResources} />
            )}
            {item.type === 'audio' && (
              <AudioSection item={item} relatedResources={relatedResources} />
            )}
            {item.type === 'image' && (
              <ImageSection item={item} relatedResources={relatedResources} />
            )}
            {item.type === 'document' && (
              <PdfSection item={item} relatedResources={relatedResources} />
            )}
          </div>

          {/* 右侧：信息面板 */}
          <div className="lg:w-[380px] flex-shrink-0">
            <InfoPanel item={item} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== 类型图标 ==================== */
function TypeIcon({ type }: { type: ResourceItem['type'] }) {
  const cls = 'w-4 h-4';
  switch (type) {
    case 'video': return <Play className={cls} />;
    case 'audio': return <Volume2 className={cls} />;
    case 'image': return <ImageIcon className={cls} />;
    case 'document': return <FileText className={cls} />;
  }
}

/* ==================== 视频区域 ==================== */
function VideoSection({ item, relatedResources }: { item: ResourceItem; relatedResources: ResourceItem[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(245); // 模拟时长
  const [activeVideo, setActiveVideo] = useState(item);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allVideos = [item, ...relatedResources.filter(r => r.type === 'video')];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(0 as unknown as boolean);
            return 0;
          }
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
    <div className="space-y-6">
      {/* 16:9 视频播放器 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={activeVideo.thumbnail}
              alt={activeVideo.title}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          {/* 播放按钮 */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              )}
            </motion.div>
          </button>
          {/* 底部控制栏 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group"
            >
              <motion.div
                className="h-full bg-blue-500 rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
            <div className="flex items-center justify-between text-white/80 text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 视频列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">视频列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {allVideos.map((video, idx) => (
            <motion.button
              key={video.id}
              onClick={() => { setActiveVideo(video); setCurrentTime(0); setIsPlaying(false); }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                activeVideo.id === video.id
                  ? 'bg-blue-50/60'
                  : 'hover:bg-gray-50'
              }`}
              whileHover={{ x: 2 }}
            >
              <div className="relative w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-4 h-4 text-white" fill="white" />
                </div>
                {activeVideo.id === video.id && isPlaying && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-blue-500 rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400">{idx + 1}</span>
                  <p className={`text-sm font-medium truncate ${
                    activeVideo.id === video.id ? 'text-blue-600' : 'text-gray-900'
                  }`}>{video.title}</p>
                </div>
                <p className="text-xs text-gray-400">{video.format} · {video.size}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================== 音频区域 ==================== */
function AudioSection({ item, relatedResources }: { item: ResourceItem; relatedResources: ResourceItem[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(198);
  const [activeAudio, setActiveAudio] = useState(item);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allAudios = [item, ...relatedResources.filter(r => r.type === 'audio')];

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
    <div className="space-y-6">
      {/* 音频播放器 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* 封面 */}
        <div className="relative h-64 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <img
            src={activeAudio.thumbnail}
            alt={activeAudio.title}
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
              className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-2xl"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img src={activeAudio.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 控制区 */}
        <div className="p-6">
          <div className="text-center mb-5">
            <h3 className="text-lg font-semibold text-gray-900">{activeAudio.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{activeAudio.category}</p>
          </div>

          {/* 波形可视化 */}
          <div className="flex items-end justify-center gap-[3px] h-12 mb-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const h = isPlaying
                ? Math.random() * 80 + 20
                : 20 + Math.sin(i * 0.5) * 15;
              return (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-indigo-400"
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: i / 40 < currentTime / duration ? 1 : 0.3 }}
                />
              );
            })}
          </div>

          {/* 进度条 */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1.5 bg-gray-100 rounded-full cursor-pointer mb-3 group"
          >
            <div
              className="h-full bg-blue-500 rounded-full relative transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-blue-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* 播放控制 */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" fill="white" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" fill="white" />
              )}
            </motion.button>
            <button
              onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 音频列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">音频列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {allAudios.map((audio, idx) => (
            <motion.button
              key={audio.id}
              onClick={() => { setActiveAudio(audio); setCurrentTime(0); setIsPlaying(false); }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                activeAudio.id === audio.id ? 'bg-blue-50/60' : 'hover:bg-gray-50'
              }`}
              whileHover={{ x: 2 }}
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={audio.thumbnail} alt={audio.title} className="w-full h-full object-cover" />
                {activeAudio.id === audio.id && isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex gap-[2px] items-end h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] bg-white rounded-full"
                          animate={{ height: [4, 14, 4] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
                  <p className={`text-sm font-medium truncate ${
                    activeAudio.id === audio.id ? 'text-blue-600' : 'text-gray-900'
                  }`}>{audio.title}</p>
                </div>
                <p className="text-xs text-gray-400 ml-7">{audio.format} · {audio.size}</p>
              </div>
              {activeAudio.id === audio.id && (
                <Volume2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================== 图片/文档区域 ==================== */
function ImageSection({ item, relatedResources }: { item: ResourceItem; relatedResources: ResourceItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = [item.thumbnail]; // 单资源展示主图
  const allItems = [item, ...relatedResources.filter(r => r.type === item.type)];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-6">
      {/* 图片展示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          className="relative aspect-[4/3] cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={item.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full object-contain bg-gray-50"
            />
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 py-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* 相关资源列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">
            {item.type === 'image' ? '图片列表' : '文档列表'}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5">
          {allItems.map((res) => (
            <motion.div
              key={res.id}
              className="group cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-2">
                <img
                  src={res.thumbnail}
                  alt={res.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-medium text-gray-700 truncate">{res.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white/80 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={images[currentIndex]}
              alt={item.title}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==================== PDF预览区域 ==================== */
function PdfSection({ item, relatedResources }: { item: ResourceItem; relatedResources: ResourceItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(12); // 模拟页数
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const allDocs = [item, ...relatedResources.filter(r => r.type === 'document')];

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-6">
      {/* PDF 预览区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* 工具栏 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
              title="缩小"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-gray-500 min-w-[50px] text-center">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
              title="放大"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              onClick={handleRotate}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
              title="旋转"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
              title="全屏"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-gray-500">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF 内容展示 */}
        <div
          className={`relative bg-gray-100 flex items-center justify-center ${
            isFullscreen ? 'fixed inset-0 z-50 bg-black/90' : 'min-h-[500px]'
          }`}
          onClick={() => isFullscreen && setIsFullscreen(false)}
        >
          <div
            className="relative bg-white shadow-lg"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
              maxWidth: isFullscreen ? '90%' : '100%',
              maxHeight: isFullscreen ? '90vh' : 'none'
            }}
          >
            {/* PDF 页面模拟 */}
            <div className="w-[595px] h-[842px] max-w-full bg-white p-12 relative">
              {/* PDF 页眉 */}
              <div className="absolute top-6 left-12 right-12 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#b11e22]" />
                  <span className="text-xs font-serif text-gray-400">美育教育资源库</span>
                </div>
                <span className="text-xs font-serif text-gray-400">第 {currentPage} 页</span>
              </div>

              {/* PDF 内容区域 */}
              <div className="mt-8 space-y-6">
                <div className="text-center mb-10">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">{item.title}</h2>
                  <div className="w-16 h-0.5 bg-[#b11e22] mx-auto mb-4" />
                  <p className="text-sm text-gray-500">{item.category} · {item.format}</p>
                </div>

                {/* 模拟PDF内容 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-1/3 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-serif text-lg font-semibold text-gray-800">一、概述</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        本资源为{item.category}类美育教学资料，适用于课堂教学及自主学习。
                        内容系统全面，图文并茂，便于理解与实践。
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">二、主要内容</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-[#b11e22]/10 text-[#b11e22] text-xs flex items-center justify-center font-medium">{i}</span>
                          <span>教学要点 {i}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 占位块模拟更多内容 */}
                  <div className="space-y-3 pt-4">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="h-32 bg-gray-100 rounded mt-4" />
                  </div>
                </div>
              </div>

              {/* PDF 页脚 */}
              <div className="absolute bottom-6 left-12 right-12 flex items-center justify-center">
                <span className="text-xs font-serif text-gray-400">— {currentPage} —</span>
              </div>
            </div>
          </div>

          {/* 全屏关闭提示 */}
          {isFullscreen && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
              点击任意位置退出全屏
            </div>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              点赞
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
              <Bookmark className="w-3.5 h-3.5" />
              收藏
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-[#b11e22] text-white hover:bg-[#99161a] transition-colors">
            <Download className="w-3.5 h-3.5" />
            下载PDF
          </button>
        </div>
      </motion.div>

      {/* 文档列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">文档列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {allDocs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
              whileHover={{ x: 2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                </div>
                <p className="text-xs text-gray-400 ml-7">{doc.format} · {doc.size}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
                <Download className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================== 右侧信息面板 ==================== */
function InfoPanel({ item }: { item: ResourceItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* 标题与分类 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {item.category}
          </span>
          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full uppercase">
            {item.format}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
      </div>

      {/* 作者信息 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">作者介绍</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            美
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">美育创作者</p>
            <p className="text-xs text-gray-500">专注于美育创作与教育</p>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs">浏览</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{item.views.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
              <Download className="w-4 h-4" />
              <span className="text-xs">下载</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{item.downloads.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 下载按钮 */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        下载资源
      </motion.button>
    </motion.div>
  );
}
