/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, StyleSheet, Image, ViewStyle, ImageStyle, Pressable } from "react-native"

import { GLOBAL_STYLE as GS } from "../../assets/ts/styles"
import { useStores } from "../models"
import { useTimer } from "../services/hooks/useTimer"
import { ITeamTask } from "../services/interfaces/ITask"
import { useAppTheme } from "../theme"

type TimerButtonProps = {
	task?: ITeamTask
	containerStyle?: ViewStyle
	iconStyle?: ImageStyle
}

const TimerButton: FC<TimerButtonProps> = observer(({ containerStyle, iconStyle }) => {
	const {
		TimerStore: { localTimerStatus },
	} = useStores()
	const { canRunTimer, startTimer, stopTimer } = useTimer()
	const { dark } = useAppTheme()

	if (dark) {
		return (
			<View>
				{!localTimerStatus.running ? (
					<>
						<Pressable
							style={[
								styles.timerBtnInactive,
								containerStyle,
								{ backgroundColor: "#fff", opacity: canRunTimer ? 1 : 0.4 },
							]}
							disabled={!canRunTimer}
							onPress={() => startTimer()}
						>
							<Image
								resizeMode="contain"
								style={[styles.timerIcon, iconStyle]}
								source={require("../../assets/icons/new/play.png")}
							/>
						</Pressable>
					</>
				) : (
					<Pressable onPress={() => stopTimer()} style={[styles.timerBtnInactive, containerStyle]}>
						<LinearGradient
							colors={["#E93CB9", "#6A71E7"]}
							style={[styles.timerBtnInactive, containerStyle]}
						>
							<Image
								resizeMode="contain"
								style={[styles.timerIcon, iconStyle]}
								source={require("../../assets/icons/new/stop.png")}
							/>
						</LinearGradient>
					</Pressable>
				)}
			</View>
		)
	}

	return (
		<View>
			{!localTimerStatus.running ? (
				<>
					<Pressable
						style={[
							styles.timerBtnInactive,
							containerStyle,
							{ backgroundColor: "#fff", opacity: canRunTimer ? 1 : 0.4 },
						]}
						disabled={!canRunTimer}
						onPress={() => (canRunTimer ? startTimer() : {})}
					>
						<Image
							resizeMode="contain"
							style={[styles.timerIcon, iconStyle]}
							source={require("../../assets/icons/new/play.png")}
						/>
					</Pressable>
				</>
			) : (
				<Pressable onPress={() => stopTimer()} style={[styles.timerBtnInactive, containerStyle]}>
					<Image
						resizeMode="contain"
						style={[styles.timerIcon, iconStyle]}
						source={require("../../assets/icons/new/stop.png")}
					/>
				</Pressable>
			)}
		</View>
	)
})

export default TimerButton

const styles = StyleSheet.create({
	timerBtnInactive: {
		alignItems: "center",
		backgroundColor: "#3826A6",
		borderColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 30,
		borderWidth: 1,
		height: 60,
		justifyContent: "center",
		marginHorizontal: 15,
		width: 60,
		...GS.shadow,
	},
	timerIcon: {
		height: 24,
		width: 24,
	},
})
