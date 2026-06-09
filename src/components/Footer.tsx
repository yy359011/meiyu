/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Share2, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const links = [
    { label: '关于我们', href: '#' },
    { label: '教育部合作', href: '#' },
    { label: '文化局支持', href: '#' },
    { label: '使用条款', href: '#' },
    { label: '联系我们', href: '#' }
  ];

  const handleSocialClick = (platform: string) => {
    alert(`非常感谢关注！您点击了社会化连接 [${platform}]。职业教育美育教育资源及管理平台伴您左右。`);
  };

  return (
    <footer className="bg-[#f5ebd7] text-[#4c3b28] pt-14 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#e4d7c0]" id="app-footer">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand visual header (Exactly matching footer design) */}
        <div className="mb-4">
          <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#b11e22]">
            职业教育美育教育资源及管理平台
          </h2>
          <span className="text-[9px] sm:text-[10px] font-sans tracking-widest text-[#b11e22] uppercase opacity-85 block mt-0.5">
            VOCATIONAL AESTHETIC EDUCATION RESOURCES & MANAGEMENT PLATFORM
          </span>
        </div>

        {/* Corporate Slogan description */}
        <div className="max-w-2xl mb-8">
          <p className="font-serif text-sm text-stone-700/90 leading-relaxed font-normal">
            承载传统，启迪未来。中国 K12 美育教育先行者，连接传统文化与科技未来的艺术纽带。
          </p>
        </div>

        {/* Navigation Horizontal Links */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4.5 mb-8">
          {links.map((link, idx) => (
            <div key={link.label} className="flex items-center">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`[${link.label}] 详情页面在开发中，感谢支持。`);
                }}
                className="text-stone-700 hover:text-[#b11e22] text-xs sm:text-sm tracking-wide font-normal transition-colors"
              >
                {link.label}
              </a>
              {idx < links.length - 1 && (
                <span className="text-stone-400 mx-2 text-xs select-none">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* Round Social Circle Buttons */}
        <div className="flex items-center justify-center space-x-3.5 mb-10">
          <button
            onClick={() => handleSocialClick('官方网格')}
            className="w-10 h-10 rounded-full bg-white hover:bg-[#b11e22] hover:text-white text-[#4c3b28]/85 flex items-center justify-center shadow-sm cursor-pointer transition-all duration-300 border border-amber-200/40"
            aria-label="官方网络全球通"
            id="social-globe"
          >
            <Globe className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleSocialClick('分享链接')}
            className="w-10 h-10 rounded-full bg-white hover:bg-[#b11e22] hover:text-white text-[#4c3b28]/85 flex items-center justify-center shadow-sm cursor-pointer transition-all duration-300 border border-amber-200/40"
            aria-label="一键分享成果"
            id="social-share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleSocialClick('邮箱订阅')}
            className="w-10 h-10 rounded-full bg-white hover:bg-[#b11e22] hover:text-white text-[#4c3b28]/85 flex items-center justify-center shadow-sm cursor-pointer transition-all duration-300 border border-amber-200/40"
            aria-label="订阅美育月刊"
            id="social-mail"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>

        {/* Separator Line */}
        <div className="w-full max-w-lg h-[1px] bg-[#4c3b28]/10 mb-6" />

        {/* Copyright notice text */}
        <p className="text-[10px] sm:text-xs text-stone-500 font-sans tracking-wide">
          © 2026 职业教育美育教育资源及管理平台. 保留所有权利。
        </p>
      </div>
    </footer>
  );
}
