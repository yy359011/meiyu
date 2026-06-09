import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Play,
  Eye,
  Calendar,
  Sparkles,
  Music,
  Headphones,
  CheckCircle,
  Clock,
  ArrowRight,
  Image,
  Album,
  FileMusic
} from 'lucide-react';
import { TraditionalCategory } from '../types';

interface TraditionalItem {
  id: string;
  category: TraditionalCategory;
  tag: string;
  title: string;
  coverUrl: string;
  views: string;
  pubDate: string;
  mediaType: 'video' | 'audio' | 'image' | 'album' | 'score';
  videoUrl?: string;
}

// Generate rich mock database matching screenshot exactly
const TRADITIONAL_ITEMS: TraditionalItem[] = [
  // CHINESE OPERA (戏剧) ITEMS
  {
    id: 'op-1',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '评剧',
    title: '【评剧】《花为媒》新立红版',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-2',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '豫剧',
    title: '【豫剧】《穆桂英挂帅》柏青版',
    coverUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-3',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '越剧',
    title: '【越剧】《红楼梦》赵美华版',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-4',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '湘剧',
    title: '【湘剧】《拜月记》经典版',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-5',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '秦腔',
    title: '【秦腔】《游西山·藏舟》姚志华版',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-6',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '黄梅戏',
    title: '【黄梅戏】《女驸马》王琴版',
    coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'audio'
  },
  {
    id: 'op-7',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '川剧',
    title: '【川剧】《情探》经典版',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-8',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '昆曲',
    title: '【昆曲】《牡丹亭》吴心怡版',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'audio'
  },
  {
    id: 'op-9',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '河北梆子',
    title: '【河北梆子】《麦积雨》超越版',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-10',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '京剧',
    title: '【京剧】《女起解》董西园·上',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'audio'
  },
  {
    id: 'op-11',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '京剧',
    title: '【京剧】《女起解》董西园·下',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-12',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '秦腔',
    title: '【秦腔】《赵氏孤儿》赵阳武·二',
    coverUrl: 'https://images.unsplash.com/photo-1579783928121-7d1ca606c2f6?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-13',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '秦腔',
    title: '【秦腔】《赵氏孤儿》赵阳武·一',
    coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-14',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '豫剧',
    title: '【豫剧】《琵琶记》王永光版',
    coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'audio'
  },
  {
    id: 'op-15',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '黄梅戏',
    title: '【黄梅戏】《孟姜女》纪念版',
    coverUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },
  {
    id: 'op-16',
    category: TraditionalCategory.CHINESE_OPERA,
    tag: '川剧',
    title: '【川剧】《酒楼唱情》经典版',
    coverUrl: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=600&auto=format&fit=crop',
    views: '1.2K 观看',
    pubDate: '2024-03-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
  },

  // MUSIC (音乐) ITEMS
  {
    id: 'mu-1',
    category: TraditionalCategory.MUSIC,
    tag: '古琴',
    title: '【古琴】《高山流水》大师独奏版',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=600&auto=format&fit=crop',
    views: '2.5K 观看',
    pubDate: '2024-04-12',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-acoustic-guitar-player-close-up-of-hands-33425-large.mp4'
  },
  {
    id: 'mu-2',
    category: TraditionalCategory.MUSIC,
    tag: '琵琶',
    title: '【琵琶】《十面埋伏》经典大奏鸣',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    views: '1.9K 观看',
    pubDate: '2024-04-15',
    mediaType: 'album'
  },
  {
    id: 'mu-3',
    category: TraditionalCategory.MUSIC,
    tag: '二胡',
    title: '【二胡】《空山鸟语》林海大师典藏',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    views: '3.1K 观看',
    pubDate: '2024-04-18',
    mediaType: 'score'
  },
  {
    id: 'mu-4',
    category: TraditionalCategory.MUSIC,
    tag: '骨笛',
    title: '【非遗】贾湖骨笛《洪荒之音》重现',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    views: '4.2K 观看',
    pubDate: '2024-05-01',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-acoustic-guitar-player-close-up-of-hands-33425-large.mp4'
  },

  // PAINTING (美术) ITEMS
  {
    id: 'pa-1',
    category: TraditionalCategory.PAINTING,
    tag: '国画',
    title: '【国画】泼墨山水《千里江山》精析',
    coverUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    views: '5.6K 观看',
    pubDate: '2024-04-02',
    mediaType: 'image'
  },
  {
    id: 'pa-2',
    category: TraditionalCategory.PAINTING,
    tag: '写意',
    title: '【写意】《泼墨醉画》气韵交织大赏',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    views: '2.8K 观看',
    pubDate: '2024-04-05',
    mediaType: 'image'
  },

  // CALLIGRAPHY (书法) ITEMS
  {
    id: 'ca-1',
    category: TraditionalCategory.CALLIGRAPHY,
    tag: '行书',
    title: '【书法】王羲之《兰亭序》神骨重绘',
    coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
    views: '6.4K 观看',
    pubDate: '2024-03-15',
    mediaType: 'image'
  },
  {
    id: 'ca-2',
    category: TraditionalCategory.CALLIGRAPHY,
    tag: '草书',
    title: '【书法】怀素《自叙帖》墨林飞动录',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    views: '1.8K 观看',
    pubDate: '2024-03-22',
    mediaType: 'image'
  },

  // DANCE (舞蹈) ITEMS
  {
    id: 'da-1',
    category: TraditionalCategory.DANCE,
    tag: '古典舞',
    title: '【古典舞】《水袖重彩》流云飞袖',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
    views: '7.2K 观看',
    pubDate: '2024-04-20',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ballerina-spinning-and-jumping-40854-large.mp4'
  },
  {
    id: 'da-2',
    category: TraditionalCategory.DANCE,
    tag: '敦煌舞',
    title: '【敦煌舞】《反弹琵琶》飞天再现',
    coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop',
    views: '9.5K 观看',
    pubDate: '2024-04-25',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ballerina-spinning-and-jumping-40854-large.mp4'
  },

  // PHOTOGRAPHY (摄影) ITEMS
  {
    id: 'ph-1',
    category: TraditionalCategory.PHOTOGRAPHY,
    tag: '徽派',
    title: '【摄影】镜头下的宏村红墙黛瓦最佳视角',
    coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
    views: '1.5K 观看',
    pubDate: '2024-03-10',
    mediaType: 'image'
  },
  {
    id: 'ph-2',
    category: TraditionalCategory.PHOTOGRAPHY,
    tag: '泼墨',
    title: '【摄影】《雨润江南》冷峻水墨光影捕捉',
    coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
    views: '2.4K 观看',
    pubDate: '2024-03-12',
    mediaType: 'image'
  },

  // INTANGIBLE_HERITAGE (非遗) ITEMS
  {
    id: 'ih-1',
    category: TraditionalCategory.INTANGIBLE_HERITAGE,
    tag: '剪纸',
    title: '【非遗】指尖乾坤：剪纸的动态流变',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    views: '3.8K 观看',
    pubDate: '2024-05-10',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-cutting-paper-with-scissors-33068-large.mp4'
  },
  {
    id: 'ih-2',
    category: TraditionalCategory.INTANGIBLE_HERITAGE,
    tag: '皮影',
    title: '【非遗】匠心皮影：刻入灵魂的光影戏曲',
    coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    views: '2.1K 观看',
    pubDate: '2024-05-15',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-cutting-paper-with-scissors-33068-large.mp4'
  },
  {
    id: 'ih-3',
    category: TraditionalCategory.INTANGIBLE_HERITAGE,
    tag: '蓝染',
    title: '【非遗】蓝染——板蓝根草木染色',
    coverUrl: 'https://images.unsplash.com/photo-1520121401995-928cd50d4e27?q=80&w=600&auto=format&fit=crop',
    views: '1.6K 观看',
    pubDate: '2024-05-20',
    mediaType: 'image'
  },
  {
    id: 'ih-4',
    category: TraditionalCategory.INTANGIBLE_HERITAGE,
    tag: '紫砂',
    title: '【非遗】紫砂搏砂手艺与泥料真伪',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    views: '2.9K 观看',
    pubDate: '2024-05-25',
    mediaType: 'image'
  }
];

// Let's also build copies for Opera categories to have repeating lines just like the screenshot database (having 32+ products)
// This will double check we fill the list beautifully
const EXPANDED_OPERA_ITEMS = [
  ...TRADITIONAL_ITEMS.filter(it => it.category === TraditionalCategory.CHINESE_OPERA),
  ...TRADITIONAL_ITEMS.filter(it => it.category === TraditionalCategory.CHINESE_OPERA).map(it => ({
    ...it,
    id: `${it.id}-dup-1`
  })),
  ...TRADITIONAL_ITEMS.filter(it => it.category === TraditionalCategory.CHINESE_OPERA).map(it => ({
    ...it,
    id: `${it.id}-dup-2`
  }))
];

interface TraditionalPageProps {
  onPlayVideo: (title: string, videoUrl: string) => void;
  onPlayAudio: (title: string) => void;
  onSelectVideoDetail: (item: { id: string; title: string; coverUrl: string; views: string; pubDate: string; videoUrl?: string }) => void;
}

export default function TraditionalPage({ onPlayVideo, onPlayAudio, onSelectVideoDetail }: TraditionalPageProps) {
  // Category selection (Sub navigation tabs matching traditional. label enums)
  const [selectedSubCategory, setSelectedSubCategory] = useState<TraditionalCategory>(
    TraditionalCategory.CHINESE_OPERA
  );

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Media source state filters
  const [selectedMediaType, setSelectedMediaType] = useState<'all' | 'video' | 'audio' | 'image' | 'album' | 'score'>('video');

  // Multiplier for Load More triggers
  const [visibleCount, setVisibleCount] = useState(16);

  // Get available filter options based on selected category
  const getFilterOptions = useMemo(() => {
    switch (selectedSubCategory) {
      case TraditionalCategory.CHINESE_OPERA:
        return [
          { value: 'video' as const, label: '看戏曲', icon: Play },
          { value: 'audio' as const, label: '听戏曲', icon: Headphones }
        ];
      case TraditionalCategory.MUSIC:
        return [
          { value: 'video' as const, label: '视频', icon: Play },
          { value: 'album' as const, label: '专辑', icon: Album },
          { value: 'score' as const, label: '乐谱', icon: FileMusic }
        ];
      case TraditionalCategory.INTANGIBLE_HERITAGE:
        return [
          { value: 'video' as const, label: '视频', icon: Play },
          { value: 'image' as const, label: '图片', icon: Image }
        ];
      default:
        return [];
    }
  }, [selectedSubCategory]);

  // Slogan based on selected subcategory to offer premium tailored experience
  const categorySlogan = useMemo(() => {
    switch (selectedSubCategory) {
      case TraditionalCategory.CHINESE_OPERA:
        return '汇聚梨园精粹 品品经典戏曲韵味';
      case TraditionalCategory.MUSIC:
        return '鸣金石奏华乐 聆听五千年华夏雅音';
      case TraditionalCategory.PAINTING:
        return '泼烟墨染青绿 寻迹宋画千载风华';
      case TraditionalCategory.CALLIGRAPHY:
        return '走笔提按飞白 铺陈翰墨生命脉络';
      case TraditionalCategory.DANCE:
        return '翻水袖舞飞天 翩跹华夏风骨身韵';
      case TraditionalCategory.PHOTOGRAPHY:
        return '藏定格揽光影 谱写镜头中的古风墨韵';
      case TraditionalCategory.INTANGIBLE_HERITAGE:
        return '承指尖蕴匠心 守望华夏非物民俗绝活';
      default:
        return '汇聚梨园精粹 品味戏曲韵味';
    }
  }, [selectedSubCategory]);

  // Load the matched items list
  const filteredItems = useMemo(() => {
    let items = selectedSubCategory === TraditionalCategory.CHINESE_OPERA 
      ? EXPANDED_OPERA_ITEMS 
      : TRADITIONAL_ITEMS.filter(it => it.category === selectedSubCategory);

    // Apply textual query filter if present
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(it => 
        it.title.toLowerCase().includes(q) || 
        it.tag.toLowerCase().includes(q)
      );
    }

    // Apply media type filter
    if (selectedMediaType !== 'all') {
      items = items.filter(it => it.mediaType === selectedMediaType);
    }

    return items;
  }, [selectedSubCategory, searchQuery, selectedMediaType]);

  // Handle playing or launching video item modal popups
  const handleItemClick = (item: TraditionalItem) => {
    if (item.mediaType === 'video') {
      if (selectedSubCategory === TraditionalCategory.CHINESE_OPERA) {
        onSelectVideoDetail({
          id: item.id,
          title: item.title,
          coverUrl: item.coverUrl,
          views: item.views,
          pubDate: item.pubDate,
          videoUrl: item.videoUrl
        });
      } else if (item.videoUrl) {
        onPlayVideo(item.title, item.videoUrl);
      }
    } else if (item.mediaType === 'audio' || item.mediaType === 'album' || item.mediaType === 'score') {
      onPlayAudio(item.title);
    }
    // For 'image' type, no action needed (just view)
  };

  // Get dynamic tag styles to match precise tag names
  const getTagColorClass = (tag: string) => {
    switch (tag) {
      case '评剧': return 'bg-red-600';
      case '豫剧': return 'bg-amber-600';
      case '越剧': return 'bg-purple-600';
      case '湘剧': return 'bg-indigo-600';
      case '秦腔': return 'bg-rose-700';
      case '黄梅戏': return 'bg-[#d9ab6a]';
      case '川剧': return 'bg-[#b11e22]';
      case '昆曲': return 'bg-emerald-600';
      case '河北梆子': return 'bg-red-700';
      case '京剧': return 'bg-red-800';
      default: return 'bg-[#b11e22]';
    }
  };

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-stone-800 pb-16">

      {/* Hero Banner — tab navigation OVERLAY on image */}
      <div
        className="w-full relative bg-cover bg-center text-white shadow-inner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-[#b11e22]/10" />

        <div className="relative z-10">
          {/* Tab Navigation — overlay on the hero image */}
          <div className="w-full border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-1 sm:space-x-4 md:space-x-8 overflow-x-auto py-4 scrollbar-none">
              {Object.values(TraditionalCategory).map((cat) => {
                const isSelected = selectedSubCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedSubCategory(cat);
                      setSearchQuery('');
                      if (cat === TraditionalCategory.CHINESE_OPERA || cat === TraditionalCategory.MUSIC || cat === TraditionalCategory.INTANGIBLE_HERITAGE) {
                        setSelectedMediaType('video');
                      } else {
                        setSelectedMediaType('all');
                      }
                      setVisibleCount(16);
                    }}
                    className={`py-1.5 px-4 text-sm sm:text-base font-serif tracking-widest relative transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? 'text-white font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="subTabIndicator"
                        className="absolute -bottom-4 left-4 right-4 h-0.5 bg-[#b11e22]"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Box */}
          <div className="max-w-2xl mx-auto text-center space-y-6 pt-10 pb-10 px-4">
            <motion.p
              key={categorySlogan}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="tracking-widest font-serif text-xl sm:text-3xl font-semibold text-shadow-md text-amber-100"
            >
              {categorySlogan}
            </motion.p>

            {/* Core Elegant Search Input */}
            <div className="flex bg-white text-stone-800 p-1.5 rounded-lg shadow-xl w-full max-w-xl mx-auto border-2 border-[#b11e22]/30 focus-within:border-[#b11e22] transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-stone-800 placeholder-stone-400"
                placeholder={`在 [${selectedSubCategory}] 资源库中智能过滤搜索...`}
              />
              <button className="bg-[#b11e22] hover:bg-[#911619] transition-colors font-serif font-bold text-white px-6 py-2 rounded-md flex items-center space-x-1.5 text-xs sm:text-sm tracking-wider cursor-pointer">
                <Search className="w-4 h-4" />
                <span>搜索</span>
              </button>
            </div>

            {/* Filter pills for Chinese Opera category */}
            {selectedSubCategory === TraditionalCategory.CHINESE_OPERA && (
              <div className="flex justify-center flex-wrap gap-4 pt-1.5">
                <button
                  onClick={() => setSelectedMediaType('video')}
                  className={`flex items-center space-x-2 text-xs sm:text-sm px-5 py-2.5 rounded-full border cursor-pointer transition-all ${
                    selectedMediaType === 'video' || selectedMediaType === 'all'
                      ? 'bg-[#b11e22] border-[#b11e22] text-white'
                      : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>看戏曲</span>
                </button>
                <button
                  onClick={() => setSelectedMediaType('audio')}
                  className={`flex items-center space-x-2 text-xs sm:text-sm px-5 py-2.5 rounded-full border cursor-pointer transition-all ${
                    selectedMediaType === 'audio'
                      ? 'bg-[#b11e22] border-[#b11e22] text-white'
                      : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>听戏曲</span>
                </button>
              </div>
            )}

            {/* Sub Play option pills for other categories */}
            {selectedSubCategory !== TraditionalCategory.CHINESE_OPERA && getFilterOptions.length > 0 && (
              <div className="flex justify-center flex-wrap gap-4 pt-1.5">
                {getFilterOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedMediaType(selectedMediaType === option.value ? 'all' : option.value)}
                      className={`flex items-center space-x-2 text-xs sm:text-sm px-5 py-2.5 rounded-full border cursor-pointer transition-all ${
                        selectedMediaType === option.value
                          ? 'bg-[#b11e22] border-[#b11e22] text-white'
                          : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 fill-current" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Core Block Title */}
        <div className="flex justify-between items-center border-b border-amber-200/50 pb-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-850 tracking-wider">
              {selectedSubCategory === TraditionalCategory.CHINESE_OPERA ? '戏曲资源库' : `${selectedSubCategory}资源库`}
            </h3>
            <span className="text-xs text-stone-400 bg-amber-50 border border-amber-100/50 rounded px-2 font-mono">
              {filteredItems.length} 个关联课题
            </span>
          </div>

          {/* Active filtering stats label */}
          {searchQuery && (
            <span className="text-xs text-[#b11e22] font-medium bg-[#fdf2f2] px-2.5 py-1 rounded">
              正在搜索关键词: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Resources Grid Wrapper */}
        {filteredItems.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.slice(0, visibleCount).map((item, idx) => {
                const isVinyl = item.mediaType === 'audio' || item.mediaType === 'album' || item.mediaType === 'score';
                if (isVinyl) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                      viewport={{ once: true }}
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="bg-stone-900 rounded-lg overflow-hidden border border-amber-500/25 hover:border-[#b11e22] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between relative"
                      id={`audio-card-${item.id}`}
                    >
                      {/* Vinyl Record Visual Area */}
                      <div className="relative aspect-square w-full bg-stone-950 flex items-center justify-center overflow-hidden border-b border-stone-800">
                        {/* Background subtle vignette */}
                        <div className="absolute inset-0 bg-radial-gradient from-stone-900/40 to-stone-950/90 pointer-events-none" />

                        {/* Record sleeve shadow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-transparent to-white/5 pointer-events-none" />

                        {/* Traditional elegant frame border */}
                        <div className="absolute inset-2 md:inset-2.5 border border-amber-500/10 rounded-sm pointer-events-none" />

                        {/* Vinyl Disc Container */}
                        <div className="relative w-40 h-40 sm:w-44 sm:h-44 transition-transform duration-500 group-hover:scale-108 flex items-center justify-center">
                          
                          {/* Inner Black Vinyl Disc with Realistic Grooves */}
                          <div 
                            className="absolute inset-0 rounded-full bg-zinc-950 flex items-center justify-center shadow-lg animate-spin"
                            style={{
                              animationDuration: '12s',
                              backgroundImage: `
                                radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                                radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                                radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                                radial-gradient(circle, transparent 65%, #222522 66%, #222522 68%, transparent 69%),
                                radial-gradient(circle, transparent 75%, #0d0f0d 76%, #0d0f0d 78%, transparent 79%),
                                radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                              `,
                              boxShadow: '0 8px 24px rgba(0,0,0,0.65), inset 0 0 15px rgba(255,255,255,0.06), inset 0 0 35px rgba(0,0,0,0.95)'
                            }}
                          >
                            {/* Shiny gloss reflection overlay */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-50 mix-blend-overlay" />
                          </div>

                          {/* Center Label (Mini Cover Art inside Vinyl) */}
                          <div className="absolute w-15 h-15 sm:w-16 sm:h-16 rounded-full border-2 border-stone-950 overflow-hidden shadow-inner flex items-center justify-center bg-stone-900 pointer-events-none">
                            <img
                              src={item.coverUrl}
                              alt={item.title}
                              className="w-[105%] h-[105%] object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Center circle pinhole */}
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-[#fcf5e9] border border-zinc-800 shadow-inner" />
                          </div>

                        </div>

                        {/* Top-right traditional gold stylus/tonearm pointer */}
                        <div className="absolute top-1.5 right-2 sm:right-3 w-10 h-14 origin-top transition-transform duration-500 group-hover:rotate-4 pointer-events-none z-10 opacity-75 group-hover:opacity-100">
                          <svg viewBox="0 0 40 60" className="w-full h-full text-amber-200" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="25" cy="10" r="3.5" fill="currentColor" />
                            <path d="M25,10 L16,34 L12,48" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="9" y="46" width="6" height="8" rx="1" fill="currentColor" />
                          </svg>
                        </div>

                        {/* Play mode indicators and details bar */}
                        <div className="absolute bottom-2 left-2 right-2 bg-black/55 backdrop-blur-xs px-2 py-1 rounded border border-white/5 flex items-center justify-between text-white z-10 pointer-events-none">
                          <span className="text-[9px] font-sans tracking-widest text-[#d9ab6a] uppercase font-semibold">
                            {item.mediaType === 'album' ? '经典专辑' : item.mediaType === 'score' ? '乐谱典藏' : '留声典藏'}
                          </span>
                          <span className="text-[9px] bg-[#b11e22] text-white px-2 py-0.5 rounded flex items-center space-x-1 font-medium scale-90 origin-right">
                            {item.mediaType === 'album' ? (
                              <Album className="w-2.5 h-2.5 text-amber-200" />
                            ) : item.mediaType === 'score' ? (
                              <FileMusic className="w-2.5 h-2.5 text-amber-200" />
                            ) : (
                              <Headphones className="w-2.5 h-2.5 text-amber-200" />
                            )}
                            <span>{item.mediaType === 'album' ? '专辑' : item.mediaType === 'score' ? '乐谱' : '听戏曲'}</span>
                          </span>
                        </div>

                        {/* Tag label */}
                        <div className="absolute top-2 left-2 text-[9px] font-semibold text-white px-1.5 py-0.5 rounded shadow-sm bg-[#d9ab6a] z-10 pointer-events-none font-serif tracking-wider">
                          {item.tag}
                        </div>
                      </div>

                      {/* Info blocks specifically matched to golden vinyl aesthetics */}
                      <div className="p-3 bg-[#1e1a18] flex-1 flex flex-col justify-between">
                        <h4 className="font-serif text-[12.5px] sm:text-[13.5px] leading-snug text-stone-100 font-semibold group-hover:text-amber-300 transition-colors line-clamp-2">
                          {item.title}
                        </h4>

                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-sans border-t border-stone-800/80 pt-2 mt-2">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5 text-[#d9ab6a]" />
                            <span>{item.views} 赏析</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-[#d9ab6a]/70" />
                            <span>{item.pubDate}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                    viewport={{ once: true }}
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    {/* Photo cover area with absolute ribbon tags */}
                    <div className="relative aspect-video overflow-hidden bg-stone-100">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />

                      {/* Left Tag Badge from screenshot */}
                      <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${getTagColorClass(item.tag)}`}>
                        {item.tag}
                      </span>

                      {/* Animated hover play ornament overlay */}
                      <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                          {item.mediaType === 'video' ? (
                            <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                          ) : item.mediaType === 'image' ? (
                            <Image className="w-5 h-5" />
                          ) : (
                            <Headphones className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Information frame */}
                    <div className="p-3.5 space-y-2">
                      <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors truncate">
                        {item.title}
                      </h4>

                      {/* Under-card metadata metrics matching the screenshot style icons */}
                      <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.pubDate}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Centered Trigger Button for loading higher density lines */}
            {visibleCount < filteredItems.length && (
              <div className="flex justify-center mt-12 pb-6">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="flex items-center space-x-2 text-xs py-2 px-5 rounded bg-[#f5efe4] hover:bg-[#e9dfcc] text-stone-700 font-serif border border-amber-200/60 shadow-sm transition-all focus:outline-none"
                >
                  <span>加载更多艺术资源</span>
                  <ArrowRight className="w-4 h-4 text-[#b11e22]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-lg border border-dashed border-amber-200">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-bounce" />
            <p className="font-serif text-sm text-stone-600 font-medium">未检索到与筛选、检索条件相符的传统艺术课题。</p>
            <p className="text-xs text-stone-400 mt-1">您可以试着输入 “京剧” 或是点击其它大类频道进行浏览。</p>
          </div>
        )}
      </div>

    </div>
  );
}
