import * as React from 'react';
import { NextLink } from '../@common';

const backgrounds = { hero: 'bg-[url(/images/bg-hero.jpg)]' };

type backgroundKeys = { hero?: string };

interface ILandingAuthProps {
	titulo: React.ReactNode;
	children?: React.ReactNode;
	descriptionTitle?: React.ReactNode;
	descriptionParagraph?: React.ReactNode;
	background: keyof backgroundKeys;
}

const LandingAuth: React.FunctionComponent<ILandingAuthProps> = props => {
	return (
		<main className="flex-grow dark:bg-slate-900 dark:text-white h-screen">
			<div className="h-screen">
				<div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 h-full">
					<div className="dark:bg-slate-800 h-full py-28">
						<div className="flex flex-col px-7 md:px-12 lg:px-16 md:pt-4 pt-0">
							<div className="flex justify-center">
								<NextLink href="/">
									<img
										src={
											'/images/logo.png'
										}
										width={200}
									/>
								</NextLink>
							</div>
							<div className="mx-auto text-center py-6">
								<h1 className="text-2xl font-bold">
									{props.titulo}
								</h1>
							</div>
							<div>{props.children}</div>
						</div>
					</div>
					<div
						className={`col-span-2 h-full dark:bg-black ${
							backgrounds[props.background]
						} bg-cover bg-center md:block hidden`}
					>
						<div className="flex justify-center items-center h-full">
							<div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
								<h5 className="text-4xl mb-6 font-bold tracking-tight text-gray-900 dark:text-white">
									{/* {props.descriptionTitle} */}{' '}
									"Moral y luces son nuestras{' '}
									<br />
									primeras necesidades"
								</h5>
								<p className="font-normal text-lg text-gray-700 dark:text-gray-400 indent-48">
									{props.descriptionParagraph}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default LandingAuth;
