import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <Image src="/my-loader.svg" alt="loader" width={100} height={100} />
    </div>
  );
};

export default Loading;
