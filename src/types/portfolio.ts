export type ProjectCategory = 'all' | 'youtube' | 'reels' | 'commercial' | 'documentary' | 'podcast';

export interface Project {
  id: string;
  title: string;
  category: 'youtube' | 'reels' | 'commercial' | 'documentary' | 'podcast';
  categoryLabel: string;
  aspect: '16:9' | '9:16';
  duration: string;
  client: string;
  clientRole: string;
  views: string;
  retention: string;
  turnaround: string;
  status: 'completed' | 'in_progress';
  completionTime: string;
  inProgressStage?: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  tools: string[];
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  videoSrc: string;
  previewLoopSrc?: string;
  thumbnailGradient: string;
  accentColor: string;
  beforeAfterTitle?: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    rating: number;
  };
}

export interface SkillExpertise {
  id: string;
  name: string;
  category: 'editing' | 'color' | 'audio' | 'motion' | 'shortform' | 'delivery';
  categoryLabel: string;
  yearsExperience: string;
  certificationStatus: string;
  proficiencyLevel: 'Master' | 'Specialist' | 'Advanced';
  summary: string;
  keyTechniques: string[];
  primaryTool: string;
}

export interface UpworkProjectTier {
  id: string;
  name: string;
  price: number;
  description: string;
  deliveryTime: string;
  revisions: number;
  footageMinutes: number;
  runningMinutes: number;
  features: {
    colorGrading: boolean;
    soundDesign: boolean;
    motionGraphics: boolean;
    subtitles: boolean;
  };
  recommended?: boolean;
}

export interface PricingOptions {
  projectType: 'youtube' | 'reels' | 'commercial' | 'podcast' | 'documentary';
  footageVolume: 'small' | 'medium' | 'large' | 'massive';
  turnaround: 'rush_24h' | 'priority_48h' | 'standard_4d';
  hasColorGrade: boolean;
  hasSoundDesign: boolean;
  hasMotionGraphics: boolean;
  hasThumbnail: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  channelOrCompany: string;
  role: string;
  avatarInitials: string;
  projectTitle: string;
  budget: string;
  rating: number;
  date: string;
  verifiedUpwork: boolean;
  quote: string;
  statsHighlight: string;
}
