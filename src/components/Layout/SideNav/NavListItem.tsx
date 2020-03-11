import { forwardRef } from 'react'

import { Button, ButtonProps, TextIcon } from '~/components'

import styles from './styles.css'

type NavListItemProps = {
  name: React.ReactNode
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  isMediumUp: boolean
} & ButtonProps

const NavListItem = forwardRef(
  (
    {
      name,
      icon,
      activeIcon,
      active,
      isMediumUp,
      ...buttonProps
    }: NavListItemProps,
    ref
  ) => (
    <li>
      <Button
        bgActiveColor="green-lighter"
        spacing={isMediumUp ? ['xxtight', 'xtight'] : undefined}
        size={isMediumUp ? undefined : ['2rem', '2rem']}
        ref={ref}
        {...buttonProps}
      >
        <TextIcon
          icon={active ? activeIcon : icon}
          size="lg"
          weight="semibold"
          spacing="xtight"
          color={active ? 'green' : 'black'}
        >
          {isMediumUp && name}
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </li>
  )
)

export default NavListItem