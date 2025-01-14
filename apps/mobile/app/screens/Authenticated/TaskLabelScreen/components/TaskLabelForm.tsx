import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { translate } from "../../../../i18n"
import { ITaskLabelCreate, ITaskLabelItem } from "../../../../services/interfaces/ITaskLabel"
import { typography, useAppTheme } from "../../../../theme"
import ColorDropDown from "./ColorDropDown"
import IconDropDown from "./IconDropdown"

const TaskLabelForm = ({
	isEdit,
	onDismiss,
	item,
	onCreateLabel,
	onUpdateLabel,
}: {
	isEdit: boolean
	onDismiss: () => unknown
	item?: ITaskLabelItem
	onUpdateLabel: (id: string, data: ITaskLabelCreate) => unknown
	onCreateLabel: (data: ITaskLabelCreate) => unknown
}) => {
	const { colors, dark } = useAppTheme()
	const [labelName, setLabelName] = useState<string>(null)
	const [labelColor, setLabelColor] = useState<string>(null)
	const [labelIcon, setLabelIcon] = useState<string>(null)

	useEffect(() => {
		if (isEdit) {
			setLabelName(item.value)
			setLabelColor(item.color)
			setLabelIcon(item.icon)
		} else {
			setLabelName(null)
			setLabelColor(null)
			setLabelIcon(null)
		}
	}, [item, isEdit])

	const handleSubmit = async () => {
		if (labelName.trim().length <= 0 || labelColor.trim().length <= 0) {
			return
		}

		if (isEdit) {
			await onUpdateLabel(item?.id, {
				icon: null,
				color: labelColor,
				name: labelName,
			})
		} else {
			await onCreateLabel({
				icon: null,
				color: labelColor,
				name: labelName,
			})
		}
		setLabelColor(null)
		setLabelName(null)
		setLabelIcon(null)
		onDismiss()
	}

	return (
		<View
			style={{
				backgroundColor: colors.background,
				paddingHorizontal: 25,
				paddingTop: 26,
				paddingBottom: 40,
				height: 452,
			}}
		>
			<Text style={{ ...styles.formTitle, color: colors.primary }}>
				{translate("settingScreen.statusScreen.createNewStatusText")}
			</Text>
			<TextInput
				style={{ ...styles.statusNameInput, color: colors.primary }}
				placeholderTextColor={"#7B8089"}
				placeholder={translate("settingScreen.labelScreen.labelNamePlaceholder")}
				defaultValue={labelName}
				onChangeText={(text) => setLabelName(text)}
			/>

			<IconDropDown icon={labelIcon} setIcon={setLabelIcon} />

			<ColorDropDown color={labelColor} setColor={setLabelColor} />

			<View style={styles.wrapButtons}>
				<TouchableOpacity style={styles.cancelBtn} onPress={() => onDismiss()}>
					<Text style={styles.cancelTxt}>
						{translate("settingScreen.labelScreen.cancelButtonText")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						...styles.createBtn,
						backgroundColor: dark ? "#6755C9" : "#3826A6",
						opacity: !labelColor || !labelName ? 0.2 : 1,
					}}
					onPress={() => (!labelColor || !labelName ? {} : handleSubmit())}
				>
					<Text style={styles.createTxt}>
						{isEdit
							? translate("settingScreen.labelScreen.updateButtonText")
							: translate("settingScreen.labelScreen.createButtonText")}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cancelBtn: {
		alignItems: "center",
		backgroundColor: "#E6E6E9",
		borderRadius: 12,
		height: 57,
		justifyContent: "center",
		width: "48%",
	},
	cancelTxt: {
		color: "#1A1C1E",
		fontFamily: typography.primary.semiBold,
		fontSize: 18,
	},
	createBtn: {
		alignItems: "center",
		backgroundColor: "#3826A6",
		borderRadius: 12,
		height: 57,
		justifyContent: "center",
		width: "48%",
	},
	createTxt: {
		color: "#FFF",
		fontFamily: typography.primary.semiBold,
		fontSize: 18,
	},
	formTitle: {
		color: "#1A1C1E",
		fontFamily: typography.primary.semiBold,
		fontSize: 24,
	},
	statusNameInput: {
		alignItems: "center",
		borderColor: "#DCE4E8",
		borderRadius: 12,
		borderWidth: 1,
		height: 57,
		marginTop: 16,
		paddingHorizontal: 18,
		width: "100%",
	},
	wrapButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 40,
		width: "100%",
	},
})

export default TaskLabelForm
