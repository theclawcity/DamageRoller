import React from 'react';
import './ListItem.css'

const ListItem = ({item, onItemSelect}) => {

	return <option className="listItem" onClick={() => onItemSelect(item)}>{item.name ? item.name : item}</option>

}

export default ListItem