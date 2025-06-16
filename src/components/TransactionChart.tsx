import { Box, FormControl, Select, MenuItem, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../hooks/useTransactions";

const TransactionChart = () => {
  const { filteredTransactions, dateRange, setDateRange } = useTransactions();

  return (
    <Box sx={{ width: "100%", height: 400 , p: 2}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Volumen de Transacciones</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={dateRange}
            onChange={(e) =>
              setDateRange(e.target.value as "day" | "week" | "month")
            }
          >
            <MenuItem value="day">Hoy</MenuItem>
            <MenuItem value="week">Última semana</MenuItem>
            <MenuItem value="month">Último mes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer>
        <LineChart
          data={filteredTransactions}
          margin={{
            top: 12,
            right: 30,
            left: 20,
            bottom: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="total"
            stroke="#8884d8"
            name="Total"
            strokeWidth={3}
          />
          <Line
            dataKey="compras"
            stroke="#82ca9d"
            name="Compras"
          />
          <Line
            dataKey="ventas"
            stroke="#ff7300"
            name="Ventas"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionChart;
