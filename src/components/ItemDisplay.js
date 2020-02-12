import React from 'react';

import Calculator from './Calculator'
import Button from './Button'

class ItemDisplay extends React.Component{

	state = {
		isFavorite: false
	}

	getDice = string => {
		//if item has desc property, function will search the text string for dice values and return as a string
	  	let dice = '';

	  	if (string.match(/\d{1,2}d\d{1,2}/gim || /\d{1,2} d\d{1,2}/gim) !== null){
	  		dice = string.match(/\d{1,2}d\d{1,2}/gim)
	  	}
	  	
	  	return dice
	}

	getValues = diceArray => {

	  	let diceStrings = [];

	    let diceValues = [];

	    for (let i=0;i<=diceArray.length-1;i++){
	    	diceStrings.push(diceArray[i].split('d'))
	    }

	    for (let i=0;i<=diceStrings.length-1;i++){

	    	let rollGroup = []

	    	for (let j=0;j<=diceStrings[i].length-1;j++){
	    		rollGroup.push(parseInt(diceStrings[i][j]))
	    	}

	    	diceValues.push(rollGroup)

	    }
	  return diceValues

	  //   if(diceRolls[0] !== undefined){
	  //   rolls = diceRolls[0][0];
	  //   die = diceRolls[0][1]
	  // }
	}

	getSpellLevel(){
		if (this.props.item.level){
			console.log(this.props.item.level)
			let spellLevel = this.props.item.level.match(/(\d+)/)

			return parseInt(spellLevel)
		}

		else 
		{
			return null
		}
	}

	formatText(desc){
		//identify markup in the desc property and format to html
		return desc
	}

	checkFavorites(item){
		//chooses whether to render an add or remove favorites button

		console.log(item)

		if (this.props.favorites.includes(item) !== true){
			return (
				<Button 
					clickFunc={this.props.addFavorite} 
					input={this.props.item} 
					name={`Favorite ${this.props.item.name}`}
				/>)
		}
		else
		{
			return(
				<Button 
					clickFunc={this.props.removeFavorite} 
					input={this.props.item} 
					name={`Remove ${this.props.item.name} from favorites`}
				/>
				)
		}
	}

	render()
			{	

			return (
					<div className="ui mobile reversed stackable two column grid">
						<div className="ten wide column">
							<h1>{this.props.item.name}</h1>
							<p><em>{this.props.item.school}</em></p>
							<p><b>Duration:</b> {this.props.item.duration}</p>
							<p>{this.props.item.level}</p>
							<p>{this.formatText(this.props.item.desc)}</p>
							<p>{this.props.item.category}</p>
							<p>{this.props.item.damage_dice}</p>
							<span>{this.checkFavorites(this.props.item)}</span>
						</div>
						<div className="six wide column">
							<Calculator 
							itemName={this.props.item.name}
							itemLevel={this.getSpellLevel()}
							diceProp={
									this.getValues(this.props.item.damage_dice 
																			? 
																			[this.props.item.damage_dice]
																			:
																			this.getDice(this.props.item.desc))
									}
							/>
						</div>
					</div>
				)
			}

}

export default ItemDisplay