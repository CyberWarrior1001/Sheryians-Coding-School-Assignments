import { ShoppingCartIcon } from 'lucide-react'

function Navbar({settoggle, noOfCart}) {
  return (
    <div className='px-10 py-3 flex justify-between items-center bg-white'>
        <h1 className='font-bold text-3xl text-orange-600 cursor-pointer' onClick={()=>{settoggle(false)}}>RecipeHub</h1>
        <div className="searchbar"></div>
        <ul className='flex flex-row gap-3.5 items-center'>
            <li className='relative cursor-pointer' onClick={()=>{settoggle(true)}}><ShoppingCartIcon  /> <span className='counter absolute'>{noOfCart}</span>  </li>
            <li className='rounded-full w-[60px] h-[60px] cursor-pointer'><img className='h-full w-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh9ZR7j2Oi5JHGSIe2mt2cgeVlwQb4mXg3kXIaPgEJQ&s=10" alt="profile-img" /></li>
        </ul>
    </div>
  )
}

export default Navbar
