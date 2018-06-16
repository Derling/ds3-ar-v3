import React, { Component } from 'react';
import IMAGES from '../static/weapon';

class WeaponCell extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.selectWeapon(this.props.data);
	}

	render() {
		if(!this.props.data) {
			return null;
		}
		return (
			<td onClick={this.handleClick}>
				<img width='100' height='100' alt={this.props.data.name} title={this.props.data.name}
					src={IMAGES[this.props.data.url]} />
			</td>
		);
	}

}

export default WeaponCell;