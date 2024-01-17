import { addUser } from "@/app/lib/actions";
import LoadImage from "@/app/ui/dashboard/loadImage/loadImage";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import AddUserForm from "@/app/ui/dashboard/users/addUser/addUserForm";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <AddUserForm />
    </div>
  );
};

export default AddUserPage;
