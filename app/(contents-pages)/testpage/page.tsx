import getAuthenticatedUser from "../components/getuser";

export default async function Page() {
  let user = null;

  try {
    user = await getAuthenticatedUser();
  } catch (error : any) {
    console.error("Error fetching user:", error.message);
  }
  console.log(user)

  return (
    <div className="flex items-center w-fit h-[100px] bg-blue-100">
      <div className="w-full h-fit flex flex-col">
        {user ? (
          <>
            <h1>id: {user.id}</h1>
            <h1>ชื่อ: {user.firstname}</h1>
            <h1>นามสกุล: {user.lastname}</h1>
          </>
        ) : (
          <h1>ไม่สามารถโหลดข้อมูลผู้ใช้ได้</h1>
        )}
      </div>
    </div>
  );
}
