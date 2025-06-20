
const Base_URL = `https://latest.currency-api.pages.dev/v1/currencies`;

const dropdrowns = document.querySelectorAll(".dropdown select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

const btn = document.querySelector("Form button");
for(let select of dropdrowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==='from' && currCode === 'USD'){
            newOption.selected = "selected";
        }else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";

        }
        select.appendChild(newOption);

    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag =(element )=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;

    element.parentElement.querySelector("img").src = newSrc;

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("Form input").value;
    console.log(amount);
    if(amount === "" || amount <= 0){
        alert("Please enter a valid amount");
        return;
    } 
    console.log(fromcurr.value, tocurr.value);
    const URL = `${Base_URL}/${fromcurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalAmount = amount * rate;
    
    // Display the result
    let msg = document.querySelector(".msg");
    msg.innerText = `${amount} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;


});
