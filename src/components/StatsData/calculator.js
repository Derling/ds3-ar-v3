import SATURATION from './saturation.js';

// to calculate bonusses get the corresponding coefficients for the different damage types
// then get the saturation index and the level of the stat
// multiply scaling coefficient with saturation coefficient (divide by 100 since they are percentages)
// multiply the result by the base damage for the damage type
// *** damage types are physical, magic, fire, lightning and dark ***
// physical mainly scales from str and dex
// magic scales from int
// fire scales from int and faith
// lightning scales from faifth
// dark scales from int and faith
// in the rare case of a hollow infusion, luck based scaling uses physical base damage
// *** bless and hollow weapons scale from the base physical damage *** 

const getSaturation = (index, level) => {
	return SATURATION[index][level]
}

class Calculator {
	
	constructor() {
		// mapping that helps gather weapon information from json data
		this.DMGTYPES = ["physical", "magic", "fire","lightning", "dark", "luck"];
		this.TYPEINDEX = {"0": [0,1],  "1": [2], "2": [2, 3], "3": [3], "4": [2, 3], "5": [4]};
		this.TYPESTATS = ["str", "dex", "int", "faith", "luck"];
	}

	getBonuses(weapon, infusion, stats) {
		let bonuses = {physical: 0, magic: 0, fire: 0, lightning: 0, dark: 0}
		// calculate all basic damage bonuses
		for(let typeIndex in this.DMGTYPES) {
			let type = this.DMGTYPES[typeIndex] === "luck" ? "physical" : this.DMGTYPES[typeIndex];
			let statIndex = weapon.saturation_index[infusion][type];
			let statBonus = this.TYPEINDEX[typeIndex].map( index => {
					let typeStat = this.TYPESTATS[index];
					let scalingCoeff = weapon.scaling_coeff[infusion][index] / 100;
					let saturation = getSaturation(statIndex, stats[typeStat]) /100
					return scalingCoeff  * saturation;
				});
			bonuses[type] += Math.floor(weapon.base_damages[infusion][type] * statBonus.reduce((first, second) => first + second));
		}
		// blessed infused weapons have special scaling
		if(infusion === "Blessed") {
			let scalingCoeff = weapon.scaling_coeff.Blessed[3] / 100;
			let saturation = getSaturation(weapon.saturation_index.Blessed.physical, stats.faith) / 100;
			bonuses.physical += Math.floor(weapon.base_damages.Blessed.physical * (scalingCoeff * saturation));
		}
		
		return bonuses;
	}
}

export default Calculator;