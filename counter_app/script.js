//state bnadi phle counter ki value ko store krne ke liye
let count=0;

//ui ke elements ko select krna
const countEl = document.querySelector("#count");
const increaseBtn = document.querySelector("#increase");
const decreaseBtn = document.querySelector("#decrease");
const resetBtn = document.querySelector("#reset");
const stepInput = document.querySelector("#step");

//ab event listeners add krte hain buttons ke liye

//increase button ke click event listener
/*increaseBtn.addEventListener("click", () => {
    count++;
    //countEl.textContent = count;
    updateUI();
});*/
//decrease button ke click event listener
decreaseBtn.addEventListener("click", () => {
    count--;
    //countEl.textContent = count;
    updateUI();
});
//reset button ke click event listener
resetBtn.addEventListener("click", () => {
    count = 0;
    //countEl.textContent = count;
    updateUI();
});
//step input ke liye event listener
increaseBtn.addEventListener("click", () => {
  count += Number(stepInput.value);// number ka use krna pdta hai kyuki input se value string me aati hai
  updateUI();
});
function updateUI(){
    countEl.textContent = count;

    if (count>0){
        countEl.style.color = "green";
    }else if(count<0){
        countEl.style.color = "red";
    }    else{
        countEl.style.color = "black";
    }   
}


