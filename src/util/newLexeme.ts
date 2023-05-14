import Lexeme from '../@types/Lexeme'
import ThoughtId from '../@types/ThoughtId'
import Timestamp from '../@types/Timestamp'
import { clientId } from '../data-providers/yjs'
import normalizeThought from './normalizeThought'
import timestamp from './timestamp'

/** Creates a new Lexeme with a single context. Use addContext to add a context to an existing Lexeme. */
const newLexeme = ({
  archived,
  created,
  id,
  lastUpdated,
  value,
}: {
  archived?: Timestamp
  created?: Timestamp
  lastUpdated?: Timestamp
  // the thought to add to lexeme.contexts
  id: ThoughtId
  value: string
}): Lexeme => ({
  ...(archived ? { archived } : null),
  created: timestamp(),
  contexts: [id],
  lemma: normalizeThought(value),
  lastUpdated: timestamp(),
  updatedBy: clientId,
})

export default newLexeme
