import {createContext, useContext, useState, useEffect} from 'react'

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {


  const [loan, setLoan] = useState([]);


  useEffect(() => {

    const storedLoan = localStorage.getItem("newloan");
    if (storedLoan) {
      setLoan(JSON.parse(storedLoan))
    }
  }, []);
  
  //add loan
  const addLoan = (loanAmount, loanType, loanTerm, interestRate, repaymentSchedule, status, loanDuration, collateral) => { 

    if (!loanAmount || !loanType || !loanTerm || !interestRate || !repaymentSchedule || !status || !loanDuration || !collateral)
      return alert("Fill all the fields");

    const loans = JSON.parse(localStorage.getItem("loans")) || [];

    if (loans.some((l) => l.loanType === loanType)) 
      return alert("Loan already Exists")

    loans.push({ loanAmount, loanType, loanTerm, interestRate, repaymentSchedule, status, loanDuration, collateral });
    localStorage.setItem("loans", JSON.stringify(loans));
    setLoan(loans)
    alert("Loan added successfully")
  }


  //view loan

  const viewLoan = (loanType) => {
    const storedLoan = JSON.parse(localStorage.getItem("loans"));
    return storedLoan.find((loan) => loan.loanType === loanType)
  }

  //update loan

  const updateLoan = (updatedLoan) => {

    let storedLoan = JSON.parse(localStorage.getItem("loans")) || [];

    storedLoan = storedLoan.map((loan) =>
      loan.loanType === updatedLoan.loanType ? updatedLoan : loan
    )
    localStorage.setItem("loans", JSON.stringify(storedLoan));
    setLoan(storedLoan)
  }

  //delete loan

  const deleteLoan = () => {
    localStorage.removeItem("newLoan")
    setLoan(null)
  }

  return (

    <LoanContext.Provider value={{ loan, addLoan, viewLoan, updateLoan, deleteLoan }}>
      {children}
    </LoanContext.Provider>

  )

}
  export const useLoan = () => useContext(LoanContext)