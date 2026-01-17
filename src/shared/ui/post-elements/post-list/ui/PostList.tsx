import { useEffect, useRef } from "react";
import "./PostList.scss";
import type { Props } from "../model/types";
import { PostLoading } from "@/entities/post";
import { PostItem } from "@/shared/ui";
import { NetworkStatus } from "@apollo/client";

const PostList = ({
  children,
  handleScrollMarkerIntersect,
  networkStatus,
}: Props) => {
  const scrollMarker = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(networkStatus);
  }, [networkStatus]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            handleScrollMarkerIntersect();
          }
        });
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.9,
      }
    );
    if (scrollMarker.current) observer.observe(scrollMarker.current);
    return () => observer.disconnect();
  }, [handleScrollMarkerIntersect]);

  return (
    <ul className="post-list content-container">
      {children}
      <div ref={scrollMarker}>
        {networkStatus === NetworkStatus.fetchMore && (
          <PostItem>
            <PostLoading type={"short"} />
          </PostItem>
        )}
      </div>
    </ul>
  );
};

export default PostList;
