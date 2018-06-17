import React, { Component } from 'react';
import Classes from './Classes';
import Calculator from './calculator.js';
import CLASSESDATA from './classes_data.js';
import './style.css';
import str from '../static/icons/str.jpg';
import dex from '../static/icons/dex.jpg';
import int from '../static/icons/int.jpg';
import fth from '../static/icons/fth.jpg';
import luck from '../static/icons/luck.jpg';

const MAXSTAT = 99; // maximum stat level is 99 for all classes
const MINSTAT = 0; // minimum stat level varies(dependent on class)
const DECREMENT = -1;
const INCREMENT = 1;


class StatsData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			class: "Knight",
			level: 0,
			str: 0,
			dex: 0,
			int: 0,
			faith: 0,
			luck: 0
		}
		this.calculator = new Calculator();
		this.changeClass = this.changeClass.bind(this);
	}

	statChange(stat, change) {
		// users can only add to the base stat until the stat reaches the maximum value
		// users cannot decrement below the base stat of the class
		if(this.state[stat] < MAXSTAT - CLASSESDATA[this.state.class][stat] && this.state[stat] >= 0) {
			if((this.state[stat] !== MINSTAT && change === DECREMENT) || (this.state[stat] < MAXSTAT && change === INCREMENT)) {
				this.setState({[stat]: this.state[stat] + change, level: this.state.level + change}, this.validateStats);
			}
		}
	}

	validateStats() {
		// send bonus damage to parent for sibling component to display them
		if(this.meetsRequirements()){
			this.props.updateBonus(this.calculateBonuses());
		}
		else{
			// base stats havent been met so the weapon cannot receive any stat bonuses
			this.props.updateBonus(null);
		}
	}

	componentWillMount() {
		// initial rendering of component
		this.validateStats();
	}

	componentDidUpdate(prevProps) {
		// weapon or infusion have been changed which affect the damage bonuses
		if(this.props.weapon !== prevProps.weapon || this.props.infusion !== prevProps.infusion) {
			this.validateStats();
		}
	}

	calculateBonuses() {
		return this.calculator.getBonuses(this.props.weapon, this.props.infusion, this.getStats());
	}

	changeClass(newClass) {
		this.setState({class: newClass}, this.validateStats);
	}

	meetsRequirements() {
		// check if current stats meet the required stats to effective weild the weapon
		let currentStats = this.getStats();
		let requirements = this.props.weapon.basic_data;
		return(currentStats.str >= requirements.str_req
			&& currentStats.dex >= requirements.dex_req
			&& currentStats.int >= requirements.int_req
			&& currentStats.faith >= requirements.faith_req
		);
	}

	getStats() {
		// combine the base stats with the stats added by the user to get the current stat level
		return({
			str: this.state.str + CLASSESDATA[this.state.class].str,
			dex: this.state.dex + CLASSESDATA[this.state.class].dex,
			int: this.state.int + CLASSESDATA[this.state.class].int,
			faith: this.state.faith + CLASSESDATA[this.state.class].faith,
			luck: this.state.luck + CLASSESDATA[this.state.class].luck
		});
	}

	calculateAttackRating() {
		// add all the base damages and bonus damages to get the total attack rating of current weapon
		let baseDmgs = this.props.weapon.base_damages[this.props.infusion]
		let bonusDmgs = this.props.bonuses;
		return Math.floor(
			baseDmgs.physical + baseDmgs.magic +
			baseDmgs.fire + baseDmgs.lightning + baseDmgs.dark +
			bonusDmgs.physical + bonusDmgs.magic + bonusDmgs.fire +
			bonusDmgs.lightning + bonusDmgs.dark  
		);
	}

	render() {
		const state = this.state;
		let attackRating;
		// if there are any bonuses, render the total attack rating
		if(this.props.bonuses) {
			attackRating = <span style={{color:"green", fontSize:"20px"}}>
								<strong> Attack Rating: {this.calculateAttackRating()} </strong>
							</span>
		}
		else {
			attackRating = <span style={{color:"red", fontSize:"20px"}}>
								<strong> Requirement not met! </strong>
						   </span>
		}
		return (
			<div className="component-wrapper">
				<div className="stat">
					Class: <Classes value={this.state.class} change={this.changeClass}/>
				</div>
				<div className="stat">
					Stats
				</div>
				<div className="stat">
					Level: {CLASSESDATA[state.class].level + state.level}
				</div>
				<div className="stat">
					<span className="stat-label">
						<img src={str} alt="Strength" />
						Strength
					</span>
					<div className="buttons">
						{state.str + CLASSESDATA[state.class].str}
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "str", 1)}>
							+
						</button>
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "str", -1)}>
							-
						</button>
					</div>
				</div>
				<div className="stat">
					<span className="stat-label">
						<img src={dex} alt="Dexterity" />
						Dexterity
					</span>
					<div className="buttons">
						{state.dex + CLASSESDATA[state.class].dex}
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "dex", 1)}>
							+
						</button>
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "dex", -1)}>
							-
						</button>
					</div>
				</div>
				<div className="stat">
					<span className="stat-label">
						<img src={int} alt="Intelligence" />
						Intelligence
					</span>
					<div className="buttons">
						{state.int + CLASSESDATA[state.class].int}
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "int", 1)}>
							+
						</button>
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "int", -1)}>
							-
						</button>
					</div>
				</div>
				<div className="stat">
					<span className="stat-label">
						<img src={fth} alt="Faith" />
						Faith
					</span>
					<div className="buttons">
						{state.faith + CLASSESDATA[state.class].faith}
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "faith", 1)}>
							+
						</button>
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "faith", -1)}>
							-
						</button>
					</div>
				</div>
				<div className="stat">
					<span className="stat-label">
						<img src={luck} alt="Luck" />
						Luck
					</span>
					<div className="buttons">
						{state.luck + CLASSESDATA[state.class].luck}
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "luck", 1)}>
							+
						</button>
						<button style={{color:"black"}} onClick={this.statChange.bind(this, "luck", -1)}>
							-
						</button>
					</div>
				</div>
				<div claass="stat">
					{attackRating}
				</div>
			</div>
		);
	}
}

export default StatsData;