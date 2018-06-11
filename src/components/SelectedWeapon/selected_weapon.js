import React, { Component } from 'react';
import Infusions from './Infusions/';
import ICONS from './Icons';
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
							<img title="type"  src={ICONS.type} alt='type icon'/>
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
							<img src={ICONS.physical} alt='physical icon'/>	
							Physical {this.props.weapon.base_damages[currentInfusion].physical}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src={ICONS.magic} alt='magic icon' />
							Magic {this.props.weapon.base_damages[currentInfusion].magic}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src={ICONS.fire} alt='fire icon'/>	
							Fire {this.props.weapon.base_damages[currentInfusion].fire}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src={ICONS.lightning} alt='lightning icon'/>	
							Lightning {this.props.weapon.base_damages[currentInfusion].lightning}
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<img src={ICONS.dark} alt='dark icon'/>	
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
							<img title='str' src={ICONS.str} alt="str icon"/>
							{this.props.weapon.basic_data.str_req}
						</td>
						<td>
							<img title='dex' src={ICONS.dex} alt="dex icon" />
							{this.props.weapon.basic_data.dex_req}
						</td>
						<td>
							<img title='int' src={ICONS.int} alt="int icon" />
							{this.props.weapon.basic_data.int_req}
						</td>
						<td>
							<img title='faith' src={ICONS.fth} alt="faifth icon" />
							{this.props.weapon.basic_data.faith_req}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default SelectedWeapon;