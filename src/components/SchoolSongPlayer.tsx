import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  BookOpen,
  X,
  Sparkles,
  ChevronDown,
  Volume,
  Video
} from 'lucide-react';

interface LyricLine {
  time: number;
  text: string;
}

const SONG_LYRICS: LyricLine[] = [
  // 前奏 (0-8秒)
  { time: 8, text: "我是桥，我从画板来" },
  { time: 14, text: "扁担长，板凳宽，我是大扁担" },
  { time: 20, text: "我是桥，我向云端开" },
  { time: 26, text: "跨江河，越山海，天堑变通途" },
  
  // 间奏 (32-38秒)
  { time: 38, text: "我是路，我在高原在" },
  { time: 44, text: "朝发夕至，一步跨千年" },
  { time: 50, text: "我是梦，我在新时代" },
  { time: 56, text: "云岭深处，匠心筑未来" },
  
  // 间奏 (62-68秒)
  { time: 68, text: "顶天立地，是我的气概" },
  { time: 74, text: "开天辟地，是我的情怀" },
  { time: 80, text: "经天纬地，是我的风采" },
  { time: 86, text: "改天换地，是我的豪迈" },
  
  // 桥段 (92秒开始)
  { time: 92, text: "缩短距离的路，连接万物的道" },
  { time: 98, text: "钢筋写山河，热血铸荣耀" },
  { time: 104, text: "融通天下，通达四海" },
  { time: 110, text: "云交院人，永远在路上" },
  
  // 结尾 (116秒)
  { time: 116, text: "我是桥，向未来盛开！" },
  { time: 125, text: "" }, // 歌曲结束
];

// 校歌音频文件路径
const DEFAULT_AUDIO_URL = '/meiyu/school-song.mp3';
// 校歌 MV 视频 URL（可替换为实际视频文件）
const DEFAULT_MV_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';

interface SchoolSongPlayerProps {
  onClose: () => void;
}

export default function SchoolSongPlayer({ onClose }: SchoolSongPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [showMVModal, setShowMVModal] = useState(false);
  const [activeLyric, setActiveLyric] = useState("云南交通职业技术学院校歌《我是桥》");
  const [loadError, setLoadError] = useState(false);

  // Sync state with HTML5 Audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Update synched scrolling lyrics in real-time
      const active = [...SONG_LYRICS]
        .reverse()
        .find(line => audio.currentTime >= line.time);
      if (active) {
        setActiveLyric(active.text);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleError = () => {
      console.warn("Audio load error - using mock play timer fallback");
      setLoadError(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle local simulated state if actual remote stream cannot load
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loadError && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const nextTime = prev + 1;
          if (nextTime >= 100) {
            setIsPlaying(false);
            return 0;
          }
          // Update simulated lyrics
          const active = [...SONG_LYRICS]
            .reverse()
            .find(line => nextTime >= line.time);
          if (active) {
            setActiveLyric(active.text);
          }
          return nextTime;
        });
        if (duration === 0) setDuration(100);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loadError, isPlaying, duration]);

  // Volume operations
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => {
        console.warn("Autoplay or stream play prevented, running fallback visual play state.", err);
        // Force state to true even if direct audio playback isn't supported immediately in sandbox iframe
        setIsPlaying(true);
      });
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#fdfaf5] border-b border-[#e9dfcc] text-stone-800 shadow-sm relative z-50 transition-all duration-300">
      {/* Hidden standard Audio Tag */}
      <audio
        ref={audioRef}
        src={DEFAULT_AUDIO_URL}
        preload="auto"
        loop
      />

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 min-h-[52px]">
        
        {/* Left Section: Song Title & Spinning Disc / Animated Equalizer */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              {/* Spinning CD/Disc Frame */}
              <div className={`w-9 h-9 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-950 flex items-center justify-center border border-amber-300 shadow-md ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
                <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center border border-stone-800">
                  <div className="w-1 h-1 rounded-full bg-[#b11e22]" />
                </div>
              </div>
              
              {/* Pulsing Music Note Badge */}
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#b11e22] text-white rounded-full flex items-center justify-center text-[8px] animate-ping">
                  <Music className="w-2 h-2" />
                </div>
              )}
            </div>

            <div className="text-left">
              <span className="flex items-center space-x-1.5 text-xs text-[#b11e22] font-semibold tracking-wider font-serif">
                <Music className="w-3 h-3 animate-pulse" />
                <span>云南交通职业技术学院校歌《我是桥》</span>
              </span>
              <p className="text-[10px] text-stone-500 font-sans tracking-wide">
                作词：云交院师生集体创作 · 作曲：云交院音乐艺术工坊（合唱版）
              </p>
            </div>
          </div>

          {/* Equalizer animation bars */}
          <div className="flex items-end space-x-[2px] h-4.5 w-6 pb-0.5 px-1">
            <motion.div
              animate={{ height: isPlaying ? [4, 14, 4] : 4 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              className="w-[3px] bg-[#b11e22] rounded-t-sm"
            />
            <motion.div
              animate={{ height: isPlaying ? [6, 18, 6] : 5 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.15 }}
              className="w-[3px] bg-[#d9ab6a] rounded-t-sm"
            />
            <motion.div
              animate={{ height: isPlaying ? [8, 12, 8] : 3 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut", delay: 0.3 }}
              className="w-[3px] bg-[#b11e22] rounded-t-sm"
            />
            <motion.div
              animate={{ height: isPlaying ? [4, 16, 4] : 4 }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.05 }}
              className="w-[3px] bg-[#d9ab6a] rounded-t-sm"
            />
          </div>
        </div>

        {/* Center Section: Dynamic Synced Lyrics Bar & Audio Timeline Controls */}
        <div className="flex-1 flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full px-2 max-w-2xl">
          {/* Timeline and timeline seek */}
          <div className="flex items-center space-x-2 w-full md:w-3/5 text-[11px] text-stone-600 font-mono">
            {/* Play/Pause control inside timeline bar */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePlayToggle}
              className="w-7 h-7 rounded-full bg-[#b11e22] hover:bg-[#911619] text-white flex items-center justify-center flex-shrink-0 shadow-md focus:outline-none focus:ring-1 focus:ring-amber-400"
              title={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-[1px]" />}
            </motion.button>

            <span>{formatTime(currentTime)}</span>
            
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-[#ebd9c1] rounded-lg appearance-none cursor-pointer accent-[#b11e22] outline-none transition-all focus:ring-1 focus:ring-[#d9ab6a]"
              style={{
                background: `linear-gradient(to right, #b11e22 0%, #b11e22 ${(duration ? (currentTime / duration) * 100 : 0)}%, #ebd9c1 ${(duration ? (currentTime / duration) * 100 : 0)}%, #ebd9c1 100%)`
              }}
            />

            <span>{formatTime(duration)}</span>
          </div>

          {/* Active Lyric Display (Elegant animated typography) */}
          <div className="w-full md:w-2/5 flex items-center justify-center md:justify-start bg-amber-50/50 border border-amber-200/40 rounded px-2.5 py-1 min-h-[26px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeLyric}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-serif font-medium text-[#b11e22] text-center md:text-left tracking-wide truncate max-w-full"
              >
                {activeLyric}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section: Lyrics Sheet, Volume controller, Close */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          {/* View lyrics list */}
          <button
            onClick={() => setShowLyricsModal(true)}
            className="flex items-center space-x-1 text-xs py-1 px-2.5 rounded bg-[#f5efe4] hover:bg-[#e9dfcc] text-stone-700 hover:text-stone-900 border border-[#ebd9c1] transition-all font-serif"
            title="歌词全文与校歌背景"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>赏歌词</span>
          </button>

          {/* MV button */}
          <button
            onClick={() => setShowMVModal(true)}
            className="flex items-center space-x-1 text-xs py-1 px-2.5 rounded bg-[#b11e22] hover:bg-[#911619] text-white border border-[#b11e22] transition-all font-serif"
            title="观看校歌MV"
          >
            <Video className="w-3.5 h-3.5" />
            <span>MV</span>
          </button>

          {/* Mini Volume slider control */}
          <div className="flex items-center space-x-1 flex-shrink-0 group relative">
            <button
              onClick={handleMuteToggle}
              className="p-1.5 hover:bg-[#ebd9c1]/40 rounded text-stone-600 hover:text-stone-800 transition-colors"
              title={isMuted ? "取消静音" : "静音"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : volume < 0.3 ? <Volume className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-14 h-1 bg-[#ebd9c1] rounded appearance-none cursor-pointer accent-[#b11e22] outline-none group-hover:w-20 transition-all duration-300"
            />
          </div>

          <span className="h-4 w-[1px] bg-stone-300 hidden md:inline-block" />

          {/* Close Banner button */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-[# fee2e2]/40 text-stone-400 hover:text-stone-700 rounded transition-colors focus:outline-none"
            title="关闭播放器"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Detailed Lyrics and Background Modal Popup Container */}
      <AnimatePresence>
        {showLyricsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-lg bg-[#fffdfa] rounded-xl shadow-2xl overflow-hidden border border-amber-200"
            >
              {/* Header */}
              <div className="bg-[#b11e22] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#ebd9c1]">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-amber-200" />
                  <span className="font-serif text-base font-semibold tracking-wider">云南交通职业技术学院校歌《我是桥》</span>
                </div>
                <button
                  onClick={() => setShowLyricsModal(false)}
                  className="p-1 hover:bg-[#911619] rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable scroll area */}
              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-stone-800 font-sans leading-relaxed text-sm">
                
                {/* Visual quote */}
                <div className="bg-[#fcf5e9] border border-dashed border-[#d9ab6a]/40 p-4 rounded-lg text-center font-serif text-stone-700 italic">
                  云南交通职业技术学院校歌《我是桥》，歌词意蕴深远，以"桥""路""梦"为意象，表达了云交院学子顶天立地、开天辟地的豪迈情怀，以及匠心筑梦、融通天下的使命担当。
                </div>

                {/* Lyrics with timings */}
                <div className="text-center space-y-2.5 py-4">
                  <h4 className="font-bold text-[#b11e22] text-sm tracking-widest uppercase mb-4">校歌诗文 ─ 同步歌词</h4>
                  {SONG_LYRICS.map((line, idx) => {
                    const isLineActive = activeLyric === line.text;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (audioRef.current && !loadError) {
                            audioRef.current.currentTime = line.time;
                            setCurrentTime(line.time);
                          } else if (loadError) {
                            setCurrentTime(line.time);
                          }
                        }}
                        className={`py-1 cursor-pointer rounded transition-all duration-300 ${
                          isLineActive
                            ? 'text-[#b11e22] font-serif font-bold scale-105 bg-amber-50 px-2'
                            : 'text-stone-600 hover:text-[#b11e22]'
                        }`}
                      >
                        {line.text}
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[#f0e6d2] pt-4.5 space-y-2">
                  <h4 className="font-bold text-[#b11e22] text-xs tracking-wider flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-amber-500" />
                    我是桥 精神内涵与豪迈
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed text-justify">
                    云南交通职业技术学院（云交院）校歌《我是桥》，以"我是桥""我是路""我是梦"层层递进，展现了云交院人从画板出发、向云端开拓的奋进姿态。歌词中"顶天立地""开天辟地""经天纬地""改天换地"四大气概，彰显了交通人融通天下、通达四海的壮志豪情，以及永远在路上的坚定信念。
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#fbf7ee] px-5 py-3 border-t border-amber-100 flex justify-end">
                <button
                  onClick={() => setShowLyricsModal(false)}
                  className="px-4 py-1.5 rounded-md bg-[#b11e22] hover:bg-[#911619] text-white text-xs font-medium font-serif tracking-wider shadow transition-colors"
                >
                  赏毕关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MV Video Modal */}
      <AnimatePresence>
        {showMVModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowMVModal(false)}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-black border border-amber-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#b11e22] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#ebd9c1]">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-amber-200" />
                  <span className="font-serif text-base font-semibold tracking-wider">云南交通职业技术学院校歌《我是桥》· MV</span>
                </div>
                <button
                  onClick={() => setShowMVModal(false)}
                  className="p-1.5 hover:bg-[#911619] rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video player */}
              <div className="relative bg-black aspect-video">
                <video
                  src={DEFAULT_MV_URL}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  您的浏览器不支持视频播放。
                </video>
              </div>

              {/* Footer */}
              <div className="bg-[#fbf7ee] px-5 py-3 border-t border-amber-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-serif tracking-wider">点击空白处可关闭 MV 播放窗口</span>
                <button
                  onClick={() => setShowMVModal(false)}
                  className="px-4 py-1.5 rounded-md bg-[#b11e22] hover:bg-[#911619] text-white text-xs font-medium font-serif tracking-wider shadow transition-colors"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
