import { View } from 'moti'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Dispatch from '../../@types/Dispatch'
import tutorial from '../../action-creators/tutorial'
import tutorialChoice from '../../action-creators/tutorialChoice'
import tutorialNext from '../../action-creators/tutorialNext'
import setTutorialStep from '../../action-creators/tutorialStep'
import {
  TUTORIAL2_STEP_CHOOSE,
  TUTORIAL2_STEP_START,
  TUTORIAL2_STEP_SUCCESS,
  TUTORIAL_STEP_START,
  TUTORIAL_STEP_SUCCESS,
  TUTORIAL_VERSION_BOOK,
  TUTORIAL_VERSION_JOURNAL,
  TUTORIAL_VERSION_TODO,
} from '../../constants'
import { commonStyles } from '../../style/commonStyles'
import { Text } from '../Text.native'
import TutorialNavigationButton from './TutorialNavigationButton.native'
import TutorialNavigationNext from './TutorialNavigationNext'
import TutorialNavigationPrev from './TutorialNavigationPrev'

const { directionRow, justifyContentCenter, alignItemsCenter } = commonStyles

interface IComponentProps {
  tutorialStep: number
  dispatch: Dispatch
}
// eslint-disable-next-line jsdoc/require-jsdoc
const TutorialNavigation = ({ tutorialStep, dispatch }: IComponentProps) => {
  const tutorialOptions = [
    { key: TUTORIAL_VERSION_TODO, value: TUTORIAL_VERSION_TODO, textValue: 'To-Do List' },
    { key: TUTORIAL_VERSION_JOURNAL, value: TUTORIAL_VERSION_JOURNAL, textValue: 'Journal Theme' },
    { key: TUTORIAL_VERSION_BOOK, value: TUTORIAL_VERSION_BOOK, textValue: 'Book/Podcast Notes' },
  ]
  return (
    <View>
      <View style={[directionRow, justifyContentCenter]}>
        {Array(
          tutorialStep < TUTORIAL2_STEP_START
            ? TUTORIAL_STEP_SUCCESS - TUTORIAL_STEP_START + 1
            : TUTORIAL2_STEP_SUCCESS - TUTORIAL2_STEP_START + 1,
        )
          .fill(0)
          .map((_, i) => {
            const step = i + (tutorialStep < TUTORIAL2_STEP_START ? 1 : TUTORIAL2_STEP_START)
            const active = step === Math.floor(tutorialStep)

            return (
              <TouchableOpacity key={step} onPress={() => dispatch(setTutorialStep({ value: step }))}>
                <Text style={[styles.dot, !active && commonStyles.halfOpacity]}> • </Text>
              </TouchableOpacity>
            )
          })}
      </View>

      {tutorialStep === TUTORIAL_STEP_SUCCESS ? (
        <View>
          <TutorialNavigationButton
            isLast
            clickHandler={() => dispatch(setTutorialStep({ value: TUTORIAL2_STEP_START }))}
            value='Learn more'
          />
          <TutorialNavigationButton
            isLast
            clickHandler={() => dispatch(tutorial({ value: false }))}
            value='Play on my own'
          />
        </View>
      ) : tutorialStep === TUTORIAL2_STEP_CHOOSE ? (
        <View>
          {tutorialOptions.map(({ key, value, textValue }) => (
            <TutorialNavigationButton
              key={key}
              isLast
              clickHandler={() => {
                dispatch([tutorialChoice({ value: `${value}` }), tutorialNext({})])
              }}
              value={textValue}
            />
          ))}
        </View>
      ) : (
        <View style={[directionRow, alignItemsCenter]}>
          <TutorialNavigationPrev tutorialStep={tutorialStep} />
          <TutorialNavigationNext />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: { fontSize: 20 },
})

export default TutorialNavigation