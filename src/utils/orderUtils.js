export const generateStatus = (order_status, shipping_status) => {
    return (order_status === 'pending')
        ? 'Đang xác nhận'
        : (order_status === 'completed' && shipping_status === 'in_transit')
        ? 'Đang giao hàng'
        : (order_status === 'completed' && shipping_status === 'delivered')
        ? 'Đã giao hàng'
        : (order_status === 'cancelled')
        ? 'Đã Hủy'
        : '';
}