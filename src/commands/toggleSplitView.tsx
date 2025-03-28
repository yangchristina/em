import { css, cx } from '../../styled-system/css'
import { iconRecipe } from '../../styled-system/recipes'
import Command from '../@types/Command'
import IconType from '../@types/IconType'
import { toggleSplitViewActionCreator as toggleSplitView } from '../actions/toggleSplitView'

// eslint-disable-next-line jsdoc/require-jsdoc, react-refresh/only-export-components
const Icon = ({ fill, size = 20, style, cssRaw }: IconType) => (
  <svg className={cx(iconRecipe(), css(cssRaw))} width={size} height={size} style={style} viewBox='0 0 110 110'>
    <path
      d='M97.073 7H13.53C10.49 7 8 9.48 8 12.51v84.01c0 3.03 2.489 5.51 5.53 5.51h83.543c3.041 0 5.53-2.48 5.53-5.51V12.51c0-3.03-2.489-5.51-5.53-5.51zm-85.51 89.52V23.837h41.364V98.48H13.53c-1.066 0-1.967-.897-1.967-1.96zm87.478 0c0 1.063-.901 1.96-1.968 1.96H57.677V23.838H99.04v72.681z'
      fill={fill || style!.fill}
      fillRule='evenodd'
    />
  </svg>
)

const toggleSplitViewCommand: Command = {
  id: 'toggleSplitView',
  label: 'Split View',
  description: 'Render two independent views for side-by-side editing.',
  descriptionInverse: 'Revert to a single editing view.',
  multicursor: false,
  svg: Icon,
  exec: (dispatch, getState) => {
    const state = getState()
    dispatch(toggleSplitView({ value: !state.showSplitView }))
  },
  isActive: state => state.showSplitView,
}

export default toggleSplitViewCommand
