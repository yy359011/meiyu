/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Categories for Traditional Art Section
export enum TraditionalCategory {
  CHINESE_OPERA = '戏剧',
  MUSIC = '音乐',
  PAINTING = '美术',
  CALLIGRAPHY = '书法',
  DANCE = '舞蹈',
  PHOTOGRAPHY = '摄影',
  INTANGIBLE_HERITAGE = '非遗'
}

// Categories for Transportation Art Section
export enum TransportationCategory {
  HUMANITIES_HISTORY = '人文历史',
  ENGINEERING = '工程建筑',
  VEHICLE_STYLING = '交通工具造型',
  LANDSCAPE = '道路环境景观',
  VISUAL_CULTURE = '交通视觉文创',
  ETIQUETTE = '行为礼仪'
}

// Media item structure for content panels
export interface DetailContent {
  title: string;
  source: string;
  description: string;
  coverUrl: string;
  videoUrl?: string;
}

export interface ThumbnailItem {
  id: string;
  title: string;
  coverUrl: string;
  category?: string;
  duration?: string;
}

export interface SectionContent {
  mainVideo: DetailContent;
  subFeature: DetailContent;
  rightList: ThumbnailItem[];
}

// Key-Value dictionary maps category to its specific content
export type TraditionalContentMap = Record<TraditionalCategory, SectionContent>;
export type TransportationContentMap = Record<TransportationCategory, SectionContent>;

// Event status
export type EventStatus = 'ongoing' | 'upcoming' | 'ended' | 'registering' | 'submitting' | 'reviewing' | 'exhibiting';

// Event model
export interface EventItem {
  id: string;
  status: EventStatus;
  statusLabel: string;
  title: string;
  dateLabel: string;
  dateText: string;
  coverUrl: string;
  description: string;
}
