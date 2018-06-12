import React, { Component } from 'react';
import Classes from './Classes';
import Calculator from './calculator.js';
import CLASSESDATA from './classes_data.js';

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
			attackRating = <td> Attack Rating: {this.calculateAttackRating()} </td>
		}
		else {
			attackRating = <td> Requirement Not Met! </td>
		}
		return (
			<table>
				<tbody>
					<tr colSpan='2'>
						<td>
							Class: <Classes value={this.state.class} change={this.changeClass}/>
						</td>
					</tr>
					<tr colSpan='2'>
						<td>
							Stats
						</td>
					</tr>
					<tr colSpan='2'>
						<td>
							Level: {
								CLASSESDATA[state.class].level + state.level
							}
						</td>
					</tr><tr>
						<td>
							str: {
								state.str + CLASSESDATA[state.class].str
							}
						</td>
						<td>
							<button onClick={this.statChange.bind(this, "str", 1)}>
								+
							</button>
							<button onClick={this.statChange.bind(this, "str", -1)}>
								-
							</button>
						</td>
					</tr>
					<tr>
						<td>
							dex: {
								state.dex + CLASSESDATA[state.class].dex
							}
						</td>
						<td>
							<button onClick={this.statChange.bind(this, "dex", 1)}>
								+
							</button>
							<button onClick={this.statChange.bind(this, "dex", -1)}>
								-
							</button>
						</td>
					</tr>
					<tr>
						<td>
							int: {
								state.int + CLASSESDATA[state.class].int
							}
						</td>
						<td>
							<button onClick={this.statChange.bind(this, "int", 1)}>
								+
							</button>
							<button onClick={this.statChange.bind(this, "int", -1)}>
								-
							</button>
						</td>
					</tr>
					<tr>
						<td>
							faith: {
								state.faith + CLASSESDATA[state.class].faith
							}
						</td>
						<td>
							<button onClick={this.statChange.bind(this, "faith", 1)}>
								+
							</button>
							<button onClick={this.statChange.bind(this, "faith", -1)}>
								-
							</button>
						</td>
					</tr>
					<tr>
						<td>
							luck: {
								state.luck + CLASSESDATA[state.class].luck
							}
						</td>
						<td>
							<button onClick={this.statChange.bind(this, "luck", 1)}>
								+
							</button>
							<button onClick={this.statChange.bind(this, "luck", -1)}>
								-
							</button>
						</td>
					</tr>
					<tr>
						{attackRating}
					</tr>
				</tbody>
			</table>
		);
	}
}

export default StatsData;