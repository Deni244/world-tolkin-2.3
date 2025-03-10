export type User = {
    id?: number,
    name: string,
    email: string,
    password: string,
    sex: string,
    isAdmin?: boolean
  }

  export type User2 = [
    id: number,
    name: string,
    email: string,
    password: string,
    sex?: string,
    isAdmin?: boolean
  ]
