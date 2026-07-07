# SETUP.md — Getting your store live

This theme ships **empty by design** — no products, no images, no external data.
Follow these steps in order (about 15 minutes of admin work).

---

## 1. Get the theme onto Shopify

### Option A — Connect from GitHub (recommended, what you asked for)
1. Push this theme to a **GitHub repo** with the folders (`assets, config, layout, locales, sections, snippets, templates`) at the **repo root** (not inside a subfolder).
2. Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**.
3. Authorize GitHub → pick the **repo** and **branch** (`main`).
4. Shopify pulls the theme in. Click **Customize** to preview, then **Publish**.
   - After this, edits made in the Shopify editor sync back to GitHub, and pushes to GitHub sync into Shopify. Manage from either side.

### Option B — Upload zip
Zip the folders (at the zip root) → **Add theme → Upload zip file** → Customize → Publish.

The text logo shows **Femorra** by default (Theme settings → Logo → Brand name). Upload a logo image there when you have one.

> **If your menu/tabs appear in Hindi:** your Shopify store was created with
> Hindi as its language, so the default menu items are named होम/कैटलॉग/संपर्क.
> Fix in admin: **Settings → Languages → set English as default**, and/or
> **Online Store → Navigation → Main menu → rename the items** (or build the
> full English menu from step 3 below). This is store data, not theme code.

---

## 2. Create the collections (Products → Collections → Create collection)

**Make them SMART collections** so products auto-sort themselves — no manual adding.
Your dashboard's CSV writes the category **and** sub-category into each product's
**Tags** (e.g. `Mom`, `Nursing Bras`), so each collection just needs one condition:
**"Product tag is equal to [name]"**.

**3 top collections** (condition: Product tag = the Group name):

| Title | Handle | Condition: tag = |
|---|---|---|
| Mom | `mom` | `Mom` |
| Women | `women` | `Women` |
| Jewellery | `jewellery` | `Jewellery` |

**10 sub-category collections** (condition: Product tag = the Title):

| Title | Handle | Tag | Group |
|---|---|---|---|
| Maternity Dresses | `maternity-dresses` | `Maternity Dresses` | Mom |
| Feeding Dresses | `feeding-dresses` | `Feeding Dresses` | Mom |
| Nursing Bras | `nursing-bras` | `Nursing Bras` | Mom |
| Maternity Nightwear | `maternity-nightwear` | `Maternity Nightwear` | Mom |
| Kurtis | `kurtis` | `Kurtis` | Women |
| Kurta Sets | `kurta-sets` | `Kurta Sets` | Women |
| Earrings | `earrings` | `Earrings` | Jewellery |
| Necklaces | `necklaces` | `Necklaces` | Jewellery |
| Bangles | `bangles` | `Bangles` | Jewellery |
| Rings | `rings` | `Rings` | Jewellery |

> Verify each handle matches the table (edit under "Search engine listing" if needed).
> The homepage category cards + tiles are pre-wired to these exact handles.
> Because they're smart, importing products via CSV auto-fills every collection.

---

## 3. Build the Main menu (Online Store → Navigation → Main menu)

Create this structure (drag child items under their parent to nest):

- **Mom** → `/collections/mom`
  - Maternity Dresses → `/collections/maternity-dresses`
  - Feeding Dresses → `/collections/feeding-dresses`
  - Nursing Bras → `/collections/nursing-bras`
  - Maternity Nightwear → `/collections/maternity-nightwear`
- **Women** → `/collections/women`
  - Kurtis → `/collections/kurtis`
  - Kurta Sets → `/collections/kurta-sets`
- **Jewellery** → `/collections/jewellery`
  - Earrings → `/collections/earrings`
  - Necklaces → `/collections/necklaces`
  - Bangles → `/collections/bangles`
  - Rings → `/collections/rings`
- **Home** → `/`
- **About** → `/pages/about`
- **Contact** → `/pages/contact`

The Mom dropdown gets a **sage** top accent and Jewellery gets a **gold** accent
automatically (detected from the menu item title).

Also create a **Footer** menu (e.g. "Help") with the policy pages and assign both
menus in **Customize → Footer**.

---

## 4. Create pages (Online Store → Pages)

| Page | Template to assign | Content |
|---|---|---|
| About | `page.about` | **auto-filled** — appears as soon as you assign the template |
| Contact | `page.contact` | contact form + Femorra details built in |
| Shipping Policy | `page.shipping-policy` | **auto-filled** (prepaid-only, 5–7 days) |
| Refund & Return Policy | `page.refund-policy` | **auto-filled** (48h + unboxing video rule) |
| Privacy Policy | `page.privacy-policy` | **auto-filled** |
| Terms of Service | `page.terms` | **auto-filled** |

> Create each page (leave the body empty), then on the right side under
> **Theme template** pick the template from the table — the full Femorra policy
> text renders automatically. If you later type your own content into the page
> body, your text replaces the built-in copy. Full editable drafts also live in
> `LEGAL-PAGES.md`.

> **Ready-made copy:** open **`LEGAL-PAGES.md`** (in this theme folder) — it has
> complete, paste-ready drafts for **About, Contact, Shipping Policy, Refund &
> Return Policy, Privacy Policy and Terms of Service**, already written for
> Femorra (femorra.in) with the store's contact details, prepaid-only payments,
> pan-India 5–7 day delivery, and the unboxing-video requirement for damage
> claims.

These pages are **mandatory** for Razorpay activation and Meta/Google ads —
publish them before launching campaigns.

---

## 5. Product metafields (Settings → Custom data → Products → Add definition)

| Name | Namespace & key | Type | Used for |
|---|---|---|---|
| Feeding access | `custom.feeding_access` | Multi-line text | The green "Feeding Access & Comfort" block on product pages (Mom products) |
| Fabric | `custom.fabric` | Multi-line text | Fabric & Care accordion |
| Size chart | `custom.size_chart` | Multi-line text | Overrides the built-in size table |

All three are optional — the theme shows sensible defaults when they're empty.

---

## 6. Add your content

- **Logo + favicon:** Customize → Theme settings → Logo.
- **Hero image:** Customize → homepage → Hero banner → pick an image (1800×900+ recommended).
- **Three-world cards + category tiles:** add an image to each block in the customizer.
- **Products:** Products → Add product. Set price (₹), compare-at for sales, sizes as variants, and 2–4 photos. Assign each product to its collection.

---

## 7. Payments & India settings

- **Settings → Payments:** activate **Razorpay** (Shopify Payments is unavailable in India). Keep checkout otherwise standard.
- **Prepaid only:** this store does **not** offer COD — do not enable any COD option; the theme copy and policies are written accordingly.
- **Settings → Markets / General:** currency INR, timezone IST.
- **Settings → Taxes:** enable "All prices include tax" if you sell GST-inclusive, and keep the "Inclusive of all taxes" note enabled in Theme settings → Cart.

---

## 8. Pre-launch checklist

- [ ] 7 collections created with matching handles
- [ ] Main menu + footer menu built and assigned
- [ ] Logo, hero image, world/category images added
- [ ] At least a few products live with photos + variants
- [ ] 4 policy pages filled and linked in footer
- [ ] Razorpay activated, test order placed end-to-end
- [ ] Contact page details updated (email/phone/hours)
- [ ] Free-shipping threshold + announcement text confirmed (Theme settings)
