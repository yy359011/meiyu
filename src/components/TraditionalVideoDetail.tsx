import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Play,
  Eye,
  Calendar,
  Sparkles,
  Volume2,
  Clock,
  ExternalLink,

  ChevronLeft,
  Home,
  ThumbsUp,
  Award,
  Bookmark
} from 'lucide-react';

interface RecommendedVideo {
  id: string;
  title: string;
  duration: string;
  views: string;
  timeLabel: string;
  coverUrl: string;
  videoUrl: string;
}

interface TraditionalVideoDetailProps {
  video: {
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    videoUrl?: string;
    category?: string;
  };
  onBack: () => void;
  onNavigateHome: () => void;
}

const RECOMMENDED_LIST: RecommendedVideo[] = [
  {
    id: 'rec-1',
    title: '【公开课】走进梨园：评剧的历史与流派',
    duration: '15:20',
    views: '4.5k',
    timeLabel: '3天前',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'rec-2',
    title: '《秦香莲》选段 - 赵丽蓉经典舞台重现',
    duration: '08:45',
    views: '8.9k',
    timeLabel: '1周前',
    coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'rec-3',
    title: '戏曲服饰美学：从云肩到凤冠的艺术逻辑',
    duration: '22:15',
    views: '2.1k',
    timeLabel: '2周前',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ballerina-spinning-and-jumping-40854-large.mp4'
  },
  {
    id: 'rec-4',
    title: '美育大讲堂：如何在生活中感受戏曲之美',
    duration: '12:10',
    views: '1.5k',
    timeLabel: '1个月前',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-acoustic-guitar-player-close-up-of-hands-33425-large.mp4'
  }
];

const getDescriptionForTitle = (title: string, category: string): string => {
  if (title.includes('花为媒')) {
    return '《花为媒》是评剧经典的喜剧剧目之一。本版由著名评剧演员施立红领衔主演。讲述了王俊卿与张五可的爱情纠葛，施立红老师通过细腻的唱腔与身段，将张五可这一活泼聪慧的女性形象演绎得淋漓尽致。画面采用了现代修复技术，清晰展现了中国戏曲服装的华美细节与舞台布景的深厚韵味。';
  }
  if (title.includes('穆桂英挂帅')) {
    return '《穆桂英挂帅》是豫剧经典的爱国主义剧目之一。本篇展现了巾帼英雄穆桂英年过半百、在国家危亡之秋冲破艰难险阻、再度披挂上阵、挂帅出征的崇高革命情操与坚决风骨，豪情壮志响彻云霄。';
  }
  if (title.includes('红楼梦')) {
    return '越剧经典《红楼梦》艺术精湛，旋律优美动听。本折展现了贾宝玉与林黛玉初试云雨、知音相惜的唯美情感意象。演员以细腻隽永的江南唱腔，完美还原了曹雪芹笔下大观园里的悲欢离合与古典人文气韵。';
  }
  if (title.includes('牡丹亭')) {
    return '昆曲巅峰之作《牡丹亭·惊梦》，字字玑珠，声声慢调。本篇展现杜丽娘在后花园中因梦生情而寻梦的凄婉绝唱。委婉清丽的"水磨调"配合细致入微的折扇动作，重现明代传奇文学的极致美感。';
  }
  if (category.includes('音乐') || category.includes('音乐库')) {
    return '本视频为中华传统音乐艺术赏析课程，通过高清音频录制与现代视觉呈现技术，完整展现了中华传统乐器与古典音乐的美学意蕴。课程结合历史典故、乐器构造、演奏技法与文化背景，旨在普及音乐常识，启迪新时代美育。';
  }
  if (category.includes('非遗')) {
    return '本影像为国家级非物质文化遗产专题纪录，通过实地走访与匠人专访的方式，以第一视角记录中华传统工艺与民俗活动的工艺流程、文化内涵与当代表达。影像采用 4K 高清拍摄与专业后期制作，为美育教学提供珍贵的活态传承素材。';
  }
  return '此美育精品为公共美育中心数字化馆藏资源，通过高保真数字音视频技术修复，完整呈现传统非遗戏曲精粹之美。课程结合历史典故、唱腔结构、舞台身段与器乐编配，旨在普及美学常识，启迪新时代美育。';
};

const getTagsForTitle = (title: string, category: string): string[] => {
  if (title.includes('花为媒')) return ['评剧', '经典剧目', '施立红', '传统美育'];
  if (title.includes('穆桂英')) return ['豫剧', '巾帼风骨', '柏青版', '美育基地'];
  if (title.includes('红楼梦')) return ['越剧', '红楼雅韵', '才子佳人', '非遗戏曲'];
  if (title.includes('牡丹亭')) return ['昆曲', '牡丹亭', '吴心怡', '世界非遗'];
  if (title.includes('公开课')) return ['微课', '走进梨园', '流派普及', '学术讲座'];
  if (title.includes('秦香莲')) return ['经典名折', '赵丽蓉', '舞台艺术', '评剧典藏'];
  if (title.includes('服饰美学')) return ['戏曲服饰', '美学逻辑', '云肩凤冠', '服饰艺术'];
  if (title.includes('生活中')) return ['美育大讲堂', '生活美学', '戏曲之美', '大众美化'];
  if (category.includes('音乐') || category.includes('音乐库')) return ['国风音乐', '中国民族音乐', '古典音乐', '轻音乐'];
  if (category.includes('非遗')) return ['非遗传承', '匠心工艺', '活态记录', '民俗文化'];
  return ['经典剧目', '传统戏曲', '美育资源', '非物质文化遗产'];
};

export default function TraditionalVideoDetail({ video, onBack, onNavigateHome }: TraditionalVideoDetailProps) {
  // Determine category: default to 戏曲 for consistency, but accept from video.category when provided
  const categoryName = video.category || '戏曲公开学堂';
  const categoryShort = video.category || '戏曲';
  
  // Currently playing video state (initially standard passed video item)
  const [currentVideo, setCurrentVideo] = useState({
    id: video.id,
    title: video.title.replace('新立红版', '施立红版'),
    coverUrl: video.coverUrl,
    views: video.views,
    pubDate: video.pubDate,
    videoUrl: video.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4',
    category: video.category || '戏曲公开学堂'
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Scroll to top when loading page or when switching active video
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPlaying(false);
  }, [currentVideo.id]);

  const handleRecommendClick = (rec: RecommendedVideo) => {
    setCurrentVideo({
      id: rec.id,
      title: rec.title,
      coverUrl: rec.coverUrl,
      views: `${rec.views} 播放`,
      pubDate: '2024-03-22',
      videoUrl: rec.videoUrl,
      category: video.category || '戏曲公开学堂'
    });
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-stone-800 pb-20">
      
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
                <span className="font-medium">传统艺术库</span>
              </button>
              <span className="text-stone-300 mx-1">›</span>
              <span className="text-[#b11e22] font-medium truncate max-w-[200px]">
                {categoryName}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Core Detail Grid Layout (Matches figure 1 layout exactly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Player + Video List */}
          <div className="lg:col-span-8 space-y-6">

            {/* Video Player */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950 border border-stone-900 shadow-xl group">
              {isPlaying ? (
                <video
                  src={currentVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <img
                    src={currentVideo.coverUrl}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover brightness-95 group-hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/35" />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#b11e22]/95 hover:bg-[#b11e22] text-white flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 duration-300 transition-all cursor-pointer group/btn"
                    aria-label="开始播放戏曲"
                  >
                    <Play className="w-9 h-9 fill-current translate-x-1 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[11px] text-stone-200 font-mono">
                    <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                      视频载入路径: PUBLIC_AESTHETICS_CDN
                    </span>
                    <span className="text-amber-100 flex items-center space-x-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>数字回音壁已激活</span>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Video List */}
            <div className="bg-white rounded-xl border border-amber-100/60 p-5 shadow-xs">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-3 mb-4">
                <h2 className="font-serif text-base sm:text-lg font-bold text-stone-850 tracking-wide flex items-center space-x-2">
                  <span className="w-1 h-3.5 bg-[#b11e22]" />
                  <span>视频列表</span>
                </h2>
                <span className="text-xs text-stone-400 font-sans">
                  共 {RECOMMENDED_LIST.length + 1} 个视频
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Current video */}
                <div className="p-2.5 rounded-lg border border-amber-300 bg-[#fdfbf6] shadow-xs flex items-start space-x-3">
                  <div className="relative w-24 aspect-video flex-shrink-0 rounded overflow-hidden bg-stone-100 border border-stone-200/60 shadow-inner">
                    <img
                      src={currentVideo.coverUrl}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#b11e22] text-white flex items-center justify-center animate-pulse shadow">
                        <Play className="w-2.5 h-2.5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-1 left-1 px-1 py-0.5 bg-[#b11e22] rounded text-[7px] font-bold text-white">
                      正在播放
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1 py-0.5">
                    <p className="font-serif text-xs font-bold text-[#b11e22] tracking-wide leading-snug line-clamp-2">
                      {currentVideo.title}
                    </p>
                    <span className="text-[10px] text-stone-400 font-sans">
                      播放量: {currentVideo.views}
                    </span>
                  </div>
                </div>

                {/* Other videos */}
                {RECOMMENDED_LIST.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => handleRecommendClick(rec)}
                    className="p-2.5 rounded-lg border border-transparent hover:border-amber-200/50 hover:bg-[#fffdf8] flex items-start space-x-3 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative w-24 aspect-video flex-shrink-0 rounded overflow-hidden bg-stone-100 border border-stone-200/60 shadow-inner">
                      <img
                        src={rec.coverUrl}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                      <span className="absolute bottom-1 right-1 px-1 bg-black/75 rounded text-[8px] font-mono font-medium text-white">
                        {rec.duration}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-7 h-7 rounded-full bg-[#b11e22]/90 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1 py-0.5">
                      <p className="font-serif text-xs font-bold text-stone-900 tracking-wide leading-snug group-hover:text-[#b11e22] line-clamp-2 transition-colors">
                        {rec.title}
                      </p>
                      <span className="text-[10px] text-stone-400 font-sans">
                        播放量: {rec.views} • {rec.timeLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Description & Info */}
          <div className="lg:col-span-4">
            <div className="bg-[#fffdf6] border border-amber-200/50 rounded-xl p-6 shadow-sm">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-wide leading-snug">
                {currentVideo.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4 pb-5 border-b border-stone-200/60 text-xs sm:text-sm text-stone-500 font-sans">
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-stone-400" />
                  <span>{currentVideo.views}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span>{currentVideo.pubDate}</span>
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
                  {getDescriptionForTitle(currentVideo.title, currentVideo.category || categoryName)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-100">
                {getTagsForTitle(currentVideo.title, currentVideo.category || categoryName).map((tag, idx) => (
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

    </div>
  );
}
