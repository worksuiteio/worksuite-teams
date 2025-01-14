/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useRef, useState } from "react"
import * as Animatable from "react-native-animatable"
import EStyleSheet from "react-native-extended-stylesheet"
import { View, Text, Dimensions, TextInput, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Feather } from "@expo/vector-icons"
import { ActivityIndicator } from "react-native-paper"

import { translate } from "../../../i18n"
import { Button, TextField } from "../../../components"
import { spacing, typography, useAppTheme } from "../../../theme"
import { useStores } from "../../../models"
import { CodeInput } from "../../../components/CodeInput"
import { GLOBAL_STYLE as GS } from "../../../../assets/ts/styles"
import { EMAIL_REGEX } from "../../../helpers/regex"

interface Props {
	isLoading: boolean
	errors: any
	setWithTeam: (value: boolean) => unknown
	setScreenStatus: (value: { screen: number; animation: boolean }) => unknown
	joinTeam: () => unknown
	getAuthCode: () => unknown
	joinError: string
}
const { width } = Dimensions.get("window")
const PassCode: FC<Props> = observer(
	({ isLoading, errors, setScreenStatus, setWithTeam, joinTeam, getAuthCode, joinError }) => {
		const { colors } = useAppTheme()
		const {
			authenticationStore: { authEmail, setAuthEmail, setAuthInviteCode, authInviteCode },
		} = useStores()

		const authTeamInput = useRef<TextInput>()
		const [step, setStep] = useState<"Email" | "Code">("Email")
		const [isValid, setIsValid] = useState<{ step1: boolean; step2: boolean }>({
			step1: false,
			step2: false,
		})

		const onNextStep = () => {
			if (step === "Email") {
				setStep("Code")
				return
			}

			if (step === "Code") {
				joinTeam()
			}
		}
		const onPrevStep = () => {
			if (step === "Email") {
				setWithTeam(false)
				setScreenStatus({
					screen: 1,
					animation: true,
				})
				return
			}

			if (step === "Code") {
				setStep("Email")
			}
		}

		const onChangeEmail = (text: string) => {
			setAuthEmail(text)
			if (EMAIL_REGEX.test(text)) {
				setIsValid({
					...isValid,
					step1: true,
				})
			} else {
				setIsValid({
					...isValid,
					step1: false,
				})
			}
		}

		const onChangeAuthCode = (text: string) => {
			setAuthInviteCode(text)
			if (text.length === 6) {
				setIsValid({
					...isValid,
					step2: true,
				})
			} else {
				setIsValid({
					...isValid,
					step2: false,
				})
			}
		}

		useEffect(() => {
			if (step === "Email" && EMAIL_REGEX.test(authEmail)) {
				setIsValid({
					...isValid,
					step1: true,
				})
			}

			if (step === "Code" && authInviteCode.length === 6) {
				setIsValid({
					...isValid,
					step2: true,
				})
			}
		}, [step])

		return (
			<Animatable.View animation={"zoomIn"} delay={100} style={styles.form}>
				{step === "Email" ? (
					<>
						<Text style={styles.text}>{translate("loginScreen.inviteStepLabel")}</Text>
						<TextField
							placeholder={translate("loginScreen.emailFieldPlaceholder")}
							containerStyle={styles.textField}
							placeholderTextColor={"rgba(40, 32, 72, 0.4)"}
							inputWrapperStyle={styles.inputStyleOverride}
							ref={authTeamInput}
							value={authEmail}
							onChangeText={onChangeEmail}
							autoCapitalize="none"
							autoCorrect={false}
							editable={!isLoading}
							helper={errors?.authEmail}
							status={errors?.authEmail ? "error" : undefined}
							onSubmitEditing={() => authTeamInput.current?.focus()}
						/>
					</>
				) : (
					<View>
						<Text style={{ ...styles.text, alignSelf: "center" }}>
							{translate("loginScreen.inviteCodeFieldLabel")}
						</Text>
						<CodeInput
							onChange={onChangeAuthCode}
							editable={!isLoading}
							defaultValue={authInviteCode}
						/>
						{joinError ? <Text style={styles.verifyError}>{joinError}</Text> : null}
						<TouchableOpacity onPress={() => getAuthCode()}>
							<Text style={styles.resendText}>
								{translate("loginScreen.codeNotReceived")}
								{translate("loginScreen.sendCode").substring(0, 2)}
								<Text style={{ color: colors.primary }}>
									{translate("loginScreen.sendCode").substring(2)}
								</Text>
							</Text>
						</TouchableOpacity>
					</View>
				)}
				<View style={styles.buttonsView}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							width: 65,
						}}
						onPress={() => onPrevStep()}
					>
						<Feather name="arrow-left" size={24} color={"#3826A6"} />
						<Text style={styles.backButtonText}>{translate("common.back")}</Text>
					</TouchableOpacity>
					<Button
						style={[
							$tapButton,
							{
								width: width / 2.1,
								opacity:
									isLoading ||
									(step === "Email" && !isValid.step1) ||
									(step === "Code" && !isValid.step2)
										? 0.5
										: 1,
							},
						]}
						textStyle={styles.tapButtonText}
						onPress={() => onNextStep()}
						disabled={(step === "Email" && !isValid.step1) || (step === "Code" && !isValid.step2)}
					>
						<Text>
							{step === "Code"
								? translate("loginScreen.tapJoin")
								: translate("loginScreen.tapContinue")}
						</Text>
					</Button>
					<ActivityIndicator
						style={styles.loading}
						animating={isLoading}
						size={"small"}
						color={"#fff"}
					/>
				</View>
			</Animatable.View>
		)
	},
)

export default PassCode

const $tapButton: ViewStyle = {
	marginTop: spacing.extraSmall,
	width: width / 3,
	borderRadius: 10,
	backgroundColor: "#3826A6",
}

const styles = EStyleSheet.create({
	form: {
		position: "absolute",
		display: "flex",
		flex: 1,
		width: "90%",
		top: "-32%",
		padding: "1.5rem",
		alignSelf: "center",
		backgroundColor: "#fff",
		alignItems: "center",
		borderRadius: "1rem",
		justifyContent: "flex-start",
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.1)",
		zIndex: 1000,
		...GS.shadowSm,
	},
	text: {
		fontSize: "1.5rem",
		marginBottom: "2rem",
		color: "#1A1C1E",
		width: "100%",
		textAlign: "center",
		fontFamily: typography.primary.semiBold,
	},
	buttonsView: {
		width: "100%",
		display: "flex",
		marginTop: "2rem",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	inputStyleOverride: {
		height: "3.3rem",
		borderColor: "rgba(0,0,0,0.1)",
		backgroundColor: "#FFFFFF",
		paddingVertical: "0.43rem",
		paddingHorizontal: "0.6rem",
		borderRadius: "0.6rem",
	},
	textField: {
		width: "100%",
		borderRadius: "1.25rem",
	},
	backButtonText: {
		fontSize: "0.87rem",
		fontFamily: typography.primary.semiBold,
		color: "#3826A6",
	},
	tapButtonText: {
		color: "#fff",
		fontFamily: typography.primary.semiBold,
		fontSize: "1rem",
	},
	inputInviteTitle: {
		fontSize: "0.87rem",
		marginTop: "1.8rem",
		marginBottom: "1rem",
		fontFamily: typography.primary.medium,
		color: "#B1AEBC",
	},
	resendText: {
		fontSize: "0.87rem",
		color: "#B1AEBC",
		marginTop: "1.2rem",
		fontFamily: typography.primary.medium,
	},
	loading: {
		position: "absolute",
		bottom: "20%",
		right: "47%",
	},
	verifyError: {
		color: "red",
		margin: 10,
	},
})
