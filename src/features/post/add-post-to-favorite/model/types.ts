export interface UnlikeResponce {
  postUnlike: {
    isLiked: boolean;
    id: string;
  };
};

export interface LikeResponce {
  postLike: {
		isLiked: boolean;
		id: string;
  };
};

export interface Props {
  isLiked: boolean;
  id: string;
}