import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import { trimImageString } from "@/app/lib/utils";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q);

  const show = 8;
  const from = (Number(page) - 1) * show;
  const to = from + show;
  const usersPerPage = users.slice(from, to);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <tbody>
          {usersPerPage.map((user) => {
            const img = trimImageString(user.img);

            return (
              <>
                {/* desktop */}
                <tr key={user.username} className={styles.tRowDesktop}>
                  <td className={styles.userInfo}>
                    <div className={styles.user}>
                      <Image
                        src={img || "/no-avatar.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                      {user.username}
                    </div>
                    <div>{user.email}</div>
                  </td>

                  <td>
                    {new Date(user.createdAt).toLocaleString("ru-RU", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className={styles.userInfo}>
                    <div>
                      Role:{" "}
                      <span
                        className={`${
                          user.isAdmin === "true" ? styles.admin : styles.active
                        }`}
                      >
                        {" "}
                        {user.isAdmin === "true" ? "Admin" : "Client"}
                      </span>
                    </div>
                    <div>
                      Status:{" "}
                      <span
                        className={`${
                          user.isActive === "true"
                            ? styles.active
                            : styles.passive
                        }`}
                      >
                        {user.isActive === "true" ? "active" : "passive"}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/users/${user.recordId}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.recordId} />
                        <button className={`${styles.button} ${styles.delete}`}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>

                {/* mobile */}
                <tr key={user.recordId} className={styles.tRowMobile}>
                  <td>
                    <div className={styles.user}>
                      <Image
                        src={img || "/no-avatar.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                      {user.username}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    Created at:{" "}
                    {new Date(user.createdAt).toLocaleString("ru-RU", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className={styles.userInfo}>
                    <div>
                      Role:{" "}
                      <span
                        className={`${
                          user.isAdmin === "true" ? styles.admin : styles.active
                        }`}
                      >
                        {user.isAdmin === "true" ? "Admin" : "Client"}
                      </span>
                    </div>
                    <div>
                      Status:{" "}
                      <span
                        className={`${
                          user.isActive === "true"
                            ? styles.active
                            : styles.passive
                        }`}
                      >
                        {user.isActive === "true" ? "active" : "passive"}{" "}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/users/${user.recordId}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.recordId} />
                        <button className={`${styles.button} ${styles.delete}`}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
