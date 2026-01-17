import { useEffect, useState } from "react";
import { Sort, type SortType } from "@/features/post/sort-posts";
import useGetPosts from "../lib/useGetPosts";
import { Post, PostLoading } from "@/entities/post";
import { AddToFavourite } from "@/features/post/add-post-to-favorite";
import { ShareBtn } from "@/features/post/share-post";
import { PostDialog, ShareDialog } from "@/widgets/dialogs";
import { useSearchParams } from "react-router-dom";
import { ErrorBlock } from "@/widgets/error";
import { useDialog } from "@/shared/lib";
import { PostActions, PostItem, PostList } from "@/shared/ui";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<SortType>("NEW");
  const handleSortChange = (value: SortType) => {
    setSortType(value);
  };
  const { data, loading, networkStatus, handleScrollMarkerIntersect, error } = useGetPosts({
    sortType: sortType,
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) openDialog("post-details");
  }, []);

  if (data && data.posts.data.length > 0) {
    return (
      <div className="container page-container">
        {isOpenDialog("share") && <ShareDialog closeDialog={closeDialog} />}
        {isOpenDialog("post-details") && (
          <PostDialog closeDialog={closeDialog} openDialog={openDialog} />
        )}
        <Sort handleSortChange={handleSortChange} />
        {data?.posts.data && data.posts.data.length > 0 && (
          <PostList
            handleScrollMarkerIntersect={handleScrollMarkerIntersect}
            networkStatus={networkStatus}
          >
            {data.posts.data.map((post) => (
              <PostItem key={post.id}>
                <Post post={post} type="short" openDialog={openDialog} />
                <PostActions>
                  <AddToFavourite isLiked={post.isLiked} id={post.id} />
                  <ShareBtn openDialog={openDialog} id={post.id} />
                </PostActions>
              </PostItem>
            ))}
          </PostList>
        )}
      </div>
    );
	}
	
  if (loading) {
    return (
      <div className="container page-container">
        <div className="sort content-container">
          <Skeleton width={49} height={14} />
          <Skeleton width={24} height={24} />
        </div>
        <PostList handleScrollMarkerIntersect={handleScrollMarkerIntersect}>
          <PostItem>
            <PostLoading type={"short"} />
            <PostActions>
              <Skeleton width={24} height={24} />
              <Skeleton width={24} height={24} />
            </PostActions>
          </PostItem>
          <PostItem>
            <PostLoading type={"short"} />
            <PostActions>
              <Skeleton width={24} height={24} />
              <Skeleton width={24} height={24} />
            </PostActions>
          </PostItem>
        </PostList>
      </div>
    );
  }
  if (error || data?.posts.data.length === 0) {
    return <ErrorBlock errorCode={"500"} />;
  }
};

export default Home;
