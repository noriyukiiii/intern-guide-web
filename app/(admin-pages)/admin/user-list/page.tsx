
import { getUser } from "@/actions/userAction";
import UserTable from "./components/table";

export const revalidate = 0;

const page = async () => {
    const user = await getUser();

    return ( <div>
        <UserTable user = {user} />
    </div> );
}
 
export default page;