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
    GENDER_CHOICES,
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

  // Numbered, paginated rendering. Rendering all ~500 animated cards at once
  // was the source of the jank; we sort/filter the full list (so the global,
  // recommendation-aware ranking is preserved) and then page the result,
  // mounting only PAGE_SIZE cards at a time.
  const PAGE_SIZE = 24;
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  // Snap back to page 1 whenever the filtered/sorted result set changes.
  useEffect(() => {
    setPage(1);
  }, [products]);

  // Clamp if the result set shrank below the current page.
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const visibleProducts = useMemo(
    () => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [products, page]
  );

  const goToPage = (p) => {
    setPage(Math.min(Math.max(1, p), pageCount));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // A compact page-number window around the current page.
  const pageNumbers = useMemo(() => {
    const span = 2;
    const start = Math.max(1, page - span);
    const end = Math.min(pageCount, page + span);
    const nums = [];
    for (let p = start; p <= end; p += 1) nums.push(p);
    return nums;
  }, [page, pageCount]);

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
            <h3>Gender</h3>
            <SizeButtons>
              {GENDER_CHOICES.map((g) => (
                <SizeButton
                  key={g}
                  type="button"
                  $active={filters.genders.includes(g)}
                  onClick={() => toggleInArray("genders", g)}
                  style={{ minWidth: "4.5rem", textTransform: "capitalize" }}
                >
                  {g}
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
            <>
              <Grid>
                <AnimatePresence>
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, delay: Math.min((index % PAGE_SIZE) * 0.02, 0.18) }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Grid>
              {pageCount > 1 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                    padding: "1.75rem 0",
                  }}
                >
                  <SmallButton type="button" disabled={page === 1} onClick={() => goToPage(page - 1)}>
                    ‹ Prev
                  </SmallButton>
                  {pageNumbers[0] > 1 ? (
                    <>
                      <SmallButton type="button" onClick={() => goToPage(1)}>1</SmallButton>
                      {pageNumbers[0] > 2 ? <span style={{ opacity: 0.5 }}>…</span> : null}
                    </>
                  ) : null}
                  {pageNumbers.map((p) => (
                    <SmallButton
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      style={
                        p === page
                          ? { background: "var(--color-primary)", color: "#fff", fontWeight: 700 }
                          : undefined
                      }
                    >
                      {p}
                    </SmallButton>
                  ))}
                  {pageNumbers[pageNumbers.length - 1] < pageCount ? (
                    <>
                      {pageNumbers[pageNumbers.length - 1] < pageCount - 1 ? (
                        <span style={{ opacity: 0.5 }}>…</span>
                      ) : null}
                      <SmallButton type="button" onClick={() => goToPage(pageCount)}>{pageCount}</SmallButton>
                    </>
                  ) : null}
                  <SmallButton type="button" disabled={page === pageCount} onClick={() => goToPage(page + 1)}>
                    Next ›
                  </SmallButton>
                </div>
              ) : null}
            </>
          )}
        </div>
      </Layout>
    </Page>
  );
};

export default Shop;
