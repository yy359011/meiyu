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
  ChevronRight,
  House,
  Share2,
  ThumbsUp,
  Award
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

const getDescriptionForTitle = (title: string): string => {
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
    return '昆曲巅峰之作《牡丹亭·惊梦》，字字玑珠，声声慢调。本篇展现杜丽娘在后花园中因梦生情而寻梦的凄婉绝唱。委婉清丽的“水磨调”配合细致入微的折扇动作，重现明代传奇文学的极致美感。';
  }
  return '此戏曲学术精品为公共美育中心数字化馆藏资源，通过高保真数字音视频技术修复，完整呈现传统非遗戏曲精粹之美。课程结合历史典故、唱腔结构、舞台身段与器乐编配，旨在普及美学常识，启迪新时代美育。';
};

const getTagsForTitle = (title: string): string[] => {
  if (title.includes('花为媒')) return ['评剧', '经典剧目', '施立红', '传统美育'];
  if (title.includes('穆桂英')) return ['豫剧', '巾帼风骨', '柏青版', '美育基地'];
  if (title.includes('红楼梦')) return ['越剧', '红楼雅韵', '才子佳人', '非遗戏曲'];
  if (title.includes('牡丹亭')) return ['昆曲', '牡丹亭', '吴心怡', '世界非遗'];
  if (title.includes('公开课')) return ['微课', '走进梨园', '流派普及', '学术讲座'];
  if (title.includes('秦香莲')) return ['经典名折', '赵丽蓉', '舞台艺术', '评剧典藏'];
  if (title.includes('服饰美学')) return ['戏曲服饰', '美学逻辑', '云肩凤冠', '服饰艺术'];
  if (title.includes('生活中')) return ['美育大讲堂', '生活美学', '戏曲之美', '大众美化'];
  return ['经典剧目', '传统戏曲', '美育资源', '非物质文化遗产'];
};

export default function TraditionalVideoDetail({ video, onBack, onNavigateHome }: TraditionalVideoDetailProps) {
  // Currently playing video state (initially standard passed video item)
  const [currentVideo, setCurrentVideo] = useState({
    id: video.id,
    title: video.title.replace('新立红版', '施立红版'), // normalize "新" and "施" for consistency with the prompt screenshots
    coverUrl: video.coverUrl,
    views: video.views,
    pubDate: video.pubDate,
    videoUrl: video.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);

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
      videoUrl: rec.videoUrl
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
      
      {/* Breadcrumb Bar */}
      <div className="bg-[#fffdfb] border-b border-amber-100/60 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-stone-500 font-serif">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#b11e22] transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <House className="w-4 h-4" />
              <span>首页</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <button
              onClick={onBack}
              className="hover:text-[#b11e22] transition-colors cursor-pointer"
            >
              <span>传统艺术库</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-[#b11e22] font-semibold truncate max-w-[200px] sm:max-w-sm">
              戏曲公开学堂
            </span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-[#fff9f0] border border-stone-200 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-xs font-medium rounded-md shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回资源库</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Core Detail Grid Layout (Matches figure 1 layout exactly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CHANNELS: Large Player + Video detailed meta */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* The Theater Video Stage view Canvas */}
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
                  />
                  
                  {/* Subtle dramatic vignette shadow of theater seats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/35" />

                  {/* Centered Large Primary Play button (Exactly corresponding to red style in image) */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#b11e22]/95 hover:bg-[#b11e22] text-white flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 duration-300 transition-all cursor-pointer group/btn"
                    aria-label="开始播放戏曲"
                  >
                    <Play className="w-9 h-9 fill-current translate-x-1 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>

                  {/* Ambient prompt tip at player foot */}
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

            {/* Description & Detailed metadata Card underneath */}
            <div className="bg-[#fffdf6] border border-amber-200/50 rounded-xl p-6 sm:p-8 shadow-sm">
              
              {/* Title Header with exquisite brackets */}
              <h1 className="font-serif text-xl sm:text-2.5xl font-bold text-stone-900 tracking-wide leading-snug">
                {currentVideo.title}
              </h1>

              {/* Views stats & date metrics row */}
              <div className="flex flex-wrap items-center gap-6 mt-4 pb-5 border-b border-stone-200/60 text-xs sm:text-sm text-stone-500 font-sans">
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-stone-400" />
                  <span>{currentVideo.views}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span>发布时间: {currentVideo.pubDate}</span>
                </div>

                <div className="ml-auto flex items-center space-x-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1.5 text-xs font-semibold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                      isLiked 
                        ? 'bg-[#b11e22]/10 border-[#b11e22]/20 text-[#b11e22]' 
                        : 'bg-white border-stone-200 text-stone-600 hover:border-[#b11e22] hover:text-[#b11e22]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>推荐赞 ({likes})</span>
                  </button>
                  <button
                    onClick={() => alert('已成功复制美育讲座连接，欢迎分享转发给同学们。')}
                    className="flex items-center space-x-1.5 text-xs py-1 px-3 rounded-full border bg-white border-stone-200 hover:border-amber-400 text-stone-600 transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>分享</span>
                  </button>
                </div>
              </div>

              {/* "| 简介" subsection styling (Red highlight indicator vertically styled) */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-4 bg-[#b11e22] rounded-sm" />
                  <h3 className="font-serif text-base font-bold text-[#b11e22] tracking-wider">
                    简介
                  </h3>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm tracking-wide leading-relaxed text-justify">
                  {getDescriptionForTitle(currentVideo.title)}
                </p>
              </div>

              {/* Elegant golden-framed rounded tags */}
              <div className="flex flex-wrap gap-2.5 mt-8 pt-4 border-t border-stone-100">
                {getTagsForTitle(currentVideo.title).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>



            </div>

          </div>

          {/* RIGHT SIDEBAR: Related recommendations matching screenshot 1 precisely */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-amber-100/60 p-5 shadow-xs space-y-5">
            
            {/* Header part */}
            <div className="flex justify-between items-baseline border-b border-stone-100 pb-3">
              <h2 className="font-serif text-base sm:text-lg font-bold text-stone-850 tracking-wide flex items-center space-x-2">
                <span className="w-1 h-3.5 bg-[#b11e22]" />
                <span>相关推荐</span>
              </h2>
              <button
                onClick={() => alert('已载入最新一轮戏曲美育讲座、公开课推荐。')}
                className="text-xs text-stone-400 hover:text-[#b11e22] tracking-wider transition-colors font-sans flex items-center space-x-0.5"
              >
                <span>查看更多</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommendations stack */}
            <div className="space-y-4">
              {RECOMMENDED_LIST.map((rec) => {
                const isActive = currentVideo.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    onClick={() => handleRecommendClick(rec)}
                    className={`p-2.5 rounded-lg border flex items-start space-x-3.5 transition-all duration-300 cursor-pointer group ${
                      isActive 
                        ? 'bg-[#fdfbf6] border-amber-300 shadow-xs' 
                        : 'border-transparent hover:border-amber-200/50 hover:bg-[#fffdf8]'
                    }`}
                  >
                    {/* Thumbnail box on the left */}
                    <div className="relative w-28 sm:w-32 aspect-video flex-shrink-0 rounded overflow-hidden bg-stone-100 border border-stone-200/60 shadow-inner">
                      <img
                        src={rec.coverUrl}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                      {/* Video play length duration badge */}
                      <span className="absolute bottom-1 right-1 px-1 bg-black/75 rounded text-[9px] font-mono font-medium text-white tracking-widest tracking-tighter">
                        {rec.duration}
                      </span>

                      {/* Small mini play icon visual state */}
                      {isActive && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#b11e22] text-white flex items-center justify-center animate-pulse shadow">
                            <Play className="w-3 h-3 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Metadata text container */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-auto space-y-1.5 py-0.5">
                      <p className={`font-serif text-xs md:text-[13px] font-bold text-stone-900 tracking-wide leading-snug group-hover:text-[#b11e22] line-clamp-2 transition-colors ${isActive ? 'text-[#b11e22]' : ''}`}>
                        {rec.title}
                      </p>
                      
                      <span className="text-[10px] text-stone-400 font-sans tracking-wide block leading-none">
                        播放量: {rec.views} • {rec.timeLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart assist helper row */}
            <div className="p-4 bg-[#fbfbf8] border border-stone-200/50 rounded-lg text-xs leading-relaxed text-stone-500">
              <span className="font-bold text-[#b11e22] font-serif block mb-1">💡 戏曲小百科：</span>
              由于戏曲舞台布景与化妆程序繁复，建议同学们配合戏曲服装美学公开课进行探析，能够更快理解唱、念、做、打背后的中华美学逻辑。
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
