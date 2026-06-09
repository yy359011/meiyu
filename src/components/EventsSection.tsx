/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, ArrowRight, Play, CheckCircle2, Clock } from 'lucide-react';
import { EventItem, EventStatus } from '../types';
import { EVENTS_DATA } from '../data';

interface EventsSectionProps {
  onSelectEvent: (event: EventItem) => void;
  onViewAll: () => void;
}

export default function EventsSection({ onSelectEvent, onViewAll }: EventsSectionProps) {
  
  // Status badges color map
  const getBadgeClass = (status: EventStatus) => {
    switch (status) {
      case 'ongoing':
      case 'registering':
      case 'exhibiting':
        return 'bg-[#b11e22] text-white';
      case 'upcoming':
      case 'submitting':
      case 'reviewing':
        return 'bg-amber-500 text-white';
      case 'ended':
      default:
        return 'bg-stone-500 text-white';
    }
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20" id="latest-events-section">
      {/* Header Area with View All Link */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#b11e22] tracking-widest">
            最新活动
          </h2>
          <div className="w-8 sm:w-16 h-[1px] bg-[#b11e22]/30" />
        </div>
        <p className="mt-2 text-xs text-stone-500 tracking-wide">
          把握赛事机遇，展示艺术才华
        </p>
      </div>

      {/* Grid container (4 items: 3 event cards + 1 virtual dashed card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EVENTS_DATA.map((event) => (
          <div
            key={event.id}
            onClick={() => onSelectEvent(event)}
            className="group relative h-96 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-stone-100 bg-stone-900"
            id={`event-card-${event.id}`}
          >
            {/* Cover Image inside Card */}
            <img
              src={event.coverUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 opacity-85 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />

            {/* Top-Left Status Badge */}
            <div className="absolute top-4 left-4 z-20 shadow-md">
              <span className={`text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-sm tracking-widest ${getBadgeClass(event.status)}`}>
                {event.statusLabel}
              </span>
            </div>

            {/* Bottom Vignette Shadow Frame Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10" />

            {/* Event Meta and Title Content bottom aligned (Exactly matching reference screen) */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end text-white">
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide leading-snug text-white line-clamp-2 drop-shadow-md group-hover:text-amber-200 transition-colors">
                {event.title}
              </h3>
              
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-neutral-300">
                <div className="flex items-center space-x-1.5 text-xs text-stone-200">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-sans text-[11px] font-medium text-stone-200">
                    {event.dateLabel}：{event.dateText}
                  </span>
                </div>
                
                {/* Visual action cue */}
                <span className="text-[10px] text-amber-300 border border-amber-300/30 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  查看
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Card 4: Dashed Placeholder Card (Exactly from reference screen) */}
        <div
          onClick={onViewAll}
          className="relative h-96 rounded-xl border-2 border-dashed border-[#e4d7c0] bg-[#faf5ec]/40 hover:bg-[#faf5ec]/90 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:border-[#b11e22]/50 transition-all duration-300 group"
          id="event-card-placeholder"
        >
          {/* Centered Rounded Red Plus in a White Circle */}
          <div className="w-14 h-14 rounded-full bg-white border border-[#e4d7c0] text-[#b11e22] group-hover:bg-[#b11e22] group-hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 mb-4 text-2xl font-light">
            +
          </div>
          <span className="block font-serif text-sm font-bold text-stone-700 tracking-wider group-hover:text-[#b11e22] transition-colors">
            更多精彩活动
          </span>
          <span className="block text-[11px] text-stone-400 font-sans tracking-widest mt-1.5 uppercase font-light">
            敬请期待 · Welcome
          </span>
        </div>
      </div>
    </section>
  );
}
