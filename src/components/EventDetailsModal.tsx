/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Award, User, Phone, Layers, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types';

interface EventDetailsModalProps {
  event: EventItem;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const [formData, setFormData] = useState({
    studentName: '张美育',
    phone: '13888888888',
    grade: '小学五年级',
    track: '传统戏剧美育'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const tracks = [
    '传统戏曲研习',
    '现代篆刻书法',
    '青绿山水工笔彩绘',
    '流线型高保真智能高铁模型拼插',
    '三维丝路AR影像合成'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.phone.trim()) {
      alert('请完整填写姓名和联系电话。');
      return;
    }

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      const code = `JZ-EV-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6" id="event-details-root">
      {/* Dark semi transparent backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl border border-stone-100 z-10 max-h-[90vh] flex flex-col"
      >
        {/* Close Button top-right absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 focus:outline-none"
          aria-label="关闭详情"
          id="btn-close-event-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content wrap inside scrollable dialog */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Cover Banner */}
          <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-stone-900">
            <img
              src={event.coverUrl}
              alt={event.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* Status absolute badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-[#b11e22] text-white rounded shadow-md uppercase tracking-widest">
                {event.statusLabel}
              </span>
            </div>

            {/* Gradient bottom mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6" />
            
            <div className="absolute bottom-4 left-6 right-6 text-white text-left">
              <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-wide drop-shadow-md">
                {event.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
            {/* Left Block: Description with schedules */}
            <div className="space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <h4 className="font-serif text-sm font-bold text-[#b11e22] tracking-wider uppercase">
                  活动介绍 · Description
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 tracking-wide leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-3 pt-3 text-stone-700">
                <div className="flex items-center space-x-2.5 text-xs">
                  <Calendar className="w-4.5 h-4.5 text-[#b11e22] flex-shrink-0" />
                  <span>
                    <strong className="text-stone-850">{event.dateLabel}：</strong>
                    {event.dateText}
                  </span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs">
                  <MapPin className="w-4.5 h-4.5 text-[#b11e22] flex-shrink-0" />
                  <span>
                    <strong>举办地点：</strong>
                    公共美育实践基地（三层中心大礼堂）与智能交通综合实验室
                  </span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs">
                  <Award className="w-4.5 h-4.5 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>专项保障：</strong>
                    修满课程后，同学们将直接获得美育中心颁发的「美育学术实践证书」
                  </span>
                </div>
              </div>
            </div>

            {/* Right Block: Dynamic Interactive Form */}
            <div className="bg-[#fffcf6] p-5.5 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="reg-form"
                    onSubmit={handleRegister}
                    className="space-y-4"
                  >
                    <div className="border-b border-amber-100 pb-2">
                      <h4 className="font-serif text-sm font-bold text-stone-800 flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#b11e22]" />
                        <span>预约入学或报名参赛</span>
                      </h4>
                    </div>

                    {/* Student Name Input */}
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">
                        学生学员姓名 <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          required
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-4 py-2 text-xs border border-amber-200/60 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#b11e22] text-stone-800"
                          placeholder="请输入学生姓名"
                        />
                      </div>
                    </div>

                    {/* Contact Phone Input */}
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">
                        联系电话 <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-4 py-2 text-xs border border-amber-200/60 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#b11e22] text-stone-800"
                          placeholder="请输入主要联系电话"
                        />
                      </div>
                    </div>

                    {/* Grade Selected option */}
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">
                        学员阶梯 (年级)
                      </label>
                      <div className="relative">
                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-4 py-2 text-xs border border-amber-200/60 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#b11e22] text-stone-800 appearance-none"
                        >
                          <option value="幼小衔接">幼小衔接阶梯</option>
                          <option value="小学三年级">小学三年级 (中阶段)</option>
                          <option value="小学五年级">小学五年级 (中高阶段)</option>
                          <option value="初中一年级">初中一年级 (高阶段)</option>
                          <option value="初中三年级">初中三年级 (探索阶段)</option>
                        </select>
                      </div>
                    </div>

                    {/* Track focus direction */}
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">
                        意向参赛或工坊方向
                      </label>
                      <select
                        name="track"
                        value={formData.track}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-amber-200/60 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#b11e22] text-stone-800 appearance-none"
                      >
                        {tracks.map((track) => (
                          <option key={track} value={track}>
                            {track}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || event.status === 'ended'}
                      className={`w-full py-2.5 rounded text-xs font-semibold tracking-widest text-white shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        event.status === 'ended'
                          ? 'bg-stone-400 cursor-not-allowed'
                          : 'bg-[#b11e22] hover:bg-[#99161a]'
                      }`}
                      id="btn-register-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>正在锁定席位...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{event.status === 'ended' ? '活动已闭幕' : '立即提交申请'}</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="reg-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4 flex flex-col items-center"
                    id="success-ticket-overlay"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-8 h-8 font-bold" />
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-800">预约锁定成功！</h4>
                      <p className="text-[11px] text-stone-500 mt-1">
                        尊敬的家长，我们已通过安全渠道备份了孩子的信息。
                      </p>
                    </div>

                    {/* Virtual Seat coupon Ticket */}
                    <div className="w-full border-2 border-dashed border-emerald-100 bg-emerald-50/20 p-4 rounded-lg select-all">
                      <span className="block text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                        美育验证券码 Seat Code
                      </span>
                      <span className="block text-lg font-bold font-mono text-[#b11e22] mt-1 tracking-wider selection:bg-[#b11e22] selection:text-white">
                        {ticketId}
                      </span>
                      <div className="mt-2.5 pt-2 border-t border-emerald-100 flex justify-between text-[9px] text-stone-500 font-sans">
                        <span>学员：{formData.studentName}</span>
                        <span>级：{formData.grade}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-[11px] font-semibold text-[#b11e22] hover:underline focus:outline-none cursor-pointer"
                    >
                      修改预约，重新登记
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
