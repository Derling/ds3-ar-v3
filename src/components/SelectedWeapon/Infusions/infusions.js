import React, { Component } from 'react';


class Infusions extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.selected(event.target.value);
	}

	render() {
		return (
			<select onChange={this.handleChange} value={this.props.value}>
				<option value="Blessed">Blessed</option>
				<option value="Blood">Blood</option>
				<option value="Chaos">Chaos</option>
				<option value="Crystal">Crystal</option>
				<option value="Dark">Dark</option>
				<option value="Deep">Deep</option>
				<option value="Fire">Fire</option>
				<option value="Heavy">Heavy</option>
				<option value="Hollow">Hollow</option>
				<option value="Lightning">Lightning</option>
				<option value="Normal">Normal</option>
				<option value="Poison">Poison</option>
				<option value="Raw">Raw</option>
				<option value="Refined">Refined</option>
				<option value="Sharp">Sharp</option>
				<option value="Simple">Simple</option>
			</select>
		)
	}
}

export default Infusions;