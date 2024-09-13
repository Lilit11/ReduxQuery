import { useState } from "react"
import { InputUser } from "../features/users/types"
import { useAddUserMutation, usersApi } from "../features/users/users.api"
import styles from "../features/users/users.module.css"
export const AddUser = () => {
  const [addUser, result] = useAddUserMutation()
  const [user, setUser] = useState<InputUser>({
    name: "",
    salary: 90000,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addUser(user).then(() => {
      setUser({ name: "", salary: 90000 })
    })
  }
  return (
    <div className={styles.divik}>
      <h3>Add a new User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="number"
          value={user.salary}
          onChange={e => setUser({ ...user, salary: +e.target.value })}
        />
        <button className={styles.button}>save</button>
      </form>
    </div>
  )
}
