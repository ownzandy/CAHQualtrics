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
  data["category"] = "Marginal Add"
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


function updateTotal() {
    var amounts = document.getElementsByClassName("amount");
    var moneyLeft = total;
    for(var i = 0; i < amounts.length; i++) {
        prev[i] = curr[i];
        curr[i] = amounts[i].value;
        moneyLeft -= parseInt(amounts[i].value);
    }
    if(!isNaN(moneyLeft)) {
        var money = document.getElementById("money");
        money.innerHTML = moneyLeft;
    }
}

function findMoneyLeft() {
    var amounts = document.getElementsByClassName("amount");
    var moneyLeft = total;
    for(var i = 0; i < amounts.length; i++) {
        moneyLeft -= parseInt(amounts[i].value);
    }
    return moneyLeft;
}
 
 
function add(num) {
    categoriesClicked.push(getCategoryFromNum(num));
    var amounts = document.getElementsByClassName("amount");
    var nextValue = parseInt(amounts[num].value) + 25;
    if(nextValue <= 600 && findMoneyLeft() - 25 >= 0) {
        amounts[num].value = nextValue;
        updateTotal();
    }
}
 
function cut(num) {
    categoriesClicked.push(getCategoryFromNum(num));
    var amounts = document.getElementsByClassName("amount");
    var nextValue = parseInt(amounts[num].value) - 25;
    if(nextValue >= 0) {
        amounts[num].value = nextValue;
        updateTotal();
    }
}
 
function undo(num) {
    var amounts = document.getElementsByClassName("amount");
    amounts[num].value = prev[num];
    updateTotal();
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