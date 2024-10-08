/** Focus on the next .editable element in the DOM after the given .editable. May be a sibling or the nearest ancestor's next sibling. */
const selectNextEditable = (currentNode: Node) => {
  const allElements = document.querySelectorAll('[data-editable]')
  const currentIndex = Array.prototype.findIndex.call(allElements, el => currentNode.isEqualNode(el))
  if (currentIndex < allElements.length - 1) {
    const el = allElements[currentIndex + 1] as HTMLElement
    el.focus()
  }
}

export default selectNextEditable
