import Footer from '@/components/footer'
import HomePage from '@/components/homePage'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
   <div className='h-[100vh] w-[100vw]'>
    <Navbar/>
   <HomePage/>
   <Footer/>
   </div>
  )
}
