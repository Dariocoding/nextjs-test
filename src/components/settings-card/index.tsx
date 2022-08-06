import React from 'react';
import { Button, NextLink } from '../@common';
import { IconType } from 'react-icons';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { OptionsColors } from '../../extensions';

interface ICardSettingProps {
	color: OptionsColors;
	Icon: IconType;
	titulo: React.ReactNode;
	link: string;
	description: React.ReactNode;
}
const CardSettings: React.FC<ICardSettingProps> = props => {
	return (
		<div className=" bg-white rounded-lg shadow-xl dark:bg-gray-800">
			<div
				className={`p-16 flex items-center justify-center bg-${props.color} text-white`}
			>
				<props.Icon size={60} />
			</div>
			<div className="p-5">
				<NextLink href={props.link}>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{props.titulo}
					</h5>
				</NextLink>
				<p className="mb-3 font-normal text-base text-gray-700 dark:text-gray-400">
					{props.description}
				</p>

				<NextLink href={props.link}>
					<Button
						variant="primary"
						className="hover:animate-bounce-right"
					>
						Go <FaArrowRight className="ml-2" />
					</Button>
				</NextLink>
			</div>
		</div>
	);
};

export default CardSettings;
