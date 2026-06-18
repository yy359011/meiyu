import { useState, useEffect, useRef, useMemo, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Music,
  List,
  Sparkles,
  Volume,
  Heart,
  Disc,
  Disc3,
  Calendar,
  Headphones
} from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  category: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: string;
  intro: string;
  lyrics: string[];
}

const TRADITIONAL_PLAYLIST: AudioTrack[] = [
  {
    id: 'track-1',
    title: '古琴《高山流水》大师独奏版',
    category: '古琴雅乐',
    artist: '虞山吴派 传人独奏',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '06:12',
    intro: '《高山流水》为中国十大古琴名曲之一。传说伯牙鼓琴，钟子期听之，方鼓琴而志在太山，子期曰：“善哉乎鼓琴，巍巍乎若太山。”志在流水，子期曰：“洋洋乎若流水。”',
    lyrics: [
      '【古琴吟】 琴意悠远 志在高山',
      '太山巍巍 郁郁葱葱',
      '巍巍乎 志在崇山峻岭之中',
      '琴弦拨弄 幽谷回音 溪流潺潺',
      '洋洋乎 意在万里江河奔腾之流',
      '山水相逢 知音难觅 终归一尘',
      '伯牙摔琴 酬谢子期 绝弦不复叩响'
    ]
  },
  {
    id: 'track-2',
    title: '二胡《空山鸟语》林海大师典藏',
    category: '二胡国乐',
    artist: '中央民族乐团 首席演奏',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '04:35',
    intro: '《空山鸟语》是二胡名家刘天华创作的经典独奏曲。乐曲以拟声手法，形象地描绘了深山幽谷中百鸟争鸣、生机盎然的优美意境。',
    lyrics: [
      '【引子】 幽谷破晓 晓雾初开',
      '第一弦：空山寂寂 宿鸟惊醒',
      '第二弦：晨曦泼洒 露水滑落',
      '双弦齐鸣：百鸟争喧 引颈和鸣',
      '山风掠过 林木簌簌 琴声激越',
      '极目远眺 孤鹜落霞 共长天一色',
      '余音缥缈 归于空灵 禅意无限'
    ]
  },
  {
    id: 'track-3',
    title: '琵琶《十面埋伏》经典大奏鸣',
    category: '琵琶武乐',
    artist: '浦东派 经典合音',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '05:48',
    intro: '《十面埋伏》是一首著名的大型琵琶独奏武曲，展现波澜壮阔的楚汉相争垓下决战。琴音如金鼓震动，铁骑纵横，气势极其磅礴悲壮。',
    lyrics: [
      '【第一段：列营】 擂鼓三通 军纪森严',
      '【第二段：吹号】 笳角齐鸣 铁甲生寒',
      '【第三段：排阵】 战马嘶鸣 旌旗蔽空',
      '【第四段：走队】 奇兵出击 肃杀之气',
      '【第五段：合战】 垓下对垒 铁骑交锋 刀枪震天',
      '【第六段：项王败】 悲歌气尽 乌江自刎',
      '【结局】 旌旗落 硝烟散 历史滚滚洪流'
    ]
  },
  {
    id: 'track-4',
    title: '昆曲《牡丹亭·游园》春香闹学精选',
    category: '百戏之祖',
    artist: '江苏省昆剧院 典雅重印',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: '03:52',
    intro: '昆曲被称为“百戏之祖”。《牡丹亭》是明代戏曲家汤显祖的代表作，此曲《游园【步步娇】》唱腔优美典雅，辞藻清丽，诉尽江南闺阁春愁。',
    lyrics: [
      '【步步娇】袅晴丝吹来闲庭院',
      '摇漾春如线',
      '停半晌整花钿',
      '没揣里度流莺看着花眼',
      '【醉扶归】好逞妆娟',
      '一自著春衫 描粉线',
      '则问俺这妆样儿 可便称身姿？'
    ]
  },
  {
    id: 'track-5',
    title: '豫剧《女起解》董西园·上选曲',
    category: '中原声腔',
    artist: '河南豫剧院 名家特录',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: '04:10',
    intro: '豫剧发源于河南，具有高亢激昂、情感充沛的特点。这首唱段韵味浓郁，跌宕起伏，生动展现了古典戏曲中的人物性格和悲恻胸怀。',
    lyrics: [
      '苏三离了洪洞县',
      '将身来在大街前',
      '未曾开言心好惨',
      '过往的君子听我言：',
      '谁人帮我传书信',
      '就说苏三落难大牢监',
      '爹娘啊！何时能得见！'
    ]
  }
];

interface AudioPlayerModalProps {
  initialTitle?: string;
  onClose: () => void;
}

export default function AudioPlayerModal({ initialTitle, onClose }: AudioPlayerModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Find track that matches the selected item's title, otherwise default to first track
  const initialTrackIndex = useMemo(() => {
    if (!initialTitle) return 0;
    const idx = TRADITIONAL_PLAYLIST.findIndex(t => 
      t.title.includes(initialTitle) || initialTitle.includes(t.title) ||
      t.title.slice(4, 8) === initialTitle.slice(4, 8)
    );
    return idx !== -1 ? idx : 0;
  }, [initialTitle]);

  const [currentTrackIdx, setCurrentTrackIdx] = useState(initialTrackIndex);
  const track = TRADITIONAL_PLAYLIST[currentTrackIdx];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1); // avoid division by 0
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Ref for simulated string vibrations in equalizer canvas
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto load and play selected track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.audioUrl;
    audio.load();
    
    // Auto-play when switched
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Play state prevented (safari/chrome interactions restriction)
          setIsPlaying(false);
        });
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTrackIdx, track.audioUrl]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle escape clean closes
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handlePlayToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setIsPlaying(true); // force visual support
      });
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const to = parseFloat(e.target.value);
    setCurrentTime(to);
    if (audioRef.current) {
      audioRef.current.currentTime = to;
    }
  };

  const handlePrev = () => {
    setCurrentTrackIdx(prev => (prev - 1 + TRADITIONAL_PLAYLIST.length) % TRADITIONAL_PLAYLIST.length);
  };

  const handleNext = () => {
    setCurrentTrackIdx(prev => (prev + 1) % TRADITIONAL_PLAYLIST.length);
  };

  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return '00:00';
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Synchronized lyric finder based on elapsed time percentage
  const activeLyric = useMemo(() => {
    const ratio = currentTime / duration;
    const index = Math.min(
      Math.floor(ratio * track.lyrics.length),
      track.lyrics.length - 1
    );
    return track.lyrics[index] || track.lyrics[0];
  }, [currentTime, duration, track.lyrics]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6" id="audio-terminal-root" ref={containerRef}>
      
      {/* Background shadow overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-stone-950/90 backdrop-blur-md"
        onClick={onClose}
      />

      <audio ref={audioRef} loop />

      {/* Retro classical style wood-framed player terminal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 25 }}
        transition={{ type: 'spring', duration: 0.45 }}
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#fbf8f0] to-[#f4ecd8] rounded-2xl shadow-2xl overflow-hidden border border-[#e2d5ba] z-10 flex flex-col md:flex-row h-auto md:h-[500px]"
      >
        
        {/* Left column: Vinyl disc, Visualizer and Annotations (Pillar 1) */}
        <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#e9dfcc]/60 relative select-none">
          
          {/* Header row in widget */}
          <div className="w-full flex justify-between items-center z-10">
            <span className="flex items-center space-x-1.5 text-xs text-[#b11e22] font-serif font-semibold tracking-wider bg-[#fbf5e4] px-2.5 py-1 rounded border border-[#ebd9c1]">
              <Headphones className="w-3.5 h-3.5 animate-pulse" />
              <span>{track.category}</span>
            </span>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-1.5 rounded-full bg-white/60 hover:bg-white text-stone-600 hover:text-[#b11e22] shadow-xs active:scale-90 transition-all cursor-pointer"
              title="收藏此名曲"
            >
              <Heart className={`w-4.5 h-4.5 transition-colors ${isLiked ? 'fill-[#b11e22] text-[#b11e22]' : ''}`} />
            </button>
          </div>

          {/* Central Disk spinning frame */}
          <div className="relative my-6 flex items-center justify-center">
            {/* Spinning disc rim */}
            <div className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#1c1917] flex items-center justify-center border-4 border-[#ebd9c1] shadow-xl ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '12s' }}>
              
              {/* Concentric sound lines of CD */}
              <div className="w-[85%] h-[85%] rounded-full border border-dashed border-stone-800 flex items-center justify-center">
                <div className="w-[70%] h-[70%] rounded-full border border-stone-700 flex items-center justify-center relative overflow-hidden">
                  
                  {/* Miniature album art image */}
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-stone-900/10" />

                </div>
              </div>

              {/* Central Jade Ring Core */}
              <div className="absolute w-12 h-12 rounded-full bg-[#fdfdfc] border-2 border-[#d9ab6a] flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 rounded-full bg-[#b11e22]" />
              </div>
            </div>

            {/* Classical phonograph arm handle */}
            <motion.div
              animate={{ rotate: isPlaying ? 18 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-4 right-4 w-12 h-26 origin-top-left pointer-events-none transform -rotate-12 hidden sm:block"
            >
              {/* Phono needle arm wire mockup bar */}
              <div className="w-1.5 h-20 bg-stone-500 rounded-full relative shadow-md">
                <div className="absolute bottom-0 -left-1.5 w-4 h-4 rounded bg-[#d9ab6a] border border-stone-600 shadow-sm" />
              </div>
            </motion.div>
          </div>

          {/* Dynamic Traditional Wave/Ripples under the disc */}
          <div className="w-full flex flex-col items-center space-y-2 z-10 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeLyric}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-sm font-serif font-bold text-[#b11e22] tracking-wide h-6 max-w-xs md:max-w-md truncate"
              >
                {activeLyric}
              </motion.p>
            </AnimatePresence>
            <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
              交大知音国乐学堂 · 杜比立体环绕
            </p>
          </div>

        </div>

        {/* Right column: Playlist, Historical origin lore & Custom Play Controls (Pillar 2) */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between space-y-6">
          
          {/* Header row to quit */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-850 truncate max-w-[280px]">
                {track.title}
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                演奏者: <span className="font-medium text-[#b11e22]">{track.artist}</span>
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors focus:outline-none cursor-pointer"
              title="退出听音阁"
              id="audio-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrolling lore tabs or playlist view */}
          <div className="flex-1 border border-[#ebd9c1]/60 bg-amber-50/20 rounded-xl p-4.5 overflow-y-auto max-h-[180px] md:max-h-full space-y-4">
            
            {showPlaylist ? (
              // Playlist View
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#ebd9c1]">
                  <span className="font-serif text-xs font-bold text-[#b11e22]">推荐雅乐典藏目录</span>
                  <span className="text-[10px] text-stone-400 font-mono">共 {TRADITIONAL_PLAYLIST.length} 首</span>
                </div>
                {TRADITIONAL_PLAYLIST.map((t, idx) => {
                  const isActive = currentTrackIdx === idx;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setCurrentTrackIdx(idx);
                        setShowPlaylist(false);
                      }}
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#b11e22]/5 border-[#b11e22]/30 text-[#b11e22] font-semibold'
                          : 'bg-[#fffcf7] border-[#e9dfcc]/50 hover:bg-[#b11e22]/5 hover:border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Music className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#b11e22]' : 'text-stone-400'}`} />
                        <span className="text-xs truncate">{t.title}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono flex-shrink-0 ml-2">
                        {t.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Lore Origin view
              <div className="space-y-3 font-sans text-xs sm:text-sm leading-relaxed text-stone-700">
                <div className="flex items-center space-x-1 font-serif text-[#b11e22] font-bold text-xs border-b border-[#ebd9c1]/60 pb-1">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>国乐典故 & 美学解析</span>
                </div>
                <p className="text-stone-600 text-xs italic leading-loose text-justify">
                  {track.intro}
                </p>
                <div className="bg-[#fdfaf2] p-3 rounded border border-[#ebd9c1]/40 space-y-2">
                  <span className="text-[11px] font-serif font-bold text-[#b11e22] block">同步简易诗意唱词：</span>
                  <div className="h-20 overflow-y-auto space-y-1 text-center scrollbar-none font-serif text-stone-500 text-xs py-1">
                    {track.lyrics.map((lyr, index) => {
                      const isCurrent = activeLyric === lyr;
                      return (
                        <p
                          key={index}
                          className={`min-h-5 py-0.5 rounded transition-all duration-300 ${
                            isCurrent 
                              ? 'text-[#b11e22] font-serif font-semibold scale-105 bg-[#ebd9c1]/30' 
                              : ''
                          }`}
                        >
                          {lyr}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls console block */}
          <div className="space-y-4 pt-1">
            
            {/* Timeline progress bar */}
            <div className="flex items-center space-x-2 text-[10px] text-stone-500 font-mono">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-[#ebd9c1] rounded appearance-none cursor-pointer accent-[#b11e22] focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #b11e22 0%, #b11e22 ${(currentTime / duration) * 100}%, #ebd9c1 ${(currentTime / duration) * 100}%, #ebd9c1 100%)`
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>

            {/* Core Play deck row */}
            <div className="flex items-center justify-between">
              
              {/* Show/Hide playlist toggle */}
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  showPlaylist
                    ? 'bg-[#b11e22] border-[#b11e22] text-white'
                    : 'bg-[#fbf5e4] border-[#ebd9c1] hover:bg-[#e9dfcc] text-stone-700'
                }`}
                title="查看雅乐播放列表"
              >
                <List className="w-4 h-4" />
              </button>

              {/* Prev / Play / Next console deck */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-white/60 hover:bg-white rounded-full text-stone-700 hover:text-[#b11e22] border border-stone-200 shadow-xs transition-colors hover:scale-105 active:scale-95 cursor-pointer"
                  title="上一曲"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePlayToggle}
                  className="w-12 h-12 rounded-full bg-[#b11e22] hover:bg-[#911619] text-white flex items-center justify-center shadow-lg transform hover:scale-110 duration-200 transition-all focus:outline-none ring-2 ring-amber-300 ring-offset-1 cursor-pointer"
                  title={isPlaying ? "暂停" : "播放"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current translate-x-[1.5px]" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 bg-white/60 hover:bg-white rounded-full text-stone-700 hover:text-[#b11e22] border border-stone-200 shadow-xs transition-colors hover:scale-105 active:scale-95 cursor-pointer"
                  title="下一曲"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Mute and volume slider controller */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-amber-50/50 hover:bg-amber-100/60 border border-stone-200 text-[#b11e22] cursor-pointer"
                  title={isMuted ? "取消静音" : "静音"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                  className="w-14 h-1 bg-[#ebd9c1] rounded appearance-none cursor-pointer accent-[#b11e22] outline-none"
                />
              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
