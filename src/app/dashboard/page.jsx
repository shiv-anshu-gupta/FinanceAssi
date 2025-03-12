import SummaryCards from "../../../components/SummaryCards";
import ExpensesChart from "../../../components/ExpensesChart";
import CategoryPieChart from "../../../components/CategoryPieChart";
import BudgetComparisonChart from "../../../components/BudgetComparisonChart";
import SpendingInsights from "../../../components/SpendingInsights";

export default function Dashboard() {
  return (
    <div className="mt-10 p-8">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#245a28]">
        {/* Monthly Expenses Bar Chart */}
        <ExpensesChart />

        {/* Category-wise Pie Chart */}
        <CategoryPieChart />
      </div>

      {/* Budget vs Actual Comparison */}
      <div className="mt-10 text-[#245a28]">
        <h2 className="text-xl font-bold mb-4 text-center">
          Budget vs Actual Spending
        </h2>
        <BudgetComparisonChart />
      </div>

      {/* Spending Insights */}
      <div className="mt-10 text-[#245a28]">
        <h2 className="text-xl font-bold mb-4 text-center">
          Spending Insights
        </h2>
        <SpendingInsights />
      </div>
    </div>
  );
}
