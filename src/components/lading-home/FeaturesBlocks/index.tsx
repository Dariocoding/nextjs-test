import React from 'react';
import { WiStars } from 'react-icons/wi';
import { MdDesignServices } from 'react-icons/md';
import { BsFillPhoneFill } from 'react-icons/bs';
import { RiFindReplaceFill } from 'react-icons/ri';
import { FaPeopleArrows, FaUserPlus } from 'react-icons/fa';
import FeatureBlock from './Card';

function FeaturesBlocks() {
	return (
		<section className="relative">
			{/* Section background (needs .relative class on parent and next sibling elements) */}
			<div
				className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
				aria-hidden="true"
			></div>
			<div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">
					{/* Section header */}
					<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
						<h2 className="h2 mb-4">How Simple works</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat
							nulla pariatur excepteur sint occaecat
							cupidatat.
						</p>
					</div>

					{/* Items */}
					<div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
						<FeatureBlock
							Icon={FaPeopleArrows}
							title={'Initial Contact'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={RiFindReplaceFill}
							title={'Discovery Session'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={FaUserPlus}
							title={'Contracting'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={BsFillPhoneFill}
							title={'Fast Prototyping'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={MdDesignServices}
							title={'Design Phase'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={WiStars}
							title={'Develop & Launch'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FeaturesBlocks;
