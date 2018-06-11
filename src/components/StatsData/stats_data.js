import React, { Component } from 'react';
import Classes from './Classes';
import Calculator from './calculator.js';
import CLASSESDATA from './classes_data.js';
import Stats from './Stats';

const MAXSTAT = 99;

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
		this.changeClass = this.changeClass.bind(this);
	}

	increaseStat(stat) {
		console.log("increasing ", stat);
		if(this.state[stat]
			+ CLASSESDATA[this.state.class][stat] <= MAXSTAT){
			let tempObject = {};
			tempObject[stat] = this.state[stat] + 1;
			tempObject.level = this.state.level + 1;
			this.setState(tempObject);
		}
	}

	decreaseStat(stat) {
		console.log("decreasing ", stat);
		if(this.state[stat] > 0) {
			let tempObject = {};
			tempObject[stat] = this.state[stat] - 1;
			tempObject.level = this.state.level - 1;
			this.setState(tempObject);
		}
	}

	changeClass(newClass) {
		this.setState({currentClass: newClass})
	}

	render() {
		const state = this.state
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
							Stats 33
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
							<button onClick={this.increaseStat.bind(this, "str")}>
								+
							</button>
							<button onClick={this.decreaseStat.bind(this, "str")}>
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
							<button onClick={this.increaseStat.bind(this, "dex")}>
								+
							</button>
							<button onClick={this.decreaseStat.bind(this, "dex")}>
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
							<button onClick={this.increaseStat.bind(this, "int")}>
								+
							</button>
							<button onClick={this.decreaseStat.bind(this, "int")}>
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
							<button onClick={this.increaseStat.bind(this, "faith")}>
								+
							</button>
							<button onClick={this.decreaseStat.bind(this, "faith")}>
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
							<button onClick={this.increaseStat.bind(this, "luck")}>
								+
							</button>
							<button onClick={this.decreaseStat.bind(this, "luck")}>
								-
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default StatsData;