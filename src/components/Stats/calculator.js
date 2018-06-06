import SATURATION from './saturation.js';

const getSaturation = (index, level) => {
	return SATURATION[index][level]
}

class Calculator {
	
	constructor() {
		this.BONUSTYPES = ["physical", "magic", "fire","lightning", "dark"];
		this.TYPEINDEX = {"physical": [0,1],  "magic": [2], "fire": [2, 3], "lightning": [3], "dark": [2, 3]};
		this.TYPESTATS = ["str", "dex", "int", "faifth", "luck"];
	}

	getBonuses(weapon, infusion, stats) {
		let bonuses = this.BONUSTYPES.map( type => {
			let statIndex = "" + weapon.saturation_index[infusion][type];
			let statBonus = this.TYPEINDEX[type].map( index => {
					let typeStat = "" + this.TYPESTATS[index];
					let scalingCoeff = weapon.scaling_coeff[infusion][index] / 100;
					let saturation = getSaturation(statIndex, stats[typeStat])/100
					return scalingCoeff  * saturation;
				});
			return weapon.base_damages[infusion][type] * statBonus.reduce((first, second) => first + second);
		});
		return bonuses;
	}
}

export default Calculator;