import React, { Component } from 'react';
import Infusions from './infusions.js';
import './style.css';


class SelectedWeapon extends Component {

	constructor(props){
		super(props);
		this.changeInfusion = this.changeInfusion.bind(this);
	}

	changeInfusion(infusion) {
		this.props.setInfusion(infusion);
	}

	render() {
		if(!this.props.weapon) {
			return null;
		}
		console.log(this.props)
		const imageUrl = "http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/" + this.props.weapon.url + '.png';
		const currentInfusion = this.props.infusion;
		const infusions = this.props.weapon.basic_data.infusable === "!0" ? 
							<Infusions value={currentInfusion} 
								selected={this.changeInfusion}/> : null;
		return (
			<table>
				<tbody>
					<tr>
						<td colSpan="2">
							{this.props.weapon.name}
						</td>
						<td rowSpan="8" colSpan="2">
							<img width="300" height="300" title={this.props.weapon.name} alt={this.props.weapon.name} src={imageUrl}/>
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img title="type"  src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/weapon_type-icon.jpg" alt='type icon'/>
							{this.props.weapon.basic_data.wep_type}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
						Attack Power
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon-wp_physicalAttack.png" alt='physical icon'/>	
							Physical {this.props.weapon.base_damages[currentInfusion].physical}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon-magicbonus.png" alt='magic icon' />
							Magic {this.props.weapon.base_damages[currentInfusion].magic}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon-firebonus.png" alt='fire icon'/>	
							Fire {this.props.weapon.base_damages[currentInfusion].fire}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon-lightningbonus.png" alt='lightning icon'/>	
							Lightning {this.props.weapon.base_damages[currentInfusion].lightning}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon-darkbonus.png" alt='dark icon'/>	
							Dark {this.props.weapon.base_damages[currentInfusion].dark}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							Attribute Requirements
						</td>
						<td colSpan='2'>
							{infusions}
						</td>
					</tr>
					<tr>
						<td>
							<img title='str' src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/STR.jpg" alt="str icon"/>
							{this.props.weapon.basic_data.str_req}
						</td>
						<td>
							<img title='dex' src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/DEX.jpg" alt="dex icon" />
							{this.props.weapon.basic_data.dex_req}
						</td>
						<td>
							<img title='int' src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/INT.jpg" alt="int icon" />
							{this.props.weapon.basic_data.int_req}
						</td>
						<td>
							<img title='faith' src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/FTH.jpg" alt="faifth icon" />
							{this.props.weapon.basic_data.faith_req}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default SelectedWeapon;