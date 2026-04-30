import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../store/network/category";
import { addToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { getRecommendedSize, normalizeSizeChart } from "../../utils/size-recommendation";
import { scoreProductStyle } from "../../utils/product-style-match";
import { getBucketLabel } from "../../utils/style-inference";
import {
  Page,
  Crumbs,
  Layout,
  Gallery,
  Info,
  Title,
  Price,
  Description,
  Pills,
  Pill,
  SizeRow,
  SizeButton,
  Section,
  Table,
  DeltaList,
  PrimaryCTA,
  Swatch,
  SwatchRow,
  ErrorState,
} from "./product-detail.styles";

const measurementLabels = {
  chestCm: "Chest",
  waistCm: "Waist",
  hipCm: "Hip",
  inseamCm: "Inseam",
  shoulderCm: "Shoulder",
};

const buildDeltas = (sizeRow, profile) => {
  if (!sizeRow || !profile) return [];
  return Object.entries(measurementLabels)
    .map(([key, label]) => {
      const target = sizeRow[key];
      const actual = profile[key];
      if (typeof target !== "number" || typeof actual !== "number") return null;
      const delta = Number((target - actual).toFixed(1));
      return { key, label, target, actual, delta };
    })
    .filter(Boolean);
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const styleProfile = useSelector((state) => state.user.styleProfile);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
  });

  const product = data?.product || data;

  const recommendation = useMemo(
    () => (product ? getRecommendedSize(product, bodyProfile) : null),
    [product, bodyProfile]
  );

  const styleMatch = useMemo(
    () => (product && styleProfile ? scoreProductStyle(product, styleProfile) : null),
    [product, styleProfile]
  );

  const sizeChart = useMemo(() => normalizeSizeChart(product?.sizeChartJson), [product]);
  const recommendedSize = recommendation?.recommendedSize;
  const [selectedSize, setSelectedSize] = useState(null);
  const activeSize = selectedSize || recommendedSize;
  const sizeRow = useMemo(
    () => sizeChart.find((row) => row.size === activeSize),
    [sizeChart, activeSize]
  );
  const deltas = useMemo(() => buildDeltas(sizeRow, bodyProfile), [sizeRow, bodyProfile]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(cartItems, { ...product, size: activeSize || null }, 1));
    if (window.showToast) window.showToast(`${product.name} added to cart 🎉`, "success");
  };

  if (isLoading) {
    return <Page><ErrorState>Loading product…</ErrorState></Page>;
  }

  if (error || !product) {
    return (
      <Page>
        <ErrorState>
          We couldn't load this product. <Link to="/shop">Back to shop</Link>.
        </ErrorState>
      </Page>
    );
  }

  return (
    <Page>
      <Crumbs>
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/shop">Shop</Link>
        <span>›</span>
        <span>{product.name}</span>
      </Crumbs>

      <Layout>
        <Gallery>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div style={{ display: "grid", placeItems: "center", height: "100%" }}>No image</div>
          )}
        </Gallery>

        <Info>
          <Title>{product.name}</Title>
          <Price>${product.price}</Price>
          {product.description ? <Description>{product.description}</Description> : null}

          <Pills>
            {product.fitType ? <Pill>{product.fitType} fit</Pill> : null}
            {recommendation?.recommendedSize ? (
              <Pill $tone="success">Recommended: {recommendation.recommendedSize}</Pill>
            ) : (
              <Pill $tone="warn">Complete your fit profile</Pill>
            )}
            {styleMatch && styleMatch.score > 0.05 ? (
              <Pill>{Math.round(styleMatch.score * 100)}% style match</Pill>
            ) : null}
          </Pills>

          {sizeChart.length > 0 ? (
            <Section>
              <h3>Pick a size</h3>
              <SizeRow>
                {sizeChart.map((row) => (
                  <SizeButton
                    key={row.size}
                    $selected={activeSize === row.size}
                    $recommended={recommendedSize === row.size}
                    onClick={() => setSelectedSize(row.size)}
                    aria-label={`Size ${row.size}${recommendedSize === row.size ? " (recommended)" : ""}`}
                  >
                    {row.size}
                  </SizeButton>
                ))}
              </SizeRow>
            </Section>
          ) : null}

          <PrimaryCTA type="button" onClick={handleAddToCart}>
            Add to cart {activeSize ? `· size ${activeSize}` : ""}
          </PrimaryCTA>
        </Info>
      </Layout>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: "1.5rem" }}>
        {deltas.length > 0 ? (
          <Section>
            <h3>Why we recommend size {activeSize}</h3>
            <DeltaList>
              {deltas.map(({ key, label, target, actual, delta }) => (
                <li key={key}>
                  <span className="label">{label}</span>
                  <span className="delta">
                    {actual} cm → {target} cm
                    <span style={{ marginLeft: "0.5rem", color: Math.abs(delta) <= 4 ? "#10B981" : "#F59E0B" }}>
                      {delta > 0 ? `+${delta}` : delta} cm
                    </span>
                  </span>
                </li>
              ))}
            </DeltaList>
          </Section>
        ) : null}

        {sizeChart.length > 0 ? (
          <Section>
            <h3>Size chart</h3>
            <Table>
              <thead>
                <tr>
                  <th>Size</th>
                  {Object.entries(measurementLabels).map(([key, label]) =>
                    sizeChart.some((row) => typeof row[key] === "number") ? (
                      <th key={key}>{label}</th>
                    ) : null
                  )}
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size} className={row.size === activeSize ? "highlighted" : ""}>
                    <td>{row.size}</td>
                    {Object.keys(measurementLabels).map((key) =>
                      sizeChart.some((r) => typeof r[key] === "number") ? (
                        <td key={key}>{typeof row[key] === "number" ? `${row[key]} cm` : "—"}</td>
                      ) : null
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        ) : null}

        {styleProfile ? (
          <Section>
            <h3>Style match</h3>
            <Pills>
              <Pill>Your palette: {getBucketLabel(styleProfile.paletteBucket)}</Pill>
              {styleProfile.silhouette ? <Pill>Silhouette: {styleProfile.silhouette}</Pill> : null}
              {styleMatch?.score ? <Pill $tone="success">{Math.round(styleMatch.score * 100)}% match</Pill> : null}
            </Pills>
            <SwatchRow>
              {(styleProfile.palette || []).slice(0, 5).map((hex) => (
                <Swatch key={hex} $hex={hex} title={hex} />
              ))}
            </SwatchRow>
          </Section>
        ) : null}
      </div>
    </Page>
  );
};

export default ProductDetail;
