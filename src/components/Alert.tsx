import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { css } from '../../styled-system/css'
import { token } from '../../styled-system/tokens'
import { alertActionCreator } from '../actions/alert'
import { AlertType } from '../constants'
import alertStore from '../stores/alert'
import strip from '../util/strip'
import ControlledAlert from './ControlledAlert'
import RedoIcon from './RedoIcon'
import UndoIcon from './UndoIcon'

const alertToIcon: { [key in AlertType]?: typeof UndoIcon } = {
  [AlertType.Undo]: UndoIcon,
  [AlertType.Redo]: RedoIcon,
}

/** An alert component that fades in and out. */
const Alert: FC = () => {
  const alert = useSelector(state => state.alert)
  const alertStoreValue = alertStore.useState()
  const value = strip(alertStoreValue ?? alert?.value ?? '')
  const iconSize = useSelector(state => 0.78 * state.fontSize)
  const dispatch = useDispatch()

  /** Dismiss the alert on close. */
  const onClose = useCallback(() => {
    if (!alert?.showCloseLink) return
    dispatch(alertActionCreator(null))
  }, [alert, dispatch])

  const alertType = alert?.alertType
  const Icon = alertType ? alertToIcon[alertType] : null
  const renderedIcon = Icon ? (
    <Icon cssRaw={css.raw({ cursor: 'default' })} size={iconSize} fill={token('colors.fg')} />
  ) : null

  // if dismissed, set timeout to 0 to remove alert component immediately. Otherwise it will block toolbar interactions until the timeout completes.
  return (
    <ControlledAlert
      testId='alert'
      value={value}
      showXOnHover
      onClose={alert?.showCloseLink ? onClose : undefined}
      transitionKey={value}
      renderedIcon={renderedIcon}
    />
  )
}

export default Alert
