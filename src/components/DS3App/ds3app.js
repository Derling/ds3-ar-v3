import React, { Component } from 'react';
import WeaponsTable from '../WeaponsTable';
import SelectedWeapon from '../SelectedWeapon';
import Stats from '../StatsData';
import WEAPONS from './weapons.js';
import './style.css';


class DS3App extends Component {
	constructor() {
		super();
		this.changeSelected = this.changeSelected.bind(this);
		this.setInfusion = this.setInfusion.bind(this);
		this.updateBonuses = this.updateBonuses.bind(this);
		this.state = {
			selectedWeapon: null,
			selectedInfusion: null,
			bonuses: {}
		}	
	}

	componentWillMount() {
		this.setState({selectedWeapon: WEAPONS[0], selectedInfusion: "Normal"})
	}

	updateBonuses(bonuses) {
		this.setState({bonuses});
	}

	setInfusion(infusion) {
		this.setState({selectedInfusion: infusion})
	}

	changeSelected(weapon) {
		if(this.state) {
			this.setState({selectedWeapon: weapon, selectedInfusion: "Normal"});
		}
	}

	render() {
		if(!WEAPONS) {
			return null;
		}
		return (
			<div className="row">
				<div className='col-md-4 col-sm-12 tbl-container'>
					<WeaponsTable weapons={WEAPONS} 
							weaponSelected={this.changeSelected} />
				</div>
				<div className='col-md-4 col-sm-12 tbl-container'>
					<SelectedWeapon 
							weapon={this.state.selectedWeapon}
							infusion={this.state.selectedInfusion}
							setInfusion={this.setInfusion}
							bonuses={this.state.bonuses}/>
				</div>
				<div className='col-md-4 col-sm-12 tbl-container'>
					<Stats weapon={this.state.selectedWeapon}
							infusion={this.state.selectedInfusion}
							updateBonus={this.updateBonuses}
							bonuses={this.state.bonuses}/>
				</div>
			</div>
		);
	}
}

export default DS3App;