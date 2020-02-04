import classNames from 'classnames'
import Link from 'next/link'
import { forwardRef } from 'react'

import styles from './styles.css'

type ButtonWidth = '2rem' | '4rem' | '6rem' | undefined | null

type ButtonHeight =
  | '1rem'
  | '1.25rem'
  | '1.5rem'
  | '2rem'
  | '2.25rem'
  | '3rem'
  | undefined
  | null

type ButtonSpacingY = 0 | '0' | 'xxtight' | 'xtight' | 'tight' | 'base'

type ButtonSpacingX = 0 | '0' | 'xtight' | 'tight' | 'base' | 'loose'

type ButtonTextColor = 'white' | 'black' | 'green' | 'red'

type ButtonColor =
  | 'white'
  | 'grey'
  | 'grey-lighter'
  | 'green-lighter'
  | 'green'
  | 'gold'
  | 'red'

interface ButtonProps {
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacingY, ButtonSpacingX]

  textColor?: ButtonTextColor
  textHoverColor?: ButtonTextColor

  bgColor?: ButtonColor
  bgHoverColor?: ButtonColor

  borderColor?: ButtonColor
  borderWidth?: 'sm'
  borderRadius?: 0 | '0' | '5rem'

  href?: string
  as?: string

  is?: 'span'

  [key: string]: any
}

export const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      spacing = [0, 0],
      size = [null, null],

      textColor,
      textHoverColor,

      bgColor,
      bgHoverColor,

      borderColor,
      borderWidth,
      borderRadius = '5rem',

      href,
      as,

      is,

      className,
      children,
      ...restProps
    },
    ref
  ) => {
    const isClickable = is !== 'span' && !restProps.disabled
    const isTransparent = !bgColor && !borderColor
    const [width, height] = size
    const [spacingY, spacingX] = spacing

    // container
    const containerClass = classNames({
      container: true,
      isTransparent,
      'centering-x': width && isTransparent,
      'centering-y': height && isTransparent,
      [`spacing-y-${spacingY}`]: !!spacingY,
      [`spacing-x-${spacingX}`]: !!spacingX,
      [`bg-${bgColor}`]: !!bgColor,
      [`bg-hover-${bgHoverColor}`]: !!bgHoverColor && isClickable,
      [`border-${borderColor}`]: !!borderColor,
      [`border-${borderWidth}`]: !!borderWidth,
      [`text-${textColor}`]: !!textColor,
      [`text-hover-${textHoverColor}`]: !!textHoverColor && isClickable,
      [className]: !!className
    })
    const containerProps = {
      ...restProps,
      ref: ref as React.RefObject<any>,
      className: containerClass,
      'data-clickable': isClickable
    }

    // content
    const contentStyle = {
      width: (!isTransparent && width) || undefined,
      height: (!isTransparent && height) || undefined
    }

    // hotarea
    const hotAreaStyle = {
      width: width || undefined,
      height: height || undefined,
      borderRadius
    }

    // span
    if (is === 'span') {
      return (
        <span {...containerProps}>
          <div className="content" style={contentStyle}>
            <div className="hotarea" style={hotAreaStyle} />
            {children}
          </div>
          <style jsx>{styles}</style>
        </span>
      )
    }

    // anchor
    if (href && !as) {
      return (
        <a href={href} {...containerProps}>
          <div className="content" style={contentStyle}>
            <div className="hotarea" style={hotAreaStyle} />
            {children}
          </div>
          <style jsx>{styles}</style>
        </a>
      )
    }

    // link
    if (href && as) {
      return (
        <Link href={href} as={as}>
          <a {...containerProps}>
            <div className="content" style={contentStyle}>
              <div className="hotarea" style={hotAreaStyle} />
              {children}
            </div>
            <style jsx>{styles}</style>
          </a>
        </Link>
      )
    }

    // button
    return (
      <button {...containerProps}>
        <div className="content" style={contentStyle}>
          <div className="hotarea" style={hotAreaStyle} />
          {children}
        </div>
        <style jsx>{styles}</style>
      </button>
    )
  }
)
