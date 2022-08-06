import * as React from 'react';

import { NextLink } from '../@common';
import Navbar from './Navbar';

function Header() {
	const [top, setTop] = React.useState(true);

	// detect whether user has scrolled the page down by 10px
	React.useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [top]);

	return (
		<header
			className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out dark:bg-slate-900 bg-sky-200 ${
				!top && 'backdrop-blur-sm shadow-lg'
			}`}
		>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Site branding */}
					<div className="flex-shrink-0 mr-4">
						{/* Logo */}
						<NextLink
							href="/"
							className="block h-full"
							aria-label="Cruip"
						>
							<img
								className="h-10"
								src="/images/logo.png"
								alt="Logo empresa"
							/>
						</NextLink>
					</div>

					<Navbar />
				</div>
			</div>
		</header>
	);
}

export default Header;
