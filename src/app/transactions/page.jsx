import Navbar from "../../../components/Navbar";
import TransactionForm from "../../../components/TransactionForm";
import TransactionList from "../../../components/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="flex w-full h-[calc(100vh-4rem)] pt-16">
      {/* Left Side - Background Image with Centered Form */}
      <div className="relative w-1/2 h-full flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_640.jpg')",
          }}
        />
        {/* Centered Form with Overlay */}
        <div className="relative bg-white bg-opacity-80 p-8 rounded-lg w-[75%] max-w-[400px] shadow-lg z-10">
          <TransactionForm />
        </div>
      </div>

      {/* Right Side - Full Height Transaction List */}
      <div className="w-1/2 h-full p-6 bg-white flex flex-col shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Transaction List
        </h2>
        <div className="flex-grow overflow-y-auto">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
