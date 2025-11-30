import { createBrowserRouter } from "react-router";
import { Login } from "../components/Login";
import { Dashboard } from "../components/Dashboard";
import { IncomeExpense } from "../components/IncomeExpense";
import { Investment } from "../components/Investment";
import { AIConsultation } from "../components/AIConsultation";
import { Quiz } from "../components/Quiz";
import { ParentalControl } from "../components/ParentalControl";
import { Calendar } from "../components/Calendar";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/income-expense",
    Component: IncomeExpense,
  },
  {
    path: "/investment",
    Component: Investment,
  },
  {
    path: "/ai-consultation",
    Component: AIConsultation,
  },
  {
    path: "/quiz",
    Component: Quiz,
  },
  {
    path: "/parental-control",
    Component: ParentalControl,
  },
  {
    path: "/calendar",
    Component: Calendar,
  },
]);
