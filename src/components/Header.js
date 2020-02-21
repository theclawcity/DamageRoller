import React from 'react';

import './style.css'

const Header = () => {

	return (
		<div className="ui segment header MyHeader">
			<div className="ui container">
				<div className="ui one column grid">
					<div className="sixteen wide column">
						<a className="redHead" href="/"><h1>D&D 5e Damage Roller</h1></a>
					</div>
				</div>
			</div>
		</div>
		)

}

export default Header