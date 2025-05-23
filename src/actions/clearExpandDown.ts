import State from '../@types/State'
import Thunk from '../@types/Thunk'
import expandThoughts from '../selectors/expandThoughts'
import { registerActionMetadata } from '../util/actionMetadata.registry'

/** Clear expand down. */
const clearExpandDown = (state: State): State => ({
  ...state,
  expanded: expandThoughts(state, state.cursor),
  expandHoverDownPath: null,
})

/** Action-creator for clearExpandDown. */
export const clearExpandDownActionCreator = (): Thunk => dispatch => dispatch({ type: 'clearExpandDown' })

export default clearExpandDown

// Register this action's metadata
registerActionMetadata('clearExpandDown', {
  undoable: false,
})
