import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"

// COMPONENTS
import { Screen, Text } from "../../components"
import { AuthenticatedTabScreenProps } from "../../navigators/AuthenticatedNavigator"

// STYLES
import { spacing } from "../../theme"

export const AuthenticatedTimerScreen: FC<AuthenticatedTabScreenProps<"Timer">> =
  function AuthenticatedTimerScreen(_props) {
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" style={$title}>
          ⏳ Timer
        </Text>
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
}