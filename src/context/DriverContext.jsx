import { createContext, useContext, useState, useEffect } from "react";
import { getAvailableOrders } from "../services/firebaseOrdres";

const DriverContext = createContext();

export function DriverStates({ children }) {
  const [isConnected, setIsConnected] = useState(() => {
    const saved = localStorage.getItem("isConnected");
    return saved ? JSON.parse(saved) : false;
  });
  const [situation, setSituation] = useState(() => {
    const saved = localStorage.getItem("situation");
    return saved || "offline";
  });

  const [availableOrders, setAvailableOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(() => {
    const saved = localStorage.getItem("currentOrder");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    localStorage.setItem("isConnected", JSON.stringify(isConnected));
  }, [isConnected]);

  useEffect(() => {
    localStorage.setItem("situation", situation);
  }, [situation]);

  useEffect(() => {
    fetchAvailableOrders();
  }, []);

  // async function fetchAvailableOrders() {
  //   setIsLoadingOrders(true);
  //   try {
  //     const response = await fetch("/data.json");
  //     if (!response.ok) {
  //       throw new Error("No se encontró el archivo");
  //     }
  //     const { data } = await response.json();
  //     setAvailableOrders(data);
  //   } catch (error) {
  //     console.error("Error al cargar órdenes:", error);
  //     alert("Error al cargar pedidos disponibles");
  //   } finally {
  //     setIsLoadingOrders(false);
  //   }
  // }

  async function fetchAvailableOrders() {
    setIsLoadingOrders(true);

    try {
      const orders = await getAvailableOrders();
      setAvailableOrders(orders);
    } catch (error) {
      alert("Error al cargar pedidos");
    } finally {
      setIsLoadingOrders(false);
    }
  }

  function selectOrder(orderId) {
    const order = availableOrders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      return true;
    }
    return false;
  }

  function confirmOrder() {
    if (!selectedOrder) {
      alert("No hay pedido seleccionado");
      return false;
    }

    localStorage.setItem("currentOrder", JSON.stringify(selectedOrder));

    setConfirmedOrder(selectedOrder);
    setSituation("on-delivery");

    return true;
  }

  function cancelSelection() {
    setSelectedOrder(null);
  }
  function completeOrder() {
    setSelectedOrder(null);
    setConfirmedOrder(null);
    localStorage.removeItem("currentOrder");

    if (isConnected) {
      setSituation("available");
    } else {
      setSituation("offline");
    }
  }

  function switchConnection() {
    const newState = !isConnected;
    setIsConnected(newState);

    if (situation !== "on-delivery") {
      setSituation(newState ? "available" : "offline");
    }
  }

  function takeOrder(orderID) {
    if (!isConnected) {
      alert("Debes estar conectado para tomar un pedido");
      return;
    }
    setCurrentOrderId(orderID);
    setSituation("on-delivery");
  }

  function clearOrder() {
    setCurrentOrderId(null);
    if (isConnected) setSituation("available");
    else setSituation("offline");
  }

  return (
    <DriverContext.Provider
      value={{
        isConnected,
        situation,
        availableOrders,
        selectedOrder,
        confirmedOrder,
        isLoadingOrders,
        switchConnection,
        fetchAvailableOrders,
        selectOrder,
        confirmOrder,
        cancelSelection,
        completeOrder,
        // Funciones deprecadas (mantener por compatibilidad)
        takeOrder,
        clearOrder,
        currentOrderId: confirmedOrder?.id || null,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
}

export function useDriver() {
  return useContext(DriverContext);
}
