import * as React from 'react';
import Image from 'next/image';
import { Transition } from '@/utils/Transition';

interface ITransitionImageProps {
	tabSelected: number;
	tab: number;
	src: string;
}

const TransitionImage: React.FunctionComponent<ITransitionImageProps> = props => (
	<Transition
		show={props.tab === props.tabSelected}
		appear={true}
		className="w-full"
		enter="transition ease-in-out duration-700 transform order-first"
		enterStart="opacity-0 translate-y-16"
		enterEnd="opacity-100 translate-y-0"
		leave="transition ease-in-out duration-300 transform absolute"
		leaveStart="opacity-100 translate-y-0"
		leaveEnd="opacity-0 -translate-y-16"
	>
		<div className="relative inline-flex flex-col">
			<Image
				className="md:max-w-none mx-auto rounded"
				src={props.src}
				width="500"
				height="462"
				alt="Features bg"
			/>
			<Image
				className="md:max-w-none absolute w-full left-0 transform animate-float rounded-lg"
				src={props.src}
				width="500"
				height="44"
				alt="Element"
				style={{
					top: '30%',
				}}
			/>
		</div>
	</Transition>
);

export default TransitionImage;
