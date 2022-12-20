"use client"
import React, { useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { InfiniteReviewProps } from "./types";
import Spinner from "@/lib/utils/Spinner"
import styles from "./Recent.module.css"
import RecentItem from "./RecentItem";

export default function Recent({ index }: {index: number}) {

    const getInfiniteReviews = async ({ pageParam = index}) => {
        const res = await fetch(
          "api/get-infinite-reviews?cursor=" + pageParam
        );
        return res.json();
      };

      const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery(["infiniteReviews"], getInfiniteReviews, {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor >= 5 ? lastPage.nextCursor : undefined;
        },
      });

    useEffect(() => {

        const handleScroll = async () => {
          if (
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight - 100
          ) {
            fetchNextPage();
          }
        };
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);
    
    return (
        <>

        {status === "loading" ? (
          <div className={styles.cardContainer}>
            <Spinner />
          </div>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <div className={styles.container}>
            <div className={styles.recentTitleContainer}>
                <h2 className={styles.recentTitle}>Recent Reviews</h2>
            </div>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.reviews.map((review: InfiniteReviewProps, index: number) => (
                  <RecentItem
                    review={review}
                    key={index}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

      <div className={styles.loadingContainer}>
        {isFetchingNextPage && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    
    </>
    )
}