import { ModalSwitch } from '~/components'

import AppreciateButton from './AppreciateButton'

const OnboardingAppreciateButton = ({
  total,
  inFixedToolbar
}: {
  total: number
  inFixedToolbar?: boolean
}) => {
  return (
    <ModalSwitch modalId="likeCoinTermModal">
      {(open: any) => (
        <AppreciateButton
          onClick={() => {
            open()
          }}
          total={total}
          inFixedToolbar={inFixedToolbar}
        />
      )}
    </ModalSwitch>
  )
}

export default OnboardingAppreciateButton