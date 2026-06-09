/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Award,
  Search,
  Plus,
  Sparkles,
  MapPin,
  User,
  Phone,
  ArrowLeft,
  FileText,
  ChevronRight,
  ShieldAlert,
  Grid,
  Sparkle
} from 'lucide-react';
import { EventItem, EventStatus } from '../types';

// Structured initial mock active events data
const INITIAL_EVENTS_DATA = [
  {
    id: 'ev-p1',
    status: 'registering' as EventStatus,
    statusLabel: '报名中',
    title: '首届"墨韵古海"全国青少年硬笔与毛笔书法大奖赛',
    dateLabel: '报名截止',
    dateText: '2026年6月30日',
    coverUrl: '/src/assets/images/calligraphy_brush_1780883968133.png',
    tag: '国墨书法',
    description: '旨在鼓励青少年深入研传世法帖和硬笔行云法则。本次大赛邀请了中书协名家及教育界评审联席评分。优秀获奖作品将进入公共美育国画书法大厅常设数字化展出。',
    rules: '1. 参赛者需为在校青少年学生；2. 每人限提交1-2幅原创作品；3. 作品需为近一年内创作；4. 硬笔、毛笔均可参赛。',
    startDate: '2026年5月1日',
    endDate: '2026年6月30日',
    location: '线上提报 / 美育中心书法研习堂',
    guarantee: '优秀学员将直接获得书法艺术实践证书与社会实践学分保障。',
    submissionFile: null as any,
    submissionTitle: '',
    progressStep: 1,
  },
  {
    id: 'ev-p2',
    status: 'submitting' as EventStatus,
    statusLabel: '提交中',
    title: '——"未来飞翼"高速流线型列车重组涂装与车体工业设计大赛',
    dateLabel: '作品提交截止',
    dateText: '2026年7月15日',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    tag: '列车涂装',
    description: '高铁线条不仅是速度阻力博弈，更是行走的国家工业名片。邀请你以气动学美姿为底，二次重构富有国潮或未来太空感的高铁涂装与前脸格栅几何线条。',
    rules: '1. 面向全国职业院校及高中在校生；2. 需提交完整涂装设计方案（含三视图）；3. 设计需兼顾空气动力学原理；4. 支持个人或团队参赛（不超过3人）。',
    startDate: '2026年4月15日',
    endDate: '2026年7月15日',
    location: '线上方案收集箱 / 轨道车辆模拟演习站',
    guarantee: '获得中车车辆造型研究所工程师面面评审，以及1:87全真树脂模型制作机会。',
    submissionFile: { name: '未来高铁空气动力涂装企划_张美育.png', size: '4.2 MB', url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop', date: '2026-06-08' },
    submissionTitle: '九晓金乌流线涂装设想',
    progressStep: 2,
  },
  {
    id: 'ev-p3',
    status: 'reviewing' as EventStatus,
    statusLabel: '审核中',
    title: '首届"戏影百川"戏曲写意红脸/金面皮影数字化重织大赛',
    dateLabel: '终评评审中',
    dateText: '结果拟定于2026年6月20日',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    tag: '戏曲彩绘',
    description: '非遗皮影戏人物与数字重绘的古今会面。各校选送了百余件融合徽派、秦腔特色和数控雕花工艺的全新金面国剧皮影人偶，正交由五位非遗评审进行联合终评。',
    rules: '1. 作品需融合传统皮影与数字绘画技法；2. 需提交高清数字文件及创作说明；3. 鼓励创新但需保留传统皮影核心特征；4. 每位参赛者限投3件作品。',
    startDate: '2026年3月1日',
    endDate: '2026年6月20日',
    location: '美育云端审核室 / 黄桥皮影非遗传承教学点',
    guarantee: '参赛作者全员可参与云上皮影实景排演录播课堂，优秀奖可获得实物牛皮生肖雕刻。',
    submissionFile: { name: '红生关公皮影精雕设计图卷.jpg', size: '12.8 MB', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop', date: '2026-06-02' },
    submissionTitle: '《红生关云长》皮影牛皮重描稿',
    progressStep: 3,
  },
  {
    id: 'ev-p4',
    status: 'exhibiting' as EventStatus,
    statusLabel: '展览中',
    title: '"大国重器·百川跨海"南极雪龙二号破冰船精密构配手工拼插大展',
    dateLabel: '开放展出',
    dateText: '常设数字展厅一号大厅',
    coverUrl: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=600&auto=format&fit=crop',
    tag: '重工手工',
    description: '用万粒拼木与不锈钢刻件，一比一复刻雪龙二号极地破冰钢骨。展览现场不仅陈列了实物微缩精品，更依托VR交互，还原在万年寒冰中极限双向破冰的硬核巨兽魅力。',
    rules: '1. 展品需为精密手工模型或数字建模作品；2. 需提交作品实物或高精度3D渲染图；3. 鼓励创新结构设计；4. 展览期间需配合导览讲解。',
    startDate: '2026年5月15日',
    endDate: '长期展出',
    location: '公共美育一号数字化虚拟展厅 / 海事实验室',
    guarantee: '荣登全国职业教育科学美育名录，展出作品提供永久虚拟展馆3D典藏链接。',
    submissionFile: { name: '雪龙二号双向破冰钢肋骨方案.dwg', size: '32.1 MB', url: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=600&auto=format&fit=crop', date: '2026-05-15' },
    submissionTitle: '雪龙二号双向钢剪流体剖面',
    progressStep: 4,
  },
  {
    id: 'ev-p5',
    status: 'ended' as EventStatus,
    statusLabel: '已结束',
    title: '"七下西洋"大明远洋宝船水密隔舱构筑法度与航运历史回顾工作坊',
    dateLabel: '展评结束',
    dateText: '2026年5月30日 闭幕',
    coverUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop',
    tag: '航运历史',
    description: '通过对多桅多帆与水密隔舱营造法度（中国古代最大造船工程）的学习，让孩子们复原海上丝路郑和旗舰的磅礴姿态。本季工作坊已顺利闭幕，共有240名学员顺利结课并获得证书。',
    rules: '1. 面向小学高年级及初中学生；2. 需完成全部6节课程学习；3. 提交宝船模型制作报告；4. 结课后可获得实践证书。',
    startDate: '2026年4月1日',
    endDate: '2026年5月30日',
    location: '美育综合礼堂 / 船舶水密隔舱实验室',
    guarantee: '结课学员可在本页下方"结业档案"直接输入名字下载中国古典造船实践结课证书。',
    submissionFile: { name: '宝船水密多桅控制原理剖面.pdf', size: '5.6 MB', url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600&auto=format&fit=crop', date: '2026-05-20' },
    submissionTitle: '明代宝船多帆气动平衡图稿',
    progressStep: 4,
  }
];

export default function EventsPage({ onSelectEvent, onBackToHome }: { onSelectEvent?: (ev: any) => void, onBackToHome: () => void }) {
  const [events, setEvents] = useState(INITIAL_EVENTS_DATA);
  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | 'registering' | 'submitting' | 'reviewing' | 'exhibiting' | 'ended'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeDetailEvent, setActiveDetailEvent] = useState<typeof INITIAL_EVENTS_DATA[0] | null>(null);

  const [enrollForm, setEnrollForm] = useState({ name: '张美育', phone: '13888888888', grade: '小学五年级', direction: '国墨书法研学' });
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string, size: string } | null>(null);
  const [workTitle, setWorkTitle] = useState('');

  const [certificateName, setCertificateName] = useState('张美育');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateDetail, setCertificateDetail] = useState<{ title: string; date: string } | null>(null);

  const tabItems = [
    { id: 'all', label: '全部活动' },
    { id: 'registering', label: '报名中' },
    { id: 'submitting', label: '提交中' },
    { id: 'reviewing', label: '审核中' },
    { id: 'exhibiting', label: '展览中' },
    { id: 'ended', label: '已结束' },
  ];

  const getStatusBadgeConfig = (status: string) => {
    switch (status) {
      case 'registering':
        return { label: '报名中', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' };
      case 'submitting':
        return { label: '提交中', bg: 'bg-blue-50 text-blue-700 border-blue-200/60' };
      case 'reviewing':
        return { label: '审核中', bg: 'bg-amber-50 text-amber-700 border-amber-200/60' };
      case 'exhibiting':
        return { label: '展览中', bg: 'bg-red-50 text-[#b11e22] border-red-200/60' };
      case 'ended':
        return { label: '已结束', bg: 'bg-stone-50 text-stone-600 border-stone-200/60' };
      default:
        return { label: '进行中', bg: 'bg-stone-100 text-stone-800 border-stone-200' };
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchTab = selectedStatusTab === 'all' || e.status === selectedStatusTab;
      const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [events, selectedStatusTab, searchQuery]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollForm.name.trim() || !enrollForm.phone.trim()) {
      alert('请完整填写姓名和联系电话');
      return;
    }

    setIsEnrolling(true);
    setTimeout(() => {
      if (activeDetailEvent) {
        setEvents(prev => prev.map(item => {
          if (item.id === activeDetailEvent.id) {
            return {
              ...item,
              status: 'submitting' as EventStatus,
              statusLabel: '提交中',
              progressStep: 2
            };
          }
          return item;
        }));

        const updatedItem = {
          ...activeDetailEvent,
          status: 'submitting' as EventStatus,
          statusLabel: '提交中',
          progressStep: 2
        };
        setActiveDetailEvent(updatedItem);
      }
      setIsEnrolling(false);
    }, 1200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile({
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          });
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const handleArtworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert('请输入或选择您的作品附件进行提交。');
      return;
    }
    if (!workTitle.trim()) {
      alert('请输入您的作品精巧命名标签，以备入录。');
      return;
    }

    setTimeout(() => {
      if (activeDetailEvent) {
        setEvents(prev => prev.map(item => {
          if (item.id === activeDetailEvent.id) {
            return {
              ...item,
              status: 'reviewing' as EventStatus,
              statusLabel: '审核中',
              submissionTitle: workTitle,
              submissionFile: {
                name: uploadedFile.name,
                size: uploadedFile.size,
                url: activeDetailEvent.coverUrl,
                date: new Date().toISOString().split('T')[0]
              },
              progressStep: 3
            };
          }
          return item;
        }));

        const updatedItem = {
          ...activeDetailEvent,
          status: 'reviewing' as EventStatus,
          statusLabel: '审核中',
          submissionTitle: workTitle,
          submissionFile: {
            name: uploadedFile.name,
            size: uploadedFile.size,
            url: activeDetailEvent.coverUrl,
            date: new Date().toISOString().split('T')[0]
          },
          progressStep: 3
        };
        setActiveDetailEvent(updatedItem);
        
        setUploadedFile(null);
        setWorkTitle('');
      }
    }, 600);
  };

  const simulateApprove = () => {
    if (!activeDetailEvent) return;
    
    setEvents(prev => prev.map(item => {
      if (item.id === activeDetailEvent.id) {
        return {
          ...item,
          status: 'exhibiting' as EventStatus,
          statusLabel: '展览中',
          progressStep: 4
        };
      }
      return item;
    }));

    const updatedItem = {
      ...activeDetailEvent,
      status: 'exhibiting' as EventStatus,
      statusLabel: '展览中',
      progressStep: 4
    };
    setActiveDetailEvent(updatedItem);
  };

  const handleOpenCertificate = (title: string, date: string) => {
    setCertificateDetail({ title, date });
    setShowCertificate(true);
  };

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-stone-800 pb-16">

      {/* Hero Banner — tab navigation OVERLAY on image */}
      <div
        className="w-full relative bg-cover bg-center text-white shadow-inner"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 12, 18, 0.5), rgba(10, 12, 18, 0.7)), url('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-[#b11e22]/8" />

        <div className="relative z-10">
          {/* Tab Navigation — overlay on the hero image */}
          <div className="w-full border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-1 sm:space-x-4 md:space-x-8 overflow-x-auto py-4 scrollbar-none">
              {tabItems.map((tab) => {
                const isSelected = selectedStatusTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedStatusTab(tab.id as any);
                      setSearchQuery('');
                    }}
                    className={`py-1.5 px-4 text-sm sm:text-base font-serif tracking-widest relative transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? 'text-white font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="eventsTabIndicator"
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
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <p className="tracking-widest font-serif text-xl sm:text-3xl font-semibold text-shadow-md text-amber-100">
                以美育人 知行合一
              </p>
            </motion.div>

            {/* Search bar */}
            <div className="flex bg-white text-stone-800 p-1.5 rounded-lg shadow-xl w-full max-w-xl mx-auto border-2 border-[#b11e22]/20 focus-within:border-[#b11e22] transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-stone-800 placeholder-stone-400"
                placeholder="检索赛事、工坊或状态主题..."
              />
              <button className="bg-[#b11e22] hover:bg-[#911619] transition-colors font-serif font-bold text-white px-6 py-2 rounded-md flex items-center space-x-1.5 text-xs sm:text-sm tracking-wider cursor-pointer">
                <Search className="w-4 h-4" />
                <span>搜索</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

        {/* Section header with red accent bar — consistent with sibling pages */}
        <div className="flex justify-between items-center border-b border-amber-200/50 pb-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-850 tracking-wider">
              赛事与工作坊名录
            </h3>
            <span className="text-xs text-stone-400 bg-amber-50 border border-amber-100/50 rounded px-2 font-mono">
              {filteredEvents.length} 个活动
            </span>
          </div>
          {searchQuery && (
            <span className="text-xs text-[#b11e22] font-medium bg-[#fdf2f2] px-2.5 py-1 rounded">
              搜索: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Event list */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, idx) => {
                  const badgeConf = getStatusBadgeConfig(event.status);
                  const isSelected = activeDetailEvent?.id === event.id;
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      key={event.id}
                      onClick={() => setActiveDetailEvent(event)}
                      className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer text-left flex flex-col sm:flex-row gap-4 sm:items-center ${
                        isSelected
                          ? 'bg-amber-50/30 border-[#b11e22]/30 shadow-md ring-1 ring-[#b11e22]/5'
                          : 'bg-white border-amber-100/50 hover:border-[#b11e22]/20 hover:shadow-md'
                      }`}
                      id={`page-event-card-${event.id}`}
                    >
                      {/* Thumbnail */}
                      <div className="w-full sm:w-36 h-24 rounded-lg overflow-hidden relative bg-stone-100 flex-shrink-0 shadow-xs">
                        <img
                          src={event.coverUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/15 transition-colors" />
                        <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-[9px] text-white px-2 py-0.5 rounded-sm font-serif tracking-wider">
                          {event.tag}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className={`text-[10px] font-semibold tracking-wider font-serif px-2 py-0.5 rounded border ${badgeConf.bg}`}>
                            {badgeConf.label}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">
                            {event.id.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="font-serif text-sm sm:text-base font-bold text-stone-800 leading-snug line-clamp-1">
                          {event.title}
                        </h3>

                        <p className="text-xs text-stone-500 line-clamp-1">
                          {event.description}
                        </p>

                        <div className="pt-1 border-t border-stone-50/80 flex items-center justify-between text-[11px] text-stone-400">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#b11e22]/70" />
                            <span>{event.dateLabel}：{event.dateText}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-[#b11e22] font-semibold font-serif">
                            <span>{isSelected ? '正在阅读' : '参与/查看'}</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white rounded-xl border border-dashed border-amber-200"
                >
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-stone-500 text-xs font-serif font-medium">未筛查到该状态下的赛事或工坊活动。</p>
                  <button onClick={() => setSelectedStatusTab('all')} className="mt-3 text-xs text-[#b11e22] underline font-semibold cursor-pointer">
                    返回查看全部活动
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Certificate lookup board */}
            <div className="bg-stone-900 text-stone-100 p-6 sm:p-7 rounded-2xl border border-stone-800 text-left relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none translate-x-6 translate-y-6">
                <Award className="w-56 h-56" />
              </div>
              
              <div className="space-y-4 max-w-lg relative z-10">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span className="font-serif text-sm font-bold text-amber-200 tracking-wider">美育中心社会实践结业通道</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-serif">
                  已完成《七下西洋远洋宝船水密隔舱实践》及其他艺术回顾大课的学生学员，可在此键入您的美育登记学号或学名，直接下载专有签章的「学术证书」，该证书关联社会综合实践学分登记。
                </p>

                <div className="flex gap-2.5 pt-1.5">
                  <input
                    type="text"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-200"
                    placeholder="请输入学员姓名，例如：张美育"
                  />
                  <button
                    onClick={() => handleOpenCertificate('"七下西洋"大明宝船水密隔舱营造法度结业证明', '2026年5月30日')}
                    className="bg-[#b11e22] hover:bg-[#99161a] text-white text-xs px-5 py-2 rounded font-semibold font-serif cursor-pointer tracking-wider flex items-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>查询证书</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Detail panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activeDetailEvent ? (
                <motion.div
                  key={activeDetailEvent.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-amber-100/50 shadow-lg overflow-hidden text-left"
                >
                  {/* Banner image */}
                  <div className="relative h-44 w-full bg-stone-900">
                    <img
                      src={activeDetailEvent.coverUrl}
                      alt={activeDetailEvent.title}
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <span className="absolute top-4 left-4 text-[9px] font-bold text-[#b11e22] tracking-wider bg-white px-2.5 py-0.5 rounded border border-red-100/50 font-serif">
                      {activeDetailEvent.tag}
                    </span>

                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h4 className="font-serif text-sm sm:text-base font-bold tracking-wide line-clamp-1 drop-shadow-md">
                        {activeDetailEvent.title}
                      </h4>
                    </div>
                  </div>

                  {/* Progress pipeline */}
                  <div className="p-5 border-b border-stone-50 bg-[#fffcf5]/40 text-left space-y-2.5">
                    <span className="block text-[10px] font-serif font-bold text-stone-400 tracking-widest uppercase">
                      进度追踪
                    </span>
                    
                    <div className="flex items-center justify-between relative pt-1 pb-2">
                      <div className="absolute left-2.5 right-2.5 top-[15px] h-0.5 bg-stone-200 z-0" />
                      
                      <div 
                        className="absolute left-2.5 top-[15px] h-0.5 bg-emerald-600 transition-all duration-500 z-0"
                        style={{
                          width: `${
                            activeDetailEvent.status === 'registering' ? '0%' :
                            activeDetailEvent.status === 'submitting' ? '33%' :
                            activeDetailEvent.status === 'reviewing' ? '66%' : '100%'
                          }`
                        }}
                      />

                      {['报名中', '提交中', '审核中', '展览中'].map((stepLabel, i) => {
                        const stepNum = i + 1;
                        const isActive = activeDetailEvent.progressStep === stepNum;
                        const isPast = activeDetailEvent.progressStep > stepNum;
                        const statusColors = [
                          { active: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20', label: 'text-emerald-700' },
                          { active: 'bg-blue-600 text-white shadow-md shadow-blue-600/20', label: 'text-blue-700' },
                          { active: 'bg-amber-600 text-white shadow-md shadow-amber-600/20 animate-pulse', label: 'text-amber-700 animate-pulse' },
                          { active: 'bg-[#b11e22] text-white shadow-md', label: 'text-red-700' },
                        ];
                        return (
                          <div key={stepNum} className="flex flex-col items-center z-10 relative">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isActive
                                ? statusColors[i].active
                                : isPast
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : activeDetailEvent.status === 'ended' && stepNum === 4
                                    ? 'bg-stone-500 text-white'
                                    : 'bg-stone-100 text-stone-500'
                            }`}>
                              {stepNum}
                            </div>
                            <span className={`text-[9px] font-serif mt-1 font-medium ${
                              isActive
                                ? `${statusColors[i].label} font-bold`
                                : activeDetailEvent.status === 'ended' && stepNum === 4
                                  ? 'text-stone-500 font-bold'
                                  : 'text-stone-400'
                            }`}>
                              {activeDetailEvent.status === 'ended' && stepNum === 4 ? '已结束' : stepLabel}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Activity Info: Introduction, Rules, Dates */}
                  <div className="p-5 border-b border-stone-50 text-left space-y-4">
                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#b11e22] tracking-wider mb-1.5 uppercase flex items-center space-x-2 border-l-2 border-[#b11e22] pl-3">
                        <span>活动介绍</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-serif">
                        {activeDetailEvent.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#b11e22] tracking-wider mb-1.5 uppercase flex items-center space-x-2 border-l-2 border-[#b11e22] pl-3">
                        <span>活动规则</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-serif whitespace-pre-line">
                        {activeDetailEvent.rules}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] text-stone-600 select-text">
                      <div className="bg-amber-50/30 p-2.5 rounded-lg border border-amber-100/50">
                        <strong className="font-serif text-stone-500 block mb-0.5">活动开始时间</strong>
                        <p className="text-stone-800 font-medium">{activeDetailEvent.startDate}</p>
                      </div>
                      <div className="bg-amber-50/30 p-2.5 rounded-lg border border-amber-100/50">
                        <strong className="font-serif text-stone-500 block mb-0.5">活动结束时间</strong>
                        <p className="text-stone-800 font-medium">{activeDetailEvent.endDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive forms */}
                  <div className="p-6 space-y-5 text-stone-700">
                    {/* Interactive forms by state */}
                    <div className="pt-4 border-t border-stone-100">
                      
                      {/* REGISTERING */}
                      {activeDetailEvent.status === 'registering' && (
                        <motion.form
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onSubmit={handleEnrollSubmit}
                          className="space-y-4 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100 text-left"
                        >
                          <div className="flex items-center space-x-2 text-emerald-800 border-b border-emerald-100 pb-1.5 mb-1 select-none">
                            <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
                            <span className="text-xs font-serif font-bold">现在即可在校报名 · Enroll Request</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[10px] text-stone-500 mb-1 font-serif">学名 / 学生姓名</label>
                              <div className="relative">
                                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 text-stone-400" />
                                <input
                                  type="text"
                                  required
                                  value={enrollForm.name}
                                  onChange={(e) => setEnrollForm(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full pl-8 pr-2.5 py-1.5 text-[11px] bg-white border border-stone-200 rounded text-stone-800"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] text-stone-500 mb-1 font-serif">主要联系电话</label>
                              <div className="relative">
                                <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 text-stone-400" />
                                <input
                                  type="text"
                                  required
                                  value={enrollForm.phone}
                                  onChange={(e) => setEnrollForm(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full pl-8 pr-2.5 py-1.5 text-[11px] bg-white border border-stone-200 rounded text-stone-800"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isEnrolling}
                            className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-serif text-xs font-bold rounded tracking-widest cursor-pointer shadow-xs transition-colors flex items-center justify-center space-x-1"
                          >
                            {isEnrolling ? (
                              <>
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                <span>注册备份中...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>锁定席位，前往提交作品</span>
                              </>
                            )}
                          </button>
                        </motion.form>
                      )}

                      {/* SUBMITTING */}
                      {activeDetailEvent.status === 'submitting' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100 text-left"
                        >
                          <div className="flex items-center space-x-2 text-blue-800 border-b border-blue-100 pb-1.5 mb-1.5 select-none">
                            <Upload className="w-4 h-4 text-blue-700" />
                            <span className="text-xs font-serif font-bold">提报您的美育作品方案 · Artwork Hand-in</span>
                          </div>

                          <form onSubmit={handleArtworkSubmit} className="space-y-4">
                            <div>
                              <label className="block text-[10px] text-stone-500 mb-1 font-serif">作品精妙命名 (Title)</label>
                              <input
                                type="text"
                                required
                                value={workTitle}
                                onChange={(e) => setWorkTitle(e.target.value)}
                                className="w-full px-3 py-1.5 text-[11px] bg-white border border-stone-200 rounded text-stone-800"
                                placeholder="例如：九晓金乌流线型车体涂装方案"
                              />
                            </div>

                            <div
                              onDragEnter={handleDrag}
                              onDragOver={handleDrag}
                              onDragLeave={handleDrag}
                              onDrop={handleDrop}
                              onClick={triggerFileInput}
                              className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                                dragActive 
                                  ? 'border-blue-500 bg-blue-50/40 shadow-inner' 
                                  : uploadedFile 
                                    ? 'border-emerald-300 bg-emerald-50/10' 
                                    : 'border-blue-200 bg-white hover:border-blue-400 hover:bg-blue-50/10'
                              }`}
                            >
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInputChange}
                                className="hidden"
                                accept="video/mp4,image/png,image/jpeg,.dwg"
                              />

                              {isUploading ? (
                                <div className="space-y-2 flex flex-col items-center w-full">
                                  <div className="relative w-12 h-12 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                                    <span className="text-[10px] font-mono text-blue-800">{uploadProgress}%</span>
                                  </div>
                                  <span className="text-[10px] text-blue-700">正在打包并安全上传中...</span>
                                </div>
                              ) : uploadedFile ? (
                                <div className="space-y-1">
                                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1">
                                    <CheckCircle2 className="w-5 h-5" />
                                  </div>
                                  <p className="text-[11px] font-bold text-stone-800 truncate max-w-xs">{uploadedFile.name}</p>
                                  <p className="text-[9px] text-stone-400">大小：{uploadedFile.size} · 点击或拖拽可重新选择</p>
                                </div>
                              ) : (
                                <div className="space-y-1 select-none">
                                  <Upload className="w-7 h-7 text-blue-400 mx-auto mb-1" />
                                  <p className="text-xs font-serif font-bold text-stone-700">将作品方案图稿直接拖至此处</p>
                                  <p className="text-[10px] text-stone-400">或点击选择 (支持 MP4, PNG, JPG, DWG)</p>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  if (activeDetailEvent) {
                                    setEvents(prev => prev.map(item => {
                                      if (item.id === activeDetailEvent.id) {
                                        return {
                                          ...item,
                                          status: 'registering' as EventStatus,
                                          statusLabel: '报名中',
                                          progressStep: 1
                                        };
                                      }
                                      return item;
                                    }));
                                    const updatedItem = {
                                      ...activeDetailEvent,
                                      status: 'registering' as EventStatus,
                                      statusLabel: '报名中',
                                      progressStep: 1
                                    };
                                    setActiveDetailEvent(updatedItem);
                                    setUploadedFile(null);
                                    setWorkTitle('');
                                  }
                                }}
                                className="flex-1 py-2 text-xs font-bold rounded tracking-widest font-serif transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span>上一步</span>
                              </button>
                              <button
                                type="submit"
                                disabled={!uploadedFile || isUploading}
                                className={`flex-1 py-2 text-xs font-bold rounded tracking-widest font-serif transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs ${
                                  uploadedFile && !isUploading
                                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                }`}
                              >
                                <FileText className="w-4 h-4" />
                                <span>确认提交</span>
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      )}

                      {/* REVIEWING */}
                      {activeDetailEvent.status === 'reviewing' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 bg-amber-50/30 p-4 rounded-xl border border-amber-100 text-left"
                        >
                          <div className="flex items-center space-x-2 text-amber-800 border-b border-amber-100 pb-1.5 mb-1.5 select-none">
                            <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                            <span className="text-xs font-serif font-bold">作品评审进展追踪 · Evaluation Status</span>
                          </div>

                          <div className="space-y-2.5 bg-white p-3 border border-amber-50 rounded-lg text-xs tracking-wide">
                            <div className="flex justify-between items-center text-stone-500 font-serif">
                              <span>已交作品</span>
                              <strong className="text-stone-850 truncate max-w-xs">{activeDetailEvent.submissionTitle || '我的精选作品方案'}</strong>
                            </div>
                            <div className="flex justify-between items-center text-stone-500 font-serif">
                              <span>文件状态</span>
                              <strong className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">云存储备份已校验</strong>
                            </div>
                            
                            <div className="pt-2 border-t border-dashed border-stone-100">
                              <p className="text-[10.5px] leading-relaxed text-stone-600 font-serif bg-amber-50/30 p-2.5 rounded border border-amber-50">
                                <strong>专家联席委会批言：</strong>
                                当前由五位非遗评审委员会专家组对您的《{activeDetailEvent.submissionTitle || '我的精选作品方案'}》进行终评。
                                当前评分进程已推进 <strong>88%</strong>，预计数个工作日内公布。
                              </p>
                            </div>
                          </div>

                          <div className="pt-1.5">
                            <button
                              onClick={simulateApprove}
                              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-serif text-xs font-bold rounded cursor-pointer transition-colors flex items-center justify-center space-x-1"
                            >
                              <span>模拟审核通过 (一键入选画展大厅)</span>
                            </button>
                            <span className="block text-center text-[9px] text-stone-400 mt-1 select-none">
                              (提示：该测试按钮可即时模拟评审通过，作品直接入驻展览区)
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* EXHIBITING */}
                      {activeDetailEvent.status === 'exhibiting' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 bg-red-50/15 p-4 rounded-xl border border-red-100/50 text-left"
                        >
                          <div className="flex items-center space-x-2 text-red-900 border-b border-red-100/30 pb-1.5 mb-1 select-none">
                            <Sparkle className="w-4 h-4 text-[#b11e22]" />
                            <span className="text-xs font-serif font-bold">大功告成！作品正数字化陈列中</span>
                          </div>

                          <div className="bg-white p-3 rounded-lg border border-red-50 space-y-3">
                            <div className="aspect-video rounded overflow-hidden shadow-xs relative bg-stone-100">
                              <img
                                src={activeDetailEvent.coverUrl}
                                alt="展示图"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                              <div className="absolute bottom-2 left-2 bg-amber-800 text-amber-50 text-[9px] font-mono px-1.5 py-0.5 rounded-sm">
                                4K 沉浸数字化交互展厅
                              </div>
                            </div>

                            <p className="text-[11px] leading-relaxed text-stone-600 font-serif">
                              恭喜同学！作品 <strong>《{activeDetailEvent.submissionTitle || '大国重构创新'}》</strong> 凭借突出的现代美学气韵与扎实工艺，已成功荣登公共美育中心常设一号虚拟馆永久陈列。
                            </p>

                            <div className="flex gap-2 text-xs">
                              <button 
                                onClick={() => handleOpenCertificate(`美育中心优秀作品《${activeDetailEvent.submissionTitle || activeDetailEvent.title}》金榜特藏荣誉证书`, '2026年6月8日')}
                                className="flex-1 bg-amber-800 hover:bg-amber-900 text-amber-50 font-serif py-1.5 rounded tracking-wide text-[11px] font-bold text-center flex items-center justify-center space-x-1 cursor-pointer"
                              >
                                <Award className="w-3.5 h-3.5 text-amber-300" />
                                <span>领取优秀入展荣誉证</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ENDED */}
                      {activeDetailEvent.status === 'ended' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-left"
                        >
                          <div className="flex items-center space-x-2 text-stone-800 border-b border-stone-200 pb-1.5 mb-1 select-none">
                            <ShieldAlert className="w-4 h-4 text-stone-500" />
                            <span className="text-xs font-serif font-bold">活动已圆满结案闭幕 · Ended</span>
                          </div>

                          <p className="text-xs text-stone-500 leading-relaxed font-serif">
                            本季度"七下西洋"船舶水密隔舱实践探索与回顾工作坊已圆满闭幕。共接收来自全国师生提报作品 240+ 份，所有结课信息已封存档案。
                          </p>

                          <div className="bg-white p-3.5 rounded border border-stone-100 text-xs flex justify-between items-center text-stone-600 font-serif">
                            <div className="space-y-0.5">
                              <b>张美育 同学历史结业档案：</b>
                              <p className="text-[10px] text-stone-400">学名登载：张美育 · 最终考评：A+ 优等</p>
                            </div>
                            <button
                              onClick={() => handleOpenCertificate('"七下西洋"大明远洋旗舰水密隔舱营造实践结业证书', '2026年5月30日')}
                              className="border border-[#b11e22] text-[#b11e22] hover:bg-red-50 px-3 py-1 text-[11px] font-bold font-serif rounded transition-colors cursor-pointer"
                            >
                              查看证书
                            </button>
                          </div>
                        </motion.div>
                      )}

                    </div>

                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-12 text-center flex flex-col items-center justify-center min-h-[480px]"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                    <Grid className="w-8 h-8 text-amber-400" style={{ animationDuration: '40s' }} />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-700 tracking-wider">
                    选择赛事 / 活动查看全周期进度
                  </h4>
                  <p className="text-stone-400 text-xs max-w-xs mt-2 font-serif leading-relaxed">
                    点击左侧任意项，即可实时展示该项美育活动的「报名」、「提报作品」、「进度追踪」及「成就证书」全景页面。
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Certificate lightbox */}
      <AnimatePresence>
        {showCertificate && certificateDetail && (
          <div className="fixed inset-0 z-100 flex flex-col items-center justify-center p-4 cursor-zoom-out">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCertificate(false)}
              className="fixed inset-0 bg-stone-900/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative max-w-2xl w-full bg-[#fdfaf2] text-stone-850 p-8 sm:p-14 rounded-xl border-4 border-amber-900/20 shadow-2xl z-10 flex flex-col justify-between aspect-[1.414/1] text-center"
              style={{
                backgroundImage: 'radial-gradient(circle, #fcf6e8 20%, #f7ebd3 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(139, 92, 26, 0.15)'
              }}
            >
              <div className="absolute inset-4 sm:inset-6 border border-amber-950/20 pointer-events-none" />
              <div className="absolute inset-5 sm:inset-7.5 border-2 border-double border-amber-950/40 pointer-events-none" />
              
              <div className="absolute top-10 left-10 text-amber-900/35 font-serif text-[10px] sm:text-xs">
                编：JZ-AESTHETIC-2026-9488
              </div>

              <div className="absolute right-12 bottom-12 opacity-85 select-none pointer-events-none transform rotate-12">
                <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 text-red-700/80">
                  <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3,3" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M50,15 L62,38 L87,42 L68,60 L73,85 L50,73 L27,85 L32,60 L13,42 L38,38 Z" fill="currentColor" opacity="0.15" />
                  <text x="50" y="44" textAnchor="middle" fill="currentColor" className="text-[7px] font-bold tracking-widest font-serif block">公共美育中心</text>
                  <text x="50" y="55" textAnchor="middle" fill="currentColor" className="text-[5.5px] font-bold tracking-wider font-serif block text-red-800">终审及实践鉴定</text>
                  <text x="50" y="66" textAnchor="middle" fill="currentColor" className="text-[7.5px] font-bold tracking-widest font-mono block">OFFICIAL SEAL</text>
                </svg>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex justify-center items-center space-x-1 text-[#b11e22]">
                  <Award className="w-6 h-6" />
                  <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-widest uppercase text-[#b11e22]">
                    美育实践学术证书
                  </h2>
                  <Award className="w-6 h-6" />
                </div>
                
                <h3 className="font-serif text-[11px] sm:text-xs text-stone-500 uppercase tracking-widest font-bold">
                  AESTHETIC ACHIEVEMENT & PRACTICAL CERTIFICATE
                </h3>
              </div>

              <div className="my-8 space-y-4 font-serif relative z-10">
                <p className="text-sm sm:text-base text-stone-800 tracking-wide">
                  兹证明学员：
                  <span className="text-xl sm:text-2xl font-bold text-[#b11e22] border-b-2 border-[#b11e22] px-6 pb-0.5 mx-1 font-serif">
                    {certificateName || '张美育'}
                  </span>
                  同学 (小学中高阶美育班级)
                </p>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto tracking-wide">
                  在本级公共教育资源与云端实践考核中，修满所要求之全部核心大课，其所创制并报送的主题成果：
                  <br />
                  <strong className="text-stone-850 mt-1.5 inline-block border-b border-dashed border-stone-400 py-0.5 text-xs sm:text-sm">
                    {certificateDetail.title}
                  </strong>
                  <br />
                  经专家委员会进行联席规约审定，特准通过实践考核，评定等级为 <strong>优等 (Mastery Honor)</strong>。
                  特发此证，以资赞赏。
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-amber-950/10 pt-4.5 font-serif text-[10px] sm:text-xs text-stone-500">
                <div className="text-left space-y-1">
                  <p>发证机构：职业教育美育中心委员会</p>
                  <p>查询印信：JZ-EDU-2026-c133</p>
                </div>
                <div className="text-right space-y-1">
                  <p>鉴定时间：{certificateDetail.date}</p>
                  <p className="text-red-850 font-bold select-all italic font-serif">Aesthetic Certificate Verified</p>
                </div>
              </div>

            </motion.div>

            <button
              onClick={() => setShowCertificate(false)}
              className="mt-6 font-serif text-xs bg-white text-stone-850 hover:bg-stone-50 px-6 py-2 rounded-full cursor-pointer border border-stone-200 tracking-widest transition-all shadow-md z-10"
            >
              关闭并退出证书看台
            </button>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
