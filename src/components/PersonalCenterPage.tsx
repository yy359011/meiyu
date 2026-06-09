/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Home, User, Settings, Calendar, Upload, Heart,
  Edit3, Save, Eye, EyeOff, Mail, Phone, Building, Lock,
  FileText, Clock, CheckCircle, XCircle, Trash2, Download,
  ChevronRight, Camera, Shield
} from 'lucide-react';

// ============ Types ============
type TabKey = 'account' | 'registrations' | 'works' | 'favorites';

interface UserProfile {
  username: string;
  password: string;
  college: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Registration {
  id: string;
  eventName: string;
  category: string;
  registerDate: string;
  status: 'pending' | 'approved' | 'rejected';
  eventStatus: string;
}

interface SubmittedWork {
  id: string;
  title: string;
  eventName: string;
  category: string;
  submitDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'exhibiting' | 'rejected';
  fileFormat: string;
}

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  type: 'traditional' | 'transport' | 'gallery' | 'event';
  thumbnail: string;
  collectDate: string;
}

// ============ Mock Data ============
const MOCK_REGISTRATIONS: Registration[] = [
  { id: 'reg-1', eventName: '2026全国职业院校美育作品大赛', category: '美术', registerDate: '2026-03-15', status: 'approved', eventStatus: 'submitting' },
  { id: 'reg-2', eventName: '传统书法艺术展演活动', category: '书法', registerDate: '2026-04-02', status: 'approved', eventStatus: 'reviewing' },
  { id: 'reg-3', eventName: '校园戏曲文化节', category: '戏曲', registerDate: '2026-05-10', status: 'pending', eventStatus: 'registering' },
];

const MOCK_WORKS: SubmittedWork[] = [
  { id: 'work-1', title: '青绿山水意象', eventName: '2026全国职业院校美育作品大赛', category: '美术', submitDate: '2026-04-20', status: 'exhibiting', fileFormat: 'PNG' },
  { id: 'work-2', title: '行书临摹创作', eventName: '传统书法艺术展演活动', category: '书法', submitDate: '2026-05-05', status: 'reviewing', fileFormat: 'JPG' },
  { id: 'work-3', title: '未来交通畅想', eventName: '2026全国职业院校美育作品大赛', category: '美术', submitDate: '2026-04-25', status: 'approved', fileFormat: 'DWG' },
];

const MOCK_FAVORITES: FavoriteItem[] = [
  { id: 'fav-1', title: '京剧之美', category: '戏曲', type: 'gallery', thumbnail: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=200&auto=format&fit=crop', collectDate: '2026-05-01' },
  { id: 'fav-2', title: '古筝名曲赏析', category: '音乐', type: 'traditional', thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=200&auto=format&fit=crop', collectDate: '2026-04-28' },
  { id: 'fav-3', title: '高铁速度之美', category: '交通美育', type: 'transport', thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200&auto=format&fit=crop', collectDate: '2026-04-15' },
  { id: 'fav-4', title: '校园戏曲文化节', category: '活动', type: 'event', thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200&auto=format&fit=crop', collectDate: '2026-04-10' },
];

// ============ Helper ============
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: '待审核', color: 'text-amber-600', bg: 'bg-amber-50' },
  approved: { label: '已通过', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  rejected: { label: '未通过', color: 'text-rose-600', bg: 'bg-rose-50' },
  reviewing: { label: '评审中', color: 'text-blue-600', bg: 'bg-blue-50' },
  exhibiting: { label: '已入展', color: 'text-purple-600', bg: 'bg-purple-50' },
};

// ============ Component ============
interface PersonalCenterPageProps {
  onBackToHome?: () => void;
}

export default function PersonalCenterPage({ onBackToHome }: PersonalCenterPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('account');
  const [profile, setProfile] = useState<UserProfile>({
    username: '张美育',
    password: '********',
    college: '交通运输职业学院',
    email: 'lensasayam@gmail.com',
    phone: '138****8888',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [registrations] = useState(MOCK_REGISTRATIONS);
  const [works, setWorks] = useState(MOCK_WORKS);
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    eventName: '',
    fileFormat: '',
    description: '',
    file: null as File | null,
  });

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

  const handleUploadWork = () => {
    if (!uploadForm.title || !uploadForm.category || !uploadForm.eventName) return;
    
    const newWork: SubmittedWork = {
      id: `work-${Date.now()}`,
      title: uploadForm.title,
      category: uploadForm.category,
      eventName: uploadForm.eventName,
      submitDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      fileFormat: uploadForm.fileFormat || '未知',
    };
    
    setWorks([newWork, ...works]);
    setUploadForm({
      title: '',
      category: '',
      eventName: '',
      fileFormat: '',
      description: '',
      file: null,
    });
    setShowUploadModal(false);
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
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-[#d9ab6a] overflow-hidden shadow-lg">
                <img src={profile.avatar} alt="头像" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-amber-50 transition-colors">
                <Camera className="w-3.5 h-3.5 text-stone-600" />
              </button>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">{profile.username}</h1>
              <p className="text-white/70 text-sm mt-1">{profile.college}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-white/50 text-xs">注册于 2025-09-01</span>
              </div>
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
              {activeTab === 'registrations' && <RegistrationsSection key="regs" registrations={registrations} />}
              {activeTab === 'works' && <WorksSection key="works" works={works} onUpload={() => setShowUploadModal(true)} />}
              {activeTab === 'favorites' && <FavoritesSection key="favs" favorites={favorites} onRemove={handleRemoveFavorite} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#b11e22] to-[#921417] px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white">上传原创作品</h3>
                  <button onClick={() => setShowUploadModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">作品名称 *</label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    placeholder="请输入作品名称"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">所属活动 *</label>
                  <select
                    value={uploadForm.eventName}
                    onChange={(e) => setUploadForm({ ...uploadForm, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22] bg-white"
                  >
                    <option value="">请选择活动</option>
                    {registrations.filter(r => r.status === 'approved').map(reg => (
                      <option key={reg.id} value={reg.eventName}>{reg.eventName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">作品分类 *</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22] bg-white"
                  >
                    <option value="">请选择分类</option>
                    <option value="美术">美术</option>
                    <option value="书法">书法</option>
                    <option value="音乐">音乐</option>
                    <option value="戏曲">戏曲</option>
                    <option value="舞蹈">舞蹈</option>
                    <option value="摄影">摄影</option>
                    <option value="设计">设计</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">作品描述</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="请简要描述您的作品"
                    rows={3}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">上传文件</label>
                  <div className="relative border-2 border-dashed border-stone-200 rounded-lg p-4 text-center hover:border-[#b11e22]/30 transition-colors">
                    <Upload className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-500">
                      {uploadForm.file ? uploadForm.file.name : '点击或拖拽文件到此处'}
                    </p>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const format = file.name.split('.').pop()?.toUpperCase() || '未知';
                          setUploadForm({ ...uploadForm, file, fileFormat: format });
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800 cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={handleUploadWork}
                  disabled={!uploadForm.title || !uploadForm.category || !uploadForm.eventName}
                  className="px-6 py-2 bg-[#b11e22] text-white text-sm font-medium rounded-lg hover:bg-[#921417] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  提交作品
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    { key: 'username', label: '账号', icon: User, type: 'text' },
    { key: 'password', label: '密码', icon: Lock, type: 'password' },
    { key: 'college', label: '学院', icon: Building, type: 'text' },
    { key: 'email', label: '邮箱地址', icon: Mail, type: 'email' },
    { key: 'phone', label: '手机号码', icon: Phone, type: 'tel' },
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
              <div className="w-32 flex items-center space-x-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#b11e22]/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#b11e22]" />
                </div>
                <span className="text-sm text-stone-500">{field.label}</span>
              </div>
              <div className="flex-1">
                {isEditing ? (
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
function RegistrationsSection({ registrations }: { registrations: Registration[] }) {
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
                className="bg-white rounded-xl border border-amber-100/50 p-5 hover:border-[#b11e22]/20 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-stone-800 mb-2">{reg.eventName}</h3>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{reg.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />报名于 {reg.registerDate}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
                    {reg.status === 'approved' ? <CheckCircle className="w-3 h-3" /> : reg.status === 'rejected' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {s.label}
                  </span>
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
function WorksSection({ works, onUpload }: { works: SubmittedWork[]; onUpload: () => void }) {
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
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-amber-100/50 p-5 hover:border-[#b11e22]/20 hover:shadow-md transition-all"
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
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
                    {work.status === 'exhibiting' || work.status === 'approved' ? <CheckCircle className="w-3 h-3" /> : work.status === 'rejected' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {s.label}
                  </span>
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
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1.5 h-6 bg-[#b11e22] rounded-sm" />
        <h2 className="font-serif text-lg font-bold text-stone-800">我的收藏</h2>
        <span className="text-xs text-stone-400">共 {favorites.length} 项</span>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-amber-100/50 overflow-hidden hover:border-[#b11e22]/20 hover:shadow-md transition-all group"
            >
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#b11e22]/10 text-[#b11e22]">{item.category}</span>
                    <h3 className="font-serif font-bold text-stone-800 text-sm mt-1 line-clamp-1">{item.title}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-stone-400">{item.collectDate}</span>
                    <button onClick={() => onRemove(item.id)} className="text-stone-300 hover:text-rose-500 transition-colors cursor-pointer" title="取消收藏">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
