
// Redirect if user cancels at beginning
function redirectpage() {
  alert(" Sorry Your Operation cancelled...");
  window.location.href = "https://www.bankmuscat.om/";
  throw new Error("Process stopped");
}

// Generate Random 6-num for Account Number
function accountnum() {
  return Math.floor(Math.random() * 900000) + 100000;
}

// for valid input 
let validateAmount = (msg) => {
  for (; ;) {
    let input = prompt(msg);
    if (input === null) return null;

    let number = Number(input);
    if (!isNaN(number) && number > 0) return number;

    alert("Invalid Amount.. PLZ enter correct Number")
  }
};

// function for variable
let calcInterest = function (account) {
  let interestrate = 0;

  if (account.accountType === "savings") interestrate = 0.10;
  else if (account.accountType === "current") interestrate = 0.05;
  else if (account.accountType === "business") interestrate = 0.15;

  return account.balance * interestrate;
};


// creat Acount 
let fullname = prompt("Enter Full Name : ");
if (!fullname) redirectpage();
  

let id = prompt("Enter National ID : ");
if (!id) redirectpage();
 

let age = Number(prompt("Enter Your Age : "));
if (!age || isNaN(age)) 
  {redirectpage();}

if (age < 18) {
  alert(" Under 18 age!!!  Sorry Acount cannot created");
  redirectpage();
}


let accountType = prompt(" Choose Acount Type ( savings - current - business) ");
if (!accountType) redirectpage();

accountType = accountType.toLowerCase();
if (accountType !== "savings" && accountType !== "current" && accountType !== "business") {
  alert("wrong Account Type.");
  redirectpage();
}

let initdeposit = validateAmount("Enter Initial Deposit ");
if (initdeposit == null) redirectpage();

if (!confirm("Are you want to continue & create Account ?? ")) {
  redirectpage();
}

// object for user Account
let userAccount = {
  accountNumber: accountnum(),
  fullName: fullname,
  nationalID: id,
  age: age,
  accountType: accountType,
  balance: initdeposit,
  transactionHistory: [],
  status: "active"
};

// Transaction for initial Deposit
userAccount.transactionHistory.push({
  type: "deposit",
  amount: initdeposit,
  date: new Date().toLocaleString()
});

alert(" Your Account Created Successfully");
console.log(" Your Account : ", userAccount);


// Menu Loop
let menu = true;
while (menu) {
  let option = prompt(`
    choose from option :
    1) Deposit 
    2) Withdraw
    3) check Balance
    4) View Transaction History 
    5) Calculate Yearly Interest
    6) Close Account
    7) Exit
    `);

  if (option === null) continue;

  switch (option) {
    // case 1 for Deposit 
    case "1":
      if (userAccount.status === "closed") {
        alert("Account closed & No Operation allowed");
        break;
      }
      let depositAmount = validateAmount("Enter Deposit Amount");
      if (depositAmount === null) break;
      userAccount.balance += depositAmount;

      userAccount.transactionHistory.push({
        type: "deposit",
        amount: depositAmount,
        date: new Date().toLocaleString()
      });
      alert(" Deposit added successful");
      break;


    // case 2 for Withdraw
    case "2":
      if (userAccount.status === "closed") {
        alert("Account closed & No Operation allowed");
        break;
      }

      let withdrawAmount = validateAmount("Enter withdrawal Amount");
      if (withdrawAmount === null) break;

      if (withdrawAmount > userAccount.balance) {
        alert("Your balance is Incomplete")
      } else {
        userAccount.balance -= withdrawAmount;

        userAccount.transactionHistory.push({
          type: "withdraw",
          amount: withdrawAmount,
          date: new Date().toLocaleString()
        });

        alert(" withdrawal added successful")
      }
      break;

       // case 3 for check balance
    case "3":
       alert("Current balance: "+ userAccount.balance)
        break;


      // case 4 for View History
  case "4":
  if (userAccount.transactionHistory.length === 0) {
    alert("No transactions yet");
  } else {
    console.table(userAccount.transactionHistory);
    alert("Please check the console for transaction history");
  }
  break;

      // case 5 for Inerest
      case "5":
        let Interest = calcInterest(userAccount);

        setTimeout(() => {
          alert(" Expected Yearly Interest :" + Interest);
        }, 2000);
        break;

      // case 6 for close Account
      case "6":
        if(userAccount.status === "closed"){
          alert("Your Account was closed");
          break;
        }

        if(confirm ("Are you want to close Account ??")){
          userAccount.status ="closed";
          alert("Your Account closed")
        }
        break;

        // case 7 for exit
        case "7":
          menu = false;
          break;

          default:
            alert(" Incorrect Choice ")
  }
}


// Final Report
console.log("=====================");
console.log("Final Account Summary");
console.log("=====================");
console.table(userAccount);
console.table(userAccount.transactionHistory);

