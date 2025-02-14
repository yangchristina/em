import Path from '../@types/Path'
import SimplePath from '../@types/SimplePath'
import State from '../@types/State'
import getContextsSortedAndRanked from '../selectors/getContextsSortedAndRanked'
import head from '../util/head'
import normalizeThought from '../util/normalizeThought'
import splice from '../util/splice'
import childIdsToThoughts from './childIdsToThoughts'
import getThoughtById from './getThoughtById'
import parentOfThought from './parentOfThought'

/** Merges thoughts into a context chain, removing the overlapping head. */
// use autogenerated rank of context
// if there is no/empty context chain, return thoughtsRanked as-is
const chain = (state: State, contextChain: SimplePath[], simplePath: SimplePath): Path => {
  if (!contextChain || contextChain.length === 0) return simplePath

  // get the head thought in the last segment of the contextChain
  const pivot = getThoughtById(state, head(contextChain[contextChain.length - 1]))
  if (!pivot) return simplePath

  // @MIGRATION_TODO: Maybe warn if thoughts are not found.
  const simplePathThoughts = childIdsToThoughts(state, simplePath)
  const simplePathThoughtsValidated = simplePathThoughts.length === simplePath.length ? simplePathThoughts : []
  const i = simplePathThoughtsValidated.findIndex(child => {
    return normalizeThought(child.value) === normalizeThought(pivot.value)
  })

  // TODO: This should never happen, but the Subthoughts test causes i === -1
  // if (i === -1) {
  //   console.warn('chain: contextChain pivot child not found in simplePath',pivot, simplePath)
  //   console.warn('simplePath', pathToContext(simplePath))
  //   console.warn('contextChain', contextChain)
  //   console.warn('pivot', pivot)
  // }

  const append = simplePathThoughts.slice(i - 1)
  const contexts = getContextsSortedAndRanked(state, pivot.value)
  const appendedThoughtInContext = contexts.find(
    child => normalizeThought(parentOfThought(state, child.id)?.value || '') === normalizeThought(append[0].value),
  )

  // keep the first segment intact
  // then remove the overlapping head of each one after
  return contextChain
    .concat([
      appendedThoughtInContext ? [appendedThoughtInContext.id].concat(append.slice(1).map(({ id }) => id)) : append,
    ] as SimplePath[])
    .map((thoughts, i) => (i > 0 ? splice(thoughts, 1, 1) : thoughts))
    .flat() as Path
}

export default chain
