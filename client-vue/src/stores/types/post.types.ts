export type IPost = Post & {
  author: IAuthor;
  medias: Media[];
  _count: IPostCount;
  isLiked: boolean;
};

export type IPostWithParents = IPost & {
  parents: IPost[];
};

export interface IPostCount {
  children: number;
  likes: number;
  medias: number;
}

export interface IAuthor {
  email: string;
  id: string;
  username: string;
  imageURL: string;
}

export type Post = {
  id: string;
  body: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
};

export type Media = {
  id: string;
  url: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};
