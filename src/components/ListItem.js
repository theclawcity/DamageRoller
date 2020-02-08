import React from 'react';

const ListItem = ({item, onItemSelect}) => {

	return <option onClick={() => onItemSelect(item)} onTap={() => onItemSelect(item)}>{item.name ? item.name : item}</option>

}

export default ListItem