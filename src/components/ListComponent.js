import React from 'react';

import ListItem from './ListItem'

const ListComponent = ({listItems, handler, searchType}) => {

	const renderedList = listItems.map((item) => {

		return <ListItem key={item.slug ? item.slug : item} item={item}/>

	})

		return (
			<div className="ui">
				<form className="ui form">
					<div className="field">
						<select onChange={handler}>
						<option>{searchType}</option>
						<option>--------------------------</option>
						{renderedList}
						</select>
					</div>
				</form>
				<div className="ui divider"></div>
			</div>)
}

export default ListComponent