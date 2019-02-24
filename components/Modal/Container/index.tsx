// External modules
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import classNames from 'classnames'
import { FC, useContext, useEffect, useState } from 'react'

// Internal modules
import { KEYCODES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'
import { Icon, LanguageContext, Title } from '~/components'
import { useNativeEventListener } from '~/components/Hook'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'
import styles from './styles.css'

interface Props {
  alignment?: 'center' | 'bottom'
  children: any
  close: () => {}
  closeOnEsc?: boolean
  closeOnOutsideClick?: boolean
  title?: string
}

const Container: FC<Props> = ({
  alignment = 'center',
  children,
  close,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  title
}) => {
  const { lang } = useContext(LanguageContext)

  // TODO: Ass styles for bottom alignment
  const overlayClass = classNames('overlay', alignment)

  const modalClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-offset-sm-1',
    'l-col-md-4',
    'l-offset-md-2',
    'l-col-lg-4',
    'l-offset-lg-4'
  )

  const [node, setNode] = useState(undefined)

  const interpret = (text: string) => {
    return translate(
      {
        zh_hant: TEXT.zh_hant[text],
        zh_hans: TEXT.zh_hans[text]
      },
      lang
    )
  }

  const handleOnEsc = (event: any) => {
    if (!closeOnEsc) {
      return undefined
    }
    if (event.keyCode !== KEYCODES.escape) {
      return undefined
    }
    close()
  }

  const handleOnOutsideClick = (event: any) => {
    if (!closeOnOutsideClick) {
      return undefined
    }
    if (
      !node ||
      node.contains(event.target) ||
      (event.button && event.button !== 0)
    ) {
      return undefined
    }
    close()
  }

  useNativeEventListener('keydown', handleOnEsc)

  useNativeEventListener('click', handleOnOutsideClick)

  useEffect(() => {
    disableBodyScroll(node)
    return () => {
      enableBodyScroll(node)
    }
  })

  const Header = props => (
    <>
      <div className="header">
        <Title type="modal">{interpret(props.title)}</Title>
        <button type="button" aria-label={interpret('close')} onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <div className={overlayClass}>
        <div ref={setNode} className={modalClass}>
          <div className="container">
            {title && <Header title={title} />}
            {children({ close, interpret })}
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Container