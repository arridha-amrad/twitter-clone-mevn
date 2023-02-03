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

export const POST_INCLUDED_DATA = {
  _count: {
    select: {
      children: true,
      likes: true,
      medias: true,
      tweets: true,
    },
  },
  medias: true,
  author: {
    select: QUERY_AUTHOR_DATA,
  },
};
