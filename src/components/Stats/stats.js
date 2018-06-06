import React, { Component } from 'react';
import Classes from './Classes';
import Calculator from './calculator.js';

class Stats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentClass: "knight"
		}
		this.changeClass = this.changeClass.bind(this)
	}

	changeClass(newClass) {
		this.setState({currentClass: newClass})
	}

	render() {
		console.log(this.props.weapon.name);
		console.log(this.props.infusion);
		let calculator = new Calculator();
		const stats = {str:'16', dex:'18', int:'9', faifth:'9', luck: '7'}
		console.log(calculator.getBonuses(this.props.weapon, this.props.infusion, stats))
		return (
			<table>
				<tbody>
					<tr colSpan='2'>
						<td>
							Class: <Classes value={this.state.currentClass} change={this.changeClass}/>
						</td>
					</tr>
					<tr colSpan='2'>
						<td>
							Stats
						</td>
					</tr>

				</tbody>
			</table>
		);
	}
}

export default Stats;