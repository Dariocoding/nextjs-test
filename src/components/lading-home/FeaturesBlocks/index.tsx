import React from 'react';
import FeatureBlock from './Card';
import { FaSearch } from '@/components/Icons/fa/FaSearch';
import { FaPeopleArrow } from '@/components/Icons/fa/users/FaPeopleArrow';
import { FaUserPlus } from '@/components/Icons/fa/users/FaUserPlus';
import { FaMobile } from '@/components/Icons/fa/FaMobile';
import { FaStars } from '@/components/Icons/fa/FaStars';
import { FaDesignService } from '@/components/Icons/fa/FaDesignService';

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
						<p className="text-xl text-gray-600">
							Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat
							nulla pariatur excepteur sint occaecat
							cupidatat.
						</p>
					</div>

					{/* Items */}
					<div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
						<FeatureBlock
							Icon={FaPeopleArrow}
							title={'Initial Contact'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={FaSearch}
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
							Icon={FaMobile}
							title={'Fast Prototyping'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={FaDesignService}
							title={'Design Phase'}
							description={
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							}
						/>

						<FeatureBlock
							Icon={FaStars}
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
