
import Button1 from '@/components/button1';
import { sql } from '@/lib/db';
import '@/styles/userPage.css'


type PageProps = {
    params: Promise<{ id: string }>,
}

async function getUser(id: string) {
  if (!/^\d+$/.test(id)) return undefined;
  const user = await sql`SELECT id, name, email, sex, isAdmin FROM users WHERE id = ${id};`
  return  user[0];
}

export default async function Post({ params }: PageProps) {
    const {id} = await params;
    const user = await getUser(id);
    if (user === undefined) {
      return <div className='div-container'>
        <h1 className='user-page-title'>Такого користувача не існує!</h1>
        <Button1 title="На Головну"  href='/' clas="button-global"/>
      </div>
    }    
    return (
      <>
      <h1 className='user-page-title'>{`${(user.name).toUpperCase()} ${user.isadmin ? '(Admin)': ''}`}</h1>
      {user.sex ?<h1 className='user-page-title'>{`${(user.sex).toUpperCase()} from Middle Earth`}</h1> : null}
      </>
    );
  }
  