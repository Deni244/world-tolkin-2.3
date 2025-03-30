
import Button1 from '@/components/button1';
import { sql } from '@/lib/db';
import { getUser } from '@/lib/authAction';
import '@/styles/userPage.css'


type PageProps = {
    params: Promise<{ id: string }>,
}

async function getUserFromBD(id: string) {
  if (!/^\d+$/.test(id)) return undefined;
  const user = await sql`SELECT id, name, email, sex, isAdmin FROM users WHERE id = ${id};`
  return  user[0];
}

export default async function Post({ params }: PageProps) {
  const res = await getUser();
  if(!res.user) { 
    return <div className='div-container'>
    <h1 className='user-page-title'>Щоб переглядати користувачів зареєструйтесь або авторизуйтесь</h1>
    <Button1 title="реєстрація"  href='/registration' clas="button-global"/>
    <Button1 title="На головну"  href='/' clas="button-global"/>
  </div>
  }
    const {id} = await params;
    const user = await getUserFromBD(id);
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
  