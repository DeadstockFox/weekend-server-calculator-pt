console.log('dogs');

//blank global variable for operator, to be replaced with new operator on button click
let operatorGlobal = '';
let splitGlobal =

//Calling function on start to display calculation history (if any)
getMath();


//GET request inside function to call later
function getMath() {

    //GET request to pull calculations from server and push to DOM
    axios.get('/calculations').then((response) => {

        //pointing to ids in DOM where calculations will go
        let calcList = document.querySelector('#historyResult');
        let calcListRecent = document.querySelector('#resultRecent');
        
        //giving our returned data a var name
        let calcClient = response.data;
        console.log(calcClient);

        //resetting calculation history section before each GET request so nothing repeats
        calcList.innerHTML=`
            <p id="history">Calculation History</p>
        `;

        //looping through array to display history of calculations
        //using parseFloat with radix 10 on results to remove any potential leading zeros.
        for (calc of calcClient){
        calcList.innerHTML +=`
        <p>${parseFloat(calc.numOne, 10)} ${calc.operator} 
        ${parseFloat(calc.numTwo, 10)} = ${parseFloat(calc.result, 10)}</div>
        `};

        //recent calculation will only populate if something is in GET request
        if (calcClient.length > 0) {
            //creating a variable for last item in array
            let calcClientLast = calcClient[calcClient.length-1]; 
            //console.log(calculationsClientLast);

            //pushing most recent calculation to DOM
            //using parseInt on results to remove any potential leading zeros.
            calcListRecent.innerHTML =`
            <p id="recentCalc">${parseFloat(calcClientLast.numOne, 10)} ${calcClientLast.operator}
            ${parseFloat(calcClientLast.numTwo, 10)} = ${parseFloat(calcClientLast.result, 10)}</p> <br>
        `};

    }).catch((error) => {
        //in case of error
        console.log(error);
    });
};

//function for POST request on 'equal' button click
function equals(event) {
    
    //-------Old data before stretch work------\\
     //assigning user inputs to variables
     //let firstNumberInput = document.getElementById('numberFirst').value;
     //let secondNumberInput = document.getElementById('numberSecond').value;
     //console.log(secondNumberInput);
     //-----------------------------------------\\

    //assigning variable to return of newCalc function below
    let calcReturn = newCalc();

    //preventing reload
    event.preventDefault();

     //creating array from inputs and global operator
     let calculation = {
        
        //setting each part of split string as numOne & numTwo
         numOne: calcReturn[0],
         numTwo: calcReturn[1],
         operator: operatorGlobal
         //result: "" //add result later server-side
     };
     console.log(calculation);

     //if statement to prevent POST request unless all inputs have value
     if(calculation.numOne != '' && calculation.numTwo != '' && calculation.operator != ''){
        //POST request to take calculation and send to server
        axios.post('/calculations', calculation).then((response) => {
            //console.log response status to complete loop
            console.log(response);

        }).catch((error) => {
            //in case of error
            console.log(error);
        });

        //calling function with GET request after completed POST request
        getMath()
    } else {
        alert("Please enter all inputs and choose an operator!");
    }
};

//Set of functions to change the global operator depending on button clicked.

function plus(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "+";
    newCalcForm.value = newCalcForm.value + "+"
};

function subtract(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "-";
    newCalcForm.value = newCalcForm.value + "-"
};

function multiply(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "*";
    newCalcForm.value = newCalcForm.value + "*"
};

function divide(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "/";
    newCalcForm.value = newCalcForm.value + "/"
};

function reset(event) {
    event.preventDefault();
    document.querySelector('#historyResult').reset();
    document.querySelector('#resultRecent').reset();
}


//----------Stretch Goal Work----------\\

//buttons for each added number on calculator

let newCalcForm = document.getElementById('field');

function decimal(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + ".";
}

function zero(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 0;
}
function one(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 1;
};

function two(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 2;
};
function three(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 3;
};
function four(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 4;
};
function five(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 5;
};
function six(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 6;
};
function seven(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 7;
};
function eight(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 8;
};
function nine(event){
    event.preventDefault();
    newCalcForm.value = newCalcForm.value + 9;
};

//function to split inputs in field into two numbers for POST request.
//operatorGlobal is reused as split variable
function newCalc() {
    let splitVar ="";
    if(operatorGlobal === "+"){
        splitVar = "+";
    } else if(operatorGlobal === "-"){
        splitVar = "-";
    } else if(operatorGlobal === "*"){
        splitVar = "*";
    } else if(operatorGlobal === "/"){
        splitVar = "/";
    };
    console.log(newCalcForm.value);
    let mathForms = newCalcForm.value.split(splitVar);
    //console.log(mathForms);
    return mathForms;
}

