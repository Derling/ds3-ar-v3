import React, { Component } from 'react';
import WeaponCell from './weapon_cell.js';
import './style.css';

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
		
		let elements = [];
		let row = 0;

		while(row < this.props.weapons.length/5) {
			let colIndex = row * 5;
			elements.push(
				<tr key={colIndex}>
					<WeaponCell data={this.props.weapons[colIndex]} 
						selectWeapon={this.handleClick}/>
					<WeaponCell data={this.props.weapons[colIndex + 1]} 
						selectWeapon={this.handleClick}/>
					<WeaponCell data={this.props.weapons[colIndex + 2]} 
						selectWeapon={this.handleClick}/>
					<WeaponCell data={this.props.weapons[colIndex + 3]} 
						selectWeapon={this.handleClick}/>
					<WeaponCell data={this.props.weapons[colIndex + 4]} 
						selectWeapon={this.handleClick}/>
				</tr>
			);
			row ++;
		}

		return (
			<div>
				<table>
					<tbody>
						{elements}
					</tbody>
				</table>
			</div>
		);
	}
}

export default WeaponsTable;