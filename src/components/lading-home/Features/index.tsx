import React, { useState, useRef, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import TabButton from './TabButton';
import TransitionImage from './TransitionImage';

function Features() {
	const [tab, setTab] = useState(1);

	const tabs = useRef(null);

	const heightFix = () => {
		if (tabs.current.children[tab]) {
			tabs.current.style.height =
				tabs.current.children[tab - 1].offsetHeight + 'px';
		}
	};

	useEffect(() => {
		heightFix();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	return (
		<section className="relative">
			{/* Section background (needs .relative class on parent and next sibling elements) */}
			<div
				className="absolute inset-0 pointer-events-none mb-16"
				aria-hidden="true"
			></div>
			<div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-12 md:pt-20">
					{/* Section header */}
					<div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
						<h1 className="h2 mb-4 text-3xl font-bold">
							Explore the solutions
						</h1>
						<p className="text-xl">
							Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat
							nulla pariatur excepteur sint occaecat
							cupidatat.
						</p>
					</div>

					{/* Section content */}
					<div className="md:grid md:grid-cols-12 md:gap-6">
						{/* Content */}
						<div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
							<div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8 dark:text-white">
								<h3 className="h3 mb-3">
									Powerful suite of tools
								</h3>
								<p className="text-xl">
									Duis aute irure dolor in
									reprehenderit in voluptate
									velit esse cillum dolore
									pariatur. Excepteur sint
									occaecat cupidatat non
									proident, sunt in culpa.
								</p>
							</div>
							{/* Tabs buttons */}
							<div className="mb-8 md:mb-0">
								<TabButton
									tabSelected={tab}
									Icon={FaMoon}
									setTab={setTab}
									tab={1}
									title={
										<>
											Powerful
											suite of
											tools
										</>
									}
									description={
										<>
											Duis aute
											irure dolor
											in
											reprehenderit
											in voluptate
											velit esse
											cillum
											dolore
											pariatur.
											Excepteur
											sint
											occaecat
											cupidatat
											non
											proident,
											sunt in
											culpa.
										</>
									}
								/>
								<TabButton
									tabSelected={tab}
									Icon={FaMoon}
									setTab={setTab}
									tab={2}
									title={
										<>
											Powerful
											suite of
											tools
										</>
									}
									description={
										<>
											Duis aute
											irure dolor
											in
											reprehenderit
											in voluptate
											velit esse
											cillum
											dolore
											pariatur.
											Excepteur
											sint
											occaecat
											cupidatat
											non
											proident,
											sunt in
											culpa.
										</>
									}
								/>
								<TabButton
									tabSelected={tab}
									Icon={FaMoon}
									setTab={setTab}
									tab={3}
									title={
										<>
											Powerful
											suite of
											tools
										</>
									}
									description={
										<>
											Duis aute
											irure dolor
											in
											reprehenderit
											in voluptate
											velit esse
											cillum
											dolore
											pariatur.
											Excepteur
											sint
											occaecat
											cupidatat
											non
											proident,
											sunt in
											culpa.
										</>
									}
								/>
							</div>
						</div>

						{/* Tabs items */}
						<div
							className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
							ref={tabs}
						>
							<div className="relative flex flex-col text-center lg:text-right">
								<TransitionImage
									tabSelected={tab}
									src="/images/bg-hero.jpg"
									tab={1}
								/>
								<TransitionImage
									tabSelected={tab}
									src="/images/bg-hero.jpg"
									tab={2}
								/>
								<TransitionImage
									tabSelected={tab}
									src="/images/bg-hero.jpg"
									tab={3}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Features;
