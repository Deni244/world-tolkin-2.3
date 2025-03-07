
import '@/styles/userPage.css'


type PageProps = {
    params: Promise<{ id: string }>,
}

export default async function Post({ params }: PageProps) {
    const {id} = await params;
    return (
      <>
      <h1 className='user-page-title'>{id}</h1>
      </>
    );
  }
  