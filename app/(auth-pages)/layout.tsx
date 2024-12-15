import Navbar from "@/components/home/navbar/navbar";

type Authlayoutprop = {
    children: React.ReactNode
}

const Authlayout = ({children}:Authlayoutprop) => {
    return ( 
        <div className="min-h-screen">
            <Navbar />
            {children}
        </div>
     );
}
 
export default Authlayout;