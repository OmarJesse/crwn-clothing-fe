import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../store/network/category";
import styled from "styled-components";

const CategoriesContainer = styled.div`
  padding: 2rem;
  margin-top: 130px;

  @media (max-width: 968px) {
    margin-top: 105px;
    padding: 1.5rem;
  }
`;

const CategoriesPreview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <CategoriesContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        data?.categories?.map((category) => (
          <Fragment key={category.id}>
            <CategoryPreview category={category} />
          </Fragment>
        ))
      )}
    </CategoriesContainer>
  );
};
export default CategoriesPreview;
