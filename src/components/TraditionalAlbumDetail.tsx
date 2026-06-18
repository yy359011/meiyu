/**
 * 传统美育 - 音乐专辑详情页
 * 布局与听戏曲详情页一致：左侧唱片播放器+简介，右侧曲目列表
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Home,
  ChevronLeft,
  Play,
  Pause,
  Eye,
  Calendar,
  Clock,
  ThumbsUp,
  Bookmark,
  Volume2,
} from 'lucide-react';

interface AlbumSong {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
}

interface TraditionalAlbumDetailProps {
  album: {
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    description?: string;
    songs: AlbumSong[];
  };
  onBack: () => void;
  onNavigateHome: () => void;
  onPlaySong: (title: string, songId: string) => void;
}

export default function TraditionalAlbumDetail({ album, onBack, onNavigateHome, onPlaySong }: TraditionalAlbumDetailProps) {
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [likes, setLikes] = useState(328);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const currentSong = album.songs.find(s => s.id === currentSongId);

  // Compute total duration
  const totalDuration = album.songs.reduce((sum, song) => {
    const parts = song.duration.split(':');
    return sum + parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }, 0);
  const totalMins = Math.floor(totalDuration / 60);
  const totalSecs = totalDuration % 60;

  // Vinyl rotation animation
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const animate = () => {
        setRotation(prev => (prev + 0.5) % 360);
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleSongClick = (song: AlbumSong) => {
    setCurrentSongId(song.id);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!currentSongId && album.songs.length > 0) {
      setCurrentSongId(album.songs[0].id);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-stone-800 pb-20">

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
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
              <span className="text-[#b11e22] font-medium truncate max-w-[200px]">
                {album.title}
              </span>
            </div>
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 text-stone-500 hover:text-[#b11e22] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">返回资源库</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Vinyl Record Player + Info */}
          <div className="lg:col-span-8 space-y-6">

            {/* Vinyl Record Player Stage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl"
            >
              <img
                src={album.coverUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-40"
                referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-3 border border-amber-500/10 rounded-sm pointer-events-none" />

                {/* Vinyl Disc */}
                <div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 transition-transform duration-500 flex items-center justify-center"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div
                    className="absolute inset-0 rounded-full shadow-lg"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                        radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                        radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                        radial-gradient(circle, transparent 65%, #222522 66%, #222522 68%, transparent 69%),
                        radial-gradient(circle, transparent 75%, #0d0f0d 76%, #0d0f0d 78%, transparent 79%),
                        radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                      `,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.65), inset 0 0 15px rgba(255,255,255,0.06), inset 0 0 35px rgba(0,0,0,0.95)',
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 mix-blend-overlay" />
                  </div>

                  <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-stone-950 overflow-hidden shadow-inner flex items-center justify-center bg-stone-900">
                    <img
                      src={album.coverUrl}
                      alt={album.title}
                      className="w-[105%] h-[105%] object-cover"
                      referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                    />
                    <div className="absolute w-3 h-3 rounded-full bg-[#fcf5e9] border border-zinc-800 shadow-inner" />
                  </div>
                </div>

                {/* Tonearm */}
                <div
                  className="absolute top-4 right-6 sm:right-8 w-14 h-20 origin-top transition-transform duration-700 pointer-events-none z-10"
                  style={{ transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)' }}
                >
                  <svg viewBox="0 0 40 60" className="w-full h-full text-amber-200" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="25" cy="10" r="3.5" fill="currentColor" />
                    <path d="M25,10 L16,34 L12,48" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="9" y="46" width="6" height="8" rx="1" fill="currentColor" />
                  </svg>
                </div>

                {/* Play/Pause button - centered on vinyl */}
                <button
                  onClick={handlePlayPause}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#b11e22]/90 hover:bg-[#b11e22] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer z-20"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Description & Metadata Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#fffdf6] border border-amber-200/50 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-wide leading-snug">
                {album.title}
              </h1>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-6 mt-4 pb-5 border-b border-stone-200/60 text-xs sm:text-sm text-stone-500 font-sans">
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-stone-400" />
                  <span>{album.views}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span>发布时间: {album.pubDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>时长: {totalMins}分{totalSecs.toString().padStart(2, '0')}秒</span>
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
                    <span>点赞 ({likes})</span>
                  </button>
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`flex items-center space-x-1.5 text-xs font-semibold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                      isFavorited
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                    <span>{isFavorited ? '已收藏' : '收藏'}</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-4 bg-[#b11e22] rounded-sm" />
                  <h3 className="font-serif text-base font-bold text-[#b11e22] tracking-wider">
                    简介
                  </h3>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm tracking-wide leading-relaxed text-justify">
                  {album.description || '本专辑收录了精选的传统音乐作品，由国内知名乐师录制。专辑涵盖多种传统乐器演奏，为美育学习提供高质量的听觉素材。'}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 mt-8 pt-4 border-t border-stone-100">
                {['中国民族音乐', '古典音乐', '国风音乐', '轻音乐'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-amber-50/50 border border-amber-200/40 hover:border-amber-300 text-stone-600 hover:text-[#b11e22] text-[11px] font-sans font-medium tracking-wide transition-all shadow-2xs select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Song List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 bg-white rounded-xl border border-amber-100/60 p-5 shadow-xs"
          >
            <div className="flex justify-between items-baseline border-b border-stone-100 pb-3 mb-4">
              <h2 className="font-serif text-base sm:text-lg font-bold text-stone-850 tracking-wide flex items-center space-x-2">
                <span className="w-1 h-3.5 bg-[#b11e22]" />
                <span>曲目列表</span>
              </h2>
              <span className="text-xs text-stone-400 font-sans">
                共 {album.songs.length} 首
              </span>
            </div>

            <div className="space-y-3">
              {album.songs.map((song, index) => {
                const isActive = song.id === currentSongId;
                return (
                  <div
                    key={song.id}
                    onClick={() => handleSongClick(song)}
                    className={`p-2.5 rounded-lg border flex items-start space-x-3.5 transition-all duration-300 cursor-pointer group ${
                      isActive
                        ? 'border-amber-300 bg-[#fdfbf6] shadow-xs'
                        : 'border-transparent hover:border-amber-200/50 hover:bg-[#fffdf8]'
                    }`}
                  >
                    {/* Mini vinyl record */}
                    <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-lg overflow-hidden bg-stone-900">
                        <img
                          src={album.coverUrl}
                          alt=""
                          className="w-full h-full object-cover scale-125 blur-md opacity-40"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </div>
                      <div
                        className={`relative w-16 h-16 ${isActive && isPlaying ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '4s' }}
                      >
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle, transparent 35%, #181c18 36%, #181c18 38%, transparent 39%),
                              radial-gradient(circle, transparent 45%, #222522 46%, #222522 48%, transparent 49%),
                              radial-gradient(circle, transparent 55%, #171a17 56%, #171a17 58%, transparent 59%),
                              radial-gradient(circle, #0c0d0c 0%, #1a1b1a 100%)
                            `,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                          }}
                        />
                        <div className="absolute w-6 h-6 rounded-full overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-stone-900">
                          <img
                            src={album.coverUrl}
                            alt={song.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          />
                        </div>
                      </div>
                      {isActive && isPlaying ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-7 h-7 rounded-full bg-[#b11e22] text-white flex items-center justify-center animate-pulse shadow">
                            <Volume2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ) : (
                        <div className={`absolute inset-0 flex items-center justify-center z-10 ${isActive ? '' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                          <div className="w-7 h-7 rounded-full bg-[#b11e22]/90 text-white flex items-center justify-center shadow">
                            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      )}
                      {isActive && (
                        <span className="absolute -top-1 -left-1 px-1.5 py-0.5 bg-[#b11e22] rounded text-[7px] font-bold text-white z-10">
                          {isPlaying ? '播放中' : '当前'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-auto space-y-1.5 py-0.5">
                      <p className={`font-serif text-xs font-bold tracking-wide leading-snug line-clamp-2 transition-colors ${
                        isActive ? 'text-[#b11e22]' : 'text-stone-900 group-hover:text-[#b11e22]'
                      }`}>
                        {index + 1}. {song.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-stone-400 font-sans tracking-wide">
                          {song.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tip */}
            <div className="mt-5 text-xs text-stone-500 text-center font-sans">
              <span className="text-[#b11e22]">💡</span> 点击任意曲目即可播放
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
