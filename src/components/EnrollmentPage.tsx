/**
 * EnrollmentPage - 活动报名页面
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Upload, XCircle, Save, FileText,
  Eye, Check, FileVideo, FileImage, FileAudio, File, X, Plus
} from 'lucide-react';

// ============ Types ============
interface EnrollmentPageProps {
  eventTitle: string;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  url?: string;
}

interface FilePreview {
  url: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'pdf';
}

let enrollFileIdCounter = 0;
const genEnrollFileId = () => `ef-${Date.now()}-${++enrollFileIdCounter}`;

// ============ Component ============
export default function EnrollmentPage({ eventTitle, onBack, onSubmit }: EnrollmentPageProps) {
  const [form, setForm] = useState({
    title: '',
    authorBio: '',
    description: '',
    cover: null as File | null,
  });

  // 每种类型多文件
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({
    videoFile: [],
    imageFile: [],
    audioFile: [],
    pdfFile: [],
  });

  // 封面图预览URL
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  // 文件预览
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);

  // 清理预览URL
  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
      Object.values(uploadedFiles).flat().forEach(f => { if (f.url) URL.revokeObjectURL(f.url); });
    };
  }, []);

  // 模拟上传进度
  const simulateUpload = useCallback((fileType: string, fileId: string, file: File) => {
    const totalSize = file.size;
    let uploaded = 0;
    const chunkSize = totalSize / 20;
    
    const interval = setInterval(() => {
      uploaded += chunkSize;
      const progress = Math.min(Math.round((uploaded / totalSize) * 100), 100);
      
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: prev[fileType].map(f => f.id === fileId ? { ...f, progress } : f),
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
        const url = URL.createObjectURL(file);
        setUploadedFiles(prev => ({
          ...prev,
          [fileType]: prev[fileType].map(f => f.id === fileId ? { ...f, url } : f),
        }));
      }
    }, 80);
  }, []);

  // 处理封面图上传
  const handleCoverChange = (file: File | null) => {
    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreviewUrl(url);
    } else {
      setCoverPreviewUrl(null);
    }
    setForm({ ...form, cover: file });
  };

  // 添加文件（支持多选）
  const handleFilesAdd = (fileType: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const newEntries: UploadedFile[] = Array.from(files).map(file => ({
      id: genEnrollFileId(),
      file,
      progress: 0,
    }));
    
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: [...prev[fileType], ...newEntries],
    }));
    
    newEntries.forEach(entry => simulateUpload(fileType, entry.id, entry.file));
  };

  // 删除单个文件
  const handleFileDelete = (fileType: string, fileId: string) => {
    setUploadedFiles(prev => {
      const target = prev[fileType].find(f => f.id === fileId);
      if (target?.url) URL.revokeObjectURL(target.url);
      return {
        ...prev,
        [fileType]: prev[fileType].filter(f => f.id !== fileId),
      };
    });
  };

  // 打开文件预览
  const openFilePreview = (file: File, url: string) => {
    let type: FilePreview['type'] = 'pdf';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('video/')) type = 'video';
    else if (file.type.startsWith('audio/')) type = 'audio';
    setFilePreview({ url, name: file.name, type });
  };

  const handleSubmit = () => {
    if (!form.title) return;
    
    const allFiles = Object.values(uploadedFiles).flat();
    const formats = allFiles.map(f => f.file.name.split('.').pop()?.toUpperCase() || '');
    
    const enrollData = {
      id: `enroll-${Date.now()}`,
      eventTitle,
      title: form.title,
      authorBio: form.authorBio,
      description: form.description,
      submitDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      fileFormat: formats.length > 0 ? formats.join(', ') : '未知',
    };
    
    onSubmit(enrollData);
  };

  const isFormValid = form.title && form.authorBio && form.description;

  // 渲染多文件上传区域
  const renderFileUploadBox = (
    label: string,
    fileKey: string,
    accept: string,
    hint: string,
    Icon: typeof FileVideo
  ) => {
    const files = uploadedFiles[fileKey] || [];

    return (
      <div className="border-2 border-dashed border-stone-200 rounded-lg overflow-hidden hover:border-[#b11e22]/30 transition-colors">
        {/* 已上传文件列表 */}
        {files.length > 0 && (
          <div className="divide-y divide-stone-100">
            {files.map(uf => {
              const isUploaded = uf.progress === 100;
              const isUploading = uf.progress < 100;
              return (
                <div key={uf.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isUploaded ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {isUploaded ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-700 truncate">{uf.file.name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {(uf.file.size / 1024 / 1024).toFixed(2)} MB
                        {isUploaded && ' · 上传完成'}
                        {isUploading && ` · ${uf.progress}%`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {isUploaded && uf.url && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openFilePreview(uf.file, uf.url!);
                          }}
                          className="p-2 text-stone-400 hover:text-[#b11e22] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="预览"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileDelete(fileKey, uf.id);
                        }}
                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="删除"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {isUploading && (
                    <div className="mt-3 w-full bg-stone-100 rounded-full h-1.5">
                      <motion.div
                        className="bg-[#b11e22] h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uf.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* 添加文件按钮 */}
        <div className="relative">
          <input
            type="file"
            accept={accept}
            multiple
            onChange={(e) => {
              handleFilesAdd(fileKey, e.target.files);
              e.target.value = '';
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`p-4 flex items-center ${files.length > 0 ? 'border-t border-stone-100' : ''}`}>
            {files.length === 0 ? (
              <>
                <Upload className="w-5 h-5 text-stone-300 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-600">{label}</p>
                  <p className="text-xs text-stone-400">{hint}</p>
                </div>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0" />
                <p className="text-xs text-stone-400">继续添加{label}文件</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-[#fffdfa]"
    >
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#b11e22] to-[#921417]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">返回</span>
            </button>
            <div className="w-px h-6 bg-white/30" />
            <div>
              <h1 className="font-serif text-xl font-bold text-white">活动报名</h1>
              <p className="text-xs text-white/70 mt-1">{eventTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100/50 overflow-hidden">
          {/* Form Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 作品名称 */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">作品名称 *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="请输入作品名称"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22] transition-colors"
              />
            </div>

            {/* 封面图片 */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">封面图片</label>
              <div className="relative border-2 border-dashed border-stone-200 rounded-lg overflow-hidden hover:border-[#b11e22]/30 transition-colors">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCoverChange(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {coverPreviewUrl ? (
                  <div className="relative">
                    <div className="aspect-video max-h-64 overflow-hidden bg-stone-100">
                      <img 
                        src={coverPreviewUrl} 
                        alt="封面预览" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(coverPreviewUrl, '_blank');
                        }}
                        className="p-2 bg-white/90 hover:bg-white text-stone-600 hover:text-[#b11e22] rounded-lg shadow-sm transition-colors cursor-pointer"
                        title="查看大图"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCoverChange(null);
                        }}
                        className="p-2 bg-white/90 hover:bg-white text-stone-600 hover:text-red-500 rounded-lg shadow-sm transition-colors cursor-pointer"
                        title="删除封面"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="px-4 py-2 bg-stone-50 border-t border-stone-100">
                      <p className="text-xs text-stone-500 truncate">{form.cover?.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Upload className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                    <p className="text-sm text-stone-500">点击或拖拽封面图片到此处</p>
                    <p className="text-xs text-stone-400 mt-1">支持 .jpg / .png 格式</p>
                  </div>
                )}
              </div>
            </div>

            {/* 作者介绍 */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">作者介绍 *</label>
              <textarea
                value={form.authorBio}
                onChange={(e) => setForm({ ...form, authorBio: e.target.value })}
                placeholder="请简要介绍作者"
                rows={3}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22] resize-none transition-colors"
              />
            </div>

            {/* 作品介绍 */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">作品介绍 *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="请简要介绍您的作品"
                rows={3}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b11e22]/20 focus:border-[#b11e22] resize-none transition-colors"
              />
            </div>

            {/* 上传文件 */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-3">上传文件</label>
              <div className="space-y-3">
                {renderFileUploadBox('视频', 'videoFile', '.mp4,.mov', '支持 .mp4 / .mov 格式，点击选择文件', FileVideo)}
                {renderFileUploadBox('图片', 'imageFile', '.jpg,.jpeg,.png', '支持 .jpg / .png 格式，点击选择文件', FileImage)}
                {renderFileUploadBox('音频', 'audioFile', '.mp3,.wav', '支持 .mp3 / .wav 格式，点击选择文件', FileAudio)}
                {renderFileUploadBox('PDF', 'pdfFile', '.pdf', '支持 .pdf 格式，点击选择文件', File)}
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="px-6 sm:px-8 py-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-6 py-2.5 text-sm text-stone-600 hover:text-stone-800 border border-stone-200 rounded-lg hover:bg-white transition-colors cursor-pointer"
            >
              返回活动中心
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  // 存为草稿逻辑
                  const draftData = { form, uploadedFiles };
                  localStorage.setItem('enrollment_draft', JSON.stringify(draftData));
                  alert('草稿已保存');
                }}
                className="px-6 py-2.5 text-sm font-medium text-[#b11e22] border border-[#b11e22] rounded-lg hover:bg-[#b11e22] hover:text-white transition-colors cursor-pointer flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>存为草稿</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-8 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center space-x-2 ${
                  isFormValid
                    ? 'bg-[#b11e22] text-white hover:bg-[#921417]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>提交报名</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 文件预览弹窗 */}
      <AnimatePresence>
        {filePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setFilePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                <h3 className="text-base font-medium text-stone-800 truncate">{filePreview.name}</h3>
                <button
                  onClick={() => setFilePreview(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                {filePreview.type === 'image' && (
                  <img src={filePreview.url} alt={filePreview.name} className="max-w-full mx-auto rounded-lg" />
                )}
                {filePreview.type === 'video' && (
                  <video src={filePreview.url} controls className="max-w-full mx-auto rounded-lg">
                    您的浏览器不支持视频播放
                  </video>
                )}
                {filePreview.type === 'audio' && (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <FileAudio className="w-16 h-16 text-[#b11e22]" />
                    <audio src={filePreview.url} controls className="w-full max-w-md">
                      您的浏览器不支持音频播放
                    </audio>
                  </div>
                )}
                {filePreview.type === 'pdf' && (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <File className="w-16 h-16 text-[#b11e22]" />
                    <p className="text-sm text-stone-500">PDF 文件预览</p>
                    <a
                      href={filePreview.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#b11e22] text-white text-sm rounded-lg hover:bg-[#921417] transition-colors"
                    >
                      在新窗口打开
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
