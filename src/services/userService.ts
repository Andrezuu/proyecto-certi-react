import jsonInstance from "../api/jsonInstance";
import type { User } from "../context/UserContext";
import type { ITransaction } from "../models/ITransaction";

export const getUsers = async () => {
  try {
    const response = await jsonInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const updateWallets = async (transaction: ITransaction) => {
  try {
    const senderResponse = await jsonInstance.get(
      `/users/${transaction.senderId}`
    );
    const receiverResponse = await jsonInstance.get(
      `/users/${transaction.receiverId}`
    );

    const sender = senderResponse.data as User;
    const receiver = receiverResponse.data as User;

    // Actualizar los saldos
    console.log("Actualizando wallets:", {
      senderId: sender.id,
      senderWallet: sender.wallet,
      receiverId: receiver.id,
      receiverWallet: receiver.wallet,
      transactionAmount: transaction.amount,
    });
    sender.wallet -= transaction.amount;
    receiver.wallet += transaction.amount;
    console.log("Wallets actualizados:", {
      senderId: sender.id,
      senderWallet: sender.wallet,
      receiverId: receiver.id,
      receiverWallet: receiver.wallet,
    });

    // Guardar los cambios en el backend
    const senderRes = await jsonInstance.put(`/users/${sender.id}`, sender);
    await jsonInstance.put(`/users/${receiver.id}`, receiver);
    return senderRes.data;
  } catch (error) {
    console.error("Error al actualizar los wallets:", error);
    throw error;
  }
};
