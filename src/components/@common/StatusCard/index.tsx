import { useRouter } from 'next/router';
import * as React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

interface IStatusCardProps {
	Icon: IconType;
	count: number;
	title: string;
	hoverBackgroundColor: string;
	to: string;
}

const StatusCardDiv = styled.div<{ backgroundHoverColor: string }>`
	padding: 30px;
	display: flex;
	align-items: center;
	color: #111;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	border-radius: 20px;
	position: relative;
	overflow: hidden;
	z-index: 1;
	transition: color 0.5s ease 0s;
	margin-bottom: 30px;

	&::before {
		content: '';
		width: 100%;
		padding-top: 100%;
		border-radius: 50%;
		background-image: linear-gradient(
			to top right,
			var(--primary-color),
			${props => props.backgroundHoverColor}
		);
		position: absolute;
		left: -50%;
		top: 0;
		transform: scale(0);
		transition: transform 0.8s ease 0s;
	}

	&:hover::before {
		transform: scale(3);
	}

	svg {
		color: ${props => props.backgroundHoverColor};
	}

	&:hover {
		h4,
		span,
		svg {
			color: #fff;
		}
	}
`;

export const StatusCard: React.FC<IStatusCardProps> = props => {
	const { push } = useRouter();
	return (
		<StatusCardDiv
			backgroundHoverColor={props.hoverBackgroundColor}
			className={'bg-slate-100'}
			onClick={() => push(props.to)}
		>
			<div className={'w-1/4 h-full flex items-center justify-center z-[1]'}>
				<props.Icon size={45} />
			</div>
			<div className="grow text-center z-[1] capitalize font-semibold">
				<h4 className="text-1xl md:text-3xl mb-2">{props.count}</h4>
				<span>{props.title}</span>
			</div>
		</StatusCardDiv>
	);
};
