import { withAuthentication } from 'lib/app/authenticator';
import { MainLayout } from 'lib/layout';
import { Breadcrumb, Card, Container, Text } from 'lib/components';

import {
	LeftSideSettingMenu,
	ProfileAvatar,
	TeamSettingForm,
	TaskStatusesForm,
	TaskPrioritiesForm,
	TaskSizesForm,
	DangerZoneTeam,
	TaskLabelForm,
} from 'lib/settings';
import SettingsTeamSkeleton from '@components/shared/skeleton/SettingsTeamSkeleton';

import { useTranslation } from 'lib/i18n';
import { NotificationSettings } from 'lib/settings/notification-setting';
import { useRecoilState } from 'recoil';
import { userState } from '@app/stores';

const Team = () => {
	const { trans, translations } = useTranslation('settingsTeam');
	const [user] = useRecoilState(userState);


	return (
		<>
			{!user ? (
				<SettingsTeamSkeleton />
			) : (
				<MainLayout>
					<div className="bg-white dark:bg-dark--theme pt-16 -mt-8 pb-4">
						<Container>
							<Breadcrumb
								paths={translations.pages.settings.BREADCRUMB}
								className="text-sm"
							/>
						</Container>
					</div>

					<Container className="mb-10">
						<div className="flex w-full">
							<LeftSideSettingMenu />
							<div className="flex flex-col w-full">
								<Card
									className="dark:bg-dark--theme p-[32px] mt-[36px]"
									shadow="bigger"
								>
									<Text className="text-4xl font-medium mb-2">
										{trans.HEADING_TITLE}
									</Text>
									<Text className="text-base font-normal text-gray-400">
										{translations.pages.settings.HEADING_DESCRIPTION}
									</Text>
									<ProfileAvatar />
									<TeamSettingForm />
								</Card>
								<Card
									className="dark:bg-dark--theme mt-[36px]  px-0 py-0 md:px-0"
									shadow="bigger"
								>
									<TaskStatusesForm />
								</Card>
								<Card
									className="dark:bg-dark--theme mt-[36px]  px-0 py-0 md:px-0"
									shadow="bigger"
								>
									<TaskPrioritiesForm />
								</Card>
								<Card
									className="dark:bg-dark--theme mt-[36px]  px-0 py-0 md:px-0"
									shadow="bigger"
								>
									<TaskSizesForm />
								</Card>
								<Card
									className="dark:bg-dark--theme mt-[36px]  px-0 py-0 md:px-0"
									shadow="bigger"
								>
									<TaskLabelForm />
								</Card>
								<Card className="dark:bg-dark--theme mt-[36px]" shadow="bigger">
									<Text className="text-4xl font-medium mb-2 h-[4.5rem]">
										{trans.NOTIFICATION_HEADING_TITLE}
									</Text>
									<NotificationSettings />
								</Card>
								<Card
									className="dark:bg-dark--theme p-[32px] mt-[36px]"
									shadow="bigger"
								>
									<Text className="text-2xl text-[#EB6961] font-normal">
										{translations.pages.settings.DANDER_ZONE}
									</Text>
									<DangerZoneTeam />
								</Card>
							</div>
						</div>
					</Container>
				</MainLayout>
			)}
		</>
	);
};

export default withAuthentication(Team, { displayName: 'Team' });
