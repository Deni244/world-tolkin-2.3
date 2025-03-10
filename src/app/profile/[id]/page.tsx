
import { sql } from '@/lib/db';
import '@/styles/userPage.css'


type PageProps = {
    params: Promise<{ id: string }>,
}

async function getUser(id: string) {
  const user = await sql`SELECT id, name, email, sex, isAdmin FROM users WHERE id = ${id};`  
  return  user[0];
}

export default async function Post({ params }: PageProps) {
    const {id} = await params;
    const user = await getUser(id);
    return (
      <>
      <h1 className='user-page-title'>{`${(user.name).toUpperCase()} ${user.isadmin ? '(Admin)': ''}`}</h1>
      <h1 className='user-page-title'>{`${(user.sex).toUpperCase()} from Middle Earth`}</h1>
      </>
    );
  }
  