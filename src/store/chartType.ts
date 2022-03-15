import { createContext } from "react";

const chartType = ''

export type ContextType = {
  chartType: string,
  setChartType: (chartType: string) => void,
  para: any,
  setPara: (para: any) => void
} | null;

const ChartTypeContext = createContext<ContextType>(null);

export { ChartTypeContext, chartType };