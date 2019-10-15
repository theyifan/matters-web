import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'
import { Translate } from '~/components/Language'
import { Tooltip } from '~/components/Popper'

import { TEXT, UrlFragments } from '~/common/enums'
import { toPath } from '~/common/utils'

import Actions, { ActionsControls } from '../Actions'
import { SidebarDigestArticle } from './__generated__/SidebarDigestArticle'
import styles from './styles.css'

type SidebarDigestProps = {
  type?: 'collection'
  article: SidebarDigestArticle
  hasCover?: boolean
  disabled?: boolean
  extraContainerClass?: string
} & ActionsControls

const fragments = {
  article: gql`
    fragment SidebarDigestArticle on Article {
      id
      title
      slug
      live
      cover @include(if: $hasArticleDigestCover)
      author {
        id
        userName
      }
      mediaHash
      ...DigestActionsArticle
    }
    ${Actions.fragments.article}
  `
}

const SidebarDigest = ({
  type,
  article,
  hasCover,
  disabled,
  extraContainerClass,
  ...actionControls
}: SidebarDigestProps) => {
  const { author, slug, mediaHash, title, live, state } = article
  const cover = 'cover' in article ? article.cover : null

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash,
    fragment: live ? UrlFragments.COMMENTS : ''
  })
  const containerClasses = classNames({
    container: true,
    ...(extraContainerClass
      ? { [extraContainerClass]: extraContainerClass }
      : {})
  })
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover,
    'type-collection': type === 'collection',
    inactive: state !== 'active',
    disabled
  })

  return (
    <section className={containerClasses}>
      <div className={contentClasses}>
        <div className="left">
          <Link {...path}>
            <a>
              <Title type="sidebar" is="h2">
                {title}
              </Title>
            </a>
          </Link>
          <Actions article={article} type="sidebar" {...actionControls} />
        </div>

        {hasCover && cover && (
          <Link {...path}>
            <a>
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${cover})`
                }}
              />
            </a>
          </Link>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

const SidebarDigestWrapper = ({
  hasArchivedTooltip,
  article,
  ...props
}: { hasArchivedTooltip?: boolean } & SidebarDigestProps) => {
  const isInactive = article.state !== 'active'

  if (hasArchivedTooltip && isInactive) {
    return (
      <Tooltip
        content={
          <Translate
            zh_hant={TEXT.zh_hant.articleArchived}
            zh_hans={TEXT.zh_hans.articleArchived}
          />
        }
        placement="left"
      >
        <div>
          <SidebarDigest article={article} {...props} />
        </div>
      </Tooltip>
    )
  }

  return <SidebarDigest article={article} {...props} />
}

SidebarDigestWrapper.fragments = fragments

export default SidebarDigestWrapper