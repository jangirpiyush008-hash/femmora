/* ============================================================
   Matrika theme — theme.js (vanilla, no dependencies)
   Header, mobile nav, cart drawer + AJAX cart, product form,
   gallery, buy-now, filters, newsletter toast.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function money(cents) {
    return '₹' + (cents / 100).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function toast(msg) {
    var t = $('#Toast');
    if (!t) { t = document.createElement('div'); t.id = 'Toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ---------- Sticky header shadow ---------- */
  var headerWrap = $('.header-wrap');
  if (headerWrap) {
    addEventListener('scroll', function () {
      headerWrap.classList.toggle('is-stuck', scrollY > 8);
    }, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var mnav = $('#MobileNav');
  $$('[data-open-mnav]').forEach(function (b) {
    b.addEventListener('click', function () { mnav.classList.add('open'); document.body.style.overflow = 'hidden'; });
  });
  function closeMnav() { if (mnav) { mnav.classList.remove('open'); document.body.style.overflow = ''; } }
  $$('[data-close-mnav]').forEach(function (b) { b.addEventListener('click', closeMnav); });

  /* ---------- Cart drawer ---------- */
  var drawer = $('#CartDrawer');
  function openDrawer() { if (!drawer) { location.href = window.routes ? routes.cart_url : '/cart'; return; } drawer.classList.add('open'); document.body.style.overflow = 'hidden'; refreshCart(); }
  function closeDrawer() { if (drawer) { drawer.classList.remove('open'); document.body.style.overflow = ''; } }
  $$('[data-open-cart]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      if (drawer) { e.preventDefault(); openDrawer(); }
    });
  });
  $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); closeMnav(); closeZoom(); } });

  function fetchCart() { return fetch('/cart.js').then(function (r) { return r.json(); }); }

  function renderCart(cart) {
    $$('.cart-count').forEach(function (c) {
      c.textContent = cart.item_count;
      c.style.display = cart.item_count ? 'inline-flex' : 'none';
    });
    if (!drawer) return;
    var items = $('.cdrawer__items', drawer);
    var foot = $('.cdrawer__foot', drawer);
    if (!cart.item_count) {
      items.innerHTML = '<div class="empty-state"><p>' + (drawer.dataset.emptyText || 'Your cart is empty') + '</p><a class="btn btn--primary" href="/collections/all">' + (drawer.dataset.continueText || 'Continue shopping') + '</a></div>';
      foot.innerHTML = '';
      return;
    }
    items.innerHTML = cart.items.map(function (it) {
      var img = it.image ? it.image.replace(/(\.[^.]+)($|\?)/, '_160x$1$2') : '';
      return '<div class="line-item" data-key="' + it.key + '">' +
        '<a href="' + it.url + '">' + (img ? '<img src="' + img + '" alt="" loading="lazy">' : '') + '</a>' +
        '<div><a class="line-item__title" href="' + it.url + '">' + it.product_title + '</a>' +
        (it.variant_title && it.variant_title !== 'Default Title' ? '<div class="line-item__variant">' + it.variant_title + '</div>' : '') +
        '<div class="qty" style="margin-top:8px"><button type="button" data-dec aria-label="Decrease quantity">−</button>' +
        '<input type="number" value="' + it.quantity + '" min="0" data-qty aria-label="Quantity">' +
        '<button type="button" data-inc aria-label="Increase quantity">+</button></div></div>' +
        '<div style="text-align:right"><div class="price">' + money(it.final_line_price) + '</div>' +
        '<button class="line-item__remove" data-remove>Remove</button></div></div>';
    }).join('');

    var footHtml = '';
    if (drawer.dataset.shipBar === 'true') {
      var threshold = parseInt(drawer.dataset.shipThreshold || '0', 10) * 100;
      if (threshold > 0) {
        var pct = Math.min(100, (cart.total_price / threshold) * 100);
        var rem = threshold - cart.total_price;
        footHtml += '<div class="ship-bar"><div class="ship-bar__text">' +
          (rem > 0 ? 'Add <strong>' + money(rem) + '</strong> more for free shipping' : 'You have unlocked free shipping 🎉') +
          '</div><div class="ship-bar__track"><div class="ship-bar__fill" style="width:' + pct + '%"></div></div></div>';
      }
    }
    if (drawer.dataset.prepaidNote) {
      footHtml += '<div class="prepaid-note">⚡ ' + drawer.dataset.prepaidNote + '</div>';
    }
    footHtml += '<div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:4px"><span>' + (drawer.dataset.subtotalText || 'Subtotal') + '</span><span>' + money(cart.total_price) + '</span></div>' +
      '<p style="font-size:.75rem;opacity:.6;margin-bottom:14px">' + (drawer.dataset.taxesText || 'Taxes and shipping calculated at checkout') + '</p>' +
      '<a class="btn btn--primary btn--full" href="/checkout">' + (drawer.dataset.checkoutText || 'Checkout') + '</a>' +
      '<a class="btn btn--outline btn--full" style="margin-top:8px" href="/cart">' + (drawer.dataset.viewCartText || 'View cart') + '</a>';
    foot.innerHTML = footHtml;
  }

  function refreshCart() { fetchCart().then(renderCart); }

  function changeQty(key, qty) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    }).then(function (r) { return r.json(); }).then(renderCart);
  }

  if (drawer) {
    drawer.addEventListener('click', function (e) {
      var row = e.target.closest('.line-item');
      if (!row) return;
      var key = row.dataset.key;
      var input = $('[data-qty]', row);
      var q = parseInt(input.value, 10) || 0;
      if (e.target.closest('[data-inc]')) changeQty(key, q + 1);
      else if (e.target.closest('[data-dec]')) changeQty(key, Math.max(0, q - 1));
      else if (e.target.closest('[data-remove]')) changeQty(key, 0);
    });
    drawer.addEventListener('change', function (e) {
      var row = e.target.closest('.line-item');
      if (row && e.target.matches('[data-qty]')) changeQty(row.dataset.key, Math.max(0, parseInt(e.target.value, 10) || 0));
    });
  }

  /* ---------- Product forms: AJAX add-to-cart + buy now ---------- */
  $$('form[data-product-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      addToCart(form, false);
    });
    var buyNow = $('[data-buy-now]', form);
    if (buyNow) buyNow.addEventListener('click', function () { addToCart(form, true); });
  });

  function addToCart(form, goCheckout) {
    var btn = $('[type="submit"]', form);
    if (btn) { btn.classList.add('is-loading'); }
    fetch('/cart/add.js', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw r; return r.json(); })
      .then(function () {
        if (goCheckout) { location.href = '/checkout'; return; }
        refreshCart();
        if (drawer) openDrawer(); else toast('Added to cart');
      })
      .catch(function () { toast('Could not add to cart'); })
      .finally(function () { if (btn) btn.classList.remove('is-loading'); });
  }

  /* ---------- Variant selection ---------- */
  $$('[data-variant-root]').forEach(function (root) {
    var json = $('[data-variants-json]', root);
    if (!json) return;
    var variants = JSON.parse(json.textContent);
    var idInput = $('[data-variant-id]', root);
    var priceEl = $('[data-price-wrap]', root);
    var addBtn = $('[data-add-btn]', root);
    var soldText = root.dataset.soldOutText || 'Sold out';
    var addText = root.dataset.addText || 'Add to cart';

    function selected() {
      return $$('[data-option-group]', root).map(function (g) {
        var c = g.querySelector('input:checked');
        return c ? c.value : null;
      });
    }
    function update() {
      var sel = selected();
      var match = variants.find(function (v) {
        return v.options.every(function (o, i) { return o === sel[i]; });
      });
      if (!match) return;
      idInput.value = match.id;
      if (priceEl) {
        var html = '<span class="price' + (match.compare_at_price > match.price ? ' price--sale' : '') + '">' +
          '<span class="price__current">' + money(match.price) + '</span>' +
          (match.compare_at_price > match.price ? '<span class="price__compare">' + money(match.compare_at_price) + '</span>' : '') + '</span>';
        priceEl.innerHTML = html;
      }
      if (addBtn) { addBtn.disabled = !match.available; addBtn.textContent = match.available ? addText : soldText; }
      var url = new URL(location.href);
      url.searchParams.set('variant', match.id);
      history.replaceState({}, '', url);
    }
    $$('[data-option-group] input', root).forEach(function (i) { i.addEventListener('change', update); });
    update();
  });

  /* ---------- Product gallery + zoom ---------- */
  var mainImg = $('[data-main-image] img');
  $$('[data-thumb]').forEach(function (t) {
    t.addEventListener('click', function () {
      $$('[data-thumb]').forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      if (mainImg) { mainImg.src = t.dataset.full; mainImg.srcset = ''; }
    });
  });
  var zoom = $('#ZoomModal');
  var mainWrap = $('[data-main-image]');
  if (mainWrap && zoom) {
    mainWrap.addEventListener('click', function () {
      var img = $('img', mainWrap);
      if (!img) return;
      $('img', zoom).src = img.src;
      zoom.classList.add('open');
    });
    zoom.addEventListener('click', function (e) { if (e.target === zoom || e.target.closest('[data-close-zoom]')) closeZoom(); });
  }
  function closeZoom() { if (zoom) zoom.classList.remove('open'); }

  /* ---------- Quantity steppers (product + cart page) ---------- */
  document.addEventListener('click', function (e) {
    var stepper = e.target.closest('[data-step]');
    if (!stepper) return;
    var wrap = stepper.closest('.qty');
    var input = wrap && wrap.querySelector('input');
    if (!input || input.hasAttribute('data-qty')) return; /* drawer handles its own */
    var v = parseInt(input.value, 10) || 1;
    input.value = Math.max(parseInt(input.min || '1', 10), v + (stepper.dataset.step === 'up' ? 1 : -1));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------- Collection: sort + mobile filters ---------- */
  var sort = $('[data-sort-by]');
  if (sort) sort.addEventListener('change', function () {
    var url = new URL(location.href);
    url.searchParams.set('sort_by', sort.value);
    location.href = url.toString();
  });
  var ftoggle = $('.filters-toggle');
  if (ftoggle) ftoggle.addEventListener('click', function () { $('.filters').classList.toggle('open'); });

  /* ---------- Init cart count on load ---------- */
  refreshCart();
})();
