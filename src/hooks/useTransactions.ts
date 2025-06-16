import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useUserContext, type User } from "../context/UserContext";
import type { ITransaction } from "../models/ITransaction";
import {
  createTransaction,
  getTransactionsByUser,
} from "../services/transactionsService";
import { getUsers, updateWallets } from "../services/userService";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[]);
  const [users, setUsers] = useState([] as User[]);
  const [filteredTransactions, setFilteredTransactions] = useState(
    [] as ITransaction[]
  );
  const [dateRange, setDateRange] = useState("day");
  const [openForm, setOpenForm] = useState(false);
  const { user, setUser } = useUserContext();
  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const dailyVolume = transactions
    .filter((t) => {
      const today = new Date();
      const txDate = new Date(t.time);
      return today.toDateString() === txDate.toDateString();
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const transactionSchema = Yup.object({
    amount: Yup.number()
      .typeError("Debe ser un número válido")
      .min(1, "La cantidad debe ser mayor a 0")
      .max(
        user?.wallet || 0,
        `La cantidad no puede exceder el saldo disponible (${
          user?.wallet || 0
        })`
      )
      .required("La cantidad es requerida"),
    type: Yup.string()
      .oneOf(["Compra", "Venta"], "El tipo debe ser 'compra' o 'venta'")
      .required("El tipo de transacción es requerido"),
    currency: Yup.string()
      .max(10, "La moneda no puede exceder 10 caracteres")
      .required("La moneda es requerida"),
    receiverId: Yup.string().required("El receptor es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: "",
      currency: "",
      receiverId: "",
    },
    validationSchema: transactionSchema,
    onSubmit: async (values) => {
      try {
        await submitHandler(values as ITransaction);
        closeFormHandler();
      } catch (error) {
        console.error("Error en el envío del formulario:", error);
      }
    },
  });

  useEffect(() => {
    fetchTransactions();
    fetchUsers();
  }, []);

  useEffect(() => {
    filterTransactions(dateRange);
  }, [transactions, dateRange]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      const filteredUsers = data.filter((userQ: User) => userQ.id !== user?.id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openFormHandler = () => {
    setOpenForm(true);
  };

  const closeFormHandler = () => {
    setOpenForm(false);
  };

  const fetchTransactions = async () => {
    const response = await getTransactionsByUser(user!.id);
    setTransactions(response);
  };

  const submitHandler = async (values: ITransaction) => {
    const transaction = {
      ...values,
      senderId: user!.id,
      time: new Date().toISOString(),
    };

    const transactionRes = await createTransaction(transaction);
    const userRes = await updateWallets(transactionRes);
    setUser(userRes);
    setTransactions((prev) => [...prev, transactionRes]);
    closeFormHandler();
    formik.resetForm();
  };

  const filterTransactions = (dateRange: string) => {
    const now = new Date();
    const filtered = transactions.filter((transaction) => {
      const txDate = new Date(transaction.time);
      switch (dateRange) {
        case "day":
          return txDate.toDateString() === now.toDateString();
        case "week":
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return txDate >= weekAgo;
        case "month":
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return txDate >= monthAgo;
        default:
          return true;
      }
    });

    const groupedData = filtered.reduce((acc, transaction) => {
      const date = new Date(transaction.time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          total: 0,
          compras: 0,
          ventas: 0,
        };
      }
      acc[date].total += transaction.amount;
      if (transaction.type === "Compra") {
        acc[date].compras += transaction.amount;
      } else {
        acc[date].ventas += transaction.amount;
      }
      return acc;
    }, {} as Record<string, any>);

    setFilteredTransactions(Object.values(groupedData));
  };

  return {
    transactions,
    filteredTransactions,
    setDateRange,
    dateRange,
    openForm,
    openFormHandler,
    closeFormHandler,
    submitHandler,
    user,
    users,
    formik,
    totalVolume,
    dailyVolume,
  };
};
