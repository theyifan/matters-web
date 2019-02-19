/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TopicsDigestArticle
// ====================================================

export interface TopicsDigestArticle_author {
  __typename: "User";
  userName: string;
}

export interface TopicsDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface TopicsDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  author: TopicsDigestArticle_author;
  mediaHash: string | null;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: TopicsDigestArticle_comments;
}