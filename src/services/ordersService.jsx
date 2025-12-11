const routes = {
  hoy: "/data-hoy.json",
  semanal: "/data-semanal.json",
  historico: "/data-historico.json",
};

export async function getOrders(filter) {
  try {
    const url = routes[filter] || routes.hoy;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se puedo cargar el archivo: ${url}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getOrders", error);
    return [];
  }
}
