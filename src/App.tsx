/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Sparkles,
  Palette,
  Train,
  ArrowRight,
  Info,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

// Import our modular custom components
import SchoolSongPlayer from './components/SchoolSongPlayer';
import Header from './components/Header';
import Carousel from './components/Carousel';
import TraditionalSection from './components/TraditionalSection';
import TraditionalPage from './components/TraditionalPage';
import TraditionalVideoDetail from './components/TraditionalVideoDetail';
import TransportationPage from './components/TransportationPage';
import TransportationSection from './components/TransportationSection';
import EventsSection from './components/EventsSection';
import EventsPage from './components/EventsPage';
import ExhibitionGallery from './components/ExhibitionGallery';
import ExhibitionGalleryPage from './components/ExhibitionGalleryPage';
import ExhibitionDetailPage from './components/ExhibitionDetailPage';
import ResourceListPage from './components/ResourceListPage';
import PersonalCenterPage from './components/PersonalCenterPage';
import Footer from './components/Footer';

// Lightbox / Modals
import VideoModal from './components/VideoModal';
import EventDetailsModal from './components/EventDetailsModal';
import AudioPlayerModal from './components/AudioPlayerModal';

// Static Data and Types
import { EventItem } from './types';
import { EVENTS_DATA, TRADITIONAL_ART_DATA, TRANSPORTATION_ART_DATA, GalleryItem } from './data';

export default function App() {
  // Navigation active section ID state (page routing)
  const [activeSection, setActiveSection] = useState('home');
  // Scroll-based navigation highlight state (visual only, does not trigger page switch)
  const [highlightedNav, setHighlightedNav] = useState('home');

  // Selected video detail page state
  const [selectedVideoDetail, setSelectedVideoDetail] = useState<{
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    videoUrl?: string;
  } | null>(null);

  // Interactive lightboxes state
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);
  const [activeAudio, setActiveAudio] = useState<{ title: string } | null>(null);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  // Exhibition detail page state
  const [selectedExhibitionItem, setSelectedExhibitionItem] = useState<GalleryItem | null>(null);

  // Search overlay state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Back to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // System notification banner
  const [showWelcome, setShowWelcome] = useState(true);

  // Catch page scroll to update indicators
  useEffect(() => {
    const handleScroll = () => {
      // Manage back to top button visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // If we are currently browsing on the dedicated traditional or transport list page, do not overwrite the section choice based on homepage scroll offsets
      if (activeSection === 'traditional' || activeSection === 'transport' || activeSection === 'events' || activeSection === 'resourceList' || activeSection === 'personalCenter') return;

      // Automatically highlight nav based on scroll coordinate (visual only, no page switch)
      const traditionalEl = document.getElementById('traditional-art-section');
      const transportEl = document.getElementById('transportation-art-section');
      const eventsEl = document.getElementById('latest-events-section');
      const galleryEl = document.getElementById('art-gallery-section');

      const scrollPos = window.scrollY + 200;

      if (galleryEl && scrollPos >= galleryEl.offsetTop) {
        setHighlightedNav('gallery');
      } else if (eventsEl && scrollPos >= eventsEl.offsetTop) {
        setHighlightedNav('events');
      } else if (transportEl && scrollPos >= transportEl.offsetTop) {
        setHighlightedNav('transport');
      } else if (traditionalEl && scrollPos >= traditionalEl.offsetTop) {
        setHighlightedNav('traditional');
      } else {
        setHighlightedNav('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Manage navigation clicks
  const handleNavigate = (sectionId: string) => {
    // Map gallery to resource list page
    const targetSection = sectionId === 'gallery' ? 'resourceList' : sectionId;
    
    setActiveSection(targetSection);
    setHighlightedNav(targetSection);
    setSelectedVideoDetail(null);
    setSelectedExhibitionItem(null);
    setActiveEvent(null);

    if (targetSection === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetSection === 'traditional' || targetSection === 'transport' || targetSection === 'events' || targetSection === 'exhibition' || targetSection === 'resourceList' || targetSection === 'personalCenter') {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
      return;
    }

    let elId = '';
    if (targetSection === 'transport') elId = 'transportation-art-section';
    if (targetSection === 'events') elId = 'latest-events-section';
    if (targetSection === 'gallery') elId = 'art-gallery-section';

    const el = document.getElementById(elId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Searching logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matches: any[] = [];

    // Search events
    EVENTS_DATA.forEach(ev => {
      if (ev.title.toLowerCase().includes(query) || ev.description.toLowerCase().includes(query)) {
        matches.push({ type: 'event', title: ev.title, subtitle: '最新活动', raw: ev });
      }
    });

    // Search traditional
    Object.entries(TRADITIONAL_ART_DATA).forEach(([cat, data]) => {
      if (data.mainVideo.title.toLowerCase().includes(query) || data.mainVideo.description.toLowerCase().includes(query)) {
        matches.push({ type: 'traditional', title: data.mainVideo.title, subtitle: `传统美育 · ${cat}`, raw: data.mainVideo });
      }
      if (data.subFeature.title.toLowerCase().includes(query) || data.subFeature.description.toLowerCase().includes(query)) {
        matches.push({ type: 'traditional', title: data.subFeature.title, subtitle: `传统美育 · ${cat}`, raw: data.subFeature });
      }
    });

    // Search transportation
    Object.entries(TRANSPORTATION_ART_DATA).forEach(([cat, data]) => {
      if (data.mainVideo.title.toLowerCase().includes(query) || data.mainVideo.description.toLowerCase().includes(query)) {
        matches.push({ type: 'transport', title: data.mainVideo.title, subtitle: `交通美育 · ${cat}`, raw: data.mainVideo });
      }
      if (data.subFeature.title.toLowerCase().includes(query) || data.subFeature.description.toLowerCase().includes(query)) {
        matches.push({ type: 'transport', title: data.subFeature.title, subtitle: `交通美育 · ${cat}`, raw: data.subFeature });
      }
    });

    setSearchResults(matches);
  }, [searchQuery]);

  const handleOpenVideo = (title: string, url: string) => {
    setActiveVideo({ title, url });
  };

  const handleSelectSearchResult = (result: any) => {
    setSearchOpen(false);
    setSearchQuery('');

    if (result.type === 'event') {
      setActiveEvent(result.raw);
    } else {
      setActiveVideo({
        title: result.title,
        url: result.raw.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hand-writing-with-ink-on-paper-34351-large.mp4'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#b11e22]/10 selection:text-[#b11e22]" id="app-wrapper">
      
      {/* School Song Player Banner (Replacing old Academic Announcement) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="z-50 w-full"
          >
            <SchoolSongPlayer onClose={() => setShowWelcome(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Structural Header Section */}
      <Header
        activeSection={highlightedNav}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenProfile={() => handleNavigate('personalCenter')}
      />

      {/* Hero Visual Area */}
      {activeSection !== 'traditional' && activeSection !== 'transport' && activeSection !== 'events' && activeSection !== 'resourceList' && activeSection !== 'personalCenter' && !selectedVideoDetail && <Carousel />}

      {/* Core Educational Content Sections */}
      <main className="flex-1 bg-[#fffdfa]">
        
        {selectedExhibitionItem ? (
          <ExhibitionDetailPage
            item={selectedExhibitionItem}
            onBack={() => setSelectedExhibitionItem(null)}
            onNavigateHome={() => {
              setSelectedExhibitionItem(null);
              setActiveSection('home');
            }}
          />
        ) : selectedVideoDetail ? (
          <TraditionalVideoDetail
            video={selectedVideoDetail}
            onBack={() => setSelectedVideoDetail(null)}
            onNavigateHome={() => {
              setSelectedVideoDetail(null);
              setActiveSection('home');
            }}
          />
        ) : activeSection === 'traditional' ? (
          <TraditionalPage
            onPlayVideo={handleOpenVideo}
            onPlayAudio={(title) => setActiveAudio({ title })}
            onSelectVideoDetail={(item) => setSelectedVideoDetail(item)}
          />
        ) : activeSection === 'transport' ? (
          <TransportationPage
            onPlayVideo={handleOpenVideo}
            onPlayAudio={(title) => setActiveAudio({ title })}
          />
        ) : activeSection === 'events' ? (
          <EventsPage
            onSelectEvent={(ev) => setActiveEvent(ev)}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : activeSection === 'resourceList' ? (
          <ResourceListPage
            onBackToHome={() => handleNavigate('home')}
            onSelectItem={(item) => {
              // Map ResourceItem to GalleryItem for detail page
              setSelectedExhibitionItem({
                id: item.id,
                title: item.title,
                artist: '美育创作者',
                category: item.category,
                image: item.thumbnail,
                description: item.description,
                artistBio: '专注于美育创作与教育',
                declaration: '本作品受版权保护',
                images: [item.thumbnail],
              });
            }}
          />
        ) : activeSection === 'personalCenter' ? (
          <PersonalCenterPage
            onBackToHome={() => handleNavigate('home')}
          />
        ) : activeSection === 'exhibition' ? (
          <ExhibitionGalleryPage
            onSelectItem={(item) => setSelectedExhibitionItem(item)}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : (
          <>
            {/* SECTION 1: Traditional Art (传统美育) */}
            <TraditionalSection onPlayVideo={handleOpenVideo} onNavigate={handleNavigate} />

            {/* SECTION 3: Transportation Art (交通美育) */}
            <TransportationSection onPlayVideo={handleOpenVideo} onNavigate={handleNavigate} />

            {/* SECTION 4: Latest Events Row (最新活动) */}
            <EventsSection
              onSelectEvent={(ev) => setActiveEvent(ev)}
              onViewAll={() => handleNavigate('events')}
            />

            {/* SECTION 5: Filterable Art Gallery (美育展厅) */}
            <div className="bg-[#fcf8f0]/40 border-t border-b border-amber-100/50 my-8 py-4">
              <ExhibitionGallery onSelectItem={(item) => setSelectedExhibitionItem(item)} onViewAll={() => handleNavigate('exhibition')} />
            </div>
          </>
        )}
      </main>

      {/* Footer Area */}
      <Footer />

      {/* Float Widgets: Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#b11e22] text-white hover:bg-[#99161a] shadow-lg hover:scale-105 duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#d9ab6a]"
            aria-label="回到顶部"
            id="btn-scroll-top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Video Light-box Modal view */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            title={activeVideo.title}
            videoUrl={activeVideo.url}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* Audio Light-box Traditional Player view */}
      <AnimatePresence>
        {activeAudio && (
          <AudioPlayerModal
            initialTitle={activeAudio.title}
            onClose={() => setActiveAudio(null)}
          />
        )}
      </AnimatePresence>

      {/* Event Details and RSVP registration Modal view */}
      <AnimatePresence>
        {activeEvent && (
          <EventDetailsModal
            event={activeEvent}
            onClose={() => setActiveEvent(null)}
          />
        )}
      </AnimatePresence>

      {/* Interactive Fullscreen Search Overlay (With Quick topics) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-100 flex flex-col justify-start bg-stone-900/98 backdrop-blur-md text-white p-6 sm:p-18 overflow-y-auto" id="search-pane-full">
            <div className="max-w-3xl mx-auto w-full flex flex-col pt-10">
              
              {/* Escape bar */}
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10 text-neutral-300">
                <span className="font-serif text-sm font-bold text-amber-200 tracking-wider">
                  公共美育智能云检索
                </span>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="关闭搜索"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Central Search block */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-13 pr-4.5 py-4 bg-white/5 border border-white/15 rounded-xl text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b11e22] focus:border-transparent transition-all tracking-wide placeholder-white/35"
                  placeholder="请输入您感兴趣的美育主题 (戏剧、高铁、书法大赛、古琴...)"
                />
              </div>

              {/* Popular tags row */}
              {searchQuery.length === 0 ? (
                <div className="space-y-4">
                  <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-serif">
                    大家都在搜 · Popular Topics
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {['花灯戏', '古琴古音', '青绿山水', '流线型美学高铁', '秦陵铜车马', '书法大赛', '数字丝路', '行为礼仪'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-1.5 rounded bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/10 text-xs tracking-wider transition-all duration-200 cursor-pointer text-stone-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Intro info card */}
                  <div className="mt-14 p-6 bg-white/5 rounded-xl border border-white/5/60 text-stone-300/90 text-xs tracking-wide leading-relaxed">
                    <p className="font-serif font-bold text-amber-200 mb-2">💡 小提示：</p>
                    职业教育美育教育资源及管理平台智能检索系统覆盖「戏剧、音乐、美术、书法、舞蹈、摄影、非遗」七大传统艺术板块，以及现代轨道、公路、绿色新能源等现代化工程交通美育课程。输入模糊词即可智能展示所有推荐视听内容。
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-serif border-b border-white/5 pb-2">
                    检索到 {searchResults.length} 个美育关联课题
                  </h4>

                  <div className="space-y-3">
                    {searchResults.length > 0 ? (
                      searchResults.map((res, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelectSearchResult(res)}
                          className="p-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 cursor-pointer transition-all flex justify-between items-center group"
                        >
                          <div>
                            <span className="block text-[10px] text-amber-300 font-mono tracking-widest uppercase mb-1">
                              {res.subtitle}
                            </span>
                            <span className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#fee2e2] transition-colors">
                              {res.title}
                            </span>
                          </div>
                          
                          {/* Chevron icon indicator */}
                          <div className="w-7 h-7 rounded-full bg-white/5 text-white flex items-center justify-center group-hover:bg-[#b11e22] group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-14 text-center text-sm text-neutral-400">
                        未检索到与“<span className="text-[#fee2e2] font-semibold">{searchQuery}</span>”相关的美育学术精品，您可以尝试搜索 “花灯戏” 或 “高铁”。
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
