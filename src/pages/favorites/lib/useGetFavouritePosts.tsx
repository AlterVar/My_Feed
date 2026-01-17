import { useQuery } from "@apollo/client/react";
import { GET_FAVOURITE_POSTS } from "../api/getFavouritePosts";
import type { FindFavouritePostsResponce } from "../model/types";
import { useContext, useEffect } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";

const useGetFavouritePosts = () => {
  const toasterAction = useContext(ToasterActionContext);
  const { loading, error, data, fetchMore } =
    useQuery<FindFavouritePostsResponce>(GET_FAVOURITE_POSTS, {
      variables: {
        input: {
          afterCursor: "",
          limit: 5,
        },
      },
    });
  useEffect(() => {
    if (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось загрузить посты, попробуйте обновить страницу",
        success: false,
      });
    }
  }, [error]);

  const cursor = (data && data.favouritePosts?.pageInfo.afterCursor) || "";
  const handleScrollMarkerIntersect = () => {
    if (!error && !loading && cursor) {
      fetchMore({
        variables: {
          input: {
            afterCursor: cursor,
            limit: 5,
          },
        },
      });
    }
  };

  return {
    loading,
    error,
    data,
    handleScrollMarkerIntersect,
  };
};

export default useGetFavouritePosts;
