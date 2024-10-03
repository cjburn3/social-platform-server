export interface Post {
    id: number;
    content: string;
    timestamp: string;
  }
  
  export interface Comment {
    id: number;
    postID: number;
    content: string;
    timestamp: string;
  }
  
  export interface PostLike {
    id: number;
    postID: number;
    commentID?: number;
    timestamp: string;
  }