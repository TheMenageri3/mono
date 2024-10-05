import { useState } from "react";
import P from "../P";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserData = {
  displayName: string;
  username: string;
};

export const ProfileInfo = () => {
  const { wallet, connected } = useWallet();
  const [userData, setUserData] = useState<UserData>({
    displayName: "Anatoly Yakovenko",
    username: "aeyakovenko",
  });

  //fetch from DB

  const router = useRouter();

  const handleClick = () => {
    router.push("/Profile");
  };

  if (!connected) return null;

  return (
    <div
      className="flex flex-col gap-[5px] rounded items-start p-[10px] cursor-pointer hover:bg-backgroundHover"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-[10px]">
        <Image
          className="w-[50px] h-[50px] rounded-full border border-[2px] border-border p-[1px]"
          src={"/sample_profile.svg"}
          alt="logo"
          height={30}
          width={30}
        />
        <div className="flex flex-col gap-[3px]">
          <P className="text-[15px] font-bold">{userData.displayName}</P>
          <P className="text-[12px] font-bold text-primary/90">
            @{userData.username}
          </P>
        </div>
      </div>
    </div>
  );
};
