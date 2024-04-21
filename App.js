//We will using currency converting API 

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

//Accessing the drop down menu in JS file
//we have 2 drop downs so we will access there selects

let dropdowns = document.querySelectorAll(".dropdown select");

// for(code in countryList){
//     console.log(code);
// }
for(let select of dropdowns){
    //Basically all the countries present in country codes list is converted
    //to options and then appended in select(dropdown)
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        //Now to show USD on left side and INR on right side we can specifically select them and display
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }   

    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
        //evt is an object whenever different different countries are selected the update flag
        //function will change the flag
    });
}

//Now whenever any country is selected we want to show the respective country flag.
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    //img's parent is select container hence we will target the parent element
    let Img = element.parentElement.querySelector("img");
    Img.src = newSrc;
};


//whenever get exchange rate button is clicked the amount should be converted to whichever country
//is selected below for that will have a function.

const btn = document.querySelector("form button");

//Accessing from and To currencies.
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

//Accessing msg class to display the converted currency value
const msg = document.querySelector(".msg");

//Adding all Event Listeners
btn.addEventListener("click",(evt)=>{
    //this to prevent page refresh when clicked on button we do not want anything sort of external
    //action performed when button is clicked.
    evt.preventDefault();
    updatExchangeRate();
});

//when the page loads we will show the default USD to INR conversion
window.addEventListener("load",()=>{
    updatExchangeRate();
});

const updatExchangeRate = async()=>{

    //accessing the entered amount
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //if our input is empty or it is less than 0
    if(amtVal === "" || amtVal < 0){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL); //returns a promise
    let data = await response.json();
    //why lowercase because the API uses lowercases letters.
    let rate =  data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    //final currency to be shown on msg.
    let finalCurrency = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalCurrency} ${toCurr.value}`;
}