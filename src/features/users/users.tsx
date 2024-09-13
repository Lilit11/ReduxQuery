import { useNavigate } from "react-router-dom"
import { AddUser } from "../../utils/add-user"
import { EditUser } from "../../utils/edit-user"
import { IUser } from "./types"
import { useDeleteUserMutation, useGetUsersQuery } from "./users.api"
import styles from "./users.module.css"
export const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery(null)
  const [deleteUser] = useDeleteUserMutation()
  const navigate = useNavigate()

  const handleEdit = (user: IUser) => {
    navigate(`/users/${user.id}`)
  }
  const handleDelete = (id: string) => {
    deleteUser(id)
  }
  return (
    <>
      <h1>Users</h1>
      <AddUser />
      {isLoading && <p>Loading...</p>}
      {data && (
        <div className={styles.userList}>
          {data.map(user => (
            <div key={user.id} className={styles.userItem}>
              <p>
                {user.name} {user.salary} AMD
              </p>
              <button
                className={styles.button}
                onClick={() => handleEdit(user)}
              >
                edit
              </button>
              <span> </span>
              <button
                className={styles.button}
                onClick={() => handleDelete(user.id)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
