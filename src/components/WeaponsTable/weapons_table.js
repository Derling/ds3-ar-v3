import React, { Component } from 'react';
import './style.css';
import IMAGES from '../static/weapon';

class WeaponsTable extends Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(selectedWeapon) {
		this.props.weaponSelected(selectedWeapon);
	}

	render() {
		if(!this.props.weapons) {
			return null;
		}
		
		let elements = this.props.weapons.map((weapon, index) => {
			return(
				<div key={index} onClick={() => this.handleClick(weapon)} title={weapon.name} className="icon-wrapper">
					<img className="icon" alt={weapon.name}
						src={IMAGES[weapon.url]} />
				</div>
			)
		})

		return (
			<div className="component-wrapper">
				{elements}
			</div>
		);
	}
}

export default WeaponsTable;