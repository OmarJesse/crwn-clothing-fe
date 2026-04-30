import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { getCategories } from "../../store/network/category";
import { useShopFilters, SORT_OPTIONS } from "./use-shop-filters";
import { getBucketLabel } from "../../utils/style-inference";
import {
  Page,
  Header,
  Toolbar,
  SearchField,
  Select,
  ToggleButton,
  FilterDrawerButton,
  ChipRow,
  Chip,
  ActiveChip,
  Layout,
  Sidebar,
  SidebarBackdrop,
  SidebarHeader,
  SidebarClose,
  SidebarFooter,
  Section,
  SizeButtons,
  SizeButton,
  PriceRow,
  Grid,
  Empty,
  SmallButton,
  ResultsBar,
} from "./shop.styles";

const Shop = () => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const styleProfile = useSelector((state) => state.user.styleProfile);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allProducts = useMemo(() => {
    return (data?.categories || []).flatMap((category) =>
      (category.products || []).map((product) => ({
        ...product,
        categoryId: category.id,
        categoryName: category.name,
      }))
    );
  }, [data]);

  const categoryNames = useMemo(
    () => (data?.categories || []).map((c) => c.name),
    [data]
  );

  const {
    filters,
    update,
    toggleInArray,
    reset,
    products,
    stats,
    activeChips,
    SIZE_CHOICES,
    FIT_CHOICES,
  } = useShopFilters({
    initialCategory: categoryParam || null,
    products: allProducts,
    bodyProfile,
    styleProfile,
  });

  useEffect(() => {
    update({ category: categoryParam || null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam]);

  const handleCategoryChip = (name) => {
    if (filters.category === name) {
      navigate("/shop");
    } else {
      navigate(`/shop/${name}`);
    }
  };

  const headline = filters.category
    ? `${filters.category[0].toUpperCase()}${filters.category.slice(1)}`
    : "Shop everything";

  const subhead = bodyProfile
    ? `${stats.matchingFit} of ${stats.total} match your fit profile · showing ${stats.visible}`
    : `${stats.total} products · sign in and scan to unlock fit recommendations`;

  return (
    <Page>
      <Header>
        <h1>{headline}</h1>
        <p>{subhead}</p>
      </Header>

      <Toolbar>
        <SearchField>
          <span className="icon">🔍</span>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Search products, categories…"
          />
        </SearchField>
        <Select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
        <ToggleButton
          type="button"
          $active={filters.fitFirst}
          onClick={() => update({ fitFirst: !filters.fitFirst })}
          disabled={!bodyProfile}
          title={bodyProfile ? "Show only items that fit you" : "Set up your fit profile to enable"}
        >
          ✨ Fits me
        </ToggleButton>
        <FilterDrawerButton type="button" onClick={() => setDrawerOpen(true)}>
          ☰ Filters
        </FilterDrawerButton>
      </Toolbar>

      {(activeChips.length > 0 || filters.sort !== "recommended") && (
        <ChipRow>
          {activeChips.map((chip) => (
            <ActiveChip key={chip.key}>
              {chip.label}
              <button type="button" onClick={chip.clear} aria-label={`Remove ${chip.label}`}>×</button>
            </ActiveChip>
          ))}
          {activeChips.length > 0 ? (
            <SmallButton type="button" onClick={() => { reset(); navigate("/shop"); }}>
              Clear all
            </SmallButton>
          ) : null}
        </ChipRow>
      )}

      <Layout>
        <SidebarBackdrop $open={drawerOpen} onClick={() => setDrawerOpen(false)} />
        <Sidebar $open={drawerOpen}>
          <SidebarHeader>
            <h2>Filters</h2>
            <SidebarClose
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
            >
              ×
            </SidebarClose>
          </SidebarHeader>

          <Section>
            <h3>Category</h3>
            <ChipRow style={{ margin: 0 }}>
              <Chip
                type="button"
                $active={!filters.category}
                onClick={() => navigate("/shop")}
              >
                All <small>{stats.total}</small>
              </Chip>
              {categoryNames.map((name) => (
                <Chip
                  key={name}
                  type="button"
                  $active={filters.category === name}
                  onClick={() => handleCategoryChip(name)}
                >
                  {name}
                </Chip>
              ))}
            </ChipRow>
          </Section>

          <Section>
            <h3>Sizes available</h3>
            <SizeButtons>
              {SIZE_CHOICES.map((s) => (
                <SizeButton
                  key={s}
                  type="button"
                  $active={filters.sizes.includes(s)}
                  onClick={() => toggleInArray("sizes", s)}
                >
                  {s}
                </SizeButton>
              ))}
            </SizeButtons>
          </Section>

          <Section>
            <h3>Fit type</h3>
            <SizeButtons>
              {FIT_CHOICES.map((f) => (
                <SizeButton
                  key={f}
                  type="button"
                  $active={filters.fitTypes.includes(f)}
                  onClick={() => toggleInArray("fitTypes", f)}
                  style={{ minWidth: "4.5rem", textTransform: "capitalize" }}
                >
                  {f}
                </SizeButton>
              ))}
            </SizeButtons>
          </Section>

          <Section>
            <h3>Price (USD)</h3>
            <PriceRow>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => update({ priceMin: e.target.value })}
                min="0"
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: e.target.value })}
                min="0"
              />
            </PriceRow>
          </Section>

          {styleProfile ? (
            <Section>
              <h3>Style</h3>
              <ToggleButton
                type="button"
                $active={filters.matchPaletteOnly}
                onClick={() => update({ matchPaletteOnly: !filters.matchPaletteOnly })}
              >
                🎨 {getBucketLabel(styleProfile.paletteBucket)} palette
              </ToggleButton>
            </Section>
          ) : null}

          <SmallButton type="button" onClick={reset}>Reset filters</SmallButton>
        </Sidebar>
        <SidebarFooter $open={drawerOpen}>
          <SmallButton type="button" onClick={reset}>Reset</SmallButton>
          <ToggleButton
            type="button"
            $active
            onClick={() => setDrawerOpen(false)}
          >
            Show {stats.visible} results
          </ToggleButton>
        </SidebarFooter>

        <div>
          <ResultsBar>
            <span>
              <strong>{stats.visible}</strong> {stats.visible === 1 ? "result" : "results"}
              {bodyProfile ? (
                <> · <span className="match">{stats.matchingFit} fit your size</span></>
              ) : null}
            </span>
          </ResultsBar>

          {isLoading ? (
            <Spinner />
          ) : products.length === 0 ? (
            <Empty>
              <strong>No products match your filters.</strong>
              <span>Try clearing a filter or removing the category.</span>
              <button type="button" onClick={() => { reset(); navigate("/shop"); }}>
                Clear filters
              </button>
            </Empty>
          ) : (
            <Grid>
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, delay: Math.min(index * 0.02, 0.18) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Grid>
          )}
        </div>
      </Layout>
    </Page>
  );
};

export default Shop;
