import Navbar from "../../../components/Navbar";
import TransactionForm from "../../../components/TransactionForm";
import TransactionList from "../../../components/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="flex w-full h-[calc(100vh-4rem)] pt-16">
      {/* Left Side - Background Image with Centered Form (60% Width) */}
      <div className="relative w-[60%] h-full flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_640.jpg')",
          }}
        />
        {/* Centered Form with Overlay */}
        <div className="relative bg-transparent bg-opacity-85 p-8 rounded-lg w-auto max-w-[450px] shadow-lg z-10">
          <TransactionForm />
        </div>
      </div>

      {/* Right Side - Transaction List (40% Width) */}
      <div className="w-[80%] h-full p-6 bg-white flex flex-col shadow-lg">
        <div className="flex-grow overflow-y-auto">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
