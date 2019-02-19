/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedDigestActionsArticle
// ====================================================

export interface FeedDigestActionsArticle_author {
  __typename: "User";
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface FeedDigestActionsArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface FeedDigestActionsArticle {
  __typename: "Article";
  author: FeedDigestActionsArticle_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: FeedDigestActionsArticle_comments;
}