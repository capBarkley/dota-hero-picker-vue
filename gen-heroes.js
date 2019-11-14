const templateFileName = './heroes.json';

const XLSX = require('xlsx');

var workbook = XLSX.readFile('heroes_nuke_levels.xlsx');

var first_sheet_name = workbook.SheetNames[0];

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

nukeLevelsarr = XLSX.utils.sheet_to_json(worksheet);

const readlineSync = require('readline-sync');
 
const fs = require('fs');

const heroesObj = require(templateFileName);

var heroesArr = Object.values(heroesObj);

fs.writeFileSync("heroesArr.json", JSON.stringify(heroesArr), function (err) {
	if (err) { return console.log(err); }
});

let hero_name = "";

let nuke_levelsObj = {};

heroesArr.map( heroObj => {
	hero_name = heroObj.localized_name;
	nukeLevelsarr.forEach(el => {
		if (el.heroName  == hero_name){
			for (let [key, value] of Object.entries(el)){
				if ( key == "heroName"){
					continue;
				}
				nuke_levelsObj[key] = value;
			}
		}
	});
	heroObj["nuke_levels"] = nuke_levelsObj;
})

/*heroesArr.map( heroObj => {
	console.log(heroObj.localized_name);
	for (let key of Object.keys(heroObj.nuke_levels)) {
		heroObj.nuke_levels[key] = readlineSync.question(`${key}: `);
	  }
})*/

fs.writeFileSync("heroesArr.json", JSON.stringify(heroesArr), function (err) {
	if (err) { return console.log(err); }
});


