import Image from "next/image";

const LogoComponent = () => {
  return (
    <div className="relative">
      <Image
        src="/logo/the-sentinel-logo-the.svg"
        alt="The Sentinel logo"
        width={30}
        height={30}
        className="absolute top-[14.5px] left-5.5 w-[10.5px] h-auto min-[350px]:w-[13px] min-[350px]:top-[19px] min-[350px]:left-[30px] desktop:w-[29px] desktop:top-[47px] desktop:left-[66px]"
      />
      <div className="grid place-items-center">
        <h1 className="font-abril-fatface leading-[150%] text-white text-[38px] min-[350px]:text-[50px] desktop:text-[114px]">
          Sentinel
        </h1>
        <h2 className="hidden leading-[120%] desktop:block text-16px font-normal font-newsreader text-white text-center -mt-10">
          Your local independent news across Somerset and Moreton Bay
        </h2>
      </div>
    </div>
  );
};

export default LogoComponent;
