const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:

let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations

// POST /calculations


//----------Current Work----------\\


//GET request
app.get('/calculations', (req, res) => {

    console.log('GET request made to /calculations.');
    //console.log(calculations);


    //sending global array of completed calculations to client
    res.send(calculations);

});

//POST request
app.post('/calculations', (req,res) => {

  //assigning our request data to variable
   let pillar = req.body;

  //adding a result key to our calculation data, equal to the result of the function doMAth
   pillar.result = doMath(req.body)
   console.log(pillar);

   //pushing data to array for GET request
   calculations.push(pillar);


    //closing POST loop
    res.sendStatus(201);
});


//function that does math depending on the input operator
function doMath(math) {
    let result =''
    if (math.operator === '+'){
        //parsInt because the numbers appear as strings with addition operator?
        result = parseInt(math.numOne) + parseInt(math.numTwo);
    }
    else if (math.operator === '-'){
        result = math.numOne - math.numTwo;
    }
    else if (math.operator === '*'){
        result = math.numOne * math.numTwo;
    }
    else if (math.operator === '/'){
        result = math.numOne / math.numTwo
    };
    return result;
};




// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
