import type { NextPage } from 'next';
import React from 'react';
import Header from '../components/Header';
import Features from '../components/lading-home/Features';
import HeroHome from '../components/lading-home/HeroHome';
import dynamic from 'next/dynamic';
import FeaturesBlocks from '@/components/lading-home/FeaturesBlocks';
import Newsletter from '@/components/lading-home/Newsletter';
import Testimonials from '../components/lading-home/Testimonials';
const Footer = dynamic(() => import('../components/Footer'));

const Home: NextPage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			{/*  Site header */}

			<Header />

			<div className="flex-grow">
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
