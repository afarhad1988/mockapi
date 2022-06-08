import React from 'react';
import {FadeLoader} from "react-spinners";

const Spinner = () => {
	return (
			<div className='spinner'>
				<FadeLoader size={40} color={'#B34EE9'}  />
			</div>
	);
};
export default Spinner;