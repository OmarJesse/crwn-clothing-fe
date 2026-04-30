import { useCallback, useMemo, useState } from "react";
import { getRecommendedSize, normalizeSizeChart } from "../../utils/size-recommendation";
import { scoreProductStyle, scoreProductPreferences } from "../../utils/product-style-match";

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "fit", label: "Best fit first" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "name-asc", label: "Name · A → Z" },
];

const SIZE_CHOICES = ["XS", "S", "M", "L", "XL", "XXL"];
const FIT_CHOICES = ["slim", "regular", "oversized"];

const DEFAULT_FILTERS = {
  search: "",
  category: null,
  sort: "recommended",
  fitFirst: false,
  sizes: [],
  fitTypes: [],
  priceMin: "",
  priceMax: "",
  matchPaletteOnly: false,
};

export const useShopFilters = ({ initialCategory, products, bodyProfile, styleProfile }) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: initialCategory || null,
  });

  const update = useCallback((patch) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const toggleInArray = useCallback((key, value) => {
    setFilters((current) => {
      const arr = current[key] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...current, [key]: next };
    });
  }, []);

  const reset = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, category: initialCategory || null });
  }, [initialCategory]);

  const enriched = useMemo(() => {
    const prefs = {
      preferredStyles: bodyProfile?.preferredStyles,
      preferredPalettes: bodyProfile?.preferredPalettes,
    };
    return (products || []).map((product) => ({
      ...product,
      _recommendation: getRecommendedSize(product, bodyProfile),
      _styleScore: styleProfile ? scoreProductStyle(product, styleProfile)?.score || 0 : 0,
      _prefsScore: scoreProductPreferences(product, prefs)?.score || 0,
      _sizeChart: normalizeSizeChart(product.sizeChartJson),
    }));
  }, [products, bodyProfile, styleProfile]);

  const filtered = useMemo(() => {
    const min = filters.priceMin === "" ? null : Number(filters.priceMin);
    const max = filters.priceMax === "" ? null : Number(filters.priceMax);
    const search = filters.search.trim().toLowerCase();

    return enriched.filter((product) => {
      if (filters.category && product.categoryName?.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      if (search) {
        const haystack = [product.name, product.description, product.categoryName]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      if (Number.isFinite(min) && product.price < min) return false;
      if (Number.isFinite(max) && product.price > max) return false;
      if (filters.sizes.length > 0) {
        const offered = product._sizeChart.map((row) => row.size);
        const overlap = filters.sizes.some((s) => offered.includes(s));
        if (!overlap) return false;
      }
      if (filters.fitTypes.length > 0 && product.fitType) {
        if (!filters.fitTypes.includes(product.fitType)) return false;
      }
      if (filters.fitFirst && bodyProfile) {
        if (!product._recommendation?.recommendedSize) return false;
        if ((product._recommendation?.confidence ?? 0) < 0.55) return false;
      }
      if (filters.matchPaletteOnly && styleProfile) {
        if ((product._styleScore || 0) < 0.25) return false;
      }
      return true;
    });
  }, [enriched, filters, bodyProfile, styleProfile]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "fit":
        list.sort((a, b) => (b._recommendation?.confidence || 0) - (a._recommendation?.confidence || 0));
        break;
      case "recommended":
      default: {
        const hasProfile = Boolean(bodyProfile) || Boolean(styleProfile);
        if (hasProfile) {
          list.sort((a, b) => {
            const aScore =
              0.4 * (a._recommendation?.confidence || 0) +
              0.3 * (a._styleScore || 0) +
              0.3 * (a._prefsScore || 0);
            const bScore =
              0.4 * (b._recommendation?.confidence || 0) +
              0.3 * (b._styleScore || 0) +
              0.3 * (b._prefsScore || 0);
            return bScore - aScore;
          });
        } else {
          list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        }
        break;
      }
    }
    return list;
  }, [filtered, filters.sort, bodyProfile, styleProfile]);

  const stats = useMemo(() => {
    const total = enriched.length;
    const matchingFit = enriched.filter(
      (p) => p._recommendation?.recommendedSize && (p._recommendation?.confidence ?? 0) > 0.55
    ).length;
    return { total, matchingFit, visible: sorted.length };
  }, [enriched, sorted]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.search) chips.push({ key: "search", label: `“${filters.search}”`, clear: () => update({ search: "" }) });
    if (filters.category) chips.push({ key: "category", label: filters.category, clear: () => update({ category: null }) });
    if (filters.fitFirst) chips.push({ key: "fitFirst", label: "Fits me", clear: () => update({ fitFirst: false }) });
    if (filters.matchPaletteOnly)
      chips.push({ key: "palette", label: "My palette", clear: () => update({ matchPaletteOnly: false }) });
    filters.sizes.forEach((s) =>
      chips.push({ key: `size-${s}`, label: `Size ${s}`, clear: () => toggleInArray("sizes", s) })
    );
    filters.fitTypes.forEach((f) =>
      chips.push({ key: `fit-${f}`, label: `${f} fit`, clear: () => toggleInArray("fitTypes", f) })
    );
    if (filters.priceMin !== "" || filters.priceMax !== "") {
      chips.push({
        key: "price",
        label: `$${filters.priceMin || 0} – $${filters.priceMax || "∞"}`,
        clear: () => update({ priceMin: "", priceMax: "" }),
      });
    }
    return chips;
  }, [filters, update, toggleInArray]);

  return {
    filters,
    update,
    toggleInArray,
    reset,
    products: sorted,
    stats,
    activeChips,
    SIZE_CHOICES,
    FIT_CHOICES,
  };
};
