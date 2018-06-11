import React, { Component } from 'react';

class Classes extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.change(event.target.value);
	}

	render() {
		return(
			<select onChange={this.handleChange} value={this.props.value}>
				<option value="Knight">Knight</option>
				<option value="Mercenary">Mercenary</option>
				<option value="Warrior">Warrior</option>
				<option value="Herald">Herald</option>
				<option value="Thief">Thief</option>
				<option value="Assassin">Assassin</option>
				<option value="Sorcerer">Sorcerer</option>
				<option value="Pyromancer">Pyromancer</option>
				<option value="Cleric">Cleric</option>
				<option value="Deprived">Deprived</option>
			</select>
		);
	}
}

export default Classes;