import { useCallback, useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
	onClickOuSide?: (el: T, nodeTarget: HTMLElement) => void
) {
	const targetEl = useRef<T>(null);
	const refs = useRef<Node[]>([]);

	useEffect(() => {
		const onBodyClick = (ev: MouseEvent) => {
			if (!targetEl.current) return;
			const el = targetEl.current!;
			const tnode = ev.target! as Node;
			if (
				el.contains(tnode) ||
				refs.current.some((ref) => {
					return (ref && ref.isSameNode(tnode)) || (ref && ref.contains(tnode));
				})
			) {
				return;
			}
			onClickOuSide && onClickOuSide(el, ev.target as HTMLElement);
		};

		document.body.addEventListener('click', onBodyClick);
		return () => {
			document.body.removeEventListener('click', onBodyClick);
		};
	}, []);

	const ignoreElementRef = useCallback((el: any) => {
		refs.current.push(el);
	}, []);

	return {
		targetEl,
		ignoreElementRef,
	};
}