import React from 'react';
import './ListItem.css'

const ListItem = ({item}) => {

	return <option className="ListItem">{item.name ? item.name : item}</option>

}

export default ListItem