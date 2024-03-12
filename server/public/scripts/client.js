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
        let calculationList = document.querySelector('#historyResult');
        let calculationListRecent = document.querySelector('#resultRecent');
        
        //giving our returned data a var name
        let calculationsClient = response.data;
        console.log(calculationsClient);

        //resetting calculation history section before each GET request so nothing repeats
        calculationList.innerHTML=`
            <p id="history">Calculation History</p>
        `;

        //looping through array to display history of calculations
        for (calculation of calculationsClient){
        calculationList.innerHTML +=`
        <p>${calculation.numOne} ${calculation.operator}
            ${calculation.numTwo} = ${calculation.result}</p>
        `
        };

        //recent calculation will only populate if something is in GET request
        if (calculationsClient.length > 0) {
            let calculationsClientLast = calculationsClient[calculationsClient.length-1]; 
            //console.log(calculationsClientLast);

            calculationListRecent.innerHTML =`
            <p id="recentCalc">${calculationsClientLast.numOne} ${calculationsClientLast.operator}
            ${calculationsClientLast.numTwo} = ${calculationsClientLast.result}</P>
        `;
        };

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

     //creating array from inputs and global operator
     let calculation = {
         numOne: firstNumberInput,
         numTwo: secondNumberInput,
         operator: operatorGlobal,
         //result: "" //empty to add result later server-side
     };
     console.log(calculation);

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
