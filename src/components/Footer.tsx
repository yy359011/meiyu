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

        {/* QR Code Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 bg-white rounded-lg p-1.5 shadow-sm border border-[#e4d7c0]">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mp.weixin.qq.com/s/meiyu-education&bgcolor=fbf9f4&color=4c3b28&margin=8"
              alt="公众号二维码"
              className="w-full h-full"
            />
          </div>
          <span className="text-[11px] text-stone-600 mt-2 font-serif">扫码关注公众号</span>
        </div>

        {/* Separator Line */}
        <div className="w-full max-w-lg h-[1px] bg-[#4c3b28]/10 mb-6" />

        {/* Copyright notice text */}
        <p className="text-[10px] sm:text-xs text-stone-500 font-sans tracking-wide">
          © 2026 云南交通职业技术学院. 保留所有权利。
        </p>
      </div>
    </footer>
  );
}
