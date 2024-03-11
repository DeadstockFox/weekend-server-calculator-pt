console.log('dogs');

//blank global variable for operator, to be replaced with new operator on button click
let operatorGlobal = '';


//GET request to pull calculations from server and push to DOM
axios.get('/calculations').then((response) => {
    //pointing to ids in DOM where calculations will go
    let calculationList = document.querySelector('#historyResult');
    let calculationListRecent = document.querySelector('#resultRecent');
    
    //giving our data a var name
    let calculations = response.data;

    //looping through array
    for (calculation of calculations){
    calculationList.innerHTML +=`
       <p> ~This is a test: ${calculation}</p>
    `
    };


}).catch((error) => {
    //in case of error
    console.log(error);
});


//function for POST request on 'equal' button click
function equals(event) {
    //preventing reload
    event.preventDefault();
    
     //assigning user inputs to variables
     let firstNumberInput = document.getElementById('numberFirst');
     let secondNumberInput = document.getElementById('numberSecond');

     //creating array from inputs and global operator
     let calculation = {
         firstNumber: firstNumberInput,
         secondNumber: secondNumberInput,
         operator: operatorGlobal
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
};

function plus(event) {
    event.preventDefault();
    operatorGlobal = "+";
};

