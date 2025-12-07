import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";
import { getProductsByCategoryId } from "../../store/network/category";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const PageWrapper = styled.div`
  margin-top: 130px;
  padding: 2rem;

  @media (max-width: 968px) {
    margin-top: 105px;
    padding: 1.5rem;
  }
`;

const Category = () => {
  const { category: categoryId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProductsByCategoryId(categoryId),
  });

  return (
    <PageWrapper>
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <CategoryTitle>{data?.category?.name?.toUpperCase()}</CategoryTitle>
          <CategoryContainer>
            {(data.products || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CategoryContainer>
        </>
      )}
    </PageWrapper>
  );
};
export default Category;
