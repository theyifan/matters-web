import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Head,
  Icon,
  InfiniteScroll,
  Placeholder
} from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { Query } from '~/components/GQL'
import { Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'
import ICON_192 from '~/static/icon-192x192.png?url'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { UserArticleFeed } from './__generated__/UserArticleFeed'
import styles from './styles.css'

const USER_ARTICLES_FEED = gql`
  query UserArticleFeed(
    $userName: String!
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
        totalWordCount
        profileCover
      }
      articles(input: { first: 10, after: $cursor }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...FeedDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

const ArticleSummaryInfo = ({ data }: { data: UserArticleFeed }) => {
  const { totalWordCount: words } = _get(data, 'user.info', {
    totalWordCount: 0
  })
  const { totalCount: articles } = _get(data, 'user.articles', {
    totalCount: 0
  })
  return (
    <>
      <div className="info">
        <Translate zh_hant="創作了" zh_hans="创作了" />
        <span>{articles}</span>
        <Translate zh_hant="篇作品" zh_hans="篇作品" />
        <Icon
          id={ICON_DOT_DIVIDER.id}
          viewBox={ICON_DOT_DIVIDER.viewBox}
          style={{ width: 18, height: 18 }}
        />
        <Translate zh_hant="累積創作" zh_hans="累积创作" />
        <span>{words}</span>
        <Translate zh_hant="字" zh_hans="字" />
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const UserArticles: React.FC<WithRouterProps> = ({ router }) => {
  const userName = getQuery({ router, key: 'userName' })

  const viewer = useContext(ViewerContext)
  const isMe = viewer.userName === userName

  if (!userName) {
    return null
  }

  return (
    <Query query={USER_ARTICLES_FEED} variables={{ userName }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: UserArticleFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        const connectionPath = 'user.articles'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () => {
          analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
            type: FEED_TYPE.USER_ARTICLE,
            location: edges.length
          })
          return fetchMore({
            variables: {
              cursor: pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) =>
              mergeConnections({
                oldData: previousResult,
                newData: fetchMoreResult,
                path: connectionPath
              })
          })
        }

        const CustomHead = () => (
          <Head
            title={{
              zh_hant: `${data.user.displayName}的創作空間站`,
              zh_hans: `${data.user.displayName}的创作空间站`
            }}
            description={data.user.info.description}
            image={data.user.info.profileCover || ICON_192}
          />
        )

        if (!edges || edges.length <= 0) {
          return (
            <>
              <CustomHead />
              <EmptyArticle />
            </>
          )
        }

        return (
          <>
            <CustomHead />
            <ArticleSummaryInfo data={data} />
            <InfiniteScroll
              hasNextPage={pageInfo.hasNextPage}
              loadMore={loadMore}
            >
              <ul>
                {edges.map(
                  ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                    <li
                      key={cursor}
                      onClick={() =>
                        analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                          type: FEED_TYPE.USER_ARTICLE,
                          location: i
                        })
                      }
                    >
                      <ArticleDigest.Feed
                        article={node}
                        hasBookmark
                        hasDateTime
                        hasFingerprint={isMe}
                        hasState
                      />
                    </li>
                  )
                )}
              </ul>
            </InfiniteScroll>
          </>
        )
      }}
    </Query>
  )
}

export default withRouter(UserArticles)
