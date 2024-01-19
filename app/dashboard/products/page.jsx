import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";
import { trimImageString } from "@/app/lib/utils";
import Loading from "@/app/loading";

export const dynamic = "force-dynamic";

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q);

  const show = 8;
  const from = (Number(page) - 1) * show;
  const to = from + show;
  const productsPerPage = products.slice(from, to);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add" className={styles.addButton}>
          Add New
        </Link>
      </div>

      {!productsPerPage ? (
        <Loading />
      ) : (
        <>
          <table className={styles.table}>
            <tbody>
              {productsPerPage?.map((product) => {
                const img = trimImageString(product.img);
                return (
                  <>
                    {/* desktop */}
                    <tr className={styles.tRowDesktop} key={product.title}>
                      <td>
                        <div className={styles.product}>
                          <Image
                            src={img || "/noproduct.jpg"}
                            alt=""
                            width={40}
                            height={40}
                            className={styles.productImage}
                          />
                          {product.title}
                        </div>
                      </td>
                      <td>{product.desc}</td>

                      <td className={styles.desktopProductInfo}>
                        <div>${product.price}</div>

                        <div>
                          {new Date(product.createdAt).toLocaleString("ru-Ru", {
                            timeZone: "UTC",
                          })}
                        </div>
                        <div>
                          Qty:{" "}
                          {product.stock > 0 ? product.stock : "Out of Stock"}
                        </div>
                      </td>

                      <td>
                        <span className={styles.buttons}>
                          <Link
                            href={`/dashboard/products/${product.recordId}`}
                            className={`${styles.button} ${styles.view}`}
                          >
                            View
                          </Link>
                          <form action={deleteProduct}>
                            <input
                              type="hidden"
                              name="id"
                              value={product.recordId}
                            />
                            <button
                              className={`${styles.button} ${styles.delete}`}
                            >
                              Delete
                            </button>
                          </form>
                        </span>
                      </td>
                    </tr>

                    {/* mobile */}
                    <tr className={styles.tRowMobile} key={product.recordId}>
                      <td className={styles.rows}>
                        <span className={styles.product}>
                          <Image
                            src={img || "/noproduct.jpg"}
                            alt=""
                            width={40}
                            height={40}
                            className={styles.productImage}
                          />
                          {product.title}
                        </span>
                        <div className={styles.productInfo}>
                          <span>{product.desc}</span>
                          <span>${product.price}</span>
                        </div>
                      </td>

                      <td className={styles.rows}>
                        <div className={styles.productInfo}>
                          <span>
                            {new Date(product.createdAt).toLocaleString(
                              "ru-Ru",
                              {
                                timeZone: "UTC",
                              }
                            )}
                          </span>
                          <span>
                            {product.stock > 0
                              ? `quantity: ${product.stock}`
                              : "Out of Stock"}
                          </span>
                        </div>

                        <span className={styles.buttons}>
                          <Link
                            href={`/dashboard/products/${product.recordId}`}
                            className={`${styles.button} ${styles.view}`}
                          >
                            View
                          </Link>
                          <form action={deleteProduct}>
                            <input
                              type="hidden"
                              name="id"
                              value={product.recordId}
                            />
                            <button
                              className={`${styles.button} ${styles.delete}`}
                            >
                              Delete
                            </button>
                          </form>
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <Pagination count={count} />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
