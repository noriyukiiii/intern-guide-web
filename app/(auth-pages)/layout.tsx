

type Authlayoutprop = {
    children: React.ReactNode
}

const Authlayout = ({children}:Authlayoutprop) => {
    return ( 
        <div className="min-h-screen flex flex-col gap-1">
            {children}
        </div>
     );
}
 
export default Authlayout;