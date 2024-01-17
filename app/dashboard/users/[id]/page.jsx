import { updateUser } from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import SingleUserForm from "@/app/ui/dashboard/users/singleUser/singleUserForm";

import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <SingleUserForm user={user} />
      </div>
    </div>
  );
};

export default SingleUserPage;
