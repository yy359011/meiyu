/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock } from 'lucide-react';
import { EventItem } from '../types';

interface EventDetailsModalProps {
  event: EventItem;
  onClose: () => void;
  onEnroll?: (eventTitle: string) => void;
  onViewRecords?: (eventTitle: string) => void;
}

export default function EventDetailsModal({ event, onClose, onEnroll, onViewRecords }: EventDetailsModalProps) {
  // Format rules text with line breaks
  const rulesList = event.rules ? event.rules.split('\n').filter(r => r.trim()) : [];

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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 focus:outline-none"
          aria-label="关闭详情"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Cover Banner */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-900">
            <img
              src={event.coverUrl}
              alt={event.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-[#b11e22] text-white rounded shadow-md uppercase tracking-widest">
                {event.statusLabel}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white text-left">
              <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-wide drop-shadow-md">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6 text-left">
            {/* Activity Introduction */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-1 h-5 bg-[#b11e22] rounded-full" />
                <h4 className="font-serif text-sm font-bold text-stone-800 tracking-wider">
                  活动介绍
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 tracking-wide leading-relaxed pl-3">
                {event.description}
              </p>
            </div>

            {/* Activity Rules */}
            {rulesList.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-1 h-5 bg-amber-500 rounded-full" />
                  <h4 className="font-serif text-sm font-bold text-stone-800 tracking-wider">
                    活动规则
                  </h4>
                </div>
                <div className="pl-3 space-y-1.5">
                  {rulesList.map((rule, idx) => (
                    <p key={idx} className="text-xs text-stone-600 leading-relaxed">
                      {rule}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Duration */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-1 h-5 bg-blue-500 rounded-full" />
                <h4 className="font-serif text-sm font-bold text-stone-800 tracking-wider">
                  活动时间
                </h4>
              </div>
              <div className="pl-3 space-y-2">
                {event.startDate && (
                  <div className="flex items-center space-x-2.5 text-xs text-stone-600">
                    <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span><strong className="text-stone-800">开始时间：</strong>{event.startDate}</span>
                  </div>
                )}
                {event.endDate && (
                  <div className="flex items-center space-x-2.5 text-xs text-stone-600">
                    <Clock className="w-4 h-4 text-[#b11e22] flex-shrink-0" />
                    <span><strong className="text-stone-800">结束时间：</strong>{event.endDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Register and Records Buttons for ongoing events */}
            {event.status === 'ongoing' && (
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onEnroll?.(event.title);
                  }}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold tracking-widest text-white bg-[#b11e22] hover:bg-[#99161a] transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  立即报名
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onViewRecords?.(event.title);
                  }}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold tracking-widest text-[#b11e22] bg-white border border-[#b11e22]/30 hover:bg-[#b11e22]/5 hover:border-[#b11e22] transition-all cursor-pointer"
                >
                  报名记录
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
