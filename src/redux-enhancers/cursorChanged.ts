import { Action, Store, StoreEnhancer, StoreEnhancerStoreCreator } from 'redux'
import State from '../@types/State'
import * as selection from '../device/selection'
import editingValueStore from '../stores/editingValue'
import equalPath from '../util/equalPath'
import headValue from '../util/headValue'
import isDivider from '../util/isDivider'

/**
 * Store enhancer to detect cursor change and trigger appropriate actions (clear selection for now).
 */
const cursorChangedEnhancer: StoreEnhancer<any> =
  (createStore: StoreEnhancerStoreCreator) =>
  <A extends Action<any>>(reducer: (state: any, action: A) => any, initialState: any): Store<State, A> => {
    /** Reducer to modify the state when the cursor is changed. */
    const cursorChangedReducer = (state: State | undefined = initialState, action: A): State => {
      if (!state) return reducer(initialState, action)
      const updatedState: State = reducer(state || initialState, action)
      const value = updatedState.cursor ? headValue(updatedState, updatedState.cursor) : null

      // clears the cursor selection if on divider or cursor is null.
      if (
        // selection may still exist after jump to null
        (!updatedState.cursor && selection.isThought()) ||
        // clear selection when cursor is on divider
        (!equalPath(state.cursor, updatedState.cursor) && isDivider(value!))
      ) {
        selection.clear()
      }

      // The live editing value is stored in a separate ministore to avoid Redux store churn.
      // When the cursor changes, update the editingValue store.
      editingValueStore.update(value)

      return updatedState
    }

    return createStore(cursorChangedReducer, initialState)
  }

export default cursorChangedEnhancer