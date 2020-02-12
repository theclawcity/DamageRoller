import React from 'react';
import './ListItem.css'

const ListItem = ({item}) => {

	return <option>{item.name ? item.name : item}</option>

}

export default ListItem