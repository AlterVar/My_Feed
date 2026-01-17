import type { SortType } from "@/features/post/sort-posts";
import { GET_POSTS } from "../api/getPosts";
import { useApolloClient, useQuery } from "@apollo/client/react";
import type { FindPostsResponce } from "../model/types";
import { useContext, useEffect } from "react";
import { ToasterActionContext } from "@/shared/lib/providers/ToasterProvider";

const useGetPosts = ({ sortType }: { sortType: SortType }) => {
  const toasterAction = useContext(ToasterActionContext);

	const client = useApolloClient();
  const { loading, error, data, networkStatus, fetchMore } = useQuery<FindPostsResponce>(
    GET_POSTS,
    {
      variables: {
        input: {
          afterCursor: "",
          limit: 5,
          type: sortType,
        },
      },
      notifyOnNetworkStatusChange: true,
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

  useEffect(() => {
    if (sortType) {
      client.cache.evict({ fieldName: "posts" });
      client.cache.gc();
    }
  }, [client.cache, sortType]);

  const cursor = (data && data.posts.pageInfo.afterCursor) || "";

  const handleScrollMarkerIntersect = () => {
    if (!error && !loading && cursor) {
      fetchMore({
        variables: {
          input: {
            afterCursor: cursor,
            limit: 5,
            type: sortType,
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
    networkStatus,
  };
};

export default useGetPosts;
