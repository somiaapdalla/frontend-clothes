function Sadnav(){
    return <div className="flex justify-between">
        <img className="w-16 h-12 mt-1 rounded-lg ml-10" src="https://i.pinimg.com/736x/17/59/0e/17590e8663b4fcd6c000a0683e655ceb.jpg" />
    <div className="flex gap-20" >
        <ul className="flex gap-10 mt-3 text-center">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
         </div>
        <div className="space-x-10 mr-40 bg-">
        <button className="px-4 py-2 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-purple-600 transition">log in</button>
        <button>Register</button>
        <button className="mr-40">Cart</button>
        </div>
   
    </div>
}
export default Sadnav