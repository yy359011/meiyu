/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Monitor } from 'lucide-react';

interface VideoModalProps {
  title: string;
  videoUrl: string;
  onClose: () => void;
}

export default function VideoModal({ title, videoUrl, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Handle Esc key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Safe Fallback if the raw video fails
  const videoSrc = videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4';

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6" id="video-theater-root">
      {/* Dark blur backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-stone-950/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main video theater container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-4xl bg-stone-900 rounded-xl overflow-hidden shadow-2xl border border-stone-800 z-10 flex flex-col justify-between"
      >
        {/* Banner Top Bar */}
        <div className="bg-stone-950/80 px-4 sm:px-6 py-4 border-b border-stone-800 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#b11e22] animate-pulse" />
            <h3 className="font-serif text-sm sm:text-base font-bold tracking-wide text-[#fef3c7]">
              公共美育艺术讲堂：{title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition-colors duration-150 focus:outline-none"
            id="video-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage viewport */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Large pause overlay icon */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-all">
              <div className="w-16 h-16 rounded-full bg-[#b11e22]/90 text-white flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Interactive Custom Controls footer */}
        <div className="bg-stone-950 px-4 sm:px-6 py-4 border-t border-stone-800 flex flex-col space-y-3">
          {/* Progress slider bar */}
          <div className="flex items-center space-x-3 text-stone-200">
            <span className="text-[10px] sm:text-xs font-mono">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                if (videoRef.current) {
                  const to = parseFloat(e.target.value);
                  videoRef.current.currentTime = to;
                  setCurrentTime(to);
                }
              }}
              className="flex-1 accent-[#b11e22] h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] sm:text-xs font-mono">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between text-stone-300">
            <div className="flex items-center space-x-4">
              {/* Play / pause */}
              <button
                onClick={togglePlay}
                className="hover:text-[#fef08a] transition-colors focus:outline-none"
                aria-label={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5 fill-current" />}
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="hover:text-[#fef08a] transition-colors focus:outline-none"
                aria-label="重放"
              >
                <RotateCcw className="w-4.5 h-4.5" />
              </button>

              {/* Volume */}
              <button
                onClick={toggleMute}
                className="hover:text-[#fef08a] transition-colors focus:outline-none flex items-center space-x-1"
                aria-label={isMuted ? '取消静音' : '静音'}
              >
                {isMuted ? <VolumeX className="w-4.5 h-4.5 text-rose-500" /> : <Volume2 className="w-4.5 h-4.5" />}
              </button>
            </div>

            {/* Extra labels */}
            <div className="flex items-center space-x-2 text-[10px] text-stone-500 uppercase font-mono select-none">
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">1080P 高清宽幕影院</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
