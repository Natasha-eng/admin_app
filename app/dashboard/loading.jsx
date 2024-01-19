import Image from "next/image";

import styles from "@/app/ui/dashboard/dashboard.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src="/my-loader.svg" alt="loader" width={100} height={100} />
    </div>
  );
};

export default Loading;
