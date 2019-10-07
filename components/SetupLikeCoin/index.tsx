import { useState } from 'react'

import Binding from './Binding'
import Complete from './Complete'
import Generating from './Generating'
import Select from './Select'

interface Props {
  submitCallback?: () => void
  scrollLock?: boolean
}

type Step = 'select' | 'binding' | 'generating' | 'complete'

const SetupLikeCoin: React.FC<Props> = ({ submitCallback, scrollLock }) => {
  const [step, setStep] = useState<Step>('select')
  const [bindingWindowRef, setBindingWindowRef] = useState<Window | undefined>(
    undefined
  )
  const backToSelect = () => setStep('select')
  const complete = () => {
    if (submitCallback) {
      submitCallback()
    } else {
      setStep('complete')
    }
  }

  return (
    <>
      {step === 'select' && (
        <Select
          startGenerate={() => setStep('generating')}
          startBind={(windowRef?: Window) => {
            setStep('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
          scrollLock={scrollLock}
        />
      )}
      {step === 'generating' && (
        <Generating
          prevStep={backToSelect}
          nextStep={complete}
          scrollLock={scrollLock}
        />
      )}
      {step === 'binding' && (
        <Binding
          prevStep={backToSelect}
          nextStep={complete}
          windowRef={bindingWindowRef}
          scrollLock={scrollLock}
        />
      )}
      {step === 'complete' && <Complete scrollLock={scrollLock} />}
    </>
  )
}

export default SetupLikeCoin