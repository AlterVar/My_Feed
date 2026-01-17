import { useQuery } from "@apollo/client/react";
import type { FindMyPostsResponce } from "../model/types";
import { GET_MY_POSTS } from "../api/getMyPosts";
import { useContext, useEffect } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";
import { useUserMe } from "@/entities/user";

const useGetMyPosts = () => {
	const toasterAction = useContext(ToasterActionContext);
	const { userCache, userData } = useUserMe();
  const { loading, error, data, fetchMore } = useQuery<FindMyPostsResponce>(
    GET_MY_POSTS,
    {
      variables: {
        input: {
          afterCursor: "",
          limit: 5,
        },
      },
    }
  );
  useEffect(() => {
		if (error) {
      console.warn(error);
      toasterAction?.changeToaster({
        text: "Не удалось загрузить посты, попробуйте обновить страницу",
        success: false,
      });
    }
  }, [error]);

  const cursor = (data && data.myPosts.pageInfo.afterCursor) || "";
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
		user: userData || userCache,
    handleScrollMarkerIntersect,
  };
};

export default useGetMyPosts;
