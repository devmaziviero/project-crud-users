import type { User } from '../types/User'

type Props = {
  users: User[]
  onEdit: (u: User) => void
  onDelete: (id: string) => void
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Perfil</th>
          <th>Status</th>
          <th style={{ width: 160 }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={5}>Nenhum usuário ainda. Cadastre o primeiro! 🎉</td>
          </tr>
        ) : (
          users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role === 'admin' ? 'Admin' : 'Usuário'}</td>
              <td>
                <span className={`badge ${u.active ? 'on' : 'off'}`}>
                  {u.active ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td>
                <div className="actions">
                  <button onClick={() => onEdit(u)}>Editar</button>
                  <button onClick={() => onDelete(u.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
