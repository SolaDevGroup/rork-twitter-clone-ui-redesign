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

export interface Room {
  id: string;
  name: string;
  topic: string;
  memberCount: number;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
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
}