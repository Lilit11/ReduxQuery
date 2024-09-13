import React, { useEffect, useState } from "react"
import { IUser } from "../features/users/types"
import { useNavigate, useParams } from "react-router-dom"
import {useEditUserMutation, useGetUserByIdQuery} from "../features/users/users.api"
import styles  from '../features/users/users.module.css'
export const EditUser = () => {
  const { id } = useParams()
  if (!id) { return null}

  const navigate = useNavigate()
  const { data } = useGetUserByIdQuery(id)
  const [editUser] = useEditUserMutation()
  const [editedUser, setEditedUser] = useState<IUser | undefined>(data)

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editedUser) {
      try {
        await editUser(editedUser)
        navigate("/")
      } catch (err) {
        console.log(err)
      }
    }
  }
  useEffect(() => {
    if (data) {
      setEditedUser(data)
    }
  }, [data])

  return (
    <div className={styles.formContainer}>
  <form onSubmit={handleEdit}>
    <div className={styles.formGroup}>
        <p>Name</p>
      <input
        type="text"
        defaultValue={editedUser?.name}
        onChange={e =>
          setEditedUser(preUser =>
            preUser ? { ...preUser, name: e.target.value } : preUser,
          )
        }
      />
    </div>

    <div className={styles.formGroup}>
        <p>Salary</p>
      <input
        type="number"
        defaultValue={editedUser?.salary}
        onChange={e =>
          setEditedUser(preUser =>
            preUser ? { ...preUser, salary: +e.target.value } : preUser,
          )
        }
      />
    </div>

    <button className={styles.button}>Save Changes</button>
  </form>
</div>
  )
}
