import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
	return (<footer><div>© {new Date().getFullYear()}, Sweetter / <Link to='/about/'>About</Link> / <Link to='/contact/'>Contact me</Link></div></footer>);
};

export default Footer;
