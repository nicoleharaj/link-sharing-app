import Image from "next/image";
import useUserProfile from "../hooks/useUserProfile";

export default function UserInfo() {
  const { avatar, firstName, lastName, email, loading } = useUserProfile();

  return (
    <div className="flex flex-col items-center gap-4">
      {!loading && (
        <>
          <div className="relative h-[104px] w-[104px] overflow-hidden rounded-full border-4 border-purple bg-purple">
            <Image src={avatar} fill alt="Avatar" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-heading-md-web font-bold ">
              {firstName} {lastName}
            </h1>
            <h2 className="text-gray">{email}</h2>
          </div>
        </>
      )}
    </div>
  );
}
