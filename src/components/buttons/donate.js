import React from 'react';
import { Link } from 'gatsby';
import styles from './donate.module.css'

const Donate = () => {
	return (<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
	<input type="hidden" name="cmd" value="_s-xclick" />
	<input type="hidden" name="hosted_button_id" value="CNKW526N4MUC4" />
	<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="Make a Paypal donation to help Sweetter!" alt="Donate with PayPal button" />
	<img alt="" border="0" src="https://www.paypal.com/en_FR/i/scr/pixel.gif" width="1" height="1" />
	</form>);
};

export default Donate;