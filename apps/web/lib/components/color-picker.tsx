import { useCallbackRef } from '@app/hooks';
import { clsxm } from '@app/utils';
import { Popover, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Dropdown } from './dropdown';
import { Edit2Icon, TrashIcon } from './svgs';

export const ColorPicker = ({
	defaultColor,
	onChange,
	fullWidthInput,
	isTeamManager,
}: {
	defaultColor?: string;
	onChange?: (color?: string | null) => void;
	fullWidthInput?: boolean;
	isTeamManager?: boolean;
}) => {
	const [color, setColor] = useState(defaultColor || null);
	const onChangeRef = useCallbackRef(onChange);
	const buttonRef = useRef<any>();

	useEffect(() => {
		if (defaultColor) {
			setColor(defaultColor);
		}
	}, [defaultColor]);

	useEffect(() => {
		if (color && onChangeRef.current) {
			onChangeRef.current(color);
		}
	}, [color, onChangeRef]);

	return fullWidthInput ? (
		<Popover className="relative border-none no-underline w-full mt-3">
			{() => (
				<>
					<Popover.Button
						className={'outline-none mb-[15px] w-full'}
						ref={buttonRef}
						disabled={!isTeamManager && fullWidthInput}
					>
						<div
							className={`${
								isTeamManager ? 'cursor-pointer' : ''
							} relative w-[100%] h-[48px] border rounded-[10px] flex items-center justify-between input-border ${
								!isTeamManager ? 'bg-[#FCFCFC]' : ''
							} bg-light--theme-light dark:bg-dark--theme-light`}
						>
							<div className={`flex gap-[8px] h-[40px] items-center pl-[15px]`}>
								<div
									className={`w-5 h-5 rounded-xl`}
									style={{
										backgroundColor: color || undefined,
									}}
								></div>
								<div className="uppercase font-medium ">{color || ''}</div>
							</div>
							<div className="flex mr-[0.5rem] gap-3">
								<Edit2Icon />

								<span
									onClick={() => {
										setColor(null);
										onChange && onChange(null);
									}}
								>
									<TrashIcon />
								</span>
							</div>
						</div>
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute left-1/2 z-10 mt-0 w-[354px] max-w-sm -translate-x-1/2 transform  sm:px-0 lg:max-w-3xl shandow">
							<HexColorPicker color={color || undefined} onChange={setColor} />
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	) : (
		<Dropdown
			className={`min-w-[150px] max-w-sm z-50`}
			buttonClassName={clsxm(`py-0 font-medium h-[54px] w-[150px]`)}
			value={{
				key: color || '',
				Label: () => (
					<div className="flex items-center space-x-2">
						<span
							className="w-5 h-5 rounded-full block"
							style={{ backgroundColor: color || undefined }}
						/>
						<span>{color}</span>
					</div>
				),
			}}
			items={[]}
			closeOnChildrenClick={false}
		>
			<HexColorPicker color={color || undefined} onChange={setColor} />
		</Dropdown>
	);
};
