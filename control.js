Qualtrics.SurveyEngine.addOnload(function()
{
	
});

var total = 600;
var prev = ["0", "0", "0"];
var curr = ["0", "0", "0"];
var nextButton = document.getElementById('NextButton');
var categoriesClicked = [];


nextButton.onclick=function(){
	var data = {};
	data["category"] = "Control"
	data["remaining"] = calculateMoneyLeft();
	var amounts = document.getElementsByClassName("amount");
	data["shopping"] = amounts[0].value;
	data["eating"] = amounts[1].value;
	data["entertainment"] = amounts[2].value;
	categoriesClicked.splice(0, 3);
	data["progress"] = categoriesClicked;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://sheetsu.com/apis/5f364691', true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(data));
}

function updateTotal(num) {
	categoriesClicked.push(getCategoryFromNum(num));
	var amounts = document.getElementsByClassName("amount");
	var moneyLeft = total;
	for(var i = 0; i < amounts.length; i++) {
		var currAmt = amounts[i].value;
		prev[i] = curr[i];
		curr[i] = currAmt;
		if(parseInt(currAmt) < 0 || isNaN(currAmt) || currAmt == "") {
		   amounts[i].value = 0;  
		}
		else if(parseInt(currAmt) > 600) {
		   amounts[i].value = 600;  
		}
		while(calculateMoneyLeft() < 0) {
			if(amounts[num].value == 0) {
				break;	
			}
			amounts[num].value--;
		}
		moneyLeft -= amounts[i].value
	}
	if(!isNaN(moneyLeft)) {
		var money = document.getElementById("money");
		money.innerHTML = calculateMoneyLeft();
	}
}

function getCategoryFromNum(num) {
	if(num == 0) {
		return "shopping";		
	}
	else if(num == 1) {
		return "eating";		
	}
	else {
		return "entertainment"
	}
}
			
function calculateMoneyLeft() {
	var amounts = document.getElementsByClassName("amount");
	var moneyLeft = total;
	for(var i = 0; i < amounts.length; i++) {
		moneyLeft -= amounts[i].value
	}
	return moneyLeft;
}

function undo(num) {
	var amounts = document.getElementsByClassName("amount");
	for(var i = 0; i < prev.length; i++) {
		amounts[num].value = prev[num];
		updateTotal();
	}
}