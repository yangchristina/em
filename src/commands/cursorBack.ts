import Command from '../@types/Command'
import { clearMulticursorsActionCreator as clearMulticursors } from '../actions/clearMulticursors'
import { cursorBackActionCreator as cursorBack } from '../actions/cursorBack'
import { isTouch } from '../browser'
import BackIcon from '../components/icons/BackIcon'
import * as selection from '../device/selection'
import hasMulticursor from '../selectors/hasMulticursor'
import throttleByAnimationFrame from '../util/throttleByAnimationFrame'

const cursorBackCommand: Command = {
  id: 'cursorBack',
  label: 'Back',
  description: 'Move the cursor up a level.',
  gesture: 'r',
  svg: BackIcon,
  keyboard: 'Escape',
  multicursor: false,
  exec: throttleByAnimationFrame((dispatch, getState) => {
    const state = getState()

    // clear multicursor on escape (desktop only)
    if (!isTouch && hasMulticursor(state)) {
      dispatch(clearMulticursors())
      return
    }

    const { cursor, search } = state

    if (cursor || search != null) {
      dispatch(cursorBack())

      // clear browser selection if cursor has been removed
      const { cursor: cursorNew } = getState()
      if (!cursorNew) {
        selection.clear()
      }
    }
  }),
}

export default cursorBackCommand
