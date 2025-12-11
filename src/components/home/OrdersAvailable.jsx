export const OrdersAvailableHome = ({ total, onViewOrdersAvailable }) => {
  return (
    <section className="card record-home">
      <div className="record-view-orders" onClick={onViewOrdersAvailable}>
        <span>Pedidos Diponibles: </span>
        <span>{total}</span>
      </div>
    </section>
  );
};
