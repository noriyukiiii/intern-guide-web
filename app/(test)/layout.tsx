import { Sidebar } from "./test/sidebar";
import { Navbar } from "./test/navbar";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
        <>
            <Navbar />
            <Sidebar/>
            <main className="pt-[80px] pl-[80px] h-screen overflow-y-hidden">
                {children}
            </main>
        </>
     );
}
 
export default TestLayout;