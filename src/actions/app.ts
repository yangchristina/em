import { Action } from 'redux'
import ActionType from '../@types/ActionType'
import Index from '../@types/IndexType'
import State from '../@types/State'
import initialState from '../util/initialState'
import * as reducers from './index'

/**
 * The main app reducer. Uses action.type to select the reducer with the same name. Otherwise throw an error with unknownAction.
 */
const appReducer = (state: State = initialState(), action: Action<ActionType>): State =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((reducers as Index<any>)[action.type] || reducers.unknownAction)(state, action)

export default appReducer
