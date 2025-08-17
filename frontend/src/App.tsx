import { useEffect, useState } from 'react'
import type { User } from './types/User'
import * as store from './services/userStore'
import UserForm from './components/UserForm'
import UserTable from './components/UserTable'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [editing, setEditing] = useState<User | null>(null)

  useEffect(() => {
    setUsers(store.getUsers())
  }, [])

  function handleCreate(data: Omit<User, 'id'>) {
    const created = store.addUser(data)
    setUsers(prev => [...prev, created])
  }

  function handleUpdate(u: User) {
    store.updateUser(u)
    setUsers(prev => prev.map(x => (x.id === u.id ? u : x)))
    setEditing(null)
  }

  function handleDelete(id: string) {
    // (opcional) confirmação simples
    if (!confirm('Tem certeza que deseja excluir?')) return
    store.deleteUser(id)
    setUsers(prev => prev.filter(u => u.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  return (
    <div className="container">
      <h1>CRUD Users (React + LocalStorage)</h1>

      <UserForm
        mode={editing ? 'edit' : 'create'}
        initial={editing ?? undefined}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditing(null)}
      />

      <UserTable
        users={users}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  )
}
