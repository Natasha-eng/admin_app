import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
import AddProductForm from "@/app/ui/dashboard/products/addProduct/addProductForm";

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
