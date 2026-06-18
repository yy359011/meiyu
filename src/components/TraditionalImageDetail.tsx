import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  ThumbsUp,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  Maximize2,
  Image,
  Bookmark
} from 'lucide-react';

export interface ImageWorkItem {
  id: string;
  title: string;
  coverUrl: string;
  views: string;
  pubDate: string;
  tag: string;
  images: string[];
  category: string;
}

interface TraditionalImageDetailProps {
  imageDetail: ImageWorkItem;
  allWorks: ImageWorkItem[];
  onBack: () => void;
  onNavigateHome: () => void;
  onSelectWork: (item: ImageWorkItem) => void;
}

export default function TraditionalImageDetail({ imageDetail, allWorks, onBack, onNavigateHome, onSelectWork }: TraditionalImageDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(256);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentIndex(0);
  }, [imageDetail.id]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageDetail.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageDetail.images.length - 1 ? 0 : prev + 1));
  };

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const openLightbox = () => {
    setScale(1);
    setRotation(0);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setScale(1);
    setRotation(0);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.3));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleResetView = () => { setScale(1); setRotation(0); };

  // Auto-scroll thumbnail strip when current index changes
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumb = thumbnailRef.current.children[currentIndex] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  const getDescription = () => {
    const tag = imageDetail.tag;
    if (tag === '国画') return '本作品以传统国画技法创作，运用泼墨、勾勒、皴染等经典手法，展现出东方美学独有的意境之美。画面构图疏密有致，用墨浓淡相宜，充分体现了"外师造化，中得心源"的艺术理念。';
    if (tag === '写意') return '写意画讲究"以形写神"，不拘泥于形似而追求神韵。本作品以洒脱的笔触和丰富的墨色层次，传达出强烈的情感张力和精神内涵，是中国文人画传统的当代延续。';
    if (tag === '行书') return '行书兼具楷书的规整与草书的流动之美。本作品笔势流畅、气韵贯通，点画之间既有法度又显灵动，是研习书法笔意与结构的经典范本。';
    if (tag === '草书') return '草书以线条的律动与节奏展现书写者的精神境界。本作品笔走龙蛇、气势磅礴，将书法的抽象之美推向极致，具有极高的艺术观赏价值。';
    if (tag === '徽派') return '徽派建筑以粉墙黛瓦、马头墙著称，体现了徽州文化"贾而好儒"的精神特质。本组摄影从多角度记录了徽派建筑的精美细节与和谐之美。';
    if (tag === '泼墨') return '本作品以水墨摄影手法捕捉雨中江南的朦胧意境，黑白灰色调层次丰富，将自然景观与传统水墨审美完美融合，呈现出独特的东方诗意。';
    if (tag === '蓝染') return '蓝染是中国传统植物染色工艺之一，以板蓝根为原料，经浸泡、发酵、染色等多道工序制成。本作品记录了蓝染工艺的全过程，展现了匠人精神与自然之美的和谐统一。';
    return '本作品展现了中国传统艺术的独特魅力，融合了经典技法与现代审美，具有较高的艺术欣赏与研究价值。';
  };

  const getTags = () => {
    const tag = imageDetail.tag;
    if (tag === '国画') return ['国画', '山水', '泼墨', '传统技法'];
    if (tag === '写意') return ['写意', '水墨', '文人画', '气韵'];
    if (tag === '行书') return ['行书', '书法', '兰亭序', '王羲之'];
    if (tag === '草书') return ['草书', '书法', '怀素', '自叙帖'];
    if (tag === '徽派') return ['摄影', '徽派建筑', '宏村', '皖南'];
    if (tag === '泼墨') return ['摄影', '水墨', '江南', '雨景'];
    if (tag === '蓝染') return ['非遗', '蓝染', '草木染', '传统工艺'];
    return ['传统艺术', '美育', '鉴赏'];
  };

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-stone-800 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
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
                <span className="font-medium">传统艺术库</span>
              </button>
              <span className="text-stone-300 mx-1">›</span>
              <span className="text-[#b11e22] font-medium truncate max-w-[200px]">
                {imageDetail.category}
              </span>
            </div>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Image Carousel */}
          <div className="lg:col-span-8">

            {/* Main Image Viewer */}
            <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={imageDetail.images[currentIndex]}
                    alt={imageDetail.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain bg-stone-900"
                  />
                </AnimatePresence>

                {/* Click to expand overlay */}
                <button
                  onClick={openLightbox}
                  className="absolute top-3 right-3 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                  title="查看大图"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Left/Right arrows */}
                {imageDetail.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image index indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Image className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-white text-xs font-mono">
                    {currentIndex + 1} / {imageDetail.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {imageDetail.images.length > 1 && (
                <div
                  ref={thumbnailRef}
                  className="flex items-center space-x-2 px-3 py-3 bg-stone-900 overflow-x-auto scrollbar-none"
                >
                  {imageDetail.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        idx === currentIndex
                          ? 'border-[#b11e22] ring-1 ring-[#b11e22]/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`缩略图 ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Info & Description */}
          <div className="lg:col-span-4">
            <div className="bg-[#fffdf6] border border-amber-200/50 rounded-xl p-6 shadow-sm">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-wide leading-snug">
                {imageDetail.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4 pb-5 border-b border-stone-200/60 text-xs sm:text-sm text-stone-500 font-sans">
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-stone-400" />
                  <span>{imageDetail.views}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span>{imageDetail.pubDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Image className="w-4 h-4 text-stone-400" />
                  <span>{imageDetail.images.length} 张</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-4 pb-4 border-b border-stone-200/60">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1.5 text-xs font-semibold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                    isLiked
                      ? 'bg-[#b11e22]/10 border-[#b11e22]/20 text-[#b11e22]'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-[#b11e22] hover:text-[#b11e22]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>点赞 ({likes})</span>
                </button>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`flex items-center space-x-1.5 text-xs font-semibold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-amber-50 border-amber-300 text-amber-600'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                  <span>{isFavorited ? '已收藏' : '收藏'}</span>
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-4 bg-[#b11e22] rounded-sm" />
                  <h3 className="font-serif text-sm font-bold text-[#b11e22] tracking-wider">简介</h3>
                </div>
                <p className="text-stone-700 text-xs tracking-wide leading-relaxed text-justify">
                  {getDescription()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-100">
                {getTags().map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-stone-900/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Image className="w-4 h-4 text-[#b11e22]" />
                <span className="text-white text-sm font-medium truncate max-w-md">{imageDetail.title}</span>
                <span className="text-stone-400 text-xs font-mono">{currentIndex + 1}/{imageDetail.images.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={handleZoomOut} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="缩小">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="放大">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20 mx-1" />
                <button onClick={handleRotate} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="旋转">
                  <RotateCw className="w-4 h-4" />
                </button>
                <button onClick={handleResetView} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="重置">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20 mx-1" />
                <button onClick={closeLightbox} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="关闭">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Area */}
            <div className="flex-1 flex items-center justify-center overflow-hidden relative px-12">
              {imageDetail.images.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={imageDetail.images[currentIndex]}
                  alt={imageDetail.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-full max-h-full object-contain select-none"
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                  draggable={false}
                />
              </AnimatePresence>

              {imageDetail.images.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Lightbox Thumbnail Strip */}
            {imageDetail.images.length > 1 && (
              <div className="flex items-center justify-center space-x-2 px-6 py-3 bg-stone-900/80 backdrop-blur-sm">
                {imageDetail.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      idx === currentIndex
                        ? 'border-[#b11e22] ring-1 ring-[#b11e22]/40'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt={`缩略图 ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Lightbox Footer Tip */}
            <div className="text-center py-2 bg-stone-900/60">
              <p className="text-stone-400 text-xs">
                滚轮缩放 · 点击上方按钮旋转 · 按 ESC 关闭
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESC key handler */}
      {typeof window !== 'undefined' && (
        <KeyboardHandler showLightbox={showLightbox} onClose={closeLightbox} />
      )}
    </div>
  );
}

// Keyboard handler component for ESC and arrow keys
function KeyboardHandler({ showLightbox, onClose }: { showLightbox: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!showLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, onClose]);
  return null;
}
