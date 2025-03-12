import SummaryCards from "../../../components/SummaryCards";
import ExpensesChart from "../../../components/ExpensesChart";
import CategoryPieChart from "../../../components/CategoryPieChart";

export default function Dashboard() {
  return (
    <div className="mt-16 p-6">
      <h1
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: "#245a28" }}
      >
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="text-[#245a28]">
        <SummaryCards />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#245a28]">
        {/* Monthly Expenses Bar Chart */}
        <ExpensesChart />

        {/* Category-wise Pie Chart */}
        <CategoryPieChart />
      </div>
    </div>
  );
}
