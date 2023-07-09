// Creating All required Javascript variables
const inputSlider = document.querySelector("[data-lengthSlider"); // Slider that will change password length
const lengthDisplay = document.querySelector("[data-lengthNumber]"); // password length number display
const passwordDisplay = document.querySelector("[data-passwordDisplay]");// password display
const copyBtn = document.querySelector("[data-copy]");// which will help to copy the password text
const copyMsg = document.querySelector("[data-copyMsg]");// after copying password a 'copied' msg will be shown
const uppercaseCheck = document.querySelector("#uppercase");// If I want to include uppercase letters in password
const lowercaseCheck = document.querySelector("#lowercase");// If I want to include lowercase in password
const numbersCheck = document.querySelector("#numbers");// If I want to include numbers letters in password
const symbolsCheck = document.querySelector("#symbols");// If I want to include symbols in password
const indicator = document.querySelector("[data-indicator]");// It indicates the color which determine the password strength
const generateBtn = document.querySelector(".generateButton");// If I click This button password will be generated
const allCheckBox = document.querySelectorAll("input[type=checkbox]");// All checkbox list (Uppercase, lowercase, numbers, sylbols)
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'; // Symbols which will be required to generate different passwords


// Initially
let password = ""; // initially password is empty
let passwordLength = 10; // initially password length is 10
let checkCount = 0; // initially no checkbox is selected
handleSlider();// It will handle the slider with password length value while changing the range of the slider

function handleSlider() {
    inputSlider.value = passwordLength; // initially passwordLength is 10. So inputSlider will be at 10
    lengthDisplay.innerText = passwordLength; // set the value of the length display element which show the password length
    // so when slider will be moved, length display will also be chnaged along it
    
    const min = inputSlider.min; // minimum value of input slider
    const max = inputSlider.max; // maximum value of input slider
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
    // the background size of the input slider will be following this formula
    // The background-size property specifies the size of the background images.
    // backgroundSize: length | cover
    // These parameter will be given
    // backgroundSize will cover 100% of the area
    // now I have to decide the length of the backgrounSize (in %)
    // the min value of input slider is 0
    // the max value of input slider is 20
    // so when inputSlider value is 10, the the length of the inputSlider will be :
    // {(10 - 0) * 100} / (20 -0) = 50%
}

function setIndicator(color) {// it will determine the password strength
    indicator.style.backgroundColor = color;// color will be according to the password strength
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;// shadow effect
}

function getRndInteger(min, max) {
    // this function will generate random integers between given min and max value
    return Math.floor(Math.random() * (max - min)) + min;
    // Math.random() generate random numbers between 0 and 1
    // Math.random() * (max - min) will generate numbers between 0 and (max - min)
    // As it may contain decimal point value, so we used Math.floor(Math.random() * (max - min))
    // Math.floor(Math.random() * (max - min)) + min will generate numbers between min and max
}

function generateRandomNumber() {
    return getRndInteger(0, 9);// random number between 0 and 9
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
    //String.fromCharCode() generate the character from its ASCII code
    // getRndInteger(97, 123) will generate the random number between 97 and 123 as 97 is the ASCII of 'a'
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65, 91));// generate uppercase
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);// generate random numbers between 0 and symbol string length
    return symbols.charAt(randNum);// generating random symbol
}

function calcStrength() {// calculate strength
    let hasUpper = false;// if the uppercase has been checked
    let hasLower = false;// if the lowercase has been checked
    let hasNum = false;// if the number has been checked
    let hasSym = false;// if the symbol has been checked

    if (uppercaseCheck.checked) hasUpper = true;// '.checked' determine if checkbox is checked or not
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    // condition for password strength
     if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) 
         setIndicator("#0f0");
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) 
         setIndicator("#ff0");
    else 
      setIndicator("#f00");
    
}

async function copyContent() {// copying the generated password 
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
        // await navigator.clipboard.writeText(passwordDisplay.value) is a statement
        // that uses the Clipboard API to write the generated password to the clipboard.
        // The writeText() method of the Clipboard interface writes the provided text to the clipboard. 
        // It returns a Promise that resolves when the text has been successfully written to the clipboard.
        // By using the await keyword before the navigator.clipboard.writeText(passwordDisplay.value) statement,
        // the code waits until the Promise resolves before moving on to the next line of code.
        // This ensures that the password is successfully written to the clipboard before any further actions are taken.
    }
    catch(e) {
        copyMsg.innerText = "Failed";// if process failed
    }
    //to make copy msg span visible
    copyMsg.classList.add("active");// we are adding 'active' cl;ass which will display this copy msg (We will display this 'active' class using CSS property)

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);// after 2 min, the copy msg will disappear
}

function handleCheckBoxChange() {// whatever the checkbox is selected or not selected, this function will check this
    checkCount = 0;// initially make it 0, Then will be checked
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;// incremented
    });
    // forEach loop will go to each checkbox and will check if it's selected or not

    //special condition:
    // If numbers of checkbox selected is greater than the password length
    // then password length will be same as the number of selected checkbox
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();// displaying password length value in UI will be changed alogn the slider value
    }
}

function shufflePassword(array) {//  password will be given as array form
    // When password will be generated, It needs to suffle to make it more stronger
    //Fisher Yates Method (We will suffle the password with this method)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Math.random() * (i + 1) will generate the random number between 0 and (i+1)
        // Math.floor() will remove the decimal point value
        // now swapping will be done here
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";// empty string
    array.forEach((element) => (str += element));// array value is being converted into a single string
    return str;// return the string
}

// Now adding the event listeners

allCheckBox.forEach((checkbox) => {// applying event listeners in all checkboxes
    checkbox.addEventListener('change', handleCheckBoxChange);
    // if any change happened in checkbox selection
});

// if we change the input slider value
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    // e.target determine the inputSlider element. Its value will be copied to passwordLength
    handleSlider();
});

// if we click on the password copy button
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)// if there is a password then only password will be copied
        copyContent();
});

// if we click on the generate button
generateBtn.addEventListener('click', () => {

    if(checkCount == 0) //none of the checkbox are selected
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        // If numbers of checkbox selected is greater than the password length
    // then password length will be same as the number of selected checkbox
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");

    password = ""; //remove old password

    let funcArr = [];// this array will store the functions

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);// this function will be pushed into array

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);// this function will be pushed into array

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);// this function will be pushed into array

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);// this function will be pushed into array

    // whatever the checkboxs have been selected, those are compulsary to remain in the password
    // so compulsory addition:
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();// all the compulsary character or number will be added through this loop
    }
    console.log("COmpulsory adddition done");

    // the remaining positions of the password length will be filled randomly
    // remaining position = passwordLength-funcArr.length
    //remaining adddition:
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        // we will generate the random index of funcArr array
        let randIndex = getRndInteger(0 , funcArr.length);// generating random index between 0 and funcArr,length
        password += funcArr[randIndex]();// that will be added into the password
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));// The Array.from() method returns an array from any object with a length property.
    console.log("Shuffling done");

    //now show in UI
    passwordDisplay.value = password;// displaying the password in the UI
    console.log("UI adddition done");
    //now calculate strength of the generated password
    calcStrength();
});
