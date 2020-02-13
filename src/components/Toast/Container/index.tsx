import { useState } from 'react'

import { useEventListener } from '~/components/Hook'

import { ADD_TOAST, REMOVE_TOAST } from '~/common/enums'

import { ToastWithEffect } from '../Instance'
import styles from './styles.css'

/**
 * ToastContainer is a place for managing Toast components. Use event system to
 * create and remove Toast components.
 *
 * Usage:
 *
 * ```jsx
 * <ToastContainer layout="" />
 * ```
 */

const prefix = 'toast-'

const Container = ({
  layout = 'l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2'
}: {
  layout?: string
}) => {
  const [toasts, setToasts] = useState<any[]>([])

  const add = (payload: { [key: string]: any }) => {
    if (!payload || Object.keys(payload).length === 0) {
      return false
    }
    setToasts(prev => [{ id: `${prefix}${Date.now()}`, ...payload }, ...prev])
  }

  const remove = (payload: { id: string }) => {
    const { id } = payload
    if (!id || !id.startsWith(prefix)) {
      return
    }
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  useEventListener(ADD_TOAST, add)
  useEventListener(REMOVE_TOAST, remove)

  return (
    <>
      <section className="toast-container">
        <div className="l-row">
          <div className={layout}>
            {toasts.map(toast => (
              <ToastWithEffect key={toast.id} {...toast} />
            ))}
          </div>
        </div>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

export default Container