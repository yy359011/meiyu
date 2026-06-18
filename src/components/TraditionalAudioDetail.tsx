import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  Eye,
  Calendar,
  ChevronLeft,
  Home,
  ThumbsUp,
  Bookmark,
  Clock,
} from 'lucide-react';

interface AudioItem {
  id: string;
  title: string;
  coverUrl: string;
  views: string;
  pubDate: string;
  tag?: string;
  category?: string;
}

interface TraditionalAudioDetailProps {
  audio: AudioItem;
  onBack: () => void;
  onNavigateHome: () => void;
  allAudios: AudioItem[];
}

const AUDIO_LIST: AudioItem[] = [
  {
    id: 'rec-a1',
    title: '【评剧】《花为媒》选段 — 施立红版',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
    views: '5.6k',
    pubDate: '2024-03-15',
    tag: '评剧',
  },
  {
    id: 'rec-a2',
    title: '【京剧】《贵妃醉酒》梅兰芳经典录音',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop',
    views: '8.2k',
    pubDate: '2024-02-20',
    tag: '京剧',
  },
  {
    id: 'rec-a3',
    title: '【越剧】《梁祝》十八相送',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop',
    views: '3.9k',
    pubDate: '2024-01-10',
    tag: '越剧',
  },
  {
    id: 'rec-a4',
    title: '【黄梅戏】《天仙配》经典唱段',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=300&auto=format&fit=crop',
    views: '6.1k',
    pubDate: '2024-04-05',
    tag: '黄梅戏',
  },
  {
    id: 'rec-a5',
    title: '【昆曲】《牡丹亭·游园惊梦》',
    coverUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300&auto=format&fit=crop',
    views: '4.3k',
    pubDate: '2024-03-28',
    tag: '昆曲',
  },
];

const getDescriptionForAudio = (title: string): string => {
  if (title.includes('花为媒')) return '《花为媒》是评剧经典喜剧剧目，施立红老师以细腻婉转的唱腔，将张五可的聪慧活泼演绎得淋漓尽致。本选段展现了评剧独特的板腔体音乐结构与北方戏曲的明快韵律。';
  if (title.includes('女驸马')) return '《女驸马》是黄梅戏代表作之一，王琴版以其清亮甜润的嗓音赋予角色新的生命力。讲述了冯素珍女扮男装考取状元的传奇故事，唱腔优美流畅，深受观众喜爱。';
  if (title.includes('贵妃醉酒')) return '《贵妃醉酒》是京剧梅派经典剧目，梅兰芳先生的录音版本被视为该戏的最高艺术标准。通过优美的唱腔与身段，展现了杨贵妃从期盼到失落的情感变化。';
  if (title.includes('梁祝')) return '越剧《梁山伯与祝英台》是中国戏曲中最经典的爱情故事之一。"十八相送"选段以细腻的对唱展现了梁祝二人离别时的依依不舍，旋律婉转动人。';
  if (title.includes('天仙配')) return '《天仙配》是黄梅戏传统经典剧目，讲述了七仙女与董永的爱情故事。"路遇"一折的对唱旋律优美，是黄梅戏最具代表性的唱段之一。';
  if (title.includes('牡丹亭')) return '《牡丹亭》是昆曲巅峰之作，汤显祖原著，"游园惊梦"一折以"水磨调"的婉转唱腔，展现杜丽娘因梦生情的凄美故事，被誉为昆曲之冠。';
  return '本音频为中华传统戏曲精粹，通过高保真数字音频技术修复与重制，完整呈现传统戏曲唱腔之美。内容涵盖经典唱段、名家录音与珍贵历史音源，为美育教学提供优质听觉素材。';
};

export default function TraditionalAudioDetail({ audio, onBack, onNavigateHome, allAudios }: TraditionalAudioDetailProps) {
  const [currentAudio, setCurrentAudio] = useState<AudioItem>(audio);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [likes, setLikes] = useState(256);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Merge current audio with recommended list
  const displayList = [currentAudio, ...AUDIO_LIST.filter(a => a.id !== currentAudio.id)];

  // Vinyl rotation animation
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const animate = () => {
        setRotation(prev => (prev + 0.5) % 360);
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Scroll to top when switching audio
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPlaying(false);
  }, [currentAudio.id]);

  const handleSelectAudio = (item: AudioItem) => {
    setCurrentAudio(item);
  };

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
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
                听戏曲
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

          {/* LEFT: Vinyl Record Player + Audio List */}
          <div className="lg:col-span-8 space-y-6">

            {/* Vinyl Record Player Stage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl"
            >
              {/* Background blurred cover */}
              <img
                src={currentAudio.coverUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-40"
                referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden">
                {/* Decorative frame */}
                <div className="absolute inset-3 border border-amber-500/10 rounded-sm pointer-events-none" />

                {/* Vinyl Disc */}
                <div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 transition-transform duration-500 flex items-center justify-center"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Vinyl grooves */}
                  <div
                    className="absolute inset-0 rounded-full shadow-lg"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                        radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                        radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                        radial-gradient(circle, transparent 65%, #222522 66%, #222522 68%, transparent 69%),
                        radial-gradient(circle, transparent 75%, #0d0f0d 76%, #0d0f0d 78%, transparent 79%),
                        radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                      `,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.65), inset 0 0 15px rgba(255,255,255,0.06), inset 0 0 35px rgba(0,0,0,0.95)',
                    }}
                  >
                    {/* Gloss reflection */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 mix-blend-overlay" />
                  </div>

                  {/* Center label */}
                  <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-stone-950 overflow-hidden shadow-inner flex items-center justify-center bg-stone-900">
                    <img
                      src={currentAudio.coverUrl}
                      alt={currentAudio.title}
                      className="w-[105%] h-[105%] object-cover"
                      referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                    />
                    <div className="absolute w-3 h-3 rounded-full bg-[#fcf5e9] border border-zinc-800 shadow-inner" />
                  </div>
                </div>

                {/* Tonearm */}
                <div
                  className="absolute top-4 right-6 sm:right-8 w-14 h-20 origin-top transition-transform duration-700 pointer-events-none z-10"
                  style={{ transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)' }}
                >
                  <svg viewBox="0 0 40 60" className="w-full h-full text-amber-200" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="25" cy="10" r="3.5" fill="currentColor" />
                    <path d="M25,10 L16,34 L12,48" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="9" y="46" width="6" height="8" rx="1" fill="currentColor" />
                  </svg>
                </div>

                {/* Play/Pause button - centered on vinyl */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#b11e22]/90 hover:bg-[#b11e22] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer z-20"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Audio List */}
            <div className="bg-white rounded-xl border border-amber-100/60 p-5 shadow-xs">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-3 mb-4">
                <h2 className="font-serif text-base sm:text-lg font-bold text-stone-850 tracking-wide flex items-center space-x-2">
                  <span className="w-1 h-3.5 bg-[#b11e22]" />
                  <span>音频列表</span>
                </h2>
                <span className="text-xs text-stone-400 font-sans">
                  共 {displayList.length} 个音频
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayList.map((item) => {
                  const isActive = item.id === currentAudio.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectAudio(item)}
                      className={`p-2.5 rounded-lg border flex items-start space-x-3 transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? 'border-amber-300 bg-[#fdfbf6] shadow-xs'
                          : 'border-transparent hover:border-amber-200/50 hover:bg-[#fffdf8]'
                      }`}
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-lg overflow-hidden bg-stone-900">
                          <img
                            src={item.coverUrl}
                            alt=""
                            className="w-full h-full object-cover scale-125 blur-md opacity-40"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                          />
                          <div className="absolute inset-0 bg-black/50" />
                        </div>
                        <div
                          className={`relative w-12 h-12 ${isActive && isPlaying ? 'animate-spin' : ''}`}
                          style={{ animationDuration: '4s' }}
                        >
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              backgroundImage: `
                                radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                                radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                                radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                                radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                              `,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                            }}
                          />
                          <div className="absolute w-4 h-4 rounded-full overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-stone-900">
                            <img
                              src={item.coverUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                            />
                          </div>
                        </div>
                        {isActive && isPlaying ? (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-6 h-6 rounded-full bg-[#b11e22] text-white flex items-center justify-center animate-pulse shadow">
                              <Pause className="w-3 h-3 fill-current" />
                            </div>
                          </div>
                        ) : (
                          <div className={`absolute inset-0 flex items-center justify-center z-10 ${isActive ? '' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                            <div className="w-6 h-6 rounded-full bg-[#b11e22]/90 text-white flex items-center justify-center shadow">
                              <Play className="w-3 h-3 fill-current translate-x-0.5" />
                            </div>
                          </div>
                        )}
                        {isActive && (
                          <span className="absolute -top-1 -left-1 px-1 py-0.5 bg-[#b11e22] rounded text-[6px] font-bold text-white z-10">
                            {isPlaying ? '播放中' : '当前'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1 py-0.5">
                        <p className={`font-serif text-xs font-bold tracking-wide leading-snug line-clamp-2 transition-colors ${
                          isActive ? 'text-[#b11e22]' : 'text-stone-900 group-hover:text-[#b11e22]'
                        }`}>
                          {item.title}
                        </p>
                        <span className="text-[10px] text-stone-400 font-sans">
                          {item.views}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Description & Info */}
          <div className="lg:col-span-4">
            <div className="bg-[#fffdf6] border border-amber-200/50 rounded-xl p-6 shadow-sm">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-wide leading-snug">
                {currentAudio.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4 pb-5 border-b border-stone-200/60 text-xs sm:text-sm text-stone-500 font-sans">
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-stone-400" />
                  <span>{currentAudio.views}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span>{currentAudio.pubDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>04:32</span>
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
                  {getDescriptionForAudio(currentAudio.title)}
                </p>
              </div>

              {currentAudio.tag && (
                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-100">
                  {[currentAudio.tag, '传统戏曲', '美育资源', '非遗传承'].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
