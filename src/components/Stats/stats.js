import React, { Component } from 'react';
import Classes from './Classes';

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