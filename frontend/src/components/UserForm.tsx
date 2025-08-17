import { useEffect, useState } from 'react'
import type { User } from '../types/User'

type Props = {
  mode: 'create' | 'edit'
  initial?: User
  onCreate?: (u: Omit<User, 'id'>) => void
  onUpdate?: (u: User) => void
  onCancel?: () => void
}

export default function UserForm({ mode, initial, onCreate, onUpdate, onCancel }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')
  const [active, setActive] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'edit' && initial) {
      setName(initial.name)
      setEmail(initial.email)
      setRole(initial.role)
      setActive(initial.active)
    }
  }, [mode, initial])

  function validate() {
    if (!name.trim()) return 'Nome é obrigatório'
    if (!email.trim()) return 'E-mail é obrigatório'
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) return 'E-mail inválido'
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError(null)

    if (mode === 'create' && onCreate) {
      onCreate({ name: name.trim(), email: email.trim(), role, active })
      setName(''); setEmail(''); setRole('user'); setActive(true)
    } else if (mode === 'edit' && onUpdate && initial) {
      onUpdate({ id: initial.id, name: name.trim(), email: email.trim(), role, active })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'create' ? 'Novo usuário' : 'Editar usuário'}</h2>

      <label>
        <span>Nome</span>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ex.: Maria Silva"
        />
      </label>

      <label>
        <span>E-mail</span>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ex.: maria@empresa.com"
        />
      </label>

      <label>
        <span>Perfil</span>
        <select
          value={role}
          onChange={e => setRole(e.target.value as 'admin' | 'user')}
        >
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <label style={{ alignItems: 'center', gridTemplateColumns: 'auto 1fr' }}>
        <input
          type="checkbox"
          checked={active}
          onChange={e => setActive(e.target.checked)}
        />
        <span>Ativo</span>
      </label>

      {error && <div style={{ color: '#b91c1c' }}>{error}</div>}

      <div className="actions">
        <button className="primary" type="submit">
          {mode === 'create' ? 'Salvar' : 'Atualizar'}
        </button>
        {mode === 'edit' && onCancel && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
