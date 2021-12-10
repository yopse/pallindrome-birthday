var birthdayDate = document.querySelector("#birthday-date");
var checkBtn = document.querySelector(".check-btn");
var displayMessage = document.querySelector(".opt-message")


function reverseDate(dateOfBirth){
    var charList = dateOfBirth.split('');
    var reversedList = charList.reverse()
    var dateOfBirthReverse = reversedList.join('')
    return dateOfBirthReverse
}

function isPallindrome(date){
    var reverse = reverseDate(date)
    return date === reverse
}

function checkPallindromeForAllPatterns(date){
    var allDatePatterns = getAllPatterns(date)
    var pallindromeFlag = false
    for(let i=0; i<allDatePatterns.length; i++){
        if(isPallindrome(allDatePatterns[i])){
            pallindromeFlag = true
            break
        }
    }
   return pallindromeFlag
}

function dateToString(birthdayDate){
    var strDate = {'day':'','month':'',"year":''}
    if(birthdayDate.day<10){
        strDate.day = '0' + birthdayDate.day
    }else{
        strDate.day = birthdayDate.day
    }
    if(birthdayDate.month<10){
        strDate.month = '0' + birthdayDate.month
    }else{
        strDate.month = birthdayDate.month.toString()
    }
    strDate.year = birthdayDate.year.toString()
    
    return strDate

}

function getAllPatterns(date){
    var dateStr = dateToString(date)
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd =dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]

}

function isLeapYear(year){
    if(year % 400 === 0){
      return true
    }
    if(year % 100 === 0){
      return false
    }
    if(year % 4 === 0){
      return true
    }
  }
  
function getPreviousDate(date){
    var day = date.day - 1
    var month = date.month
    var year = date.year
    var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
    if(day === 0)
    {
      if(month === 3)
      {
        console.log("MONTH")
        if(isLeapYear(year))
          {
            console.log("MONTH1")
          day = 29
          month = month - 1
          }
        else{
          console.log("MONTH2")
          console.log(daysInAMonth)
          day = daysInAMonth[month-2]
          month = month - 1 
        }
  
      }
      else if(month === 1)
      {
          month = 12
          day = daysInAMonth[month-1]
          year = year - 1
      }
      else
      {
        console.log("MONTHHHHH")
        day = daysInAMonth[month-2]
        month = month - 1 
      } 
   }
    return {'day':day,'month':month,'year':year}
  }
  
function getNextDate(date){
    var day = date.day + 1
    var month = date.month
    var year = date.year
    
    var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
  
    if(month === 2){
      if(isLeapYear(year)){
        if(day >29){
          day =1
          month = month + 1
        }
      }else{
        if(day > daysInAMonth[month-1]){
          day = 1
          month =month +1
        }
      }
    }else{
      if(day > daysInAMonth[month-1]){
        day =1
        month = month + 1 
      }
    }
    if(month > 12){
      month = 1
      year = year +1
    }
    return {'day':day,'month':month,'year':year}
    }
  
function getnextPallindrome(date){
    var nextDate = getNextDate(date)
    var ctr = 0
    var isPallindromeFlag = false
    while(1){
      ctr = ctr + 1
      isPallindromeFlag = checkPallindromeForAllPatterns(nextDate)
      if(isPallindromeFlag){
        break
      }else{
        nextDate = getNextDate(nextDate)
  
      }
  
    }
    return [ctr,nextDate]
  
  }
  
function getpPreviousPallindrome(date){
     var previousDate = getPreviousDate(date)
    var ctr = 0
    var isPallindromeFlag = false
    while(1){
      ctr = ctr + 1
      isPallindromeFlag = checkPallindromeForAllPatterns(previousDate)
      if(isPallindromeFlag){
        break
      }else{
        previousDate = getPreviousDate(previousDate)
  
      }
  
    }
    return [ctr,previousDate]
  
  }


function showMessage(msg){
    displayMessage.innerText = msg
  }

function clickHandler(){
  var birthdayInput = birthdayDate.value
  if(birthdayInput != ''){
    var listOfDate = birthdayInput.split('-');
    var date = {
      day:Number(listOfDate[2]),
      month:Number(listOfDate[1]),
      year:Number(listOfDate[0])
      }
    var pallindromeFlag = checkPallindromeForAllPatterns(date)
    if(pallindromeFlag){
        showMessage("Yayy !!!, Your Birthday is Pallindrome")
        }
    else{
        var nextPallindromeList = getnextPallindrome(date)
        var previousPallindromList = getpPreviousPallindrome(date)
        if(nextPallindromeList[0]>previousPallindromList[0])
        {
          var previousPallindrome = previousPallindromList[1].day +"-"+previousPallindromList[1].month +"-"+previousPallindromList[1].year
          showMessage("The nearest palindrome date is "+ previousPallindrome+", you missed by "+ previousPallindromList[0]+" days.")
        }else
        {
          var nextPallindrome = nextPallindromeList[1].day +"-"+nextPallindromeList[1].month +"-"+nextPallindromeList[1].year
          showMessage("The nearest palindrome date is "+ nextPallindrome+", you missed by "+ nextPallindromeList[0]+" days.")
        }
      } 
    }
  else{
    alert("Please fill out all Fields")
  }
}


checkBtn.addEventListener("click",clickHandler)