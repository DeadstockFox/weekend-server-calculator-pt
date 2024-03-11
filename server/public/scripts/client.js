console.log('dogs');

axios.get('/calculations').then((response) => {
    //pointing to ids in DOM where calculations will go
    let calculationList = document.querySelector('#historyResult');
    let calculationListRecent = document.querySelector('#resultRecent');
    
    let calculations = response.data;

    for (calculation of calculations){
    calculationList.innerHTML +=`
       <p> ~This is a test: ${calculation}</p>
    `
    };


}).catch((error) => {
  //in case of error
    console.log(error);
})
