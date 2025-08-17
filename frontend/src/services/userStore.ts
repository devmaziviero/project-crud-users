import type { User } from '../types/User'

const KEY = 'crud-users'

// Função de Leitura, para trazer os usuarios que estão no meu localStorage

function read(): User[]{
    try {
        const raw = localStorage.getItem(KEY)
        return raw ? (JSON.parse(raw) as User[]) : [] //Caso exista os users, eu transformo eles em array de objetos 
    } catch {
        return []
    }
}

// Atualiza o localstorage sempre que criado ou deletado um novo user
function write(users: User[]) {
    localStorage.setItem(KEY, JSON.stringify(users))
}

// Traz todos os usuarios atuais cadastrados
export function getUsers(): User[] {
    return read()
}

// Faz a criação de id unico e inclusão de User 
export function addUser(data: Omit<User, 'id'>): User {
  const users = read()
  const id =
    (globalThis.crypto as any)?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`
  const user: User = { id, ...data }
  users.push(user)
  write(users)
  return user
}

// Procura o indice do usuario com id igual ao passado para atualizar o objeto
export function updateUser(user: User): boolean {
  const users = read()
  const idx = users.findIndex(u => u.id === user.id)
  if (idx < 0) return false
  users[idx] = user
  write(users)
  return true
}



export function deleteUser(id: string) {
  const users = read().filter(u => u.id !== id)
  write(users)
}