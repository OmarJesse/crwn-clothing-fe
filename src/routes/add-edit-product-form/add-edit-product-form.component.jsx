import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.comonent";
import { useQuery } from "@tanstack/react-query";
import {
  editProduct,
  getCategories,
  getProductById,
} from "../../store/network/category";
import { addProduct } from "../../store/network/category";
import {
  ButtonsContainer,
  ProductFormContainer,
  FormTitle,
  FormSelect,
} from "./add-product-form.styles";
import Spinner from "../../components/spinner/spinner.component";

const defaultFormFields = {
  name: "",
  price: "",
  description: "",
  stock: "",
  imageUrl: "",
  categoryId: "",
};

const AddEditProductForm = () => {
  const { productId } = useParams();
  const isAdd = !productId;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, price, description, stock, imageUrl, categoryId } = formFields;
  const navigate = useNavigate();

  const {
    data,
    isLoading: isCategoriesLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: productDataItem,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const productData = productDataItem?.product || {};

  const categories = data?.categories || [];

  const {
    mutateAsync,
    isPending: isLoading,
    isSuccess,
    isError: mutationError,
    error,
  } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      navigate("/shop");
    },
  });

  const { mutateAsync: editMutateAsync, isPending: isEditLoading } =
    useMutation({
      mutationFn: editProduct,
      onSuccess: () => {
        navigate("/shop");
      },
    });

  // Reset form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handle input change for form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
      imageUrl,
      categoryId,
    };

    try {
      if (isAdd) {
        await mutateAsync(productData);
      } else {
        await editMutateAsync({ ...productData, id: productId });
      }
      resetFormFields();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAdd) {
      return;
    }
    if (productData) {
      setFormFields({
        name: productData.name,
        price: productData.price,
        description: productData.description,
        stock: productData.stock,
        imageUrl: productData.imageUrl,
        categoryId: productData.categoryId,
      });
    }
  }, [productData, isAdd]);

  if (isProductLoading || isEditLoading || isCategoriesLoading) return <Spinner />;
  if (isProductError) return <ProductFormContainer><p style={{ color: 'white' }}>Error loading product!</p></ProductFormContainer>;
  if (isError) return <ProductFormContainer><p style={{ color: 'white' }}>Error loading categories!</p></ProductFormContainer>;

  return (
    <ProductFormContainer>
      <FormTitle>{isAdd ? "Add a New Product" : "Edit Product"}</FormTitle>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormInput
          label="Product Name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Price"
          name="price"
          type="number"
          value={price}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Description"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Stock"
          name="stock"
          type="number"
          value={stock}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Image URL"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
        <FormSelect
          name="categoryId"
          value={categoryId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </FormSelect>

        <ButtonsContainer>
          <Button
            type="submit"
            disabled={isLoading}
            buttonType={BUTTON_TYPE_CLASSES.base}
          >
            {isLoading ? "Loading..." : isAdd ? "Add Product" : "Save Changes"}
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </ButtonsContainer>
      </form>

      {isSuccess && window.showToast?.('Product saved successfully! ✅', 'success')}
      {mutationError && window.showToast?.(`Error: ${error?.message}`, 'error')}
    </ProductFormContainer>
  );
};

export default AddEditProductForm;
