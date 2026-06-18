/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Home, User, Settings, Calendar, Upload, Heart,
  Edit3, Save, Eye, EyeOff, Mail, Phone, Building, Lock,
  FileText, Clock, CheckCircle, XCircle, Trash2, Download, FileDown,
  ChevronRight, ChevronDown, Camera, Shield, Play, Image as ImageIcon,
  Bookmark, Award, Compass
} from 'lucide-react';

// ============ Types ============
type TabKey = 'account' | 'registrations' | 'works' | 'favorites';

interface UserProfile {
  studentId: string;
  realName: string;
  collegeInfo: string;
  password: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Registration {
  id: string;
  eventName: string;
  category: string;
  registerDate: string;
  status: 'submitting' | 'pending' | 'rejected' | 'exhibiting' | 'ended';
  eventStatus: string;
  mode: '线上' | '线下';
  galleryId?: string;
  rejectionReason?: string;
  rejectionTimestamp?: string;
}

interface SubmittedWork {
  id: string;
  title: string;
  eventName: string;
  category: string;
  submitDate: string;
  status: 'submitting' | 'reviewing' | 'rejected' | 'exhibiting' | 'ended';
  fileFormat: string;
  galleryId?: string;
  rejectionReason?: string;
  rejectionTimestamp?: string;
}

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  type: 'traditional' | 'transport' | 'gallery' | 'event';
  thumbnail: string;
  collectDate: string;
  tag?: string;
  mediaType?: 'video' | 'image' | 'album' | 'score' | 'audio' | 'pdf';
  views?: string;
  author?: string;
  description?: string;
}

// ============ Mock Data ============
const MOCK_REGISTRATIONS: Registration[] = [
  { id: 'reg-1', eventName: '2026全国职业院校美育作品大赛', category: '美术', registerDate: '2026-03-15', status: 'submitting', eventStatus: 'submitting', mode: '线上' },
  { id: 'reg-2', eventName: '传统书法艺术展演活动', category: '书法', registerDate: '2026-04-02', status: 'pending', eventStatus: 'reviewing', mode: '线上' },
  { id: 'reg-3', eventName: '校园戏曲文化节', category: '戏曲', registerDate: '2026-05-10', status: 'exhibiting', eventStatus: 'exhibiting', mode: '线上', galleryId: 'gal-1' },
  { id: 'reg-4', eventName: '高铁造型设计大赛', category: '交通工具造型', registerDate: '2026-01-20', status: 'rejected', eventStatus: 'ended', mode: '线下', rejectionReason: '作品不符合展览要求', rejectionTimestamp: '2026-06-16T14:30:00Z' },
];

const MOCK_WORKS: SubmittedWork[] = [
  { id: 'work-1', title: '青绿山水意象', eventName: '2026全国职业院校美育作品大赛', category: '美术', submitDate: '2026-04-20', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-3' },
  { id: 'work-2', title: '行书临摹创作', eventName: '传统书法艺术展演活动', category: '书法', submitDate: '2026-05-05', status: 'reviewing', fileFormat: 'JPG' },
  { id: 'work-3', title: '未来交通畅想', eventName: '高铁造型设计大赛', category: '美术', submitDate: '2026-04-25', status: 'submitting', fileFormat: 'DWG' },
  { id: 'work-4', title: '戏曲脸谱设计', eventName: '校园戏曲文化节', category: '戏曲', submitDate: '2026-03-15', status: 'rejected', fileFormat: 'PNG', rejectionReason: '作品不符合展览要求', rejectionTimestamp: '2026-06-16T10:15:00Z' },
];

const MOCK_FAVORITES: FavoriteItem[] = [
  // 传统美育
  { id: 'fav-t1', title: '古筝名曲赏析', category: '传统音乐', type: 'traditional', thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop', tag: '音乐', collectDate: '2026-05-10', mediaType: 'video' },
  { id: 'fav-t2', title: '京剧脸谱艺术', category: '传统戏曲', type: 'traditional', thumbnail: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=600&auto=format&fit=crop', tag: '戏曲', collectDate: '2026-05-08', mediaType: 'video' },
  { id: 'fav-t3', title: '中国书法五体入门', category: '传统书法', type: 'traditional', thumbnail: 'https://images.unsplash.com/photo-1596444435998-9087685296f9?q=80&w=600&auto=format&fit=crop', tag: '书法', collectDate: '2026-05-05', mediaType: 'image' },
  // 交通美育
  { id: 'fav-tr1', title: '【纪录片】京杭大运河：南起余杭，北达大都的千里碧波', category: '人文历史', type: 'transport', thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop', tag: '大运河', collectDate: '2026-05-12', mediaType: 'video', views: '3.6K 观看' },
  { id: 'fav-tr2', title: '【图册】茶马古道：险峰重叠间的红土漫步', category: '人文历史', type: 'transport', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop', tag: '茶马古道', collectDate: '2026-05-09', mediaType: 'image', views: '1.8K 浏览' },
  { id: 'fav-tr3', title: '【影像】复兴号动车组：空气动力学流线型车头设计', category: '工业设计', type: 'transport', thumbnail: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=600&auto=format&fit=crop', tag: '高铁', collectDate: '2026-05-03', mediaType: 'image', views: '5.2K 浏览' },
  // 美育展厅
  { id: 'fav-g1', title: '中国古典园林中的借景手法研究', category: '园林艺术', type: 'gallery', thumbnail: 'https://images.unsplash.com/photo-1580619305218-8423a7ef7b41?q=80&w=600&auto=format&fit=crop', tag: '园林', collectDate: '2026-05-11', mediaType: 'image', author: '李泽厚', description: '以苏州拙政园为样本，系统梳理中国古典园林中"借景"艺术手法的美学原理与实践应用。' },
  { id: 'fav-g2', title: '敦煌壁画色彩体系研究', category: '传统绘画', type: 'gallery', thumbnail: 'https://images.unsplash.com/photo-1608365066148-32c0f7d64f53?q=80&w=600&auto=format&fit=crop', tag: '壁画', collectDate: '2026-05-07', mediaType: 'pdf', author: '段文杰', description: '以敦煌莫高窟十六国至元代壁画为研究对象，解析中国传统矿物颜料的色彩表现体系。' },
  { id: 'fav-g3', title: '明式家具美学：简约与工艺的极致', category: '传统工艺', type: 'gallery', thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', tag: '家具', collectDate: '2026-05-02', mediaType: 'video', author: '王世襄', description: '从黄花梨家具结构美学与工艺细节入手，解读明式家具"简、厚、精、雅"的审美特质。' },
];

// ============ Helper ============
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  submitting: { label: '提交中', color: 'text-blue-600', bg: 'bg-blue-50' },
  pending: { label: '待审核', color: 'text-amber-600', bg: 'bg-amber-50' },
  reviewing: { label: '审核中', color: 'text-amber-600', bg: 'bg-amber-50' },
  rejected: { label: '未通过', color: 'text-rose-600', bg: 'bg-rose-50' },
  exhibiting: { label: '展览中', color: 'text-purple-600', bg: 'bg-purple-50' },
  ended: { label: '已结束', color: 'text-stone-500', bg: 'bg-stone-100' },
};

// ============ Component ============
interface PersonalCenterPageProps {
  onBackToHome?: () => void;
  onUpload?: () => void;
  onViewSubmissionDetail?: (eventTitle: string, submissionTitle: string, status: 'submitting' | 'reviewing' | 'rejected' | 'ended', rejectionReason?: string, rejectionTimestamp?: string) => void;
  onViewExhibitionDetail?: (itemId: string) => void;
  avatarUrl?: string | null;
  onAvatarChange?: (url: string | null) => void;
  defaultTab?: TabKey;
}

export default function PersonalCenterPage({ onBackToHome, onUpload, onViewSubmissionDetail, onViewExhibitionDetail, avatarUrl, onAvatarChange, defaultTab }: PersonalCenterPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab || 'account');
  const [profile, setProfile] = useState<UserProfile>({
    studentId: '2025001',
    realName: '张美育',
    collegeInfo: '交通运输职业学院 / 交通运输系 / 交运2501班',
    password: '********',
    email: 'zhangmeiyu@example.com',
    phone: '138****8888',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [registrations] = useState(MOCK_REGISTRATIONS);
  const [works, setWorks] = useState(MOCK_WORKS);
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const tabs: { key: TabKey; label: string; icon: typeof User; count?: number }[] = [
    { key: 'account', label: '账号管理', icon: Settings },
    { key: 'registrations', label: '活动报名', icon: Calendar, count: registrations.length },
    { key: 'works', label: '原创作品', icon: Upload, count: works.length },
    { key: 'favorites', label: '我的收藏', icon: Heart, count: favorites.length },
  ];

  const handleSaveProfile = () => {
    setProfile({ ...editForm });
    setIsEditing(false);
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const handleAvatarFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      onAvatarChange?.(dataUrl);
    };
    reader.onerror = () => {
      alert('读取图片失败，请重试');
    };
    reader.readAsDataURL(file);
    // reset so same file can be re-selected later
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  const handleResetAvatar = () => {
    onAvatarChange?.(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fbf9f4]"
    >
      {/* Tab Navigation */}
      <div className="bg-gradient-to-r from-[#b11e22] to-[#921417]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full border-4 border-[#d9ab6a] overflow-hidden shadow-lg bg-[#fff8e7]">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="用户头像" className="w-full h-full object-cover" />
                ) : (
                  <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="avatarBg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff8e7" />
                        <stop offset="100%" stopColor="#f5e6c8" />
                      </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="98" fill="url(#avatarBg)" />
                    <path d="M 40 70 Q 70 50 100 60 Q 130 45 160 75 L 160 95 Q 130 80 100 90 Q 70 80 40 95 Z" fill="#b7c5e0" opacity="0.55" />
                    <path d="M 35 115 Q 65 95 100 105 Q 135 90 165 118 L 165 140 Q 135 115 100 130 Q 65 115 35 140 Z" fill="#6a8fbf" opacity="0.55" />
                    <path d="M 40 160 Q 75 140 100 150 Q 130 135 160 160 L 160 180 L 40 180 Z" fill="#d9a066" opacity="0.7" />
                    <g transform="rotate(-35 85 95)">
                      <rect x="70" y="40" width="10" height="90" rx="3" fill="#8aa3c9" />
                      <rect x="70" y="40" width="10" height="30" rx="3" fill="#5f7ba5" />
                      <polygon points="75,25 68,45 82,45" fill="#e07a3c" />
                      <ellipse cx="75" cy="33" rx="5" ry="5" fill="#f4a565" opacity="0.7" />
                      <rect x="70" y="70" width="10" height="8" fill="#5f7ba5" />
                    </g>
                    <g transform="rotate(30 125 100)">
                      <rect x="118" y="35" width="8" height="100" rx="3" fill="#b0a5dc" />
                      <rect x="118" y="35" width="8" height="25" rx="3" fill="#7c6fb0" />
                      <polygon points="122,20 115,40 129,40" fill="#d9a066" />
                      <ellipse cx="122" cy="28" rx="4" ry="4" fill="#f4c78d" opacity="0.8" />
                    </g>
                    <ellipse cx="140" cy="120" rx="40" ry="32" fill="#fff8e7" stroke="#8aa3c9" strokeWidth="3" />
                    <ellipse cx="140" cy="120" rx="30" ry="23" fill="#fff8e7" stroke="#8aa3c9" strokeWidth="2" />
                    <ellipse cx="135" cy="113" rx="10" ry="8" fill="#d9a066" opacity="0.85" />
                    <ellipse cx="150" cy="108" rx="8" ry="6" fill="#b0a5dc" opacity="0.85" />
                    <ellipse cx="148" cy="125" rx="9" ry="7" fill="#e07a3c" opacity="0.7" />
                    <ellipse cx="132" cy="128" rx="7" ry="5" fill="#6a8fbf" opacity="0.75" />
                    <ellipse cx="125" cy="118" rx="5" ry="4" fill="#8aa3c9" opacity="0.8" />
                    <ellipse cx="155" cy="118" rx="5" ry="4" fill="#d9a066" opacity="0.7" />
                    <g fill="#4a5a85">
                      <ellipse cx="65" cy="145" rx="6" ry="10" />
                      <rect x="62" y="145" width="6" height="25" rx="2" />
                      <path d="M 68 145 Q 78 148 80 158 L 80 163 Q 75 168 68 163 Z" />
                    </g>
                    <g fill="#6a8fbf">
                      <polygon points="155,50 155,42 163,42 163,52 172,52 172,62 163,62 163,75 155,75 155,65 145,65 145,55 155,55" />
                    </g>
                    <circle cx="150" cy="85" r="3.5" fill="#f4c78d" />
                    <circle cx="75" cy="90" r="3" fill="#6a8fbf" opacity="0.6" />
                    <circle cx="80" cy="85" r="2" fill="#d9a066" opacity="0.7" />
                    <polygon points="155,20 152,30 158,30" fill="#7c6fb0" />
                    <polygon points="140,17 137,28 144,28" fill="#b0a5dc" opacity="0.7" />
                    <polygon points="55,55 52,65 58,65" fill="#5f7ba5" opacity="0.6" />
                    <circle cx="35" cy="80" r="2.5" fill="#6a8fbf" opacity="0.5" />
                    <circle cx="172" cy="150" r="3" fill="#d9a066" opacity="0.6" />
                    <circle cx="45" cy="170" r="2" fill="#8aa3c9" opacity="0.5" />
                    <circle cx="160" cy="168" r="2.5" fill="#b0a5dc" opacity="0.55" />
                  </svg>
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileSelect}
                className="hidden"
              />
              <div className="absolute bottom-0 right-0 flex gap-1">
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-amber-50 transition-colors"
                  title="修改头像"
                >
                    <Camera className="w-3.5 h-3.5 text-stone-600" />
                </button>
                {avatarUrl && (
                  <button
                    onClick={handleResetAvatar}
                    className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-rose-50 transition-colors"
                    title="重置为默认头像"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">{profile.realName}</h1>
              <p className="text-white/70 text-sm mt-1">{profile.collegeInfo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-amber-100/50 overflow-hidden sticky top-20">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#b11e22]/5 text-[#b11e22] border-l-3 border-[#b11e22] font-medium'
                        : 'text-stone-600 hover:bg-stone-50 border-l-3 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#b11e22]' : 'text-stone-400'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-[#b11e22]/10 text-[#b11e22]' : 'bg-stone-100 text-stone-400'}`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'account' && (
                <AccountSection
                  key="account"
                  profile={profile}
                  isEditing={isEditing}
                  editForm={editForm}
                  showPassword={showPassword}
                  setIsEditing={setIsEditing}
                  setEditForm={setEditForm}
                  setShowPassword={setShowPassword}
                  onSave={handleSaveProfile}
                  onCancel={() => { setIsEditing(false); setEditForm({ ...profile }); }}
                />
              )}
              {activeTab === 'registrations' && <RegistrationsSection key="regs" registrations={registrations} onViewSubmissionDetail={onViewSubmissionDetail} onViewExhibitionDetail={onViewExhibitionDetail} />}
              {activeTab === 'works' && <WorksSection key="works" works={works} onUpload={onUpload || (() => {})} onViewSubmissionDetail={onViewSubmissionDetail} onViewExhibitionDetail={onViewExhibitionDetail} />}
              {activeTab === 'favorites' && <FavoritesSection key="favs" favorites={favorites} onRemove={handleRemoveFavorite} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ Account Section ============
function AccountSection({ profile, isEditing, editForm, showPassword, setIsEditing, setEditForm, setShowPassword, onSave, onCancel }: {
  profile: UserProfile; isEditing: boolean; editForm: UserProfile; showPassword: boolean;
  setIsEditing: (v: boolean) => void; setEditForm: (v: UserProfile) => void; setShowPassword: (v: boolean) => void;
  onSave: () => void; onCancel: () => void;
}) {
  const fields = [
    { key: 'studentId', label: '学号', icon: User, type: 'text', editable: false },
    { key: 'realName', label: '真实姓名', icon: User, type: 'text', editable: false },
    { key: 'collegeInfo', label: '学院/专业/班级', icon: Building, type: 'text', editable: false },
    { key: 'password', label: '密码', icon: Lock, type: 'password', editable: true },
    { key: 'email', label: '邮箱地址', icon: Mail, type: 'email', editable: true },
    { key: 'phone', label: '手机号码', icon: Phone, type: 'tel', editable: true },
  ] as const;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
          <h2 className="font-serif text-lg font-bold text-stone-800">账号管理</h2>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-[#b11e22] text-white rounded-lg text-sm hover:bg-[#99161a] transition-colors cursor-pointer">
            <Edit3 className="w-4 h-4" /><span>编辑资料</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={onCancel} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg text-sm hover:bg-stone-200 transition-colors cursor-pointer">取消</button>
            <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-[#b11e22] text-white rounded-lg text-sm hover:bg-[#99161a] transition-colors cursor-pointer">
              <Save className="w-4 h-4" /><span>保存</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-amber-100/50 overflow-hidden">
        {fields.map((field, idx) => {
          const Icon = field.icon;
          const value = isEditing ? editForm[field.key] : profile[field.key];
          return (
            <div key={field.key} className={`flex items-center px-6 py-5 ${idx < fields.length - 1 ? 'border-b border-stone-100' : ''}`}>
              <div className="w-36 flex items-center space-x-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#b11e22]/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#b11e22]" />
                </div>
                <span className="text-sm text-stone-500">{field.label}</span>
              </div>
              <div className="flex-1">
                {!field.editable ? (
                  <span className="text-sm text-stone-800">{value}</span>
                ) : isEditing ? (
                  field.key === 'password' ? (
                    <div className="relative max-w-sm">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={editForm.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22]"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      value={value}
                      onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                      className="w-full max-w-sm px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22]"
                    />
                  )
                ) : (
                  <span className="text-sm text-stone-800">
                    {field.key === 'password' ? '********' : value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ============ Registrations Section ============
function RegistrationsSection({ registrations, onViewSubmissionDetail, onViewExhibitionDetail }: { registrations: Registration[]; onViewSubmissionDetail?: (eventTitle: string, submissionTitle: string, status: 'submitting' | 'reviewing' | 'rejected' | 'ended', rejectionReason?: string, rejectionTimestamp?: string) => void; onViewExhibitionDetail?: (itemId: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
        <h2 className="font-serif text-lg font-bold text-stone-800">活动报名记录</h2>
        <span className="text-xs text-stone-400">共 {registrations.length} 条</span>
      </div>

      {registrations.length > 0 ? (
        <div className="space-y-3">
          {registrations.map((reg, index) => {
            const s = statusConfig[reg.status];
            return (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  if (reg.mode === '线上' && reg.status === 'exhibiting' && reg.galleryId) {
                    onViewExhibitionDetail?.(reg.galleryId);
                  } else {
                    onViewSubmissionDetail?.(reg.eventName, reg.eventName, reg.status as 'submitting' | 'reviewing' | 'rejected' | 'ended', reg.rejectionReason, reg.rejectionTimestamp);
                  }
                }}
                className="bg-white rounded-xl border border-amber-100/50 p-5 hover:border-[#b11e22]/20 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-stone-800 mb-2">{reg.eventName}</h3>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{reg.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />报名于 {reg.registerDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold tracking-wider font-serif px-2 py-0.5 rounded ${reg.mode === '线上' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                      {reg.mode}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
                      {reg.status === 'submitting' ? <Upload className="w-3 h-3" /> : reg.status === 'pending' ? <Clock className="w-3 h-3" /> : reg.status === 'rejected' ? <XCircle className="w-3 h-3" /> : reg.status === 'exhibiting' ? <Eye className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {s.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Calendar} text="暂无活动报名记录" />
      )}
    </motion.div>
  );
}

// ============ Works Section ============
function WorksSection({ works, onUpload, onViewSubmissionDetail, onViewExhibitionDetail }: { works: SubmittedWork[]; onUpload: () => void; onViewSubmissionDetail?: (eventTitle: string, submissionTitle: string, status: 'submitting' | 'reviewing' | 'rejected' | 'ended', rejectionReason?: string, rejectionTimestamp?: string) => void; onViewExhibitionDetail?: (itemId: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
          <h2 className="font-serif text-lg font-bold text-stone-800">原创作品提交</h2>
          <span className="text-xs text-stone-400">共 {works.length} 件</span>
        </div>
        <button
          onClick={onUpload}
          className="flex items-center space-x-2 px-4 py-2 bg-[#b11e22] text-white text-sm font-medium rounded-lg hover:bg-[#921417] transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>上传作品</span>
        </button>
      </div>

      {works.length > 0 ? (
        <div className="space-y-3">
          {works.map((work, index) => {
            const s = statusConfig[work.status];
            const isClickable = true;
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  if (work.status === 'exhibiting' && work.galleryId) {
                    onViewExhibitionDetail?.(work.galleryId);
                  } else {
                    onViewSubmissionDetail?.(work.eventName, work.title, work.status as 'submitting' | 'reviewing' | 'rejected' | 'ended', work.rejectionReason, work.rejectionTimestamp);
                  }
                }}
                className={`bg-white rounded-xl border border-amber-100/50 p-5 hover:border-[#b11e22]/20 hover:shadow-md transition-all ${isClickable ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-stone-800 mb-1">{work.title}</h3>
                    <p className="text-xs text-stone-500 mb-2">{work.eventName}</p>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{work.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />提交于 {work.submitDate}</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-500">{work.fileFormat}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
                      {work.status === 'submitting' ? <Upload className="w-3 h-3" /> : work.status === 'reviewing' ? <Clock className="w-3 h-3" /> : work.status === 'rejected' ? <XCircle className="w-3 h-3" /> : work.status === 'exhibiting' ? <Eye className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {s.label}
                    </span>
                    {isClickable && <ChevronRight className="w-4 h-4 text-stone-400" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Upload} text="暂无提交的作品" />
      )}
    </motion.div>
  );
}

// ============ Favorites Section ============
function FavoritesSection({ favorites, onRemove }: { favorites: FavoriteItem[]; onRemove: (id: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'traditional' | 'transport' | 'gallery'>('all');

  const categories = [
    { id: 'all', label: '全部', icon: Bookmark },
    { id: 'traditional', label: '传统美育', icon: Award },
    { id: 'transport', label: '交通美育', icon: Compass },
    { id: 'gallery', label: '美育展厅', icon: Building },
  ] as const;

  const getTagColorClass = (tag: string) => {
    const map: Record<string, string> = {
      '音乐': 'bg-amber-600',
      '戏曲': 'bg-rose-600',
      '书法': 'bg-amber-700',
      '大运河': 'bg-sky-700',
      '茶马古道': 'bg-emerald-700',
      '高铁': 'bg-blue-700',
      '园林': 'bg-emerald-800',
      '壁画': 'bg-orange-700',
      '家具': 'bg-yellow-800',
    };
    return map[tag] || 'bg-[#b11e22]';
  };

  const traditionalFavorites = favorites.filter((f) => f.type === 'traditional');
  const transportFavorites = favorites.filter((f) => f.type === 'transport');
  const galleryFavorites = favorites.filter((f) => f.type === 'gallery');

  const filteredFavorites =
    activeCategory === 'all'
      ? favorites
      : activeCategory === 'traditional'
      ? traditionalFavorites
      : activeCategory === 'transport'
      ? transportFavorites
      : galleryFavorites;

  const renderCard = (item: FavoriteItem, index: number) => {
    // 传统美育资源库卡片样式
    if (item.type === 'traditional') {
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
        >
          <div className="relative aspect-video overflow-hidden bg-stone-100">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />
            {item.tag && (
              <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${getTagColorClass(item.tag)}`}>
                {item.tag}
              </span>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                {item.mediaType === 'image' ? (
                  <ImageIcon className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                )}
              </div>
            </div>
          </div>
          <div className="p-3.5 space-y-2">
            <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors truncate">
              {item.title}
            </h4>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400">收藏于 {item.collectDate}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="text-stone-300 hover:text-rose-500 transition-colors cursor-pointer"
                title="取消收藏"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // 交通美育资源库卡片样式（image类型 - 白色Eye按钮）
    if (item.type === 'transport') {
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-lg overflow-hidden border border-amber-100/50 hover:border-[#b11e22]/30 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div className="relative aspect-video overflow-hidden bg-stone-100">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/15 transition-colors" />
            {item.tag && (
              <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm ${getTagColorClass(item.tag)}`}>
                {item.tag}
              </span>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-white text-stone-850 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                {item.mediaType === 'image' ? (
                  <Eye className="w-5 h-5 text-[#b11e22]" />
                ) : (
                  <Play className="w-5 h-5 fill-current text-[#b11e22]" />
                )}
              </div>
            </div>
          </div>
          <div className="p-3.5 space-y-2">
            <h4 className="font-serif text-[13px] sm:text-[14px] leading-snug text-stone-800 font-semibold group-hover:text-[#b11e22] transition-colors truncate">
              {item.title}
            </h4>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400">{item.views || item.collectDate}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="text-stone-300 hover:text-rose-500 transition-colors cursor-pointer"
                title="取消收藏"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // 美育展厅资源库卡片样式（h-[200px]封面 + 《标题》 + 描述 + 查看详情）
    if (item.type === 'gallery') {
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-amber-100/50 hover:border-[#b11e22]/20 transition-all duration-300"
        >
          <div className="relative h-[200px] overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {item.tag && (
              <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-sm bg-[#b11e22] font-serif tracking-wider">
                {item.tag}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 bg-black/45 flex items-center justify-center transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-[#b11e22] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                {item.mediaType === 'video' ? (
                  <Play className="w-5 h-5 fill-current" />
                ) : item.mediaType === 'pdf' ? (
                  <FileText className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-serif text-sm font-bold text-stone-800 mb-2 line-clamp-1">《{item.title}》</h3>
            {item.description && (
              <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
            )}
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-[#b11e22]">{item.category}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="text-stone-300 hover:text-rose-500 transition-colors cursor-pointer"
                title="取消收藏"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
          <h2 className="font-serif text-lg font-bold text-stone-800">我的收藏</h2>
          <span className="text-xs text-stone-400">共 {favorites.length} 项</span>
        </div>
      </div>

      {/* 分类标签页 */}
      <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-none pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count =
            cat.id === 'all'
              ? favorites.length
              : cat.id === 'traditional'
              ? traditionalFavorites.length
              : cat.id === 'transport'
              ? transportFavorites.length
              : galleryFavorites.length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all whitespace-nowrap ${
              isActive
                ? 'bg-[#b11e22] text-white shadow-md'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-[#b11e22]/30 hover:text-[#b11e22]'
            }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-serif font-medium">{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item, index) => renderCard(item, index))}
        </div>
      ) : (
        <EmptyState icon={Heart} text="暂无收藏内容" />
      )}
    </motion.div>
  );
}

// ============ Empty State ============
function EmptyState({ icon: Icon, text }: { icon: typeof Heart; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-stone-200 rounded-xl">
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-stone-300" />
      </div>
      <p className="text-stone-400 font-serif text-sm">{text}</p>
    </div>
  );
}
