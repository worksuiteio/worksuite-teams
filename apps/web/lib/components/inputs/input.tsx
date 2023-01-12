import { IClassName } from '@app/interfaces';
import { clsxm } from '@app/utils';
import {
	Dispatch,
	forwardRef,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { Text } from '../typography';

type Props = {
	readonly errors?: Record<string, string>;
	readonly setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
	wrapperClassName?: string;
	noWrapper?: boolean;
} & React.ComponentPropsWithRef<'input'>;

export const InputField = forwardRef<HTMLInputElement, Props>(
	(
		{
			className,
			type = 'text',
			errors,
			name,
			wrapperClassName,
			noWrapper,
			setErrors,
			...res
		},
		ref
	) => {
		const [error, setError] = useState<string | undefined>(undefined);

		useEffect(() => {
			if (errors && name && errors[name]) {
				setError(errors[name]);
			} else {
				setError(undefined);
			}
		}, [errors, name]);

		const onKeyUp = () => {
			if (setErrors && name) {
				setErrors((ls) => ({ ...ls, [name]: '' }));
			} else {
				setError(undefined);
			}
		};

		const inputElement = (
			<input
				type={type}
				name={name}
				ref={ref}
				className={clsxm(
					'bg-light--theme-light dark:bg-dark--theme-light',
					'input-border',
					'py-2 px-4 mb-1',
					'rounded-[10px] text-sm outline-none ',
					'h-[50px] w-full',
					'font-light tracking-tight',
					className
				)}
				onKeyUp={onKeyUp}
				{...res}
			/>
		);

		return noWrapper ? (
			inputElement
		) : (
			<div className={clsxm('w-full mb-3', wrapperClassName)}>
				{inputElement}
				{error && (
					<Text.Error className="self-start justify-self-start">
						{error}
					</Text.Error>
				)}
			</div>
		);
	}
);

InputField.displayName = 'InputField';

/**
 * TimeInputField
 */

type ITimeProps = {
	label: string;
	dash?: string;
	wrapperClassName?: string;
} & IClassName &
	React.ComponentPropsWithRef<'input'>;

export const TimeInputField = forwardRef<HTMLInputElement, ITimeProps>(
	(
		{ className, type = 'text', label, dash = '__', wrapperClassName, ...res },
		ref
	) => {
		return (
			<div className="flex items-center">
				<div className={clsxm('relative isolate w-7', wrapperClassName)}>
					<input
						type={type}
						ref={ref}
						defaultValue="00"
						{...res}
						className={clsxm(
							'outline-none p-0 bg-transparent w-full text-center mb-[2px]',
							className
						)}
					/>
					<span className="absolute bottom-0 left-0 w-full text-center -z-10">
						{dash}
					</span>
				</div>
				<span className="pl-1">{label}</span>
			</div>
		);
	}
);

TimeInputField.displayName = 'TimeInputField';
