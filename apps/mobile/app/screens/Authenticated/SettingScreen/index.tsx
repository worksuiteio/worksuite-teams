import React, { FC, useEffect, useState } from "react";
import { View, ScrollView, Text, ViewStyle, TextStyle, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Screen } from "../../../components";
import { useStores } from "../../../models";
import { AuthenticatedDrawerScreenProps } from "../../../navigators/AuthenticatedNavigator";
import { typography } from "../../../theme";
import BottomSheet from 'reanimated-bottom-sheet';
import LanguageModal from "./components/LanguageModal";
import PictureSection from "./components/PictureSection";
import SectionTab from "./components/SectionTab";
import SettingHeader from "./components/SettingHeader";
import SingleInfo from "./components/SingleInfo";
import { BlurView } from "expo-blur";
import { translate } from "../../../i18n";
import { useAppTheme } from "../../../app";
import { observer } from "mobx-react-lite";
import Animated from "react-native-reanimated";
import { useSettings } from "../../../services/hooks/features/useSettings";
import { ActivityIndicator } from "react-native-paper";
import FlashMessage from "react-native-flash-message";
import BottomSheetContent from "./components/BottomSheetContent";
import TimezonePopup from "./components/TimezonePopup";
import { useTimezoneModal } from "../../../services/hooks/useTimezoneModal";
import UserTimezone from "./components/UserTimezone";
import LanguageForm from "./components/LanguageForm";
import { useLanguageModal } from "../../../services/hooks/useLanguageModal";
import UserRemoveAccount from "./components/UserRemoveAccount";

export type IPopup = "Names" | "Contact" | "Language" | "TimeZone" | "Schedule" | "Avatar" | "Avatar 2" | "Delete Account" | "Remove Account";

export const AuthenticatedSettingScreen: FC<AuthenticatedDrawerScreenProps<"Setting">> = function AuthenticatedDrawerScreen(_props) {
    const { colors } = useAppTheme();
    const {
        authenticationStore: { toggleTheme },
        teamStore: { activeTeam }
    } = useStores();

    const { user, isLoading, updateUserInfo, onDetectTimezone, preferredLanguage } = useSettings()
    const { isModalOpen, closeModal, openModal, selectedTimezone, setSelectedTimezone } = useTimezoneModal();
    const { isLanguageModalOpen, selectedLanguage, closeLanguageModal, setSelectedLanguage, openLanguageModal } = useLanguageModal();
    // Props
    const { navigation } = _props;
    // ref
    const sheetRef = React.useRef(null);

    // STATES
    const [activeTab, setActiveTab] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [showPopup, setShowPopup] = useState<IPopup>(null)

    const fall = new Animated.Value(1)


    const openBottomSheet = (name: IPopup, snapPoint: number) => {
        setShowPopup(name)
        setIsOpen(true)
        sheetRef.current.snapTo(snapPoint)
    }

    return (
        <>
            <Screen preset="fixed" contentContainerStyle={[$container, { backgroundColor: colors.background }]} safeAreaEdges={["top"]}>
                <LanguageModal
                    visible={isLanguageModalOpen}
                    preferredLanguage={preferredLanguage}
                    onDismiss={() => closeLanguageModal()}
                    onLanguageSelect={(e) => {
                        setSelectedLanguage(e)
                    }}
                />
                <TimezonePopup
                    visible={isModalOpen}
                    onDismiss={() => closeModal()}
                    onTimezoneSelect={(e) => {
                        setSelectedTimezone(e)
                    }}
                />
                <View style={{ flex: 1, zIndex: 100 }}>
                    {isOpen && <TouchableWithoutFeedback
                        onPress={() => {
                            setIsOpen(false)
                            sheetRef.current.snapTo(2)
                        }
                        }>
                        <BlurView tint="dark" intensity={15} style={$blurContainer} />
                    </TouchableWithoutFeedback>
                    }
                    <View style={[$headerContainer, { backgroundColor: colors.background }]}>
                        <SettingHeader {..._props} />
                        <SectionTab activeTabId={activeTab} toggleTab={setActiveTab} />
                    </View>
                    <View style={{ flex: 5 }}>
                        {isLoading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <ActivityIndicator size={"small"} />
                            </View> :
                            <ScrollView bounces={false}>
                                {activeTab === 1 ?
                                    // PERSONAL SECTION CONTENT STARTS HERE
                                    <View style={[$contentContainer, { backgroundColor: colors.background, opacity: 0.9 }]}>
                                        <PictureSection
                                            imageUrl={user?.imageUrl}
                                            buttonLabel={translate("settingScreen.personalSection.changeAvatar")}
                                            onDelete={() => { }}
                                            onChange={() => openBottomSheet("Avatar", 1)}
                                        />
                                        <SingleInfo title={translate("settingScreen.personalSection.fullName")} value={user?.name} onPress={() => openBottomSheet("Names", 0)} />
                                        <SingleInfo title={translate("settingScreen.personalSection.yourContact")} value={translate("settingScreen.personalSection.yourContactHint")} onPress={() => openBottomSheet("Contact", 0)} />
                                        <SingleInfo onPress={() => toggleTheme()} title={translate("settingScreen.personalSection.themes")} value={translate("settingScreen.personalSection.lightModeToDark")} />
                                        <SingleInfo onPress={() => openBottomSheet("Language", 4)} title={translate("settingScreen.personalSection.language")} value={preferredLanguage?.name} />
                                        <SingleInfo title={translate("settingScreen.personalSection.timeZone")} value={user?.timeZone} onDetectTimezone={() => onDetectTimezone(user)} onPress={() => openBottomSheet("TimeZone", 4)} />
                                        <SingleInfo title={translate("settingScreen.personalSection.workSchedule")} value={translate("settingScreen.personalSection.workScheduleHint")} onPress={() => { }} />

                                        <View style={$dangerZoneContainer}>
                                            <Text style={$dangerZoneTitle}>{translate("settingScreen.dangerZone")}</Text>
                                            <SingleInfo title={translate("settingScreen.personalSection.removeAccount")} value={translate("settingScreen.personalSection.removeAccountHint")} onPress={() => openBottomSheet("Remove Account", 5)} />
                                            <SingleInfo title={translate("settingScreen.personalSection.deleteAccount")} value={translate("settingScreen.personalSection.deleteAccountHint")} onPress={() => openBottomSheet("Delete Account", 5)} />
                                        </View>
                                    </View>
                                    // PERSONAL SECTION CONTENT ENDS HERE
                                    :
                                    // TEAM SECTION CONTENT STARTS HERE
                                    <View style={[$contentContainer, { backgroundColor: colors.background, opacity: 0.9 }]}>
                                        <PictureSection
                                            imageUrl={""}
                                            buttonLabel={translate("settingScreen.teamSection.changeLogo")}
                                            onDelete={() => { }}
                                            onChange={() => { }}
                                        />
                                        <SingleInfo title={translate("settingScreen.teamSection.teamName")} value={activeTeam?.name} onPress={() => { }} />
                                        <SingleInfo title={translate("settingScreen.teamSection.timeTracking")} value={translate("settingScreen.teamSection.timeTrackingHint")} onPress={() => { }} />
                                        <SingleInfo title={translate("settingScreen.teamSection.taskStatuses")} value={"there are 4 active statuses"} onPress={() => navigation.navigate("TaskStatus")} />
                                        <SingleInfo title={translate("settingScreen.teamSection.taskPriorities")} value={"there are 4 active priorities"} onPress={() => navigation.navigate("TaskPriority")} />
                                        <SingleInfo title={translate("settingScreen.teamSection.taskSizes")} value={"there are 5 active sizes"} onPress={() => navigation.navigate("TaskSizeScreen")} />
                                        <SingleInfo title={translate("settingScreen.teamSection.taskLabel")} value={"there are 8 active label"} onPress={() => navigation.navigate("TaskLabelScreen")} />
                                        <SingleInfo title={translate("settingScreen.teamSection.teamRole")} value={"No"} />
                                        <SingleInfo title={translate("settingScreen.teamSection.workSchedule")} value={translate("settingScreen.teamSection.workScheduleHint")} onPress={() => { }} />

                                        <View style={$dangerZoneContainer}>
                                            <Text style={$dangerZoneTitle}>{translate("settingScreen.dangerZone")}</Text>
                                            <SingleInfo title={translate("settingScreen.teamSection.transferOwnership")} value={translate("settingScreen.teamSection.transferOwnership")} onPress={() => { }} />
                                            <SingleInfo title={translate("settingScreen.teamSection.removeTeam")} value={translate("settingScreen.teamSection.removeTeamHint")} onPress={() => { }} />
                                            <SingleInfo title={translate("settingScreen.teamSection.quitTeam")} value={translate("settingScreen.teamSection.quitTeamHint")} onPress={() => { }} />
                                        </View>
                                    </View>
                                    // TEAM SECTION CONTENT ENDS HERE
                                }
                            </ScrollView>
                        }
                    </View>
                </View>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[340, 174, 0, 611, 276, 335]}
                    borderRadius={24}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                    renderContent={() =>
                        <View>
                            <BottomSheetContent
                                openedSheet={showPopup}
                                onDismiss={() => {
                                    setIsOpen(false)
                                    sheetRef.current.snapTo(2)
                                }}
                                openBottomSheet={openBottomSheet}
                            />
                            {showPopup === "TimeZone" ?
                                <UserTimezone
                                    onPress={() => openModal()}
                                    user={user}
                                    onUpdateTimezone={updateUserInfo}
                                    onDismiss={() => {
                                        setIsOpen(false)
                                        sheetRef.current.snapTo(2)
                                    }}
                                    selectedTimezone={selectedTimezone}
                                /> : null
                            }

                            {showPopup === "Language" ?
                                <LanguageForm
                                    onPress={() => openLanguageModal()}
                                    user={user}
                                    onUpdateTimezone={updateUserInfo}
                                    onDismiss={() => {
                                        setIsOpen(false)
                                        sheetRef.current.snapTo(2)
                                    }}
                                    selectedLanguage={selectedLanguage}
                                /> : null
                            }
                            {showPopup === "Remove Account" ?
                                <UserRemoveAccount
                                    userId={user?.id}
                                    actionType={"Remove"}
                                    onDismiss={() => {
                                        setIsOpen(false)
                                        sheetRef.current.snapTo(2)
                                    }}
                                />
                                : null}

                            {showPopup === "Delete Account" ?
                                <UserRemoveAccount
                                    userId={user?.id}
                                    actionType={"Delete"}
                                    onDismiss={() => {
                                        setIsOpen(false)
                                        sheetRef.current.snapTo(2)
                                    }}
                                />
                                : null}
                        </View>
                    }
                />
                <FlashMessage position={"bottom"} />
            </Screen>
        </>
    )
}

const { height, width } = Dimensions.get("window");

const $container: ViewStyle = {
    flex: 1,
}

const $headerContainer: ViewStyle = {
    padding: 20,
    flex: 1,
    paddingBottom: 32,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 1.00,
    elevation: 1,
    zIndex: 10
}

const $blurContainer: ViewStyle = {
    flex: 1,
    height: height,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1001
}

const $contentContainer: ViewStyle = {
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
}

const $dangerZoneContainer: ViewStyle = {
    borderTopColor: "rgba(0, 0, 0, 0.09)",
    borderTopWidth: 1,
    paddingTop: 32,
    marginTop: 32
}
const $dangerZoneTitle: TextStyle = {
    color: "#DA5E5E",
    fontSize: 20,
    fontFamily: typography.primary.semiBold
}
