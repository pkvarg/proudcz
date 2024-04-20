import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate])

  return (
    <>
      <h1>OBJEDNÁVKY</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Číslo</th>
              <th>Zrušena</th>
              <th>Užívatel</th>
              <th>Datum</th>
              <th>Cena</th>
              <th>Zaplaceno</th>
              <th>Odeslano</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td style={{ color: 'red' }}>
                  {order.isCancelled && 'Zrušená'}
                </td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>€{order.totalPrice.toFixed(2)}</td>

                <td>
                  <span>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Icon.X style={{ color: 'red' }} />
                    )}
                  </span>
                  <span style={{ marginLeft: '90%' }}>
                    {order.paymentMethod === 'Hotovosť' ? (
                      <Icon.CashCoin />
                    ) : (
                      <Icon.CreditCard />
                    )}
                  </span>
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <Icon.X style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Detaily
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
