import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/data";
import { trimImageString } from "@/app/lib/utils";
import LoadImage from "@/app/ui/dashboard/loadImage/loadImage";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import SingleProductForm from "@/app/ui/dashboard/products/singleProduct/singleProductForm";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <SingleProductForm product={product} />
      </div>
    </div>
  );
};

export default SingleProductPage;
