export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  joinedDate: string;
  following: number;
  followers: number;
  coverImage?: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  bookmarks: number;
  isLiked?: boolean;
  isReposted?: boolean;
  isBookmarked?: boolean;
  location?: string;
  mentions?: User[];
  hashtags?: string[];
  type?: 'post' | 'repost' | 'reply';
  originalPost?: Post;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  postId: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'repost';
  user: User;
  post?: Post;
  comment?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  isVerified?: boolean;
}

export interface Conversation {
  id: string;
  type: '1on1' | 'group' | 'club';
  user?: User;
  name?: string;
  avatar?: string;
  members?: User[];
  topic?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline?: boolean;
  hasDoubleCheck?: boolean;
  yourTurn?: boolean;
  isPinned?: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  type?: 'text' | 'image' | 'video' | 'audio' | 'poll' | 'gif';
  mediaUrl?: string;
  replyTo?: string;
  isEdited?: boolean;
  isLiked?: boolean;
  pollOptions?: PollOption[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Club {
  id: string;
  name: string;
  topic: string;
  memberCount: number;
  isLive: boolean;
  speakerCount: number;
  speakers: User[];
  host: User;
  description?: string;
  startedAt: string;
  scheduledFor?: string;
  avatar?: string;
  isRecording?: boolean;
  language?: string;
}

export interface Collection {
  id: string;
  name: string;
  posts: Post[];
  isPublic: boolean;
  createdAt: string;
}

export interface TrendingTopic {
  id: string;
  category: string;
  name: string;
  tweets: string;
}

export interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  posts: StoryPost[];
  isViewed: boolean;
}

export interface StoryPost {
  id: string;
  image: string;
  dominantColor?: string;
  isViewed: boolean;
}

export interface Short {
  id: string;
  user: User;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views: string;
  isLiked?: boolean;
  hashtags?: string[];
  soundName?: string;
  topicDisplay?: string;
  parentGroupName?: string;
  postTitle?: string;
  savedCollections?: number;
  createdAt?: string;
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  distance: number;
  images: string[];
  interests: string[];
  occupation?: string;
  company?: string;
  school?: string;
  isVerified?: boolean;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
  channel: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  videoUrl: string;
  youtubeId?: string;
  description?: string;
  likes?: number;
  dislikes?: number;
  category?: string;
}

export interface LiveStream {
  id: string;
  user: User;
  title: string;
  thumbnail: string;
  viewerCount: number;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  category: string;
  startedAt: string;
  streamUrl: string;
  description?: string;
  hashtags?: string[];
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary?: string;
  postedAt: string;
  logo?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyHandle?: string;
  location: string;
  salary?: string;
  type?: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  postedAt?: string;
  logo?: string;
  isVerified?: boolean;
  description?: string;
  aboutCompany?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  department?: string;
  degreeRequired?: string;
  experienceYears?: string;
  requiredLanguages?: string[];
  requiredSkills?: string[];
  workLocation?: {
    address: string;
    latitude: number;
    longitude: number;
  };
}