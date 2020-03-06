import gql from 'graphql-tag'

import {
  Button,
  DropdownDialog,
  Icon,
  Menu,
  ShareDialog,
  TextIcon,
  Translate
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { TEXT } from '~/common/enums'

import { DropdownActionsUser } from './__generated__/DropdownActionsUser'

const fragments = {
  user: gql`
    fragment DropdownActionsUser on User {
      id
      ...BlockUser
    }
    ${BlockUser.fragments.user}
  `
}

interface DropdownActionsProps {
  user: DropdownActionsUser
  isMe: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openBlockUserDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  user,
  isMe,
  openShareDialog,
  openBlockUserDialog
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<Icon.Share size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享主頁" zh_hans="分享主页" />
        </TextIcon>
      </Menu.Item>

      {!isMe && (
        <BlockUser.Button user={user} openDialog={openBlockUserDialog} />
      )}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content />,
        title: <Translate id="moreActions" />
      }}
    >
      {({ open, ref }) => (
        <Button
          bgColor="green-lighter"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <Icon.MoreLarge size="lg" color="green" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = ({ user, isMe }: DropdownActionsProps) => {
  return (
    <ShareDialog>
      {({ open: openShareDialog }) => (
        <BlockUser.Dialog user={user}>
          {({ open: openBlockUserDialog }) => (
            <BaseDropdownActions
              user={user}
              isMe={isMe}
              openShareDialog={openShareDialog}
              openBlockUserDialog={openBlockUserDialog}
            />
          )}
        </BlockUser.Dialog>
      )}
    </ShareDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
