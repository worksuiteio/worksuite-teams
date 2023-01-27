import { IClassName, ITaskStatus } from '@app/interfaces';
import { clsxm } from '@app/utils';
import { Listbox, Transition } from '@headlessui/react';
import { Card } from 'lib/components';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
	CircleIcon,
	ClockIcon,
	CloseCircleIcon,
	LoginIcon,
	SearchStatusIcon,
	TickCircleIcon,
	TimerIcon,
} from 'lib/components/svgs';
import {
	Fragment,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useCallbackRef, useTeamTasks } from '@app/hooks';

type TStatusItem = {
	bgColor?: string;
	icon: React.ReactNode;
	name?: string;
};

type TStatus<T extends ITaskStatus> = {
	[k in T]: TStatusItem;
};

function useStatusValue<T extends TStatus<any>>(
	statusItems: T,
	$value: keyof T | undefined,
	onValueChange?: (v: keyof T) => void
) {
	const onValueChangeRef = useCallbackRef(onValueChange);

	const items = useMemo(() => {
		return Object.keys(statusItems).map((key) => {
			const value = statusItems[key as ITaskStatus];
			return {
				...value,
				name: key,
			} as Required<TStatusItem>;
		});
	}, [statusItems]);

	const [value, setValue] = useState<keyof T>($value);

	const item = items.find((r) => r.name === value);

	useEffect(() => {
		setValue($value);
	}, [$value]);

	const onChange = useCallback(
		(value: keyof T) => {
			setValue(value);
			onValueChangeRef.current && onValueChangeRef.current(value);
		},
		[setValue, onValueChangeRef]
	);

	return {
		items,
		item,
		onChange,
	};
}

export const taskStatus: TStatus<ITaskStatus> = {
	Todo: {
		icon: <LoginIcon />,
		bgColor: '#D6E4F9',
	},
	'In Progress': {
		icon: <TimerIcon />,
		bgColor: '#ECE8FC',
	},
	'In Review': {
		icon: <SearchStatusIcon />,
		bgColor: ' #F3D8B0',
	},
	Ready: {
		icon: <ClockIcon />,
		bgColor: '#F5F1CB',
	},
	Completed: {
		icon: <TickCircleIcon className="stroke-[#292D32]" />,
		bgColor: '#D4EFDF',
	},
	Blocked: {
		icon: <CloseCircleIcon />,
		bgColor: '#F5B8B8',
	},
	Backlog: {
		icon: <CircleIcon />,
		bgColor: '#F2F2F2',
	},
	Closed: {
		icon: <TickCircleIcon className="stroke-[#acacac]" />,
		bgColor: '#eaeaea',
	},
};

export function TaskStatus({
	children,
	name,
	icon,
	bgColor: backgroundColor,
	className,
}: PropsWithChildren<TStatusItem & IClassName>) {
	return (
		<div
			className={clsxm(
				'py-2 px-4 rounded-xl flex items-center text-sm space-x-3 dark:text-default',
				className
			)}
			style={{ backgroundColor }}
		>
			<div className="flex items-center space-x-3 whitespace-nowrap">
				{icon}
				<span>{name}</span>
			</div>
			{children}
		</div>
	);
}

// =============== Task Status ================= //

/**
 * Task status dropwdown
 */
type TTaskStatusDropdown = IClassName & {
	defaultValue?: ITaskStatus;
	onValueChange?: (v: ITaskStatus) => void;
};
export function TaskStatusDropdown({
	className,
	defaultValue,
	onValueChange,
}: TTaskStatusDropdown) {
	const { item, items, onChange } = useStatusValue(
		taskStatus,
		defaultValue,
		onValueChange
	);

	return (
		<StatusDropdown
			className={className}
			items={items}
			value={item}
			onChange={onChange}
		/>
	);
}

export function ActiveTaskStatusDropdown(props: TTaskStatusDropdown) {
	const { activeTeamTask, handleStatusUpdate } = useTeamTasks();

	function onItemChange(status: ITaskStatus) {
		handleStatusUpdate(status, activeTeamTask, true);
	}

	const { item, items, onChange } = useStatusValue(
		taskStatus,
		activeTeamTask?.status || props.defaultValue,
		onItemChange
	);

	return (
		<StatusDropdown
			className={props.className}
			items={items}
			value={item}
			defaultItem={!item ? 'Status' : undefined}
			onChange={onChange}
		/>
	);
}

// =============== Task properties ================= //

export const taskProperties = {
	Medium: {
		icon: <LoginIcon />,
		bgColor: '#ECE8FC',
	},
	High: {
		icon: <LoginIcon />,
		bgColor: '#B8D1F5',
	},
	Low: {
		icon: <LoginIcon />,
		bgColor: '#D4EFDF',
	},
	Urgent: {
		icon: <LoginIcon />,
		bgColor: '#F5B8B8',
	},
} satisfies TStatus<any>;

/**
 * Task status dropwdown
 */
export function TaskPropertiesDropdown({ className }: IClassName) {
	const { item, items, onChange } = useStatusValue(taskProperties, 'Low');

	return (
		<StatusDropdown
			className={className}
			items={items}
			value={item}
			onChange={onChange}
		/>
	);
}

// =============== Task Sizes ================= //

export const taskSizes = {
	'Extra Large': {
		icon: <TickCircleIcon className="stroke-[#292D32]" />,
		bgColor: '#F5B8B8',
	},
	Large: {
		icon: <TickCircleIcon className="stroke-[#292D32]" />,
		bgColor: '#F3D8B0',
	},
	Medium: {
		icon: <TickCircleIcon className="stroke-[#292D32]" />,
		bgColor: '#F5F1CB',
	},
	Small: {
		icon: <TickCircleIcon className="stroke-[#292D32]" />,
		bgColor: '#B8D1F5',
	},
	Tiny: {
		icon: <TickCircleIcon className="stroke-[#292D32]" />,
		bgColor: '#ECE8FC',
	},
} satisfies TStatus<any>;

/**
 * Task status dropdown
 */
export function TaskSizesDropdown({ className }: IClassName) {
	const { item, items, onChange } = useStatusValue(taskSizes, 'Medium');

	return (
		<StatusDropdown
			className={className}
			items={items}
			value={item}
			onChange={onChange}
		/>
	);
}

// =============== Task Devices ================= //

export const taskDevices = {
	'UI/UX': {
		icon: <ClockIcon />,
		bgColor: '#c2b1c6',
	},
	Mobile: {
		icon: <ClockIcon />,
		bgColor: '#7c7ab7',
	},
	WEB: {
		icon: <ClockIcon />,
		bgColor: '#97b7c1',
	},
	Tablet: {
		icon: <ClockIcon />,
		bgColor: '#b0c8a8',
	},
} satisfies TStatus<any>;

export function TaskDevicesDropdown({ className }: IClassName) {
	const { item, items, onChange } = useStatusValue(taskDevices, 'WEB');

	return (
		<StatusDropdown
			className={className}
			items={items}
			value={item}
			onChange={onChange}
		/>
	);
}

// =============== FC Status drop down ================= //
/**
 * Fc Status drop down
 */
function StatusDropdown<T extends Required<TStatusItem>>({
	value,
	onChange,
	items,
	className,
	defaultItem,
}: {
	value: T | undefined;
	onChange?(value: string): void;
	items: T[];
	className?: string;
	defaultItem?: string;
}) {
	const defaultValue: TStatusItem = {
		bgColor: undefined,
		icon: <span></span>,
		name: defaultItem,
	};

	return (
		<div className={clsxm('relative', className)}>
			<Listbox value={value?.name || null} onChange={onChange}>
				{({ open }) => (
					<>
						<Listbox.Button className="w-full">
							<TaskStatus
								{...(value || defaultValue)}
								className={clsxm(
									'justify-between w-full',
									!value && ['text-dark dark:text-white bg-gray-lighter']
								)}
							>
								<ChevronDownIcon
									className={clsxm(
										'ml-2 h-5 w-5 text-default transition duration-150 ease-in-out group-hover:text-opacity-80',
										!value && ['text-dark dark:text-white']
									)}
									aria-hidden="true"
								/>
							</TaskStatus>
						</Listbox.Button>

						<Transition
							show={open}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
							className="relative z-40"
						>
							<Listbox.Options className="absolute right-0 z-40">
								<Card
									shadow="bigger"
									className="!px-2 py-2 shadow-xlcard dark:shadow-lgcard-white"
								>
									{items.map((item, i) => (
										<Listbox.Option key={i} value={item.name} as={Fragment}>
											<li className="mb-3 cursor-pointer">
												<TaskStatus {...item} />
											</li>
										</Listbox.Option>
									))}
								</Card>
							</Listbox.Options>
						</Transition>
					</>
				)}
			</Listbox>
		</div>
	);
}
