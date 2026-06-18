/**
 * EventWorksPage - 活动作品列表页
 * 展示本活动下的所有报名记录
 */

import { motion } from 'motion/react';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  Eye,
  Send,
} from 'lucide-react';

interface WorkRecord {
  id: string;
  title: string;
  category: string;
  submitDate: string;
  status: 'submitting' | 'reviewing' | 'rejected' | 'exhibiting' | 'ended';
  fileFormat: string;
  rejectionReason?: string;
  rejectionTimestamp?: string;
  galleryId?: string;
}

interface EventWorksPageProps {
  eventTitle: string;
  onBack: () => void;
  onViewSubmissionDetail?: (eventTitle: string, submissionTitle: string, status: 'submitting' | 'reviewing' | 'rejected' | 'ended', rejectionReason?: string, rejectionTimestamp?: string) => void;
  onViewExhibitionDetail?: (galleryId: string) => void;
}

const MOCK_EVENT_WORKS: Record<string, WorkRecord[]> = {
  // 首页 EVENTS_DATA 事件
  '2024 全国青少年"墨韵新声"书法大赛': [
    { id: 'ew-h1', title: '行书临摹·兰亭序', category: '书法', submitDate: '2026-03-20', status: 'exhibiting', fileFormat: 'JPG', galleryId: 'gal-5' },
    { id: 'ew-h2', title: '楷书创作·岳阳楼记', category: '书法', submitDate: '2026-04-02', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-6' },
    { id: 'ew-h3', title: '草书条幅·将进酒', category: '书法', submitDate: '2026-04-10', status: 'reviewing', fileFormat: 'JPG' },
    { id: 'ew-h4', title: '隶书对联·千字文', category: '书法', submitDate: '2026-04-15', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-h5', title: '硬笔书法·唐诗选抄', category: '书法', submitDate: '2026-03-28', status: 'rejected', fileFormat: 'PDF', rejectionReason: '作品尺寸不符合要求，需为A4规格', rejectionTimestamp: '2026-05-10T09:30:00Z' },
    { id: 'ew-h6', title: '篆书创作·古诗四首', category: '书法', submitDate: '2026-04-20', status: 'submitting', fileFormat: 'PNG' },
  ],
  '"数字丝路"交通美育创新工作坊': [
    { id: 'ew-h7', title: '丝路驿站AR重建', category: '数字艺术', submitDate: '2026-05-10', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-h8', title: '驼铃商队全息投影', category: '数字艺术', submitDate: '2026-05-15', status: 'submitting', fileFormat: 'MP4' },
  ],
  '首届"公共美育课"年度优秀作品展': [
    { id: 'ew-h9', title: '国画·秋山晚翠图', category: '国画', submitDate: '2026-04-05', status: 'exhibiting', fileFormat: 'JPG', galleryId: 'gal-3' },
    { id: 'ew-h10', title: '桥梁拼插模型', category: '手工', submitDate: '2026-04-12', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-8' },
    { id: 'ew-h11', title: '高铁涂装设计稿', category: '设计', submitDate: '2026-03-20', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-10' },
  ],
  // 活动中心 EventsPage 事件
  '首届"墨韵古海"全国青少年硬笔与毛笔书法大奖赛': [
    { id: 'ew-1', title: '行书临摹·兰亭序', category: '书法', submitDate: '2026-03-20', status: 'exhibiting', fileFormat: 'JPG', galleryId: 'gal-5' },
    { id: 'ew-2', title: '楷书创作·岳阳楼记', category: '书法', submitDate: '2026-04-02', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-6' },
    { id: 'ew-3', title: '草书条幅·将进酒', category: '书法', submitDate: '2026-04-10', status: 'reviewing', fileFormat: 'JPG' },
    { id: 'ew-4', title: '隶书对联·千字文', category: '书法', submitDate: '2026-04-15', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-5', title: '硬笔书法·唐诗选抄', category: '书法', submitDate: '2026-03-28', status: 'rejected', fileFormat: 'PDF', rejectionReason: '作品尺寸不符合要求，需为A4规格', rejectionTimestamp: '2026-05-10T09:30:00Z' },
    { id: 'ew-6', title: '篆书创作·古诗四首', category: '书法', submitDate: '2026-04-20', status: 'submitting', fileFormat: 'PNG' },
  ],
  '——"未来飞翼"高速流线型列车重组涂装与车体工业设计大赛': [
    { id: 'ew-7', title: '银翼穿梭号涂装设计', category: '工业设计', submitDate: '2026-05-10', status: 'reviewing', fileFormat: 'DWG' },
    { id: 'ew-8', title: '流光幻影列车造型', category: '工业设计', submitDate: '2026-05-15', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-9', title: '青龙号高速列车涂装', category: '工业设计', submitDate: '2026-05-08', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-10' },
    { id: 'ew-10', title: '未来磁悬浮概念设计', category: '工业设计', submitDate: '2026-05-20', status: 'submitting', fileFormat: 'DWG' },
  ],
  '首届"戏影百川"戏曲写意红脸/金面皮影数字化重织大赛': [
    { id: 'ew-11', title: '关公脸谱数字化重织', category: '戏曲', submitDate: '2026-04-05', status: 'exhibiting', fileFormat: 'PNG', galleryId: 'gal-1' },
    { id: 'ew-12', title: '包公金面皮影设计', category: '戏曲', submitDate: '2026-04-12', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-13', title: '孙悟空戏曲脸谱重构', category: '戏曲', submitDate: '2026-04-18', status: 'rejected', fileFormat: 'JPG', rejectionReason: '作品提交格式不符，需提供源文件', rejectionTimestamp: '2026-05-20T14:00:00Z' },
    { id: 'ew-14', title: '穆桂英挂帅皮影新编', category: '戏曲', submitDate: '2026-04-25', status: 'submitting', fileFormat: 'PNG' },
  ],
  '"大国重器·百川跨海"南极雪龙二号破冰船精密构配手工拼插大展': [
    { id: 'ew-15', title: '雪龙二号1:100精密模型', category: '手工模型', submitDate: '2026-03-20', status: 'exhibiting', fileFormat: 'JPG', galleryId: 'gal-12' },
    { id: 'ew-16', title: '破冰船剖面结构拼插', category: '手工模型', submitDate: '2026-04-01', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-17', title: '南极科考站场景还原', category: '手工模型', submitDate: '2026-03-30', status: 'rejected', fileFormat: 'JPG', rejectionReason: '作品比例与要求不符', rejectionTimestamp: '2026-04-28T10:00:00Z' },
  ],
  '"七下西洋"大明远洋宝船水密隔舱构筑法度与航运历史回顾工作坊': [
    { id: 'ew-18', title: '郑和宝船水密隔舱复原', category: '手工模型', submitDate: '2026-05-01', status: 'reviewing', fileFormat: 'PNG' },
    { id: 'ew-19', title: '明代远洋货船结构图', category: '绘画', submitDate: '2026-05-05', status: 'submitting', fileFormat: 'JPG' },
    { id: 'ew-20', title: '宝船航海图绘制', category: '绘画', submitDate: '2026-05-10', status: 'submitting', fileFormat: 'PNG' },
  ],
};

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  submitting: { label: '待提交', color: 'text-blue-600', bg: 'bg-blue-50', icon: Send },
  reviewing: { label: '审核中', color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
  rejected: { label: '未通过', color: 'text-rose-600', bg: 'bg-rose-50', icon: XCircle },
  exhibiting: { label: '展览中', color: 'text-purple-600', bg: 'bg-purple-50', icon: Eye },
  ended: { label: '已结束', color: 'text-stone-500', bg: 'bg-stone-100', icon: CheckCircle2 },
};

export default function EventWorksPage({ eventTitle, onBack, onViewSubmissionDetail, onViewExhibitionDetail }: EventWorksPageProps) {
  const works = MOCK_EVENT_WORKS[eventTitle] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-stone-50"
    >
      {/* Header */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-lg font-bold text-stone-900 truncate">{eventTitle}</h1>
            <p className="text-xs text-stone-500 mt-0.5">报名记录 · 共 {works.length} 条</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {works.length > 0 ? (
          <div className="space-y-4">
            {works.map((work, index) => {
              const config = statusConfig[work.status] || statusConfig.submitting;
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    if (work.status === 'exhibiting' && work.galleryId) {
                      onViewExhibitionDetail?.(work.galleryId);
                    } else {
                      onViewSubmissionDetail?.(
                        eventTitle,
                        work.title,
                        work.status as 'submitting' | 'reviewing' | 'rejected' | 'ended',
                        work.rejectionReason,
                        work.rejectionTimestamp
                      );
                    }
                  }}
                  className="bg-white rounded-xl border border-stone-100 p-5 hover:border-amber-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif font-bold text-stone-800 group-hover:text-[#b11e22] transition-colors">
                            {work.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              {work.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {work.submitDate}
                            </span>
                            <span className="text-stone-300">{work.fileFormat}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} flex-shrink-0`}>
                          {config.label}
                        </span>
                      </div>
                      {work.status === 'rejected' && work.rejectionReason && (
                        <div className="mt-3 p-3 bg-rose-50 rounded-lg border border-rose-100">
                          <p className="text-xs text-rose-600">
                            <span className="font-medium">未通过原因：</span>{work.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-600 mb-2">暂无报名记录</h3>
            <p className="text-sm text-stone-400">该活动暂无报名记录</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
