import { State } from '../@types'

/** Set note focus. */
const setNoteFocus = (state: State, { value }: { value: boolean }): State => ({
  ...state,
  noteFocus: value,
})

export default setNoteFocus
