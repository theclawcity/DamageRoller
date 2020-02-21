import React from 'react';

import './style.css'
import Button from './Button';
import ListComponent from './ListComponent';

class Calculator extends React.Component {


	constructor(props){
		super(props)
		this.state = {
			diceString: null,
			diceVal: null,
			result: null,
			extraDice: 0

		}
		this.calculateDamage = this.calculateDamage.bind(this)
	}

	getDice = string => {
		//if item has desc property, function will search the text string for dice values and return as a string
	  	let dice = '';

	  	if (string.match(/\d{1,2}d\d{1,2}/gim || /\d{1,2} d\d{1,2}/gim) !== null){
	  		dice = string.match(/\d{1,2}d\d{1,2}/gim)
	  	}
	  	
	  	return dice
	}








	getValues = diceProp => {

		if (this.state.diceStrings != null)
		{

	  			let diceStrings = [];
	  	
	  		    let diceValues = [];
	  	
	  		    for (let i=0;i<=diceProp.length-1;i++){
	  		    	diceStrings.push(diceProp[i].split('d'))
	  		    }
	  	
	  		    for (let i=0;i<=diceStrings.length-1;i++){
	  	
	  		    	let rollGroup = []
	  	
	  		    	for (let j=0;j<=diceStrings[i].length-1;j++){
	  		    		rollGroup.push(parseInt(diceStrings[i][j]))
	  		    	}
	  				
	  		    	diceValues.push(rollGroup)
	  	
	  		    }

	  		  console.log(diceProp)
	  		  console.log(this.state.diceString)
	  		  
	  		  this.setState({
	  		  		DiceStrings: diceProp,
	  		  		DiceVal: diceValues
	  		  	})
	  	}

	  //   if(diceRolls[0] !== undefined){
	  //   rolls = diceRolls[0][0];
	  //   die = diceRolls[0][1]
	  // }
	}

	calculateDamage(arr){

	  if (arr[0]){
	  	let rolls = arr[0][0] + this.state.extraDice;
	  
	  	let die = arr[0][1] 
	  
	  	let sum = 0;
	  
	  	  		for(let i = rolls; i > 0; i--){
	  
	  	    		sum += Math.floor(Math.random()*die + 1)
	  			}
	  
	  
	  	      // for (let i = this.state.value; i > this.props.level;i--){
	  	      //   sum += this.diceRoll(die)
	  	      // }
	  
	  	  console.log(sum)
	  
	  	  // alert(`You rolled a ${sum}!`)

	  	  this.setState({
	  				  	result: sum
	  				  })
	  	  // console.log(Math.ceil(sum / 2))
	  	}
	  // console.log((rolls + (this.state.value - this.props.level)) * die)
	}

	setLevel = e => {

		e.preventDefault();

		let selectedLevel = e.target.value

		let extraDice = selectedLevel - this.props.itemLevel

		console.log(extraDice)

		this.setState({extraDice: extraDice})

	}

	addExtraDice = diceProp => {

			let totalDice = diceProp

			let diceToAdd = this.state.extraDice;

			totalDice[0][0] = totalDice[0][0] + diceToAdd;

			return totalDice

	}

	renderLevelList = itemLevel => {
		if(itemLevel !== null){

			let levelArr = []

			let baseLevel = itemLevel

			for (let i=baseLevel;i<=9;i++){
				levelArr.push(i)
			}

			return (
				<div className="eight wide column">
					<h5>Spell Level</h5>
					<ListComponent listItems={levelArr} handler={this.setLevel} searchType="Add Spell Level" value={this.props.itemlevel}/>
					<br />
				</div>
				)

		}
		else if (this.state.extraDice > 0)
		{
			this.setState({extraDice: 0})
		}
	}


	componentDidUpdate(){
		
	}


	render(){

		return (
			<div className="calculator">
			<h3>Calculator</h3>
				<div className="ui one column centered grid">
					<div className="seven wide column">
						{this.renderLevelList(this.props.itemLevel)}
						<Button textAlign="center" clickFunc={this.calculateDamage} input={this.props.diceProp} name="Roll Damage"/>
					</div>
				</div>
				<h1>{this.state.result}</h1>
			</div>
			)
	}

}

export default Calculator