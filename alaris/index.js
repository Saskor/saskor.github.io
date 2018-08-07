const text = 'hemidemisemiquaver';
const s1 = 'emi';//search mask one
const s2 = 'm.se';//search mask two

let textResult = ""; //variable for text with needed HTML layout
let reg1 = new RegExp(s1, "ig");
let reg2 = new RegExp(s2,"ig");//create regexp objects from search masks

let reg2MatchesInText = [];//array of 'reg2' ('foundObj') objects
let found;

while(found = reg2.exec(text)){	//searching 'reg2' matching in 'text' variable
	let foundObj = {};		//and define 'foundObj' properties
	foundObj.index = found.index;
	foundObj.val = found[0];
	foundObj.leftMatch = false;
	foundObj.rightMatch = false;
	//and set properties of foundObj
	if (text.slice(foundObj.index-1,foundObj.index+2) === s1) {//if 'reg1' partially
		foundObj.leftMatch = true;	//crossed 'reg2' on the left side of 'reg2'
		foundObj.leftPart = foundObj.val.slice(0,2);
		foundObj.rightPart = foundObj.val.slice(2);
	}
	if (text.slice(foundObj.index + 3, foundObj.index + 6) === s1) {//if 'reg1' partially
		foundObj.rightMatch = true;	//crossed 'reg2' on the right side of 'reg2'
        foundObj.leftPart = foundObj.val.slice(0,2);
		foundObj.centralPart = foundObj.val[2];
		foundObj.rightPart = foundObj.val[3];
	}
	reg2MatchesInText.push(foundObj);//push 'foundObj' to 'reg2MatchesInText' array

}

let subStrLeftIndex = 0;//index of symbol in 'text' variable that set begin
// for searching 'reg1' matches before 'reg2' in this part of 'text'
let subStrRightIndex;//index that set the end of part for searching 'reg1' in 'text'
//accordingly
for (let i = 0; i < reg2MatchesInText.length; i++) {//if we are found at least
    let maskObj = reg2MatchesInText[i];//one match to 'reg2' build needed HTML
    let firstPart;			//layout accordingly to each possible case
    let secondPart;
    let afterRightPart;
    subStrRightIndex = maskObj.index;

    if (maskObj.leftMatch) {
        firstPart = text.slice(subStrLeftIndex, subStrRightIndex - 1);
    } else {
        firstPart  = text.slice(subStrLeftIndex, subStrRightIndex);
    }
    firstPart.replace(reg1,"<i>" + s1 + "</i>");//searching and replacing 'reg1'
	//to cursive text in a part of 'text' variable between begin of text and
	//'reg2' match position or between 'reg2' current position and 'reg2' previous
	//position
    subStrLeftIndex = maskObj.index + maskObj.val.length;//increment begin index
	//for set 'firstPart' variable for next iterate of the loop

	if (maskObj.rightMatch) {
		afterRightPart = text.slice(maskObj.index + maskObj.val.length, maskObj.index + maskObj.val.length + 2);
		//if 'reg1' partially crossed 'reg2' on the right side
		// define crossing part of text in 'afterRightPart' variable
		subStrLeftIndex = maskObj.index + maskObj.val.length + 2;
		//increment begin index for set 'firstPart' variable for next iterate
		//of the loop
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
	//concatenateing summary 'textResult' with the current 'firstPart' and
	//'secondPart' of 'text'
}

if (reg2MatchesInText.length != 0) {
	textResult += text.slice(subStrLeftIndex);//add part of 'text'
	//after last 'reg2' matching
} else {
  	textResult = text.replace(reg1,"<i>" + s1 + "</i>");
	//if have no matches of 'reg2' in text also check 'reg1' matches
	//and replace it with cursive HTML layout
}

document.querySelector('.result').innerHTML = textResult;
