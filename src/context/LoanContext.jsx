import { createContext, useContext, useState, useEffect } from "react";

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loan, setLoan] = useState([]);

  // Load loans from localStorage on first render
  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoan(storedLoans);
  }, []);

  // Sync loans with localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loan));
  }, [loan]);

  // Add Loan
  const addLoan = (loanData) => {
    if (Object.values(loanData).some((field) => !field)) {
      return alert("Fill all the fields");
    }

    if (loan.some((l) => l.loanType === loanData.loanType)) {
      return alert("Loan already exists");
    }

    const updatedLoans = [...loan, loanData];
    setLoan(updatedLoans);
    alert("Loan added successfully");
  };

  // View Loan
  const viewLoan = (loanType) => loan.find((l) => l.loanType === loanType);

  // Update Loan
  const updateLoan = (updatedLoan) => {
    const updatedLoans = loan.map((l) =>
      l.loanType === updatedLoan.loanType ? updatedLoan : l
    );
    setLoan(updatedLoans);
  };

  // Delete Loan
  const deleteLoan = (loanType) => {
    const updatedLoans = loan.filter((l) => l.loanType !== loanType);
    setLoan(updatedLoans);
  };

  return (
    <LoanContext.Provider
      value={{ loan, addLoan, viewLoan, updateLoan, deleteLoan }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => useContext(LoanContext);
