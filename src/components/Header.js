import React from 'react';

const Header = () => {

	return (
		<div className="ui segment">
			<div className="ui container">
				<div className="ui two column grid">
					<div className="twelve wide column">
						<a href="/"><h1>D&D 5e Damage Roller</h1></a>
					</div>
					<div className="four wide column">
					<i type="input" onClick={() => {console.log('oooooh clicky!')}} className="cog icon"></i>
					</div>
				</div>
			</div>
		</div>
		)

}

export default Header