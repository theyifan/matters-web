import { IconRemove24, Menu, TextIcon, Translate } from '~/components'

const DeleteCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconRemove24 size="md" />} size="md" spacing="base">
        <Translate id="delete" />
      </TextIcon>
    </Menu.Item>
  )
}

export default DeleteCommentButton
