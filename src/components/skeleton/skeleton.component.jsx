import {
  SkeletonCard,
  SkeletonImage,
  SkeletonText,
  SkeletonGrid,
} from './skeleton.styles';

const ProductSkeleton = () => (
  <SkeletonCard>
    <SkeletonImage />
    <SkeletonText width="70%" />
    <SkeletonText width="40%" />
  </SkeletonCard>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <SkeletonGrid>
    {Array.from({ length: count }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </SkeletonGrid>
);

export default ProductSkeleton;
