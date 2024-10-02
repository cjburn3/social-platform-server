export interface Post {
    id: number;
    content: string;
    timestamp: string;
  }
  
  export interface Comment {
    id: number;
    PostID: number;
    content: string;
    timestamp: string;
  }
  
  export interface PostLike {
    id: number;
    PostID: number;
    CommentID?: number;
    timestamp: string;
  }