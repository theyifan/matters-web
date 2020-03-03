import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  Button,
  Icon,
  List,
  PageHeader,
  Spinner,
  TextIcon,
  Translate,
  UserDigest
} from '~/components'
import { QueryError } from '~/components/GQL'

import styles from './styles.css'

import { AuthorPicker as AuthorPickerType } from './__generated__/AuthorPicker'

const AUTHOR_PICKER = gql`
  query AuthorPicker {
    viewer {
      id
      followees(input: { first: 0 }) {
        totalCount
      }
      recommendation {
        authors(input: { first: 5, filter: { random: true } }) {
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

export const AuthorPicker = ({
  title,
  titleIs
}: {
  title: React.ReactNode
  titleIs?: string
}) => {
  const containerStyle = classNames({
    'sm-size-header': titleIs === 'span'
  })

  const { loading, data, error, refetch } = useQuery<AuthorPickerType>(
    AUTHOR_PICKER,
    {
      notifyOnNetworkStatusChange: true
    }
  )
  const edges = data?.viewer?.recommendation.authors.edges || []
  const followeeCount = data?.viewer?.followees.totalCount || 0

  return (
    <section className={containerStyle}>
      <PageHeader title={title}>
        <section className="header-buttons">
          <Button
            size={[null, '1.25rem']}
            spacing={[0, 'xtight']}
            bgHoverColor="grey-lighter"
            onClick={() => refetch()}
          >
            <TextIcon icon={<Icon.Reload size="sm" />} color="grey">
              <Translate id="shuffle" />
            </TextIcon>
          </Button>

          <span className="follow-info">
            <Translate zh_hant="已追蹤 " zh_hans="已追踪 " />
            <span className="hightlight">{followeeCount}</span>
            <Translate zh_hant=" 位" zh_hans=" 位" />
          </span>
        </section>
      </PageHeader>

      {loading && <Spinner />}

      {error && <QueryError error={error} />}

      {!loading && (
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <UserDigest.Rich user={node} hasFollow />
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}