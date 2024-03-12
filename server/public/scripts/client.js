console.log('dogs');

//blank global variable for operator, to be replaced with new operator on button click
let operatorGlobal = '';

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
        for (calc of calcClient){
        calcList.innerHTML +=`
        <p>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</p>
        `};

        //recent calculation will only populate if something is in GET request
        if (calcClient.length > 0) {
            //creating a variable for last item in array
            let calcClientLast = calcClient[calcClient.length-1]; 
            //console.log(calculationsClientLast);

            //pushing most recent calculation to DOM
            calcListRecent.innerHTML =`
            <p id="recentCalc">${calcClientLast.numOne} ${calcClientLast.operator}
            ${calcClientLast.numTwo} = ${calcClientLast.result}</P>
        `};

    }).catch((error) => {
        //in case of error
        console.log(error);
    });
};

//function for POST request on 'equal' button click
function equals(event) {

    //preventing reload
    event.preventDefault();

     //assigning user inputs to variables
     let firstNumberInput = document.getElementById('numberFirst').value;
     let secondNumberInput = document.getElementById('numberSecond').value;
     //console.log(secondNumberInput);

     //creating array from inputs and global operator
     let calculation = {
         numOne: firstNumberInput,
         numTwo: secondNumberInput,
         operator: operatorGlobal,
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
};

function subtract(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "-";
};

function multiply(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "*";
};

function divide(event) {
    //preventing reload
    event.preventDefault();
    operatorGlobal = "/";
};

function reset(event) {
    event.preventDefault();
    document.querySelector('#historyResult').reset();
    document.querySelector('#resultRecent').reset();
}
