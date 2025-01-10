import Navbar from "./components/navbar/navbar";


type Authlayoutprop = {
    children: React.ReactNode
}

const Authlayout = ({children}:Authlayoutprop) => {
    return ( 
        <div className="min-h-screen flex flex-col gap-1">
            <Navbar />
            {children}
        </div>
     );
}
 
export default Authlayout;