import React from 'react';

import ListItem from './ListItem'

const ListComponent = ({listItems, onItemSelect, searchType}) => {

	const renderedList = listItems.map((item) => {

		return <ListItem key={item.slug ? item.slug : item} item={item} onItemSelect={onItemSelect}/>

	})

		return (
			<div className="ui">
				<form className="ui form">
					<div className="field">
						<select>
						<option>Select a {searchType}!</option>
						{renderedList}
						</select>
					</div>
				</form>
				<div className="ui divider"></div>
			</div>)
}

export default ListComponent