import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Path from '../@types/Path'
import State from '../@types/State'
import publishMode from '../util/publishMode'
import ContextBreadcrumbs from './ContextBreadcrumbs'
import HomeLink from './HomeLink'

// eslint-disable-next-line jsdoc/require-jsdoc
const mapStateToProps = (state: State) => {
  const { cursor, showBreadcrumbs } = state
  return {
    cursor,
    showBreadcrumbs,
  }
}

interface IComponentProps {
  cursor?: Path | null
  position?: string
  showBreadcrumbs?: boolean
}

/** A navigation bar that contains a link to home and breadcrumbs. */
const NavBar = ({ cursor, position, showBreadcrumbs }: IComponentProps) => {
  const breadcrumbPath = (cursor ? cursor.slice(publishMode() ? 1 : 0, cursor.length - 1) : []) as Path

  return (
    <View style={styles.container}>
      <HomeLink />

      <ContextBreadcrumbs path={breadcrumbPath} />

      <View style={styles.buttonsContainer}>
        {/* <FeedbackButton /> */}
        {/* <QuickAddButton /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center' },
  breadcrumbs: { color: 'white', flex: 1, flexWrap: 'wrap' },
  buttonsContainer: { flexDirection: 'row', alignItems: 'center' },
})

export default connect(mapStateToProps)(NavBar)