const text = 'hemidemisemiquaver';
const s1 = 'emi';
const s2 = 'm.se';

let textResult = ""; //text with needed HTML layout
let reg1 = new RegExp(s1, "ig");
let reg2 = new RegExp(s2,"ig");//create regexp objects from search masks

let reg2MatchesInText = [];//array of reg2 (foundObj) objects
let found;

while(found = reg2.exec(text)){
	let foundObj = {};
	foundObj.index = found.index;
	foundObj.val = found[0];
	foundObj.leftMatch = false;
	foundObj.rightMatch = false;//searching reg2 matching in text variable
	//and set properties of foundObj
	if (text.slice(foundObj.index-1,foundObj.index+2) === s1) {//if reg1 partially
		foundObj.leftMatch = true;					//crossed reg2 on the left side
		foundObj.leftPart = foundObj.val.slice(0,2);
		foundObj.rightPart = foundObj.val.slice(2);
	}
	if (text.slice(foundObj.index + 3, foundObj.index + 6) === s1) {//if reg1 partially
		foundObj.rightMatch = true;						//crossed reg2 on the right side
        foundObj.leftPart = foundObj.val.slice(0,2);
		foundObj.centralPart = foundObj.val[2];
		foundObj.rightPart = foundObj.val[3];
	}
	reg2MatchesInText.push(foundObj);//push foundObj to reg2MatchesInText array

}

let subStrLeftIndex = 0;//index of symbol in 'text' variable that set begin
// of the part for searching 'reg1' matches
let subStrRightIndex;//index that set the end of part for searching in 'text'
					//accordingly
for (let i = 0; i < reg2MatchesInText.length; i++) {//if we are found at least
	let maskObj = reg2MatchesInText[i];//one match to 'reg2' build needed HTML
    let firstPart;					//layout accordingly to each possible case
    let secondPart;
    let afterRightPart;
    subStrRightIndex = maskObj.index;

    if (maskObj.leftMatch) {// set part of 'text' variable before 'reg2'
    						// first symbol index
        firstPart = text.slice(subStrLeftIndex, subStrRightIndex - 1);
    } else {
        firstPart  = text.slice(subStrLeftIndex, subStrRightIndex);
    }
    firstPart.replace(reg1,"<i>" + s1 + "</i>");

    subStrLeftIndex = maskObj.index + maskObj.val.length;//increment index for set
	// 'firstPart' variable in next iterate of the loop

	if (maskObj.rightMatch) {//if reg1 partially crossed reg2 on the right side
		// add cursive part of text before 'reg2' initialised in 'afterRightPart'
		afterRightPart = text.slice(maskObj.index + maskObj.val.length, maskObj.index + maskObj.val.length + 2);
        subStrLeftIndex = maskObj.index + maskObj.val.length + 2;
    }
	//'reg1' partially crossing 'reg2' cases handling
	if (maskObj.leftMatch && !maskObj.rightMatch) {
		secondPart = "<i>" + text.slice(subStrRightIndex - 1, subStrRightIndex) + "</i><strong><i>"
		+ maskObj.leftPart + "</i>" + maskObj.rightPart + "</strong>";
	}
	if (!maskObj.leftMatch && maskObj.rightMatch) {
		secondPart = "<strong>" + maskObj.leftPart
		+ maskObj.centralPart	+ "<i>" + maskObj.rightPart + "</i>" + "</strong>"
		+ "<i>" + afterRightPart + "</i>";
	}
	if (maskObj.leftMatch && maskObj.rightMatch) {
		secondPart = "<i>" + text.slice(subStrRightIndex - 1, subStrRightIndex) + "</i><strong><i>"
		+ maskObj.leftPart + "</i>" +  maskObj.centralPart + "<i>" + maskObj.rightPart
		+ "</i>" + "</strong>" + "<i>" + afterRightPart + "</i>";
	}
	if (!maskObj.leftMatch && !maskObj.rightMatch) {
		secondPart = "<strong>" + maskObj.val
		+ "</strong>";
	}
	textResult += firstPart + secondPart;
}

textResult += text.slice(subStrLeftIndex);

if (reg2MatchesInText.length === 0) {//if have no matches of 'reg2' in text
	//also check 'reg1' matches
    textResult = text.replace(reg1,"<i>" + s1 + "</i>");
}

document.querySelector('.result').innerHTML = textResult;