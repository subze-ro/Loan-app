import { useForm } from "react-hook-form";
import { useLoan } from "../context/LoanContext";

const LoanForm = () => {
  const { loan, addLoan } = useLoan();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addLoan(data);
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-red-100 shadow-md rounded-lg grid grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-red-600">Create Loan</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Amount
            </label>
            <input
              type="number"
              {...register("loanAmount", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Type
            </label>
            <input
              type="text"
              {...register("loanType", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Term
            </label>
            <input
              type="text"
              {...register("loanTerm", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate
            </label>
            <input
              type="number"
              {...register("interestRate", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Repayment Schedule
            </label>
            <input
              type="text"
              {...register("repaymentSchedule", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              {...register("status", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Duration
            </label>
            <input
              type="text"
              {...register("loanDuration", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collateral
            </label>
            <input
              type="text"
              {...register("collateral", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Add Loan
          </button>
        </form>
      </div>

      {/* Loan Table Section */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-red-600">Loan Records</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-gray-700">
                Loan Type
              </th>
              <th className="border border-gray-300 p-2 text-gray-700">
                Amount
              </th>
              <th className="border border-gray-300 p-2 text-gray-700">Term</th>
              <th className="border border-gray-300 p-2 text-gray-700">
                Interest
              </th>
              <th className="border border-gray-300 p-2 text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loan.length > 0 ? (
              loan.map((l, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{l.loanType}</td>
                  <td className="border border-gray-300 p-2">{l.loanAmount}</td>
                  <td className="border border-gray-300 p-2">{l.loanTerm}</td>
                  <td className="border border-gray-300 p-2">
                    {l.interestRate}%
                  </td>
                  <td className="border border-gray-300 p-2">{l.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No loans available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanForm;
