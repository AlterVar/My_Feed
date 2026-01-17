import { useMutation } from "@apollo/client/react";
import { POST_LIKE, POST_UNLIKE } from "../api/postLike";
import { useEffect, useState } from "react";
import { CombinedGraphQLErrors } from "@apollo/client";
import type { LikeResponce, UnlikeResponce } from "../model/types";

const usePostLike = (isLiked: boolean) => {
  const [type, setType] = useState<typeof POST_LIKE | typeof POST_UNLIKE>(
    POST_LIKE
  );
  useEffect(() => {
    if (isLiked) {
      setType(POST_UNLIKE);
    } else {
      setType(POST_LIKE);
    }
  }, [isLiked]);

  const [mutate, { loading, data }] = useMutation<
    UnlikeResponce | LikeResponce
  >(type, {
    update(cache, data) {
      const result = (data as LikeResponce).postLike || (data as UnlikeResponce).postUnlike;
      if (result) {
        cache.modify({
          id: cache.identify({ id: result.id, __typename: "PostModel" }),
          fields: {
            isLiked: () => result.isLiked,
          },
        });
      }
    },
  });

  const changeLike = (id: string) => {
    mutate({
      variables: { input: { id: id } },
      onError: (err) => {
        if (err instanceof CombinedGraphQLErrors) {
					console.warn(err.errors[0].message);
        }
      },
    });
  };

  return { changeLike, data, loading };
};

export default usePostLike;
