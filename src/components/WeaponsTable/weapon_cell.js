import React, { Component } from 'react';

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

		let imageUrl = "http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/" + this.props.data.url + ".png";
		return (
			<td onClick={this.handleClick}>
				<img width='100' height='100' alt={this.props.data.name} title={this.props.data.name}
					src={imageUrl} />
			</td>
		);
	}

}

export default WeaponCell;