# Femorra — Shopify OS 2.0 Theme

A production-ready Shopify Online Store 2.0 theme for Femorra (femorra.in) — an
India-based women's store spanning three categories: **Mom** (maternity &
feeding), **Women** (kurtis & kurta sets) and **Jewellery** (silver). Mobile-first
(375px baseline), WCAG AA, INR-native, Razorpay-compatible (no gateway code),
prepaid-only. Soft blush-&-rose palette.

## Design tokens

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#FDF4F1` | Soft blush background |
| `--color-text` | `#2B2724` | Charcoal text |
| `--color-brand` | `#A64D5F` | Rose-plum (header/buttons) |
| `--color-link-hover` | `#C0607A` | Rose (hover/sale) |
| `--color-accent-gold` | `#C6A15B` | Jewellery accent |
| `--color-accent-sage` | `#A9B9A3` | Mom accent |
| `--color-muted` | `#EFDEDA` | Borders/dividers |

Homepage: **sliding banner** → **shop by category** (Mom/Women/Jewellery) →
sub-category tiles → **customer reviews** → trust strip → newsletter.

**Fonts:** Playfair Display (headings) + Nunito Sans (body), both via Shopify
`font_picker` (swappable in Theme settings).

## Highlights

- Sticky header, 3-dropdown desktop nav (Mom = sage accent, Jewellery = gold), mobile drawer menu
- AJAX cart drawer with free-shipping progress bar (₹999, editable) + prepaid nudge
- Homepage: hero, three-world cards, 7-tile category grid, featured collection, USP strip, testimonials, newsletter — all placeholder-safe on an empty store
- Product page: sticky gallery + zoom, variant buttons (44px targets), Add to Cart + Buy Now, trust line, "Feeding Access & Comfort" block (metafield `custom.feeding_access`), Fabric/Size-chart/Shipping accordions, related products
- Collection page: banner, filters (price/availability/size via Search & Discovery), sort, 2/4-col grid, "Products coming soon" empty state
- Full customer account flow, blog, search, 404, password page
- Everything editable in the Theme Editor; brand colors preloaded in `settings_data.json`

## Structure

Standard OS 2.0: `assets / config / layout / locales / sections / snippets / templates`
with JSON templates and header/footer section groups. See `SETUP.md` for the
7 collections, menu structure, metafields and launch checklist.
