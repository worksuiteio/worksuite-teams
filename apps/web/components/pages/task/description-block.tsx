import { useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useTranslation } from 'lib/i18n';

interface IDescriptionBlockProps {
	initialValue?: Descendant[];
}

const DescriptionBlock = (props: IDescriptionBlockProps) => {
	const [editor] = useState(() => withReact(createEditor()));

	const { trans } = useTranslation('taskDetails');
	const defaultValue = [
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	];

	return (
		<div>
			<div className="flex w-full justify-between ">
				<h1 className="text-black font-medium text-m my-1">
					{trans.DESCRIPTION}
				</h1>
			</div>

			<div className="border-y-2 py-5 w-full">
				<Slate
					editor={editor}
					value={props.initialValue || defaultValue}

					//Just for development
					// onChange={(value) => {
					// 	const isAstChange = editor.operations.some(
					// 		(op) => 'set_selection' !== op.type
					// 	);
					// 	if (isAstChange) {
					// 		// Save the value to the database
					// 		const content = JSON.stringify(value);
					// 		console.log(content);
					// 	}
					// }}
				>
					<Editable placeholder={trans.ADD_DESCRIPTION} />
				</Slate>
			</div>
		</div>
	);
};
export default DescriptionBlock;
