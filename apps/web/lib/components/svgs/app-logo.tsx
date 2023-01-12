import { IClassName } from '@app/interfaces';
import { clsxm } from '@app/utils';
import Link from 'next/link';

export function AppLogo({ className }: IClassName) {
	return (
		<Link href="/" target={'_self'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				id="Layer_1"
				x="0px"
				y="0px"
				width="220px"
				height="39.54px"
				viewBox="0 0 150 19.54"
				className={clsxm(
					'fill-primary dark:fill-white cursor-pointer',
					className
				)}
			>
				<g>
					<g>
						<path
							className="st0"
							d="M7.18,0c1.69,0,2.95,0.64,3.77,1.5l0.24-1.26h5l-2.25,12.74c-0.78,4.53-4.04,6.56-8.35,6.56    c-2.7,0-4.69-0.83-5.6-1.31l1.47-3.8c0.89,0.49,2.33,1.15,4.31,1.15c1.58,0,2.81-0.56,3.1-2.33l0.13-0.78    c-0.89,0.62-2.01,0.96-3.35,0.96c-3.4,0-5.6-2.33-5.6-5.87C0.08,3.43,2.95,0,7.18,0z M7.45,8.99c0.83,0,1.63-0.29,2.33-0.8    l0.51-2.92c-0.43-0.45-1.2-0.83-2.06-0.83c-1.77,0-2.92,1.05-2.92,2.7C5.3,8.3,6.11,8.99,7.45,8.99z"
						/>
						<path
							className="st0"
							d="M32.61,9.03c-0.16,0.69,0.03,1.18,0.64,1.18c0.43,0,0.75-0.13,1.15-0.32l-0.56,4.07    c-0.83,0.29-2.17,0.56-3.59,0.56c-1.61,0-2.65-0.38-2.95-1.79c-1.05,1.1-2.52,1.77-4.2,1.77c-3.21,0-5.2-2.73-5.2-6.05    c0-5.2,3.32-8.43,7.52-8.43c1.63,0,2.79,0.59,3.46,1.5l0.22-1.26h5.04L32.61,9.03z M28.22,5.25c-0.4-0.45-1.23-0.8-2.03-0.8    c-1.85,0-3.08,1.39-3.08,3.4c0,1.34,0.78,2.23,2.09,2.23c0.75,0,1.61-0.29,2.33-0.8L28.22,5.25z"
						/>
						<path
							className="st0"
							d="M52.61,0.24l-1.56,8.79c-0.11,0.64-0.11,1.18,0.49,1.18c0.43,0,0.89-0.16,1.34-0.32l-0.56,4.07    c-0.78,0.32-2.09,0.56-3.37,0.56c-1.52,0-2.68-0.51-3.08-1.79c-1.15,1.15-2.68,1.79-4.5,1.79c-3.53,0-4.66-2.68-4.04-6.21    l1.42-8.06h5l-1.29,7.39c-0.24,1.42,0.11,2.19,1.42,2.19c0.91,0,1.66-0.49,2.17-0.99l1.52-8.59L52.61,0.24L52.61,0.24z"
						/>
						<path
							className="st0"
							d="M61.2,4.23h-4.95l0.69-3.99H68.3l-0.64,3.53l-6.02,6.48h4.9l-0.72,3.99H54.48l0.62-3.53L61.2,4.23z"
						/>
						<path
							className="st0"
							d="M74.94,0.24l1.1,8.41l4.1-8.41h5.25l-7.63,13.68c-2.19,3.93-3.77,5.62-7.2,5.62c-1.12,0-2.54-0.43-3.16-0.91    l1.31-3.72c0.59,0.32,1.39,0.56,2.19,0.56c0.99,0,1.52-0.51,2.01-1.34l0.24-0.43L69.59,0.24H74.94z"
						/>
						<path
							className="st0"
							d="M92.11,11.76c-0.03,0.23-0.04,0.39-0.04,0.48c0,0.84,0.4,1.26,1.2,1.26c0.49,0,1.03-0.16,1.64-0.49l0.38,0.83    c-0.69,0.41-1.41,0.62-2.16,0.62c-0.68,0-1.21-0.18-1.6-0.55c-0.38-0.37-0.58-0.89-0.58-1.56c0-0.13,0.02-0.32,0.04-0.58    l0.95-6.68h-1.69l0.13-0.9h1.72l0.56-2.44l0.89-0.09l-0.37,2.54h2.59l-0.27,0.9h-2.44L92.11,11.76z"
						/>
						<path
							className="st0"
							d="M102.93,9.14c-1.2,0.59-2.92,0.98-5.14,1.15v0.12c0,1.05,0.23,1.83,0.69,2.33c0.45,0.5,1.08,0.75,1.87,0.75    c0.53,0,1.01-0.08,1.46-0.24c0.44-0.16,0.9-0.41,1.4-0.76l0.5,0.79c-0.54,0.4-1.09,0.69-1.65,0.9c-0.56,0.2-1.15,0.3-1.78,0.3    c-1.15,0-2.05-0.35-2.69-1.06c-0.64-0.7-0.96-1.7-0.96-2.98c0-1.01,0.18-2.02,0.55-3s0.94-1.81,1.72-2.46    c0.78-0.65,1.73-0.98,2.88-0.98c0.94,0,1.66,0.23,2.19,0.69c0.53,0.45,0.79,1.04,0.79,1.74C104.74,7.62,104.13,8.54,102.93,9.14z     M99.05,6.22c-0.64,0.89-1.05,1.94-1.2,3.17c1.92-0.15,3.36-0.46,4.31-0.92s1.42-1.14,1.42-2.04c0-0.44-0.15-0.8-0.46-1.1    c-0.31-0.29-0.76-0.44-1.36-0.44C100.6,4.89,99.7,5.34,99.05,6.22z"
						/>
						<path
							className="st0"
							d="M113.24,4.18c0.5,0.14,1.01,0.34,1.54,0.62l-1.05,7.25c-0.03,0.14-0.04,0.33-0.04,0.58    c0,0.27,0.05,0.49,0.14,0.64c0.09,0.16,0.26,0.29,0.49,0.39L114,14.46c-0.45-0.1-0.79-0.29-1.02-0.57    c-0.23-0.28-0.34-0.69-0.33-1.26c-0.38,0.56-0.85,1.01-1.37,1.34c-0.54,0.33-1.1,0.49-1.72,0.49c-1,0-1.78-0.35-2.33-1.05    c-0.56-0.7-0.84-1.65-0.84-2.86c0-1,0.18-2.01,0.54-3.02s0.93-1.86,1.71-2.54c0.78-0.68,1.76-1.02,2.94-1.02    C112.18,3.97,112.74,4.04,113.24,4.18z M109.31,5.76c-0.61,0.59-1.05,1.32-1.33,2.19c-0.28,0.87-0.42,1.74-0.42,2.59    c0,0.98,0.18,1.72,0.56,2.22c0.38,0.5,0.9,0.75,1.6,0.75c0.6,0,1.15-0.18,1.62-0.54c0.49-0.36,0.94-0.89,1.37-1.58l0.87-6.07    c-0.62-0.31-1.28-0.46-2-0.46C110.68,4.88,109.91,5.17,109.31,5.76z"
						/>
						<path
							className="st0"
							d="M130.23,4.61c0.38,0.43,0.57,1.02,0.57,1.78c0,0.21-0.02,0.44-0.06,0.69l-1.02,7.16h-1.11l1-7.06    c0.04-0.26,0.06-0.49,0.06-0.69c0-1.05-0.44-1.58-1.33-1.58c-0.59,0-1.16,0.28-1.72,0.86c-0.55,0.58-1.11,1.37-1.67,2.38    l-0.87,6.08h-1.11l1-7.06c0.04-0.26,0.06-0.49,0.06-0.69c0-1.05-0.44-1.58-1.33-1.58c-0.6,0-1.18,0.29-1.72,0.88    s-1.1,1.4-1.67,2.43l-0.85,6.02h-1.11l1.42-10.07h0.96l-0.27,2.48c1.08-1.8,2.27-2.69,3.56-2.69c0.65,0,1.18,0.22,1.56,0.65    c0.39,0.44,0.58,1.05,0.57,1.85c1.04-1.66,2.21-2.5,3.51-2.5C129.33,3.97,129.84,4.18,130.23,4.61z"
						/>
						<path
							className="st0"
							d="M140.47,5.1l-0.59,0.67c-0.38-0.29-0.78-0.51-1.17-0.65c-0.4-0.14-0.84-0.21-1.33-0.21    c-0.72,0-1.3,0.15-1.73,0.45c-0.44,0.3-0.65,0.71-0.65,1.24c0,0.44,0.17,0.79,0.49,1.07s0.9,0.54,1.72,0.78    c0.99,0.31,1.71,0.69,2.14,1.14c0.44,0.45,0.66,1.04,0.66,1.77c0,0.94-0.35,1.69-1.05,2.25s-1.66,0.85-2.84,0.85    c-0.79,0-1.46-0.13-2.03-0.37c-0.58-0.24-1.08-0.58-1.53-1l0.64-0.65c0.44,0.36,0.89,0.63,1.35,0.81    c0.46,0.18,0.99,0.27,1.58,0.27c0.87,0,1.55-0.19,2.03-0.57c0.48-0.38,0.72-0.88,0.72-1.49c0-0.54-0.17-0.95-0.49-1.26    c-0.33-0.29-0.94-0.59-1.82-0.87c-0.99-0.31-1.68-0.67-2.09-1.09c-0.4-0.42-0.6-0.95-0.6-1.59c0-0.49,0.14-0.94,0.43-1.35    c0.28-0.41,0.69-0.74,1.22-0.98s1.15-0.37,1.87-0.37C138.57,3.97,139.6,4.35,140.47,5.1z"
						/>
						<path
							className="st0"
							d="M145.67,0.76l-0.15,0.46h-1.33l-0.52,3.67h-0.54l0.52-3.67h-1.38l0.05-0.46    C142.32,0.76,145.67,0.76,145.67,0.76z M149.62,4.89h-0.53l0.19-2.13c0.05-0.52,0.11-1,0.18-1.46l-1.61,3.12h-0.49l-0.79-3.15    c-0.03,0.33-0.11,0.84-0.23,1.51l-0.39,2.09h-0.52l0.79-4.13h0.72l0.72,3.14l1.6-3.14H150L149.62,4.89z"
						/>
					</g>
				</g>
			</svg>
		</Link>
	);
}
