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
  const [openForm, setOpenForm] = useState(false);
  const { user, setUser } = useUserContext();

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

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      const filteredUsers = data.filter((userQ: User) => userQ.id !== user?.id);
      console.log("Usuarios obtenidos:", filteredUsers);
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
    console.log("Closing form");
    setOpenForm((prev) => false);
  };

  const fetchTransactions = async () => {
    const response = await getTransactionsByUser(user!.id);
    setTransactions(response);
  };

  useEffect(() => {
    fetchTransactions();
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Open form state changed:", openForm);
  }, [openForm]);

  const submitHandler = async (values: ITransaction) => {
    console.log("Submitting transaction:");
    const transaction = {
      ...values,
      senderId: user!.id,
      time: new Date().toISOString(),
    };

    const transactionRes = await createTransaction(transaction);
    const userRes = await updateWallets(transactionRes);
    setUser(userRes);
    setTransactions((prev) => [...prev, transactionRes]);
    setOpenForm(false);
    formik.resetForm();
  };

  return {
    transactions,
    openForm,
    openFormHandler,
    closeFormHandler,
    submitHandler,
    user,
    users,
    formik,
  };
};
