import { BackToHomeButton, Dialog, Layout, Translate } from '~/components'

const Complete = ({
  purpose,
  closeDialog,
}: {
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isInPage = purpose === 'page'

  return (
    <>
      {isInPage && (
        <Layout.Header left={<Layout.Header.Title id="changeEmail" />} />
      )}

      {closeDialog && (
        <Dialog.Header
          title="successChangeEmail"
          close={closeDialog}
          headerHidden
        />
      )}

      <Dialog.Message
        description={
          <>
            <p>
              <Translate id="successChangeEmail" />
            </p>
            <br />
            {isInPage && <BackToHomeButton />}
          </>
        }
      />

      {!isInPage && closeDialog && (
        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      )}
    </>
  )
}

export default Complete
