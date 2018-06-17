import React, { Component } from 'react';
import Infusions from './Infusions/';
import ICONS from '../static/icons';
import IMAGES from '../static/weapon';
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
		const currentInfusion = this.props.infusion;
		const infusions = this.props.weapon.basic_data.infusable === "!0" ? 
							<Infusions value={currentInfusion} 
								selected={this.changeInfusion}/> : null;
		return (
			<div class="component-wrapper">
				<div class="row">
					<div class="col">
						<div class="weapon-name">
							{this.props.weapon.name}
						</div>
						<div class="descriptor">
							<img title="type"  src={ICONS.type} alt='type icon'/>
							{this.props.weapon.basic_data.wep_type}
						</div>
						<div class="descriptor">
							Attack Power
						</div>
						<div class="descriptor">
								<img src={ICONS.physical} alt='physical icon'/>	
								Physical 
								<span className="dmgs">{
									Math.floor(this.props.weapon.base_damages[currentInfusion].physical) + (
									this.props.bonuses && this.props.bonuses.physical ? (
										"+" + this.props.bonuses.physical) : (""))
								}</span>
						</div>
						<div class="descriptor">
								<img src={ICONS.magic} alt='magic icon' />
								Magic
								<span className="dmgs">{
									Math.floor(this.props.weapon.base_damages[currentInfusion].magic) + (
									this.props.bonuses && this.props.bonuses.magic ? (
										"+" + this.props.bonuses.magic) : (""))
								}</span>
						</div>
						<div class="descriptor">
								<img src={ICONS.fire} alt='fire icon'/>	
								Fire 
								<span className="dmgs">{
									Math.floor(this.props.weapon.base_damages[currentInfusion].fire) + (
									this.props.bonuses && this.props.bonuses.fire ? (
										"+" + this.props.bonuses.fire) : (""))
								}</span>
						</div>
						<div class="descriptor">
								<img src={ICONS.lightning} alt='lightning icon'/>	
								Lightning
								<span className="dmgs">{
									Math.floor(this.props.weapon.base_damages[currentInfusion].lightning) + (
									this.props.bonuses && this.props.bonuses.lightning ? (
										"+" + this.props.bonuses.lightning) : (""))
								}</span>
						</div>
						<div class="descriptor">
								<img src={ICONS.dark} alt='dark icon'/>	
								Dark 
								<span className="dmgs">{
									Math.floor(this.props.weapon.base_damages[currentInfusion].dark) + (
									this.props.bonuses && this.props.bonuses.dark ? (
										"+" + this.props.bonuses.dark) : (""))
								}</span>
						</div>
					</div>
					<div className="col">
						<img className="selected-weapon" title={this.props.weapon.name} alt={this.props.weapon.name} src={IMAGES[this.props.weapon.url]}/>
					</div>
				</div>
				<div class="row footer">
					<div class="col">
						Attribute Requirements
					</div>
					<div class="col">
						{infusions}
					</div>
				</div>
				<div class="row footer">
					<div class="col">
						<img title='str' src={ICONS.str} alt="str icon"/>
						{this.props.weapon.basic_data.str_req}
					</div>
					<div class="col">
						<img title='dex' src={ICONS.dex} alt="dex icon" />
						{this.props.weapon.basic_data.dex_req}
					</div>
					<div class="col">
						<img title='int' src={ICONS.int} alt="int icon" />
						{this.props.weapon.basic_data.int_req}
					</div>
					<div class="col">
						<img title='faith' src={ICONS.fth} alt="faifth icon" />
						{this.props.weapon.basic_data.faith_req}
					</div>		
				</div>
			</div>
		);
	}
}

export default SelectedWeapon;