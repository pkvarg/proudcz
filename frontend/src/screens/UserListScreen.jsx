import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser, getUserDetails } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const [visitorsCount, setVisitorsCount] = useState(0)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const getVisitors = async () => {
    const { data } = await axios.get(
      `/api/counter/count`,

      config
    )
    setVisitorsCount(data)
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
      getVisitors()
      dispatch(getUserDetails(userInfo._id))
    } else {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Uživatelé</h1>
        <h2>Počet návštěv: {visitorsCount}</h2>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>JMÉNO</th>
              <th>E-MAIL</th>
              <th>REGISTRACE</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isRegistered ? (
                    <Icon.Check style={{ color: 'green' }} />
                  ) : (
                    <Icon.X style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {user.isAdmin ? (
                    <Icon.Check style={{ color: 'green' }} />
                  ) : (
                    <Icon.X style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <Icon.Pencil />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <Icon.Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
