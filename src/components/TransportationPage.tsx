import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Play,
  Eye,
  Calendar,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
  Compass,
  Hammer,
  Train,
  Mountain,
  Bookmark,
  Volume2,
  Headphones,
  ArrowLeft,
  ThumbsUp,
  House,
  BookOpen,
  HelpCircle,
  Image,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  X
} from 'lucide-react';
import { TransportationCategory } from '../types';

interface TransportationItem {
  id: string;
  category: TransportationCategory;
  tag: string;
  title: string;
  coverUrl: string;
  views: string;
  pubDate: string;
  mediaType: 'video' | 'image';
  videoUrl?: string;
  source?: string;
  description?: string;
  images?: string[];
}

// Full transportation aesthetic database
const TRANSPORTATION_ITEMS: TransportationItem[] = [
  // 1. 人文历史 HUMANITIES_HISTORY
  {
    id: 'tr-h1',
    category: TransportationCategory.HUMANITIES_HISTORY,
    tag: '大运河',
    title: '【纪录片】京杭大运河：南起余杭，北达大都的千里碧波',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    views: '3.6K 观看',
    pubDate: '2024-05-10',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-on-a-curved-escalator-41584-large.mp4',
    source: '国家地理频道人文组',
    description: '两千年波澜壮阔。京杭大运河作为世界最伟大的古代人造水道之一，不仅贯通南北漕运，更是一条承载了中国传统桥梁建筑、水工古堰以及繁华市井地景的流动史诗画卷。本片运用三维数字河道，重现古运河漕船扬帆与津口抱泉的极致感官。'
  },
  {
    id: 'tr-h2',
    category: TransportationCategory.HUMANITIES_HISTORY,
    tag: '茶马古道',
    title: '【图册】茶马古道：险峰重叠间的红土漫步与马帮背影',
    coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
    views: '1.8K 浏览',
    pubDate: '2024-05-12',
    mediaType: 'image',
    source: '国家人文地理摄影库',
    description: '遥听铃铛回响，踏足峭壁之间。茶马古道横跨横断山脉与青藏高原，是世界上地势最高的古代物资与精神纽带。画册精选马帮原生态行路瞬间与穿林风沙地貌，带你走入厚重的红土漫步史。',
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 'tr-h3',
    category: TransportationCategory.HUMANITIES_HISTORY,
    tag: '秦车马',
    title: '【讲座】秦陵铜车马：两千年前国之重器与超前机械机构',
    coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
    views: '4.2K 观看',
    pubDate: '2024-05-15',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4',
    source: '秦始皇帝陵博物院',
    description: '青铜时代的奇迹。秦陵铜车马结构极其繁复，其伞盖折叠结构、链条传动逻辑系统超越时代。通过解构铜车马彩绘花纹与金属铸造法度，展示古代交通工具力学实用与装饰符号的有机融合。'
  },
  {
    id: 'tr-h4',
    category: TransportationCategory.HUMANITIES_HISTORY,
    tag: '丝绸之路',
    title: '【纪录片】古代交通之光：丝绸之路上的驼铃守望',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    views: '5.1K 观看',
    pubDate: '2024-05-18',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-on-a-curved-escalator-41584-large.mp4',
    source: '丝路文明数字研究院',
    description: '连通亚欧，重述行旅。漫步广袤戈壁荒漠，历代雄关驿站不仅是贸易交汇之所，更是中西方艺术造型形态及装饰美学对话的前哨站。本课通过三维视听技术，重现古代楼兰古城等交通驿站的辉煌。'
  },
  {
    id: 'tr-h5',
    category: TransportationCategory.HUMANITIES_HISTORY,
    tag: '郑和航海',
    title: '【图集】海上丝路：郑和七下西洋与大船构造法度美学',
    coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop',
    views: '2.3K 浏览',
    pubDate: '2024-05-20',
    mediaType: 'image',
    source: '海上建筑与历史绘图组',
    description: '七下西洋，御风踏海。作为十五世纪世界上最大规模的远航，明代宝船的营造工艺体现了中国古代水密隔舱、多桅多帆控制的极致，展示出震撼寰宇的海洋大国美学姿态。',
    images: [
      'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=600&auto=format&fit=crop'
    ]
  },

  // 2. 工程建筑 ENGINEERING
  {
    id: 'tr-e1',
    category: TransportationCategory.ENGINEERING,
    tag: '超级大桥',
    title: '【特辑】跨越山河：港珠澳大桥斜拉悬索的力学与几何美学',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    views: '6.8K 观看',
    pubDate: '2024-04-12',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-cars-on-a-highway-at-night-42152-large.mp4',
    source: '大桥美学研究示范组',
    description: '力学与美学的巅峰执手。悬索、斜拉、拱券在茫茫伶仃洋中构筑极美律动。通过介绍桥塔“中国结”与海豚造型曲线，体会大国重器的极简工业骨骼之美。'
  },
  {
    id: 'tr-e2',
    category: TransportationCategory.ENGINEERING,
    tag: '天路铁龙',
    title: '【纪录片】中国天路：铺在世界屋脊与不冻土之上的青藏铁路',
    coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
    views: '7.4K 观看',
    pubDate: '2024-04-15',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-high-speed-train-running-through-nature-41595-large.mp4',
    source: '铁道工业美学示范中心',
    description: '穿越昆仑，踏遍冻土。高聳的铁架与横跨荒野的高架桥梁化为宏图。本片记录在极端高原冻土条件下铺设长轨、建设风火山隧道，见证科技对荒蛮生命的文明重绘。'
  },
  {
    id: 'tr-e3',
    category: TransportationCategory.ENGINEERING,
    tag: '深中通道',
    title: '【科普】集“桥岛隧水”于一体的深中海上超级艺术通道',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    views: '5.2K 观看',
    pubDate: '2024-04-18',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-cars-on-a-highway-at-night-42152-large.mp4',
    source: '深中工程局文创中心',
    description: '海中铸岛，水中潜伏。作为当今世界上建设难度最大的桥岛隧一体化集群工程，深中通道在浩渺碧海上切划出行云流水般的现代几何弧线。'
  },
  {
    id: 'tr-e4',
    category: TransportationCategory.ENGINEERING,
    tag: '大洋巨港',
    title: '【图册】洋山深水港：东海之上的全自动化智能枢纽工业张力',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    views: '2.1K 浏览',
    pubDate: '2024-04-20',
    mediaType: 'image',
    source: '数字化超级港口影像大观',
    description: '钢铁森林，运转如琴。洋山港无声的智能起重、AGV平板车调度构成精密的几何韵律，谱就世界第一大港的赛博工业史诗。图册呈现极其精密规整的港口视觉张力。',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=600&auto=format&fit=crop'
    ]
  },

  // 3. 交通工具造型 VEHICLE_STYLING
  {
    id: 'tr-v1',
    category: TransportationCategory.VEHICLE_STYLING,
    tag: '复兴号',
    title: '【解析】现代高铁：流线型美学风阻空气动力学车头设计',
    coverUrl: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=600&auto=format&fit=crop',
    views: '9.2K 观看',
    pubDate: '2024-03-25',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-high-speed-train-running-through-nature-41595-large.mp4',
    source: '中车流线型美学工坊',
    description: '与阻力对冲，与速度共舞。从“和谐号”到“复兴号”的流线型涂装与风阻系数。车头线条不仅实现极佳动力阻尼控制，更是中国工业 design精尖姿态的视觉象征。'
  },
  {
    id: 'tr-v2',
    category: TransportationCategory.VEHICLE_STYLING,
    tag: '大飞机',
    title: '【纪录片】航空风骨：国产C919大型客机的翼尖超临界曲线',
    coverUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop',
    views: '8.1K 观看',
    pubDate: '2024-03-28',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-on-a-curved-escalator-41584-large.mp4',
    source: '中国商飞美学工程院',
    description: '翼展乾坤，飞羽流美。国产大中型客机C919的超临界翼型不仅提升升力阻比，其在蓝天烈翼振翅下的超白圆弧更是人类挑战物理极限制空的优美品格抒写。'
  },
  {
    id: 'tr-v3',
    category: TransportationCategory.VEHICLE_STYLING,
    tag: '新能源跑车',
    title: '【评测】新能源超跑“水滴式”零阻力未来流线感艺术碰撞',
    coverUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop',
    views: '6.4K 观看',
    pubDate: '2024-04-01',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-cars-on-a-highway-at-night-42152-large.mp4',
    source: '汽车前瞻造型实验室',
    description: '未来已至，滴水映天。汲取自然界“水滴”造型，融合仿生学设计，新能源概念超跑以极致圆润饱满、高张力曲面，诠释空气阻力最低限度的运动美学。'
  },
  {
    id: 'tr-v4',
    category: TransportationCategory.VEHICLE_STYLING,
    tag: '重工破冰',
    title: '【摄影】大国重器："雪龙二号"的双向极限破冰几何美姿',
    coverUrl: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=600&auto=format&fit=crop',
    views: '1.9K 浏览',
    pubDate: '2024-04-05',
    mediaType: 'image',
    source: '极地探险纪事摄影馆',
    description: '刺穿冰封，踏雪破浪。"雪龙二号"船头的异型高张力几何钢板外廓，能抵御万吨坚冰重击，在严苛白大地上展现出充满雄浑力量感的极地工业宏构。',
    images: [
      'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop'
    ]
  },

  // 5. 交通视觉文创 VISUAL_CULTURE
  {
    id: 'tr-vi1',
    category: TransportationCategory.VISUAL_CULTURE,
    tag: '铁路红',
    title: '【海报】中国铁路红：温暖亿万游子心灵归途的永恒视觉暖色',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    views: '8.4K 浏览',
    pubDate: '2024-05-22',
    mediaType: 'image',
    source: '中国铁路视觉标准中心',
    description: '红色归途，家国情怀。列车涂装与导向红板蕴含深层的温暖暗示。这抹专有红色不仅在雾茫雪地里指路，更在数亿旅客心灵彼岸充当最坚实温暖的锚点。',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532105956626-9569c03602f4?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 'tr-vi2',
    category: TransportationCategory.VISUAL_CULTURE,
    tag: '车票艺术',
    title: '【图集】方寸间的交通艺术史：当代地铁纪念车票的面庞设计',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    views: '7.2K 浏览',
    pubDate: '2024-05-25',
    mediaType: 'image',
    source: '地铁文化文创工作室',
    description: '方寸小纸，大美无言。各省市地铁利用本地非遗纸刻、水粉画、全息AR涂层发行纪念卡。通过展现方寸小卡设计，见证现代大都市公共交通的人文关怀。',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 'tr-vi3',
    category: TransportationCategory.VISUAL_CULTURE,
    tag: '经典标志',
    title: '【文创】图形徽标演进路画：百年机火车徽至高铁极简符号艺术',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    views: '5.9K 浏览',
    pubDate: '2024-05-28',
    mediaType: 'image',
    source: '现代符号图形研究社',
    description: '由繁入精，标志进化。列车车头、公路标识的极简 design，是人类追求功能信息极优传播与机械图形完美的历史见证。看极简车徽如何浓缩大国交通之魄。',
    images: [
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 'tr-vi4',
    category: TransportationCategory.VISUAL_CULTURE,
    tag: '车窗构图',
    title: '【画卷】框景里的流动山河：观景列车宽幅车窗的最佳借景视角',
    coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
    views: '3.3K 浏览',
    pubDate: '2024-05-30',
    mediaType: 'image',
    source: '大地风光美学摄影联盟',
    description: '以玻璃为布，视山河为画。列车车窗利用园林建筑借景框景法则，让飞驰的高山、白洋化为挂在车厢里流动的巨大水墨壁画，极度抚慰旅人行色。',
    images: [
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop'
    ]
  },

  // 6. 行为礼仪 ETIQUETTE
  {
    id: 'tr-et1',
    category: TransportationCategory.ETIQUETTE,
    tag: '优雅出行',
    title: '【指南】动线交响乐：在现代航站楼与高铁枢纽中感悟儒雅秩序',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    views: '4.2K 观看',
    pubDate: '2024-04-22',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-multi-ethnic-friends-greeting-each-other-with-33230-large.mp4',
    source: '公共交通礼仪宣讲组',
    description: '自律即极上秩序。大型现代枢纽是文明汇交之所。在候车大厅、出站闸机处优雅克己，是现代国人温润气质的无言风采展示。'
  },
  {
    id: 'tr-et2',
    category: TransportationCategory.ETIQUETTE,
    tag: '静音车厢',
    title: '【短视频】高铁静音车厢倡言：公共声景空间的人性化温情守护',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    views: '5.6K 观看',
    pubDate: '2024-04-24',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-multi-ethnic-friends-greeting-each-other-with-33230-large.mp4',
    source: '绿色出行研究宣导组',
    description: '倾听寂静，重塑尊严。静音车厢用优雅自洽代替噪杂喧嚣。在高速移动的物理舱体里保持极简低音、戴耳机的习惯，是文明出行最具张力的优雅声部。'
  },
  {
    id: 'tr-et3',
    category: TransportationCategory.ETIQUETTE,
    tag: '高姐姿仪',
    title: '【规范】微笑绽放：复兴号高速列车乘务优雅引导手姿及站姿',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    views: '6.7K 观看',
    pubDate: '2024-04-26',
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-multi-ethnic-friends-greeting-each-other-with-33230-large.mp4',
    source: '铁路乘务培训美学基地',
    description: '礼仪身手，优雅待客。高铁乘务人员优雅从容的站姿、坐姿以及五指并拢的指路手腕引导姿态饱含古圣人风姿与当代公共尊严体系。'
  },
  {
    id: 'tr-et4',
    category: TransportationCategory.ETIQUETTE,
    tag: '舆马尊卑',
    title: '【图鉴】周礼乘舆：古代舆服与文明驭车礼法演进的前世图景',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
    views: '2.5K 浏览',
    pubDate: '2024-04-28',
    mediaType: 'image',
    source: '古代舆服规制研究中心',
    description: '车驾六御，规矩方圆。从《周官》中繁复的车御五道行礼礼法，到现代规范行车文明。追述两千载出行契约与尊卑秩序，以崭新时代风骨诠释新文明行车之序。',
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
    ]
  }
];

// Double/triple repeat data items for high reliability to fill view, especially when default 'all' tags or specific views are loaded
const EXPANDED_ITEMS = [
  ...TRANSPORTATION_ITEMS,
  ...TRANSPORTATION_ITEMS.map((it) => ({
    ...it,
    id: `${it.id}-d1`,
    views: `${(parseFloat(it.views) * 1.3).toFixed(1)}K ${it.mediaType === 'video' ? '观看' : '浏览'}`
  })),
  ...TRANSPORTATION_ITEMS.map((it) => ({
    ...it,
    id: `${it.id}-d2`,
    views: `${(parseFloat(it.views) * 0.8).toFixed(1)}K ${it.mediaType === 'video' ? '观看' : '浏览'}`
  }))
];

interface TransportationPageProps {
  onPlayVideo: (title: string, videoUrl: string) => void;
  onPlayAudio: (title: string) => void;
}

export default function TransportationPage({ onPlayVideo, onPlayAudio }: TransportationPageProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<TransportationCategory>(
    TransportationCategory.HUMANITIES_HISTORY
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState<'all' | 'video' | 'image'>('video');
  const [visibleCount, setVisibleCount] = useState(16);

  // Sub-detail component state to house full screen content seamlessly within module
  const [activeItemDetail, setActiveItemDetail] = useState<TransportationItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Like and favorite states
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Image carousel and lightbox states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxRotation, setLightboxRotation] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  // Dynamic slogan for each sub-category and premium styling
  const categorySlogan = useMemo(() => {
    switch (selectedSubCategory) {
      case TransportationCategory.HUMANITIES_HISTORY:
        return '看驼铃悠远 叹千里碧波 踏足灿烂行旅史话';
      case TransportationCategory.ENGINEERING:
        return '凌万仞群山 跨浩瀚伶仃 仰望力学几何巨构';
      case TransportationCategory.VEHICLE_STYLING:
        return '逐风阻翼风 驾超跑天翼 领略大国前沿风骨';
      case TransportationCategory.VISUAL_CULTURE:
        return '方寸车票彩 经典徽标韵 框景借景流连车窗';
      case TransportationCategory.ETIQUETTE:
        return '克己守时序 低音立舱里 微笑指引优雅身形';
      default:
        return '承千载行旅 载工业强音 畅游现代交通大美';
    }
  }, [selectedSubCategory]);

  const filteredItems = useMemo(() => {
    let items = EXPANDED_ITEMS.filter((it) => it.category === selectedSubCategory);

    // Filter by text query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.tag.toLowerCase().includes(q) ||
          (it.description && it.description.toLowerCase().includes(q))
      );
    }

    // Filter by media type
    if (selectedMediaType !== 'all') {
      items = items.filter((it) => it.mediaType === selectedMediaType);
    }

    return items;
  }, [selectedSubCategory, searchQuery, selectedMediaType]);

  const handleItemClick = (item: TransportationItem) => {
    setActiveItemDetail(item);
    setCurrentImageIndex(0);
  };

  const handleLike = (itemId: string) => {
    if (likedItems.has(itemId)) {
      setLikedItems(prev => new Set(prev).delete(itemId) && prev);
      setLikes(prev => ({ ...prev, [itemId]: (prev[itemId] || 128) - 1 }));
    } else {
      setLikedItems(prev => new Set(prev).add(itemId));
      setLikes(prev => ({ ...prev, [itemId]: (prev[itemId] || 128) + 1 }));
    }
  };

  const handleFavorite = (itemId: string) => {
    if (favorites.has(itemId)) {
      setFavorites(prev => new Set(prev).delete(itemId) && prev);
    } else {
      setFavorites(prev => new Set(prev).add(itemId));
    }
  };

  const getTagColorClass = (tag: string) => {
    switch (tag) {
      case '大运河': return 'bg-sky-600';
      case '茶马古道': return 'bg-amber-700';
      case '秦车马': return 'bg-amber-600';
      case '丝绸之路': return 'bg-amber-800';
      case '郑和航海': return 'bg-blue-700';
      case '超级大桥': return 'bg-blue-600';
      case '天路铁龙': return 'bg-emerald-700';
      case '深中通道': return 'bg-cyan-600';
      case '大洋巨港': return 'bg-slate-600';
      case '复兴号': return 'bg-red-600';
      case '大飞机': return 'bg-sky-700';
      case '新能源跑车': return 'bg-rose-600';
      case '重工破冰': return 'bg-cyan-700';
      case '景观公路': return 'bg-emerald-600';
      case '都市立交': return 'bg-purple-600';
      case '沙草方格': return 'bg-green-700';
      case '徽派小道': return 'bg-stone-600';
      case '铁路红': return 'bg-red-700';
      case '车票艺术': return 'bg-pink-600';
      case '经典标志': return 'bg-indigo-600';
      case '车窗构图': return 'bg-teal-600';
      case '优雅出行': return 'bg-indigo-700';
      case '静音车厢': return 'bg-teal-700';
      case '高姐姿仪': return 'bg-orange-600';
      case '舆马尊卑': return 'bg-yellow-800';
      default: return 'bg-[#b11e22]';
    }
  };

  // Switch between detail sub-view and listings view
  if (activeItemDetail) {
    const item = activeItemDetail;
    const recommendations = TRANSPORTATION_ITEMS.filter(
      (rec) => rec.category === item.category && rec.id !== item.id
    );
    const videoRecommendations = recommendations.filter((rec) => rec.mediaType === 'video').slice(0, 4);

    return (
      <div className="w-full bg-[#fcfbf9] min-h-screen text-stone-800 pb-16 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-stone-500 mb-6 font-sans">
            <button
              onClick={() => setActiveItemDetail(null)}
              className="hover:text-[#b11e22] transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <House className="w-4 h-4" />
              <span>交通美育库</span>
            </button>
            <span>/</span>
            <span className="text-stone-400">{item.category}</span>
            <span>/</span>
            <span className="text-stone-800 font-medium truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
          </div>

          {/* Back button */}
          <button
            onClick={() => setActiveItemDetail(null)}
            className="group mb-6 flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-stone-200 hover:border-[#b11e22]/40 text-stone-700 hover:text-[#b11e22] text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>返回资源大列表</span>
          </button>

          {/* Main detailed portal split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Player + Video List (video) / Image Viewer (image) */}
            <div className="lg:col-span-8 space-y-6">

              {item.mediaType === 'video' ? (
                <div className="bg-stone-950 rounded-xl overflow-hidden border border-amber-200/10 shadow-lg relative group aspect-video">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-85 transition-opacity"
                    referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/35 pointer-events-none" />

                  {/* Styled Center Play Button */}
                  <button
                    onClick={() => onPlayVideo(item.title, item.videoUrl || '')}
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#b11e22] text-white flex items-center justify-center hover:scale-110 shadow-2xl transition-transform cursor-pointer"
                    aria-label="播放美育课题视频"
                  >
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </button>

                  {/* Source Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 rounded px-3 py-1 font-mono text-[10px] sm:text-xs text-amber-200">
                    视频来源：{item.source || '交通美育大社'}
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={item.images ? item.images[currentImageIndex] : item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-contain bg-stone-900"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </AnimatePresence>

                    {/* Left arrow */}
                    {item.images && item.images.length > 1 && currentImageIndex > 0 && (
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}

                    {/* Right arrow */}
                    {item.images && item.images.length > 1 && currentImageIndex < item.images.length - 1 && (
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}

                    {/* Click to expand overlay */}
                    <button
                      onClick={() => {
                        setLightboxScale(1);
                        setLightboxRotation(0);
                        setIsLightboxOpen(true);
                      }}
                      className="absolute top-3 right-3 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      title="查看大图"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Image index indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Image className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-white text-xs font-mono">{currentImageIndex + 1} / {item.images ? item.images.length : 1}</span>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div
                    ref={thumbnailRef}
                    className="flex items-center space-x-2 px-3 py-3 bg-stone-900 overflow-x-auto scrollbar-none"
                  >
                    {(item.images || [item.coverUrl]).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                          currentImageIndex === idx
                            ? 'border-[#b11e22] ring-1 ring-[#b11e22]/30'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`缩略图 ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Video List (video type only) */}
              {item.mediaType === 'video' && (
                <div className="bg-white rounded-xl border border-amber-100/60 p-5 shadow-xs">
                  <div className="flex justify-between items-baseline border-b border-stone-100 pb-3 mb-4">
                    <h2 className="font-serif text-base sm:text-lg font-bold text-stone-850 tracking-wide flex items-center space-x-2">
                      <span className="w-1 h-3.5 bg-[#b11e22]" />
                      <span>视频列表</span>
                    </h2>
                    <span className="text-xs text-stone-400 font-sans">
                      共 {videoRecommendations.length + 1} 个视频
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Current video */}
                    <div className="p-2.5 rounded-lg border border-amber-300 bg-[#fdfbf6] shadow-xs flex items-start space-x-3">
                      <div className="relative w-24 aspect-video flex-shrink-0 rounded overflow-hidden bg-stone-100 border border-stone-200/60 shadow-inner">
                        <img
                          src={item.coverUrl}
                          alt={item.title}
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
                          {item.title}
                        </p>
                        <span className="text-[10px] text-stone-400 font-sans">
                          播放量: {item.views}
                        </span>
                      </div>
                    </div>

                    {/* Other videos */}
                    {videoRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => {
                          setActiveItemDetail(rec);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
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
                            播放量: {rec.views}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Info + Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Info Card */}
              <div className="bg-[#fffdf6] border border-amber-200/50 rounded-xl p-6 shadow-sm">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-wide leading-snug">
                  {item.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-4 pb-5 border-b border-stone-200/60 text-xs sm:text-sm text-stone-500 font-sans">
                  <div className="flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-stone-400" />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-stone-400" />
                    <span>{item.pubDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4 pb-4 border-b border-stone-200/60">
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center space-x-1.5 text-xs font-semibold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                      likedItems.has(item.id)
                        ? 'bg-[#b11e22]/10 border-[#b11e22]/20 text-[#b11e22]'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-[#b11e22] hover:text-[#b11e22]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                    <span>点赞 ({likes[item.id] || 128})</span>
                  </button>
                  <button
                    onClick={() => handleFavorite(item.id)}
                    className={`flex items-center space-x-1.5 text-xs font-semibold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                      favorites.has(item.id)
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                    <span>{favorites.has(item.id) ? '已收藏' : '收藏'}</span>
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-4 bg-[#b11e22] rounded-sm" />
                    <h3 className="font-serif text-sm font-bold text-[#b11e22] tracking-wider">简介</h3>
                  </div>
                  <p className="text-stone-700 text-xs tracking-wide leading-relaxed text-justify">
                    {item.description || '本作品展现了交通美学的独特魅力，融合了工程技术与现代审美，具有较高的艺术欣赏与研究价值。'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-100">
                  <span className="px-3 py-1 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none">
                    {item.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none">
                    {item.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none">
                    交通美育
                  </span>
                </div>
              </div>


            </div>

          </div>

        </div>

        {/* Lightbox component for photo zoom */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
              onClick={(e) => { if (e.target === e.currentTarget) { setIsLightboxOpen(false); setLightboxScale(1); setLightboxRotation(0); } }}
            >
              {/* Lightbox Top Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-stone-900/80 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Image className="w-4 h-4 text-[#b11e22]" />
                  <span className="text-white text-sm font-medium truncate max-w-md">{item.title}</span>
                  <span className="text-stone-400 text-xs font-mono">{currentImageIndex + 1}/{item.images ? item.images.length : 1}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setLightboxScale((s) => Math.max(s - 0.3, 0.3))} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="缩小">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-white text-xs font-mono w-12 text-center">{Math.round(lightboxScale * 100)}%</span>
                  <button onClick={() => setLightboxScale((s) => Math.min(s + 0.3, 4))} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="放大">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-white/20 mx-1" />
                  <button onClick={() => setLightboxRotation((r) => (r + 90) % 360)} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="旋转">
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setLightboxScale(1); setLightboxRotation(0); }} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="重置">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-white/20 mx-1" />
                  <button onClick={() => { setIsLightboxOpen(false); setLightboxScale(1); setLightboxRotation(0); }} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer" title="关闭">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center overflow-hidden p-4 relative">
                {/* Left arrow in lightbox */}
                {item.images && item.images.length > 1 && currentImageIndex > 0 && (
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                <img
                  src={item.images ? item.images[currentImageIndex] : item.coverUrl}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                  style={{ transform: `scale(${lightboxScale}) rotate(${lightboxRotation}deg)` }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />

                {/* Right arrow in lightbox */}
                {item.images && item.images.length > 1 && currentImageIndex < item.images.length - 1 && (
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-stone-800 pb-16">

      {/* Hero Banner — tab navigation OVERLAY on image */}
      <div
        className="w-full relative bg-cover bg-center text-white shadow-inner"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 15, 25, 0.55), rgba(10, 15, 25, 0.7)), url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-[#0c1a30]/15" />

        <div className="relative z-10">
          {/* Tab Navigation — overlay on the hero image */}
          <div className="w-full border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-1 sm:space-x-4 md:space-x-8 overflow-x-auto py-4 scrollbar-none">
              {Object.values(TransportationCategory).map((cat) => {
                const isSelected = selectedSubCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedSubCategory(cat);
                      setSearchQuery('');
                      if (cat === TransportationCategory.VISUAL_CULTURE) {
                        setSelectedMediaType('image');
                      } else {
                        setSelectedMediaType('video');
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
                        layoutId="subTabIndicatorTransportation"
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
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 pt-10 pb-10 px-4">
            <motion.p
              key={categorySlogan}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="tracking-widest font-serif text-xl sm:text-3xl font-semibold text-shadow-md text-amber-100"
            >
              {categorySlogan}
            </motion.p>

            {/* Quick toggle buttons */}
            {selectedSubCategory !== TransportationCategory.VISUAL_CULTURE && (
              <div className="flex justify-center flex-wrap gap-4 pt-1.5">
                <button
                  onClick={() => setSelectedMediaType('video')}
                  className={`flex items-center space-x-2 text-xs sm:text-sm px-5 py-2.5 rounded-full border cursor-pointer transition-all duration-300 ${
                    selectedMediaType === 'video'
                      ? 'bg-[#b11e22] border-[#b11e22] text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/25 border-white/30 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  <span className="font-serif tracking-wider">视频</span>
                </button>

                <button
                  onClick={() => setSelectedMediaType('image')}
                  className={`flex items-center space-x-2 text-xs sm:text-sm px-5 py-2.5 rounded-full border cursor-pointer transition-all duration-300 ${
                    selectedMediaType === 'image'
                      ? 'bg-[#b11e22] border-[#b11e22] text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/25 border-white/30 text-white'
                  }`}
                >
                  <Image className="w-3.5 h-3.5" />
                  <span className="font-serif tracking-wider">图片</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Title row */}
        <div className="flex justify-between items-center border-b border-amber-200/50 pb-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-850 tracking-wider">
              {selectedSubCategory}资源精品库
            </h3>
            <span className="text-xs text-stone-400 bg-amber-50 border border-amber-100/50 rounded px-2 font-mono">
              {filteredItems.length} 个美育关联课题
            </span>
          </div>

          {searchQuery && (
            <span className="text-xs text-[#b11e22] font-medium bg-[#fdf2f2] px-2.5 py-1 rounded">
              过滤条件: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Resources Grid Wrapper */}
        {filteredItems.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.slice(0, visibleCount).map((item, idx) => {
                const isImage = item.mediaType === 'image';
                if (isImage) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                      viewport={{ once: true }}
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                      id={`transport-image-card-${item.id}`}
                    >
                      {/* Image Area */}
                      <div className="relative aspect-video overflow-hidden bg-stone-100">
                        <img
                          src={item.coverUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/15 transition-colors" />

                        <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${getTagColorClass(item.tag)}`}>
                          {item.tag}
                        </span>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-full bg-white text-stone-850 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                            <Eye className="w-5 h-5 text-[#b11e22]" />
                          </div>
                        </div>
                      </div>

                      {/* Info block */}
                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between bg-white border-t border-stone-50">
                        <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors line-clamp-2">
                          {item.title}
                        </h4>

                        <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans border-t border-stone-50/80 pt-2">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5 text-stone-400" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            <span>{item.pubDate}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                // Video renderer card
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                    viewport={{ once: true }}
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-100">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />

                      <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${getTagColorClass(item.tag)}`}>
                        {item.tag}
                      </span>

                      {/* Hover Play overlap */}
                      <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                          <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors truncate">
                        {item.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans border-t border-stone-50/80 pt-2">
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

            {/* Load more */}
            {visibleCount < filteredItems.length && (
              <div className="flex justify-center mt-12 pb-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="flex items-center space-x-2 text-xs py-2 px-5 rounded bg-[#f5efe4] hover:bg-[#e9dfcc] text-stone-700 font-serif border border-amber-200/60 shadow-sm transition-all focus:outline-none cursor-pointer"
                >
                  <span>加载更多交通美育资源</span>
                  <ArrowRight className="w-4 h-4 text-[#b11e22]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-lg border border-dashed border-amber-200">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-bounce" />
            <p className="font-serif text-sm text-stone-600 font-medium">未检索到与筛选、检索条件相符的交通美育内容。</p>
            <p className="text-xs text-stone-400 mt-1">您可以试着输入公路、高铁等大类，或是点击其它栏目进行浏览。</p>
          </div>
        )}
      </div>

    </div>
  );
}
