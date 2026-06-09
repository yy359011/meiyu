/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TraditionalCategory,
  TransportationCategory,
  TraditionalContentMap,
  TransportationContentMap,
  EventItem
} from './types';

// Let's use our generated images and elegant CDN fallbacks
export const GENERATED_IMAGES = {
  heroBanner: '/src/assets/images/hero_banner_1780883958200.png',
  calligraphyBrush: '/src/assets/images/calligraphy_brush_1780883968133.png',
  bulletTrain: '/src/assets/images/bullet_train_1780883982193.png',
  exhibitionHall: '/src/assets/images/exhibition_hall_1780883993826.png'
};

// Hero Carousel slides
export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: GENERATED_IMAGES.heroBanner,
    title: '承载传统 · 启迪未来',
    subtitle: '职业教育美育教育资源及管理平台 —— 承载传统与现代综合美学的殿堂'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    title: '东方雅韵 · 经典流传',
    subtitle: '让青少年在翰墨、彩绘与丝竹之声中体验传统艺术的温度'
  },
  {
    id: 'slide-3',
    image: GENERATED_IMAGES.bulletTrain,
    title: '海陆空轨 · 流线美学',
    subtitle: '探索现代化重器、高端装备与流动空间的卓越工业视觉艺术'
  }
];

// Rich traditional art content maps
export const TRADITIONAL_ART_DATA: TraditionalContentMap = {
  [TraditionalCategory.CHINESE_OPERA]: {
    mainVideo: {
      title: '花灯戏——山茶花红',
      source: '玉溪市花灯剧院',
      description: '峥嵘岁月，风风雨雨。在大革命时期，昆明纷扰的尘世喧哗里，青年学生吴澄犹如“小荷才露尖尖角”，执着探索救国救民的真理，在烽火岁月中绽放最耀眼的生命红。',
      coverUrl: GENERATED_IMAGES.calligraphyBrush,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
    },
    subFeature: {
      title: '花灯戏——莫愁女',
      source: '玉溪市花灯剧院',
      description: '明代永乐年间，中山王徐达的孙子徐澄，爱慕才华横溢、心地纯真善良的丫鬟莫愁。两人私定终身，却遭到封建礼教的残酷压迫。莫愁女宁死不屈，化为一汪清泉。',
      coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    },
    rightList: [
      { id: 'op-1', title: '花灯戏——奋斗的青春', coverUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300&auto=format&fit=crop' },
      { id: 'op-2', title: '花灯戏——灯的前情', coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300&auto=format&fit=crop' },
      { id: 'op-3', title: '传统滇剧——《荷花配》', coverUrl: GENERATED_IMAGES.calligraphyBrush },
      { id: 'op-4', title: '滇剧赏析——粉待', coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TraditionalCategory.MUSIC]: {
    mainVideo: {
      title: '古琴古音：高山流水流水流觞',
      source: '公共美育古琴社',
      description: '七弦琴鸣，跨越千年的鸣响。通过展示古琴名曲《流水》的指法与神韵，带领青少年进入“天人合一、心息相依”的空灵境界。',
      coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-acoustic-guitar-player-close-up-of-hands-33425-large.mp4'
    },
    subFeature: {
      title: '编钟奏鸣：大国重器之音',
      source: '曾侯乙编钟研究院',
      description: '重现战国曾侯乙编钟的宏大回音，展现华夏礼乐文化的金石华彩，以深沉的音色震撼当代美育课堂。',
      coverUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'mu-1', title: '二胡独奏——《空山鸟语》', coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=300&auto=format&fit=crop' },
      { id: 'mu-2', title: '琵琶大合奏——《十面埋伏》', coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop' },
      { id: 'mu-3', title: '竹笛小调——《姑苏行》', coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=300&auto=format&fit=crop' },
      { id: 'mu-4', title: '古筝教学——《渔舟唱晚》', coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TraditionalCategory.PAINTING]: {
    mainVideo: {
      title: '青绿山水：独步千载的宋代千里江山',
      source: '美育工坊国画班',
      description: '深度解构王希孟《千里江山图》中的矿物质颜料美学，解析石青、石绿在温润宣纸上的交织流变。',
      coverUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-watercolor-brush-painting-on-canvas-43288-large.mp4'
    },
    subFeature: {
      title: '水墨写意：风骨之梅兰竹菊',
      source: '文人国画研究会',
      description: '墨分五色，计白当黑。国画宗师演示如何一笔写出风竹苍骨，以线条和水汽演绎中国文人的风骨与胸怀。',
      coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'pa-1', title: '敦煌壁画——飞天色彩重织', coverUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=300&auto=format&fit=crop' },
      { id: 'pa-2', title: '界画赏析——楼阁之美', coverUrl: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=300&auto=format&fit=crop' },
      { id: 'pa-3', title: '重彩没骨花卉技法全析', coverUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=300&auto=format&fit=crop' },
      { id: 'pa-4', title: '现代水墨在城市画廊的探索', coverUrl: 'https://images.unsplash.com/photo-1579783928121-7d1ca606c2f6?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TraditionalCategory.CALLIGRAPHY]: {
    mainVideo: {
      title: '楷书之风 bone structures of Tang Dynasty',
      source: '公共美育书法研究院',
      description: '颜真卿、柳公权，唐代法度。本课程通过高精度微距摄像捕捉，展现书法人在落笔、行笔、收笔时微小且充满力道的指腕博弈。',
      coverUrl: GENERATED_IMAGES.calligraphyBrush,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
    },
    subFeature: {
      title: '草书意境：墨舞风雷的线条艺术',
      source: '张旭怀素草书研究室',
      description: '疾风骤雨的狂草。不仅是文字，更是墨滴在宣纸上的生命律动，引导孩子体会纯粹抽象的形式之美。',
      coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'ca-1', title: '隶书神韵——曹全碑与汉隶', coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop' },
      { id: 'ca-2', title: '行书经典——天下第一行书游览', coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=300&auto=format&fit=crop' },
      { id: 'ca-3', title: '徽州宣纸与古徽墨配方秘传', coverUrl: GENERATED_IMAGES.calligraphyBrush },
      { id: 'ca-4', title: '篆书演变——从甲骨到大篆小篆', coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TraditionalCategory.DANCE]: {
    mainVideo: {
      title: '中国古典舞：水袖行云游龙',
      source: '古典舞美育实践班',
      description: '水袖翻飞，在身法、步态与呼吸之间勾勒中国式的写意美，展示刚柔兼济、圆转流畅、欲左先右的太极核心韵律。',
      coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ballerina-spinning-and-jumping-40854-large.mp4'
    },
    subFeature: {
      title: '敦煌舞壁画复生：手姿与S曲线',
      source: '敦煌舞蹈文化论坛',
      description: '将三道弯、反弹琵琶、妙音天女等静止的壁画姿态，幻化为动心夺神的气韵飞扬，探索古典身体意象。',
      coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'da-1', title: '古典折扇舞——《秀色江南》', coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300&auto=format&fit=crop' },
      { id: 'da-2', title: '身韵教学——“提、沉、冲、靠”', coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300&auto=format&fit=crop' },
      { id: 'da-3', title: '汉唐乐舞经典剧目赏析', coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=300&auto=format&fit=crop' },
      { id: 'da-4', title: '当代编舞结合古典折子戏探索', coverUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TraditionalCategory.PHOTOGRAPHY]: {
    mainVideo: {
      title: '人文古刹：水墨氤氲的镜头捕捉',
      source: '青少年摄影艺术俱乐部',
      description: '如何用现代数码镜头，拍出具有中国泼墨水墨画一般的朦胧与留白意境？本期分享构图、曝光与烟雾控制艺术。',
      coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-recording-video-on-digital-camera-40742-large.mp4'
    },
    subFeature: {
      title: '大美中国：俯瞰大江大河的宏大视界',
      source: '美育国家地理工坊',
      description: '极高对比，红墙黛瓦。用无人机视角领略塞外江南，以及线条分割所呈现的极致自然秩序之美。',
      coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'ph-1', title: '徽派建筑马头墙最佳光影角', coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=300&auto=format&fit=crop' },
      { id: 'ph-2', title: '肖像摄影——戏曲演员的眼神光', coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop' },
      { id: 'ph-3', title: '雨润江南：低明度下的冷暖调色', coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop' },
      { id: 'ph-4', title: '微距摄影——墨汁在清水中绽放', coverUrl: GENERATED_IMAGES.calligraphyBrush }
    ]
  },
  [TraditionalCategory.INTANGIBLE_HERITAGE]: {
    mainVideo: {
      title: '指尖乾坤：非遗剪纸的动态流变',
      source: '民间美术遗产工坊',
      description: '一张红纸，一把刻刀，飞剪十里。纸屑漏落处，栩栩如生的十二生肖和神话图卷一气呵成，这是空间维度的极致魔术。',
      coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-cutting-paper-with-scissors-33068-large.mp4'
    },
    subFeature: {
      title: '匠心皮影：刻入灵魂的光影戏曲',
      source: '泰山皮影代表性传人',
      description: '结合牛皮、染料、竹签，在白幕背后，一双手撑起三国英烈、神话西游，实现古老“手办”大联欢。',
      coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'ih-1', title: '非遗蓝染——板蓝根草木染色', coverUrl: 'https://images.unsplash.com/photo-1520121401995-928cd50d4e27?q=80&w=300&auto=format&fit=crop' },
      { id: 'ih-2', title: '紫砂搏砂手艺与泥料真伪', coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop' },
      { id: 'ih-3', title: '徽派竹雕工艺之高浮雕与透雕', coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300&auto=format&fit=crop' },
      { id: 'ih-4', title: '苏绣劈丝技法——蚕丝中的千丝万缕', coverUrl: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=300&auto=format&fit=crop' }
    ]
  }
};

// Rich transportation art content maps
export const TRANSPORTATION_ART_DATA: TransportationContentMap = {
  [TransportationCategory.HUMANITIES_HISTORY]: {
    mainVideo: {
      title: '古代交通之光：丝绸之路上的驼铃驿站',
      source: '交通博物馆美育组',
      description: '两千年前，漫漫长河。驿传信道，铁索栈道，构筑了广袤大地的连通。本片以水墨三维，立体呈现古代行旅、驿邮、关隘的视觉图景。',
      coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-on-a-curved-escalator-41584-large.mp4'
    },
    subFeature: {
      title: '秦陵铜车马：古代大国交通巅峰',
      source: '秦始皇帝陵博物院',
      description: '青铜文明的艺术瑰宝。两千年前的精密机械与华丽装饰，展现了中国古代交通工具在结构与装饰上的高度统一、登峰造极。',
      coverUrl: GENERATED_IMAGES.bulletTrain,
    },
    rightList: [
      { id: 'tr-h1', title: '京杭大运河：千里的碧波血脉', coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-h2', title: '茶马古道：险峰重叠间的红土漫步', coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-h3', title: '中国古代“马掌”与冶铁技术进化', coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TransportationCategory.ENGINEERING]: {
    mainVideo: {
      title: '桥梁之美：跨越山河的力学诗歌',
      source: '特大桥梁设计研究中心',
      description: '分析港珠澳大桥、北盘江大桥的几何张力美。悬索、斜拉、拱券在群山、汪洋之间切下极其优美的弧线，力学即是最纯粹的美。',
      coverUrl: GENERATED_IMAGES.bulletTrain,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-cars-on-a-highway-at-night-42152-large.mp4'
    },
    subFeature: {
      title: '超级隧道：凿开地球暗黑脉格',
      source: '中国铁建美育示范组',
      description: '现代遁地魔术。在万吨岩石与复杂断层下，全断面隧道掘进机(TBM)精确挺进，构织世界第一密度的山林走廊。',
      coverUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'tr-e1', title: '中国天路：铺在冻土上的青藏铁龙', coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-e2', title: '南水北调中街“穿黄工程”力学剖面', coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-e3', title: '深中通道：集“桥岛隧水”于一体的艺术', coverUrl: GENERATED_IMAGES.bulletTrain }
    ]
  },
  [TransportationCategory.VEHICLE_STYLING]: {
    mainVideo: {
      title: '现代高铁：流线美学与光速追风',
      source: '中车流线型美学工坊',
      description: '从“和谐号”到“复兴号”的流线型涂装与风阻系数设计。车头流线线条不仅是为了空气动力，更是现代工业设计中“速度与质感”交汇的极致体现。',
      coverUrl: GENERATED_IMAGES.bulletTrain,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-high-speed-train-running-through-nature-41595-large.mp4'
    },
    subFeature: {
      title: '航空风骨：国产C919超白曲线',
      source: '商飞美学工程院',
      description: '翼尖悬臂的超临界机翼风骨，机身气动外形完美圆弧，带你从毫米级结构美中领略现代空气动力学。',
      coverUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'tr-v1', title: '新能源超跑“水滴”风阻曲线美学', coverUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-v2', title: '大洋巨轮：万箱超级集装箱配色构成', coverUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-v3', title: '“雪龙二号”破冰船船头结构剖析', coverUrl: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=300&auto=format&fit=crop' }
    ]
  },
  [TransportationCategory.LANDSCAPE]: {
    mainVideo: {
      title: '最美公路：绕行在大山云雾的丝带',
      source: '交通勘测规划设计院',
      description: '雅西高速“天梯高速”、独库公路“冰与火之歌”。探索路桥如何谦逊地绕开森林、随山就势，实现大自然与人造地标的最佳共生。',
      coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-cars-on-a-highway-at-night-42152-large.mp4'
    },
    subFeature: {
      title: '绿色生态长廊：高速两侧的生态屏障',
      source: '自然环境与交通美工部',
      description: '在戈壁、沙漠中筑起绿色长城。铁路两侧防沙林，让黄沙在固沙草网面前化为温顺的波浪，造就绿色地景。',
      coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'tr-l1', title: '立交桥群：赛博朋克的都市流动雕塑', coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-l2', title: '中国徽派古村落里的石拱慢步道', coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-l3', title: '海洋跨海大桥沿途“中华白海豚”保护', coverUrl: GENERATED_IMAGES.bulletTrain }
    ]
  },
  [TransportationCategory.VISUAL_CULTURE]: {
    mainVideo: {
      title: '百年标志：经典机车路牌的图形演进',
      source: '城市与交通视觉研究室',
      description: '从古老蒸汽机车车标，到现代极简高铁LOGO。从三角形指示标志牌到电子智能导视，剖析视觉符号与功能的高效交互。',
      coverUrl: GENERATED_IMAGES.exhibitionHall,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-on-a-curved-escalator-41584-large.mp4'
    },
    subFeature: {
      title: '地铁车票纪念卡：方寸间的艺术史',
      source: '地铁集团文化创意组',
      description: '从小硬卡纸票，到精美磁卡、AR互动卡。展示各城市如何将古城文化、非遗、美陈融入一两百克的卡面上。',
      coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
    },
    rightList: [
      { id: 'tr-vi1', title: '中国铁路红：温暖亿万游子的视觉锚点', coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-vi2', title: '列车窗景设计：以车窗为框框定名山河流', coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-vi3', title: '候车大厅天窗：几何自然光的戏剧感重述', coverUrl: GENERATED_IMAGES.exhibitionHall }
    ]
  },
  [TransportationCategory.ETIQUETTE]: {
    mainVideo: {
      title: '行为礼仪：现代枢纽中的优雅出行律动',
      source: '公共美育礼仪宣讲团',
      description: '礼仪不仅是秩序，更是公共空间流动的交响乐。本篇深入浅出地演示在航站楼、高铁站中如何温润有礼，展示个人修养与社交美学。',
      coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-multi-ethnic-friends-greeting-each-other-with-33230-large.mp4'
    },
    subFeature: {
      title: '乘车礼仪：古代的驭车尊卑到现代规范',
      source: '古代舆服与乘舆文明工坊',
      description: '从《周礼》车御六礼，到当代文明的高铁低音舱。回看两千年国人的出行礼仪变迁，让我们重新构筑公共空间敬意。',
      coverUrl: GENERATED_IMAGES.exhibitionHall,
    },
    rightList: [
      { id: 'tr-et1', title: '“无声列车”的倡导：听觉美育的第一步', coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop' },
      { id: 'tr-et2', title: '登机口排队曲线：视觉指示下的心理缓冲', coverUrl: GENERATED_IMAGES.exhibitionHall },
      { id: 'tr-et3', title: '中国复兴号高姐服务标准及站坐手姿', coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop' }
    ]
  }
};

// Events Data
export const EVENTS_DATA: EventItem[] = [
  {
    id: 'ev-1',
    status: 'ongoing',
    statusLabel: '进行中',
    title: '2024 全国青少年"墨韵新声"书法大赛',
    dateLabel: '截止日期',
    dateText: '10月30日',
    coverUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop',
    description: '旨鼓励全国K12中小学生临摹硬笔、毛笔传世经典。大赛将由国内顶尖美育专家和名角联席出评审，优秀获奖作品将巡回展出，并装裱成典。'
  },
  {
    id: 'ev-2',
    status: 'upcoming',
    statusLabel: '即将开始',
    title: '“数字丝路”交通美育创新工作坊',
    dateLabel: '开始日期',
    dateText: '11月15日',
    coverUrl: GENERATED_IMAGES.exhibitionHall,
    description: '当古老的驼铃邂逅现代光立方。本次创意工作坊由美育中心联合清华美院导师，带领孩子们用AR、全息投影和动态线条对古代交通驿站和现代大飞机进行三维艺术改造。'
  },
  {
    id: 'ev-3',
    status: 'ended',
    statusLabel: '已结束',
    title: '首届“公共美育课”年度优秀作品展',
    dateLabel: '查看回顾作品',
    dateText: '点击查看影像',
    coverUrl: GENERATED_IMAGES.calligraphyBrush,
    description: '全面汇聚了过去一年学员创作的国画、立体桥梁拼插、列车涂装设计及戏剧微电影，共同见证中国传统经典与硬核科技美的神奇触碰。'
  }
];

// Virtual gallery data for "美育展厅" (Art Exhibition)
export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorBio: string;
  declaration: string;
  image: string;
  images?: string[];
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    category: '书法',
    title: '青绿山水意象',
    description: '以传统山水为灵感，运用毛笔技法表现青绿山水的意境，笔墨间流露出对自然的敬畏与热爱。',
    author: '王小敏',
    authorBio: '11岁，小学五年级学生，自幼学习书法，擅长楷书与行书，曾获市级书法比赛一等奖。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-2',
    category: '美术',
    title: '未来的高铁',
    description: '以未来主义风格描绘高速列车，融合科技感与艺术美感，展现对未来交通的想象。',
    author: '张星睿',
    authorBio: '15岁，初中三年级学生，热爱工业设计与数字绘画，作品多次入选校级展览。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: GENERATED_IMAGES.bulletTrain,
    images: [
      GENERATED_IMAGES.bulletTrain,
      'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-3',
    category: '戏曲',
    title: '脸谱下的山茶花',
    description: '将传统戏曲脸谱与自然花卉结合，用色彩碰撞表达传统文化与现代审美的对话。',
    author: '赵乐天',
    authorBio: '9岁，小学三年级学生，对戏曲文化充满好奇，喜欢用画笔表达传统故事。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: GENERATED_IMAGES.heroBanner,
    images: [
      GENERATED_IMAGES.heroBanner,
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-4',
    category: '音乐',
    title: '丝路回响',
    description: '原创音乐作品，融合民族乐器与现代编曲，重现丝绸之路的历史韵味与文化交融。',
    author: '孙婉儿',
    authorBio: '13岁，初中一年级学生，学习古筝与钢琴，擅长将传统音乐元素融入现代创作。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: GENERATED_IMAGES.calligraphyBrush,
    images: [
      GENERATED_IMAGES.calligraphyBrush,
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-5',
    category: '舞蹈',
    title: '丝路港湾',
    description: '以丝路文化为主题的舞蹈编排，融合古典舞与现代舞元素，展现东西方文化的交融。',
    author: '多学员联合创作',
    authorBio: '12-14岁，来自舞蹈兴趣小组，共同创作此作品，展现团队协作与艺术创造力。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: GENERATED_IMAGES.exhibitionHall,
    images: [
      GENERATED_IMAGES.exhibitionHall,
      'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-6',
    category: '书法',
    title: '行云流水',
    description: '行书作品，笔势连贯如行云流水，展现行书的流畅与灵动之美。',
    author: '李墨涵',
    authorBio: '14岁，初中二年级学生，书法功底扎实，尤其擅长行书与草书。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783928121-7d1ca606c2f6?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-7',
    category: '美术',
    title: '春日花园',
    description: '水彩画作品，描绘春日花园的生机盎然，色彩明亮，充满童趣与想象力。',
    author: '陈雨桐',
    authorBio: '10岁，小学四年级学生，热爱绘画，作品风格清新自然。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-8',
    category: '戏曲',
    title: '京剧之美',
    description: '以京剧角色为原型的绘画作品，色彩鲜艳，线条流畅，展现京剧艺术的独特魅力。',
    author: '刘子轩',
    authorBio: '12岁，小学六年级学生，对京剧艺术有浓厚兴趣，作品多次参加校内展览。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-9',
    category: '音乐',
    title: '山歌新唱',
    description: '改编传统山歌，融入流行音乐元素，让古老旋律焕发新生。',
    author: '周晓月',
    authorBio: '11岁，小学五年级学生，嗓音清亮，热爱民族音乐与流行音乐的融合。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gal-10',
    category: '舞蹈',
    title: '水墨丹青',
    description: '以中国水墨画为灵感的现代舞作品，舞者用身体描绘山水意境，展现东方美学。',
    author: '林雨欣',
    authorBio: '15岁，初中三年级学生，学习舞蹈8年，擅长古典舞与现代舞。',
    declaration: '本作品为原创，未侵犯任何第三方权益。',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop'
    ]
  }
];
