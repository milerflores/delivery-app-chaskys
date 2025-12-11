import {
  collection,
  getDocs,
  query,
  where,
  getCountFromServer,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getAvailableOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (error) {
    console.error("Error cargando pedidos:", error);
    return [];
  }
}

export async function getHistoryOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, "history"));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (error) {
    console.error("Error cargando historial:", error);
    return [];
  }
}

export async function getTodayOrders() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const q = query(
      collection(db, "history"),
      where("created_at", ">=", todayTimestamp)
    );

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error("Error cargando pedidos de hoy:", error);
    return [];
  }
}

export async function getTotalHistoryCount() {
  try {
    const snapshot = await getCountFromServer(collection(db, "history"));
    return snapshot.data().count;
  } catch (error) {
    console.error("Error obteniendo conteo histórico:", error);
    return 0;
  }
}
