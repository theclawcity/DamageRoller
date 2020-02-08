import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import open5e from '../api/open5e'
import Header from './Header';
import ListComponent from './ListComponent'
import ItemDisplay from './ItemDisplay';
import Button from './Button';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			searchingFor: null,
			lastSearchType: 'weapons',
			listItems: [],
			selectedItem: null,
			viewingFavorites: false,
			favorites: [],
			loading: false
		}
	}

	componentDidMount(){
		// this.getData(this.state.lastSearchType);
		this.getFavorites();
		//this.checkMobile();
	}

	//should this call be made from the header instead
	componentDidUpdate(){
		this.getData(this.state.searchingFor);
		this.saveFavorites(this.state.favorites);
	}

	componentWillUnmount(){
		window.removeEventListener('beforeunload', this.saveFavorites)
	}

	// checkMobile(){
	// 	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
 //    		console.log('boop')
 //    		React.initializeTouchEvents(true)
	// 	}
	// 	else
	// 	{
	// 		console.log('desktawp')
	// 	}
	// }

	//TO DO: get slug and name ONLY
	getData = async (searchType) => {

		if (this.state.lastSearchType !== this.state.searchingFor){

			let arr = [];

			let searchFor = searchType;

			let defaultItem = null

			//set weapons if null
			// if (searchFor == null){
			// 	searchFor = 'weapons'
			// }
			
			const response = await open5e.get(searchFor + '/?limit=325')

			arr = response.data.results.map((item) => {
				return item
			})

			defaultItem = response.data.results[0]

			console.log(defaultItem)
			//lastSearchType and searchingFor always equal because of below
			this.setState({
				loading: false,
				listItems: arr,
				selectedItem: defaultItem,
				lastSearchType: this.state.searchingFor
			})
		}
	}

	onItemSelect = item => {

		
		console.log(item)
		this.setState({
				selectedItem: item,
			});


	//Below not working due to search limitation
		// const response = await open5e.get(this.state.searchingFor + '/?limit=325&search=' + item.slug)
		// console.log(response.data.results)

	}

	onTypeSelect = type => {

		let lastSearch = this.state.SearchingFor

		if (type === 'favorites'){

			if (this.state.favorites[0] === undefined){

				alert("No items have been favorited yet!")

			}
			else
			{

				console.log(this.state.favorites)

				this.setState({
					searchingFor: type,
					lastSearchType: lastSearch,
					viewingFavorites: true,
					selectedItem: this.state.favorites[0]
				})

			}
		}
		else {
		if (type !== this.state.searchingFor){
				this.setState({
					loading: true,
					searchingFor: type,
					lastSearchType: lastSearch,
					viewingFavorites: false
				})
			}
		}
		//set const for data query types here (desc, damage_dice, etc.)
	}

	addFavorite = item => {

		let faves = this.state.favorites

		if(faves.includes(item) !== true){
			faves.push(item)
			this.setState({favorites: faves})
		}
		else
		{
			alert('This item is already favorited!')
		}
	}

	removeFavorite = item => {

		let oldFaves = this.state.favorites;

		let newFaves = oldFaves.filter(fav => {
			return fav !== item
		})

		this.setState({favorites: newFaves})

	}

	saveFavorites(faves){

		let savedFaves = JSON.parse(localStorage.getItem('favorites'));

		if (faves !== savedFaves){

		localStorage.setItem('favorites', JSON.stringify(faves));

		}
	}

	getFavorites(){

		if (localStorage.getItem('favorites')){
			let faves = JSON.parse(localStorage.getItem('favorites'))
			console.log(faves[0]);
			this.setState({favorites: faves})
		}

	}

	renderDisplay = searchStatus => {

		if (this.state.loading !== true){

			if (searchStatus !== null){
				return 	(
					<div>
						<ListComponent 
							loadStatus={this.state.loading}
							searchType={this.state.searchingFor} 
							listItems={this.state.viewingFavorites ? this.state.favorites : this.state.listItems} 
							onItemSelect={this.onItemSelect}
						/>
						<ItemDisplay 
							addFavorite={this.addFavorite}
							removeFavorite={this.removeFavorite}
							favorites={this.state.favorites} 
							item={this.state.selectedItem} 
						/>
					</div>
									)
			}
			else
			{
				return (
					<div className="ui">
							<h2>Hello!</h2> 
							<p>Welcome to my dice roller app. You can use it to generate damage rolls for items included in Wizards 
							of the Coast's <em>Dungeons & Dragons: Fifth Edition</em> SRD. To get started, simply select an item type 
							above and then search the corresponding list for the item you want to roll for. Any favorites you select will persist between borwser sessions.</p>
							<p>Credit to the <a href="https://open5e.com/">Open5e API</a>, which was used as a data source for this project!</p>
						</div>
					)
			}

		}
		else
		{
			return (
					<div className="ui">
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui active inverted dimmer">
							<div className="ui text large loader">Loading</div>
						</div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
					</div>
				)
		}

	}

	render(){

		return (
			<div className="ui">
				<Header/>
				<div className="ui container">
					<div className="ui four buttons">
						<Button clickFunc={this.onTypeSelect} input="weapons" name="Weapons"/>
						<Button clickFunc={this.onTypeSelect} input="magicitems" name="Magic Items" />
						<Button clickFunc={this.onTypeSelect} input="spells" name="Spells" />
						<Button clickFunc={this.onTypeSelect} input="favorites" name="Favorites" />
					</div>
				<div className="ui container segment">
				{this.renderDisplay(this.state.searchingFor)}
				</div>
				</div>
			</div>
			)

	}

}

export default App;