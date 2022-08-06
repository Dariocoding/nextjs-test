import type { NextPage } from 'next';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Features from '../components/lading-home/Features';
import FeaturesBlocks from '../components/lading-home/FeaturesBlocks';
import HeroHome from '../components/lading-home/HeroHome';
import Newsletter from '../components/lading-home/Newsletter';
import Testimonials from '../components/lading-home/Testimonials';

const Home: NextPage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			{/*  Site header */}

			<Header />

			<div className="flex-grow dark:bg-slate-900 dark:text-white">
				<HeroHome />
				<Features />
				<FeaturesBlocks />
				<Testimonials />
				<Newsletter />
			</div>

			<Footer />
		</div>
	);
};

export default Home;
