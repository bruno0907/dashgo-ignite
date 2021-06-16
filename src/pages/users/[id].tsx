type User = {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  }
}

export default function User({ user }: User) {   
  return <h1>User</h1>
}
