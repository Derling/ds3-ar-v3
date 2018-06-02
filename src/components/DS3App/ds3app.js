import React, { Component } from 'react';
import WeaponsTable from '../WeaponsTable';
import axios from 'axios';
import SelectedWeapon from '../SelectedWeapon';
import './style.css';


const API = 'http://localhost:3004/data';

class DS3App extends Component {
	constructor() {
		super();
		this.changeSelected = this.changeSelected.bind(this);
		this.setInfusion = this.setInfusion.bind(this);
		this.state = {
			selectedWeapon: null,
			weapons: null,
			selectedInfusion: null
		}
		console.log(this.state)
	}

	setInfusion(infusion) {
		this.setState({selectedInfusion: infusion})
	}

	changeSelected(weapon) {
		if(this.state) {
			this.setState({selectedWeapon: weapon});
		}
	}

	componentWillMount() {
		axios.get(API).then(
			response => this.setState({
				weapons: response.data,
				selectedWeapon: response.data[0],
				selectedInfusion: "Normal"
			})
		);
	}

	render() {
		if(!this.state.weapons){
			return null;
		}
		return (
			<div className="row">
				<div className='col-md-4 col-sm-12 tbl-container'>
					<WeaponsTable weapons={this.state.weapons} 
							weaponSelected={this.changeSelected} />
				</div>
				<div className='col-md-4 col-sm-12 tbl-container'>
					<SelectedWeapon weapon={this.state.selectedWeapon} 
							infusion={this.state.selectedInfusion}
							setInfusion={this.setInfusion}/>
				</div>
				<div className='col-md-4 col-sm-12 tbl-container'>
					
				</div>
			</div>
		);
	}
}

export default DS3App;