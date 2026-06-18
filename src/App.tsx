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
import TraditionalAlbumDetail from './components/TraditionalAlbumDetail';
import TraditionalScoreDetail from './components/TraditionalScoreDetail';
import TraditionalImageDetail from './components/TraditionalImageDetail';
import TraditionalAudioDetail from './components/TraditionalAudioDetail';
import type { ImageWorkItem } from './components/TraditionalImageDetail';
import TransportationPage from './components/TransportationPage';
import TransportationSection from './components/TransportationSection';
import EventsSection from './components/EventsSection';
import EventsPage from './components/EventsPage';
import ExhibitionGallery from './components/ExhibitionGallery';
import ExhibitionGalleryPage from './components/ExhibitionGalleryPage';
import ExhibitionDetailPage from './components/ExhibitionDetailPage';
import ResourceListPage from './components/ResourceListPage';
import ResourceDetailPage from './components/ResourceDetailPage';
import type { ResourceItem } from './components/ResourceListPage';
import PersonalCenterPage from './components/PersonalCenterPage';
import UploadWorkPage from './components/UploadWorkPage';
import EnrollmentPage from './components/EnrollmentPage';
import SubmissionDetailPage from './components/SubmissionDetailPage';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';

// Lightbox / Modals
import VideoModal from './components/VideoModal';
import EventDetailsModal from './components/EventDetailsModal';
import EventWorksPage from './components/EventWorksPage';
import AudioPlayerModal from './components/AudioPlayerModal';

// Static Data and Types
import { EventItem, TraditionalCategory } from './types';
import { EVENTS_DATA, TRADITIONAL_ART_DATA, TRANSPORTATION_ART_DATA, GalleryItem, GALLERY_DATA } from './data';

const DEFAULT_AVATAR_KEY = 'meiyu_avatar_url';

export default function App() {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // User avatar (custom uploaded, persisted in localStorage)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(DEFAULT_AVATAR_KEY);
    } catch {
      return null;
    }
  });

  const handleAvatarChange = (newUrl: string | null) => {
    setAvatarUrl(newUrl);
    try {
      if (newUrl) {
        localStorage.setItem(DEFAULT_AVATAR_KEY, newUrl);
      } else {
        localStorage.removeItem(DEFAULT_AVATAR_KEY);
      }
    } catch {
      // ignore storage errors (quota, privacy mode, etc.)
    }
  };

  const handleLogin = (username: string, password: string): boolean => {
    if (username === 'admin' && password === '123456') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

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

  // Selected album detail page state (shows cover, description, song list)
  const [selectedAlbum, setSelectedAlbum] = useState<{
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    description?: string;
    songs: { id: string; title: string; duration: string; audioUrl?: string }[];
  } | null>(null);

  // Selected score detail page state (PDF viewer)
  const [selectedScore, setSelectedScore] = useState<{
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    pdfUrl: string;
  } | null>(null);

  // Selected image detail page state (carousel + lightbox)
  const [selectedImage, setSelectedImage] = useState<ImageWorkItem | null>(null);
  const [imageWorks, setImageWorks] = useState<ImageWorkItem[]>([]);

  // Selected audio detail page state (vinyl record player)
  const [selectedAudioDetail, setSelectedAudioDetail] = useState<{
    id: string;
    title: string;
    coverUrl: string;
    views: string;
    pubDate: string;
    tag?: string;
    category?: string;
  } | null>(null);

  // Initial category when navigating to traditional page from homepage
  const [initialTraditionalCategory, setInitialTraditionalCategory] = useState<TraditionalCategory | undefined>(undefined);

  // Interactive lightboxes state
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);
  const [activeAudio, setActiveAudio] = useState<{ title: string } | null>(null);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  // Exhibition detail page state
  const [selectedExhibitionItem, setSelectedExhibitionItem] = useState<GalleryItem | null>(null);

  // Resource detail page state
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  // Upload work page state
  const [showUploadPage, setShowUploadPage] = useState(false);

  // Personal center default tab
  const [personalCenterDefaultTab, setPersonalCenterDefaultTab] = useState<'account' | 'registrations' | 'works' | 'favorites'>('account');

  // Event works page state
  const [showEventWorksPage, setShowEventWorksPage] = useState(false);
  const [eventWorksTitle, setEventWorksTitle] = useState('');

  // Enrollment page state
  const [showEnrollmentPage, setShowEnrollmentPage] = useState(false);
  const [enrollmentEventTitle, setEnrollmentEventTitle] = useState('');

  // Submission detail page state
  const [showSubmissionDetail, setShowSubmissionDetail] = useState(false);
  const [submissionDetailData, setSubmissionDetailData] = useState<{
    eventTitle: string;
    submissionTitle: string;
    status: 'submitting' | 'reviewing' | 'rejected' | 'ended';
    rejectionReason?: string;
    rejectionTimestamp?: string;
  } | null>(null);

  // Exhibition detail from personal center
  const [pcExhibitionItem, setPcExhibitionItem] = useState<GalleryItem | null>(null);

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
      if (activeSection === 'traditional' || activeSection === 'transport' || activeSection === 'events' || activeSection === 'resourceList' || activeSection === 'personalCenter' || activeSection === 'exhibition') return;

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
  const handleNavigate = (sectionId: string, category?: string) => {
    // Map gallery to exhibition gallery page
    const targetSection = sectionId === 'gallery' ? 'exhibition' : sectionId;
    
    setActiveSection(targetSection);
    setHighlightedNav(sectionId);
    setSelectedVideoDetail(null);
    setSelectedImage(null);
    setSelectedAlbum(null);
    setSelectedScore(null);
    setSelectedExhibitionItem(null);
    setSelectedAudioDetail(null);
    setActiveEvent(null);
    setPersonalCenterDefaultTab('account');
    setShowEventWorksPage(false);
    setEventWorksTitle('');

    // Store initial category for traditional page
    if (targetSection === 'traditional' && category) {
      setInitialTraditionalCategory(category as TraditionalCategory);
    } else if (targetSection === 'traditional') {
      setInitialTraditionalCategory(undefined);
    }

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

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
        onLogout={() => setIsLoggedIn(false)}
        avatarUrl={avatarUrl}
      />

      {/* Hero Visual Area */}
      {activeSection !== 'traditional' && activeSection !== 'transport' && activeSection !== 'events' && activeSection !== 'resourceList' && activeSection !== 'personalCenter' && activeSection !== 'exhibition' && !selectedVideoDetail && !selectedAlbum && !selectedScore && !selectedImage && !selectedAudioDetail && <Carousel />}

      {/* Core Educational Content Sections */}
      <main className="flex-1 bg-[#fffdfa]">
        
        {selectedResource ? (
          <ResourceDetailPage
            item={selectedResource}
            onBack={() => setSelectedResource(null)}
          />
        ) : selectedExhibitionItem ? (
          <ExhibitionDetailPage
            item={selectedExhibitionItem}
            onBack={() => setSelectedExhibitionItem(null)}
            onNavigateHome={() => {
              setSelectedExhibitionItem(null);
              setActiveSection('home');
            }}
          />
        ) : selectedAlbum ? (
          <TraditionalAlbumDetail
            album={selectedAlbum}
            onBack={() => setSelectedAlbum(null)}
            onNavigateHome={() => {
              setSelectedAlbum(null);
              setActiveSection('home');
            }}
            onPlaySong={(title) => setActiveAudio({ title })}
          />
        ) : selectedScore ? (
          <TraditionalScoreDetail
            score={selectedScore}
            onBack={() => setSelectedScore(null)}
            onNavigateHome={() => {
              setSelectedScore(null);
              setActiveSection('home');
            }}
          />
        ) : selectedImage ? (
          <TraditionalImageDetail
            imageDetail={selectedImage}
            allWorks={imageWorks}
            onBack={() => setSelectedImage(null)}
            onNavigateHome={() => {
              setSelectedImage(null);
              setActiveSection('home');
            }}
            onSelectWork={(item) => setSelectedImage(item)}
          />
        ) : selectedAudioDetail ? (
          <TraditionalAudioDetail
            audio={selectedAudioDetail}
            allAudios={[]}
            onBack={() => setSelectedAudioDetail(null)}
            onNavigateHome={() => {
              setSelectedAudioDetail(null);
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
            onSelectAlbumDetail={(item) => setSelectedAlbum(item)}
            onSelectScoreDetail={(item) => setSelectedScore(item)}
            onSelectImageDetail={(item, allWorks) => { setSelectedImage(item); setImageWorks(allWorks); }}
            onSelectAudioDetail={(item) => setSelectedAudioDetail(item)}
            initialCategory={initialTraditionalCategory}
          />
        ) : activeSection === 'transport' ? (
          <TransportationPage
            onPlayVideo={handleOpenVideo}
            onPlayAudio={(title) => setActiveAudio({ title })}
          />
        ) : activeSection === 'events' && showSubmissionDetail && submissionDetailData ? (
          <SubmissionDetailPage
            eventTitle={submissionDetailData.eventTitle}
            submissionTitle={submissionDetailData.submissionTitle}
            status={submissionDetailData.status}
            rejectionReason={submissionDetailData.rejectionReason}
            rejectionTimestamp={submissionDetailData.rejectionTimestamp}
            onBack={() => {
              setShowSubmissionDetail(false);
              setSubmissionDetailData(null);
            }}
            onSave={(data) => {
              console.log('Submission saved:', data);
              setShowSubmissionDetail(false);
              setSubmissionDetailData(null);
            }}
          />
        ) : activeSection === 'events' && showEventWorksPage ? (
          <EventWorksPage
            eventTitle={eventWorksTitle}
            onBack={() => {
              setShowEventWorksPage(false);
              setEventWorksTitle('');
            }}
            onViewSubmissionDetail={(eventTitle, submissionTitle, status, rejectionReason, rejectionTimestamp) => {
              setSubmissionDetailData({ eventTitle, submissionTitle, status, rejectionReason, rejectionTimestamp });
              setShowSubmissionDetail(true);
            }}
            onViewExhibitionDetail={(galleryId) => {
              const item = GALLERY_DATA.find(g => g.id === galleryId);
              if (item) {
                setActiveSection('exhibition');
                setHighlightedNav('nav-exhibition');
                setSelectedExhibitionItem(item);
              }
            }}
          />
        ) : activeSection === 'events' && showEnrollmentPage ? (
          <EnrollmentPage
            eventTitle={enrollmentEventTitle}
            onBack={() => setShowEnrollmentPage(false)}
            onSubmit={(data) => {
              console.log('Enrollment submitted:', data);
              setShowEnrollmentPage(false);
            }}
          />
        ) : activeSection === 'events' && showSubmissionDetail && submissionDetailData ? (
          <SubmissionDetailPage
            eventTitle={submissionDetailData.eventTitle}
            submissionTitle={submissionDetailData.submissionTitle}
            status={submissionDetailData.status}
            rejectionReason={submissionDetailData.rejectionReason}
            rejectionTimestamp={submissionDetailData.rejectionTimestamp}
            onBack={() => {
              setShowSubmissionDetail(false);
              setSubmissionDetailData(null);
            }}
            onSave={(data) => {
              console.log('Submission saved:', data);
              setShowSubmissionDetail(false);
              setSubmissionDetailData(null);
            }}
          />
        ) : activeSection === 'events' ? (
          <EventsPage
            onSelectEvent={(ev) => setActiveEvent(ev)}
            onBackToHome={() => handleNavigate('home')}
            onEnroll={(eventTitle) => {
              setEnrollmentEventTitle(eventTitle);
              setShowEnrollmentPage(true);
            }}
            onViewRecords={(eventTitle) => {
              setEventWorksTitle(eventTitle);
              setShowEventWorksPage(true);
            }}
            onViewDetail={(eventTitle, submissionTitle, status) => {
              setSubmissionDetailData({ eventTitle, submissionTitle, status });
              setShowSubmissionDetail(true);
            }}
          />
        ) : activeSection === 'resourceList' ? (
          <ResourceListPage
            onBackToHome={() => handleNavigate('home')}
            onSelectItem={(item) => {
              setSelectedResource(item);
            }}
          />
        ) : activeSection === 'personalCenter' && showUploadPage ? (
          <UploadWorkPage
            onBack={() => setShowUploadPage(false)}
            onSubmit={(work) => {
              // Handle work submission
              console.log('Submitted work:', work);
              setShowUploadPage(false);
            }}
          />
        ) : activeSection === 'personalCenter' && showSubmissionDetail && submissionDetailData ? (
          <SubmissionDetailPage
            eventTitle={submissionDetailData.eventTitle}
            submissionTitle={submissionDetailData.submissionTitle}
            status={submissionDetailData.status}
            rejectionReason={submissionDetailData.rejectionReason}
            rejectionTimestamp={submissionDetailData.rejectionTimestamp}
            onBack={() => {
              setShowSubmissionDetail(false);
              setSubmissionDetailData(null);
            }}
            onSave={(data) => {
              console.log('Submission saved:', data);
              setShowSubmissionDetail(false);
              setSubmissionDetailData(null);
            }}
          />
        ) : activeSection === 'personalCenter' && pcExhibitionItem ? (
          <ExhibitionDetailPage
            item={pcExhibitionItem}
            onBack={() => setPcExhibitionItem(null)}
            onNavigateHome={() => {
              setPcExhibitionItem(null);
              setActiveSection('home');
            }}
          />
        ) : activeSection === 'personalCenter' ? (
          <PersonalCenterPage
            avatarUrl={avatarUrl}
            onAvatarChange={handleAvatarChange}
            onBackToHome={() => handleNavigate('home')}
            onUpload={() => setShowUploadPage(true)}
            defaultTab={personalCenterDefaultTab}
            onViewSubmissionDetail={(eventTitle, submissionTitle, status) => {
              setSubmissionDetailData({ eventTitle, submissionTitle, status });
              setShowSubmissionDetail(true);
            }}
            onViewExhibitionDetail={(itemId) => {
              const item = GALLERY_DATA.find(g => g.id === itemId);
              if (item) setPcExhibitionItem(item);
            }}
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
            onEnroll={(eventTitle) => {
              setActiveEvent(null);
              setEnrollmentEventTitle(eventTitle);
              setShowEnrollmentPage(true);
              setActiveSection('events');
              setHighlightedNav('nav-events');
            }}
            onViewRecords={(eventTitle) => {
              setActiveEvent(null);
              setEventWorksTitle(eventTitle);
              setShowEventWorksPage(true);
              setActiveSection('events');
              setHighlightedNav('nav-events');
            }}
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
                    热搜词
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
