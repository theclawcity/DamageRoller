import React from 'react';

class Button extends React.Component {

	handleClick = () => {
		if (this.props.input != null){
				this.props.clickFunc(this.props.input);
		}
	}

	render(){
		return <button className={`ui button attached`} onClick={this.handleClick}>{this.props.name}</button>
	}
}

export default Button