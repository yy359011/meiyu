/**
 * 传统美育 - 乐谱详情页
 * 以 PDF 形式展示乐谱内容
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Home,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Eye,
  Calendar,
  FileText,
  Bookmark,
  ThumbsUp
} from 'lucide-react';

interface TraditionalScoreDetailProps {
  score: {
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    pdfUrl: string;
    description?: string;
  };
  onBack: () => void;
  onNavigateHome: () => void;
}

export default function TraditionalScoreDetail({ score, onBack, onNavigateHome }: TraditionalScoreDetailProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likes, setLikes] = useState(256);
  const [isLiked, setIsLiked] = useState(false);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => { setScale(1); setRotation(0); };
  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#fdf9f0] font-serif"
    >
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
                <span className="font-medium">传统美育</span>
              </button>
              <span className="text-stone-300 mx-1">›</span>
              <span className="text-stone-500 font-medium">传统音乐库</span>
              <span className="text-stone-300 mx-1">›</span>
              <span className="text-[#b11e22] font-medium truncate max-w-[200px]">乐谱详情</span>
            </div>

            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 text-stone-500 hover:text-[#b11e22] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">返回乐谱列表</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8">

          {/* LEFT: Score info sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="sticky top-28"
            >
              <div className="mt-0 bg-white/60 rounded-xl p-4 border border-amber-100/70">
                <h2 className="font-serif text-lg font-bold text-stone-800 mb-3">{score.title}</h2>
                <div className="space-y-2 text-sm text-stone-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1"><Eye className="w-3.5 h-3.5" /><span>浏览量</span></span>
                    <span className="text-[#b11e22] font-medium">{score.views}</span>
                  </div>
                  <div className="border-t border-amber-100/50" />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>发布日期</span></span>
                    <span className="text-stone-700">{score.pubDate}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 bg-white/60 rounded-xl p-4 border border-amber-100/70">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-1 h-4 bg-[#b11e22] rounded-sm" />
                  <h3 className="font-serif text-sm font-bold text-[#b11e22] tracking-wider">简介</h3>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed text-justify">
                  {score.description || '本乐谱为传统经典曲目，经专业团队重新整理校对，以高清PDF格式呈现。乐谱标注详尽，适合美育教学与自学使用，帮助学习者深入理解传统音乐的旋律结构与演奏技法。'}
                </p>
              </div>

              {/* Like button */}
              <button
                onClick={handleLike}
                className={`mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border transition-all font-sans text-sm cursor-pointer ${
                  isLiked
                    ? 'bg-[#b11e22]/10 border-[#b11e22]/20 text-[#b11e22]'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-[#b11e22] hover:text-[#b11e22]'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>点赞 ({likes})</span>
              </button>

              {/* Favorite button */}
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`mt-3 w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border transition-all font-sans text-sm cursor-pointer ${
                  isFavorited
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                <span>{isFavorited ? '已收藏' : '收藏乐谱'}</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT: PDF viewer area */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between bg-white border border-amber-100/60 rounded-t-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2 text-sm text-stone-600 font-sans">
                  <FileText className="w-4 h-4 text-[#b11e22]" />
                  <span className="font-medium">{score.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button onClick={handleZoomOut} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-[#b11e22] transition-colors" title="缩小">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-stone-500 font-sans px-2 min-w-[48px] text-center">{Math.round(scale * 100)}%</span>
                  <button onClick={handleZoomIn} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-[#b11e22] transition-colors" title="放大">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-stone-200 mx-1" />
                  <button onClick={handleRotate} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-[#b11e22] transition-colors" title="旋转">
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button onClick={handleReset} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-[#b11e22] transition-colors" title="重置">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PDF embed area */}
              <div className="bg-white border border-t-0 border-amber-100/60 rounded-b-2xl shadow-sm overflow-hidden">
                <div className="bg-stone-100 p-4 overflow-auto" style={{ height: '700px' }}>
                  <div
                    className="mx-auto transition-transform duration-300"
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      transformOrigin: 'center top',
                      maxWidth: '100%'
                    }}
                  >
                    <object
                      data={score.pdfUrl}
                      type="application/pdf"
                      width="100%"
                      height="680"
                      className="rounded-lg shadow-md"
                    >
                      <div className="flex flex-col items-center justify-center h-[680px] bg-white rounded-lg border border-stone-200">
                        <FileText className="w-16 h-16 text-stone-300 mb-4" />
                        <p className="text-stone-500 font-sans mb-2">您的浏览器不支持直接预览 PDF</p>
                        <a
                          href={score.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-5 py-2.5 bg-[#b11e22] text-white rounded-lg hover:bg-[#99161a] transition-colors font-sans text-sm"
                        >
                          <span>在新窗口中打开 PDF</span>
                        </a>
                      </div>
                    </object>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 mb-4 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
      </div>
    </motion.div>
  );
}
