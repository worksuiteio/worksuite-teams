import moment from 'moment';
import { Avatar, Text } from 'lib/components';
import { imgTitle } from '@app/helpers';
import { clsxm } from '@app/utils';
import stc from 'string-to-color';
import { OT_Member } from '@app/interfaces';
import { Paginate } from 'lib/components/pagination';
import { usePagination } from '@app/hooks/features/usePagination';
import { MemberTableStatus } from './member-table-status';
import { TableActionPopover } from './table-action-popover';
import { useOrganizationTeams } from '@app/hooks';

export const MemberTable = ({ members }: { members: OT_Member[] }) => {
	const {
		total,
		onPageChange,
		itemsPerPage,
		itemOffset,
		endOffset,
		setItemsPerPage,
		currentItems,
	} = usePagination<OT_Member>(members);
	const { activeTeam } = useOrganizationTeams();

	return (
		<div>
			<div className="overflow-x-auto  sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:bg-dark--theme-light">
					<thead className="text-xs text-gray-700 uppercase border-b">
						<tr>
							<th
								scope="col"
								className="pl-0 py-3 text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-56"
							>
								Name
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-40"
							>
								Position
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white  w-44"
							>
								Roles
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-48"
							>
								Joined / Left
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-32"
							>
								Status
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-3"
							></th>
						</tr>
					</thead>
					<tbody className="dark:bg-dark--theme-light">
						{currentItems.map((member, index) => (
							<tr
								className="bg-white dark:bg-dark--theme-light dark:border-gray-700"
								key={index}
							>
								<th
									scope="row"
									className="flex items-center pl-0 py-4 text-gray-900 whitespace-nowrap dark:text-white"
								>
									{member.employee.user?.imageId ? (
										<Avatar
											size={20}
											className="relative cursor-pointer"
											imageUrl={
												member.employee.user?.image?.thumbUrl ||
												member.employee.user?.image?.fullUrl ||
												member.employee.user?.imageUrl
											}
											alt="User Avatar"
										/>
									) : member.employee.user?.name ? (
										<div
											className={clsxm(
												'w-[20px] h-[20px]',
												'flex justify-center items-center',
												'rounded-full text-xs text-default dark:text-white',
												'shadow-md font-normal'
											)}
											style={{
												backgroundColor: `${stc(
													member.employee.user?.name || ''
												)}80`,
											}}
										>
											{imgTitle(member.employee.user?.name)}
										</div>
									) : (
										''
									)}
									<div className="pl-3 flex flex-col gap-1">
										<div className="text-sm font-semibold text-[#282048] dark:text-white">
											{member.employee.fullName}
										</div>
										<Text className="text-xs dark:text-white text-[#B1AEBC] font-normal">
											{member.employee.user?.email || ''}
										</Text>
									</div>
								</th>
								<td className="text-sm font-semibold py-4 text-[#282048] dark:text-white">
									{/* TODO Position */}-
								</td>
								<td className="text-sm font-semibold py-4 text-[#282048] dark:text-white">
									<span className="capitalize">
										{member.role?.name?.toLowerCase() || 'member'}
										{member.role?.name?.toLowerCase() === 'manager' &&
										activeTeam?.createdById === member.employee.userId
											? ' (Admin)'
											: ''}
									</span>
								</td>
								<td className="text-sm font-semibold py-4 text-[#282048] dark:text-white">
									{/* 12 Feb 2020 12:00 pm */}
									{moment(member.employee.createdAt).format(
										'DD MMM YYYY hh:mm a'
									)}
								</td>
								<td className="text-sm font-semibold py-4">
									{/* TODO dynamic */}
									<MemberTableStatus
										status={
											member.employee.isActive
												? 'Member'
												: !member.employee.isActive
												? 'Suspended'
												: 'Left'
										}
									/>
								</td>
								<td className="flex py-4 justify-center items-center absolute">
									<TableActionPopover member={member} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Paginate
				total={total}
				onPageChange={onPageChange}
				pageCount={1} // Set Static to 1 - It will be calculated dynamically in Paginate component
				itemsPerPage={itemsPerPage}
				itemOffset={itemOffset}
				endOffset={endOffset}
				setItemsPerPage={setItemsPerPage}
			/>
		</div>
	);
};
