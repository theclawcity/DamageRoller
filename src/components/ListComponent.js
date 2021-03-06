import React from 'react';

import ListItem from './ListItem'

const ListComponent = ({listItems, handler, searchType, value}) => {

	const renderedList = listItems.map((item) => {

		return <ListItem key={item.slug ? item.slug : item} item={item}/>

	})

		return (
			<div className="ui">
				<form className="ui form">
					<div className="field">
						<select onChange={handler} value={value}>
						{renderedList}
						</select>
					</div>
				</form>
			</div>)
}

export default ListComponent