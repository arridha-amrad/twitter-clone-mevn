import { File, Prisma, User } from "@prisma/client";

export const QUERY_MEDIAS = {
  select: {
    url: true,
  },
};

export const QUERY_AUTHOR_DATA = {
  imageURL: true,
  username: true,
  email: true,
  id: true,
};

// export const POST_INCLUDED_DATA = {
//   _count: {
//     select: {
//       children: true,
//       likes: true,
//       medias: true,
//       tweets: true,
//     },
//   },
//   medias: true,
//   author: {
//     select: QUERY_AUTHOR_DATA,
//   },
// };

type AUTHOR = Pick<User, "id" | "fullname" | "username" | "imageURL">;

type POST_COUNTER = Prisma.PostCountOutputTypeSelect;

type POST_FILE = Pick<File, "url">;

// type POST_INCLUDED_DATA = Prisma.PostInclude;

export const AUTHOR_SELECTED_DATA: Record<keyof AUTHOR, boolean> = {
  fullname: true,
  id: true,
  imageURL: true,
  username: true,
};

export const POST_COUNT_SELECTED_DATA: Record<keyof POST_COUNTER, boolean> = {
  files: true,
  likes: true,
  tweets: true,
};

export const POST_FILE_SELECTED_DATA: Record<keyof POST_FILE, boolean> = {
  url: true,
};

export const getPostData = (
  authenticatedUserId: string
): Prisma.PostInclude => ({
  likes: {
    where: {
      userId: authenticatedUserId,
    },
    select: {
      userId: true,
    },
  },
  _count: {
    select: POST_COUNT_SELECTED_DATA,
  },
  author: {
    select: AUTHOR_SELECTED_DATA,
  },
  files: {
    select: POST_FILE_SELECTED_DATA,
  },
});

export const getTweetData = (
  authenticatedUserId: string
): Prisma.TweetInclude => ({
  user: {
    select: AUTHOR_SELECTED_DATA,
  },
  _count: {
    select: {
      children: true,
    },
  },
  post: {
    include: getPostData(authenticatedUserId),
  },
});
