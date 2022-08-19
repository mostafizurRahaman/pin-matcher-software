function generatePin(){
   const pin = createPin(); 
   const pinString = pin+""; 
   if(pinString.length === 6){
      return pin; 
   }else{
     return generatePin(); 
   }
}

function createPin(){
   return Math.round(Math.random()*1000000); 
}

function getInputFieldValue(inputId){
   const inputField = document.getElementById(inputId); 
   const inputFieldValues = parseInt(inputField.value); 
   return inputFieldValues;
}

function setInputFieldValue(inputId, Value){
   const inputField = document.getElementById(inputId); 
   inputField.value = Value; 
}

function hide(inputId){
   const element = document.getElementById(inputId);
   element.classList.add('d-none'); 
}
function show(inputId){
   const element = document.getElementById(inputId);
   element.classList.remove('d-none'); 
}


document.getElementById('pin-generator').addEventListener('click', function(){
      setInputFieldValue('pin-display', generatePin()); 
}); 

document.getElementById('keyPad').addEventListener('click', function(event){
   const keyValues = event.target.innerText; 
   const keypadDisplay = document.getElementById("keypad-display"); 
   const previousDisplayValue = keypadDisplay.value; 
  
   if(isNaN(keyValues)){
       if(keyValues === "C"){
            setInputFieldValue('keypad-display', "")
       }else if(keyValues === "<"){
            console.log(keyValues); 
            const digits = previousDisplayValue.split(''); 
            console.log(digits);
             digits.pop(); 
            const newDigits = digits.join(''); 
            setInputFieldValue('keypad-display', newDigits);             
       }
   }else{
      const newDisplayValue = previousDisplayValue + keyValues; 
      setInputFieldValue('keypad-display', newDisplayValue); 
   }
}); 


document.getElementById('submit-btn').addEventListener('click', function(event){
   const generatedPin = getInputFieldValue('pin-display'); 
   const enterPin= getInputFieldValue('keypad-display');
   const attempsElement = document.getElementById('attemps'); 
   let attempsCounter = parseInt(attempsElement.innerText); 
   if(generatedPin == enterPin){
      show('success'); 
      hide("failure"); 
      setInputFieldValue('pin-display',"");
   }else{
      show('failure'); 
      hide('success');
      attempsCounter = attempsCounter + 1; 
      attempsElement.innerText = attempsCounter ;
      if(attempsCounter == 3){
         alert(`Stop you pass ${attempsCounter} attemps`); 
         event.target.setAttribute('disabled', true); 
         location.reload(); 
         setInputFieldValue('pin-display',"")
      }
   }
   setInputFieldValue("keypad-display", ""); 

})