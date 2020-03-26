import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
	return (<footer><div>© {new Date().getFullYear()}, Sweetter / <Link to='/about/'>About</Link></div></footer>);
};

export default Footer;
