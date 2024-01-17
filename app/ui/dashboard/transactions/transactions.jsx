import Image from "next/image";
import styles from "./transactions.module.css";

const transactionsData = [
  {
    id: Date.now(),
    _id: 1,
    name: "John Doe",
    status: "Pending",
    date: "14.02.2024",
    amount: "3.200",
    src: "/no-avatar.jpg",
  },
  {
    id: Date.now(),
    _id: 2,
    name: "John Doe",
    status: "Done",
    date: "14.02.2024",
    amount: "3.200",
    src: "/no-avatar.jpg",
  },
  {
    id: Date.now(),
    _id: 3,
    name: "John Doe",
    status: "Cancelled",
    date: "14.02.2024",
    amount: "3.200",
    src: "/no-avatar.jpg",
  },
  {
    id: Date.now(),
    _id: 4,
    name: "John Doe",
    status: "Pending",
    date: "14.02.2024",
    amount: "3.200",
    src: "/no-avatar.jpg",
  },
];

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactionsData.map((data) => (
            <>
              {/* desktop */}
              <tr className={styles.tRowDesktop} key={data.id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={data.src}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {data.name}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.status}  ${
                      data.status === "Pending" && styles.pending
                    } ${data.status === "Cancelled" && styles.cancelled} ${
                      data.status === "Done" && styles.done
                    }`}
                  >
                    {data.status}
                  </span>
                </td>
                <td>{data.date}</td>
                <td>$ {data.amount}</td>
              </tr>

              {/* mobile */}
              <tr className={styles.tRowMobile} key={data._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={data.src}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {data.name}
                  </div>
                </td>
                <td>
                  Status:{" "}
                  <span
                    className={`${styles.status}  ${
                      data.status === "Pending" && styles.pending
                    } ${data.status === "Cancelled" && styles.cancelled} ${
                      data.status === "Done" && styles.done
                    }`}
                  >
                    {data.status}
                  </span>
                </td>
                <td className={styles.productInfo}>
                  <div>{data.date}</div>
                  <div>$ {data.amount}</div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
