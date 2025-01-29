"use server"

import { getUser } from "@/actions/userAction";
import UserTable from "./components/table";

const page = async () => {
    const user = await getUser();
    // console.log(user);
    return ( <div>
        <UserTable user = {user} />
    </div> );
}
 
export default page;