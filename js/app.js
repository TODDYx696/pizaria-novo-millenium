(function () {
  "use strict";

  const CART_KEY = "nm_cart_v2";
  let cart = loadCart();
  let activeCategory = "todas";
  let searchQuery = "";
  let selectedProduct = null;
  let selectedQty = 1;

  const $ = (id) => document.getElementById(id);
  const money = (value) => value == null || Number.isNaN(value) ? "Consultar" : `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));

  function loadCart() {
    try { const saved = JSON.parse(localStorage.getItem(CART_KEY)); return Array.isArray(saved) ? saved : []; } catch (_) { return []; }
  }
  function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
  function cartCount() { return cart.reduce((total, item) => total + item.qty, 0); }
  function cartTotal() { return cart.reduce((total, item) => total + item.price * item.qty, 0); }
  function uid() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }

  function updateCartBadge() {
    const count = cartCount();
    if ($("cart-count")) { $("cart-count").textContent = count; $("cart-count").hidden = count === 0; }
    if ($("cart-count-desk")) $("cart-count-desk").textContent = count ? `(${count})` : "";
  }

  function getProducts() {
    const q = searchQuery.trim().toLowerCase();
    return window.PRODUCTS.filter((product) => {
      const categoryOK = activeCategory === "todas" || product.category === activeCategory;
      const searchOK = !q || `${product.number} ${product.name} ${product.desc}`.toLowerCase().includes(q);
      return categoryOK && searchOK;
    });
  }

  function photoMarkup(product, className) {
    if (!product.img) return `<div class="photo-placeholder ${className}"><span>Foto oficial</span></div>`;
    return `<div class="${className}"><img src="${esc(product.img)}" alt="${esc(product.name)}" loading="lazy" width="320" height="240"></div>`;
  }

  function renderCategories() {
    $("categories").innerHTML = window.CATEGORIES.map((category) => `<button type="button" class="tab ${category.id === activeCategory ? "active" : ""}" data-cat="${category.id}" role="tab" aria-selected="${category.id === activeCategory}">${esc(category.label)}</button>`).join("");
  }

  function renderProducts() {
    const products = getProducts();
    $("result-count").textContent = `${products.length} ${products.length === 1 ? "sabor" : "sabores"}`;
    $("products-empty").hidden = products.length > 0;
    $("product-grid").innerHTML = products.map((product) => {
      const available = product.priceG != null && product.priceB != null;
      const prices = available ? `<span>Grande ${money(product.priceG)}</span><span>Broto ${money(product.priceB)}</span>` : `<span class="consult">Preço a confirmar</span>`;
      return `<article class="product-item" data-id="${product.id}" role="listitem" tabindex="0" aria-label="${esc(product.name)}">
        <div class="product-info"><span class="product-number">${esc(product.number)}</span><h3 class="product-name">${esc(product.name)}</h3><p class="product-desc">${esc(product.desc)}</p><div class="product-prices">${prices}</div></div>
        ${photoMarkup(product, "product-thumb")}<button type="button" class="btn-plus" data-id="${product.id}" aria-label="Adicionar ${esc(product.name)} ao carrinho" ${available ? "" : "disabled"}>+</button>
      </article>`;
    }).join("");
  }

  function openProduct(id) {
    const product = window.PRODUCTS.find((item) => item.id === id);
    if (!product || product.priceG == null || product.priceB == null) return;
    selectedProduct = product; selectedQty = 1;
    $("mp-num").textContent = product.number; $("mp-name").textContent = product.name; $("mp-desc").textContent = product.desc;
    $("mp-price-g").textContent = money(product.priceG); $("mp-price-b").textContent = money(product.priceB); $("mp-qty").textContent = "1"; $("mp-note").value = "";
    document.querySelectorAll('input[name="size"]').forEach((radio) => { radio.checked = radio.value === "grande"; });
    showOverlay("modal-product"); $("mp-close").focus();
  }

  function showOverlay(id) { $(id).hidden = false; document.body.classList.add("modal-open"); }
  function hideOverlay(id) {
    $(id).hidden = true;
    if (!["modal-product", "drawer-cart", "modal-checkout"].some((name) => !$(name).hidden)) document.body.classList.remove("modal-open");
  }

  function addToCart() {
    if (!selectedProduct) return;
    const size = document.querySelector('input[name="size"]:checked')?.value || "grande";
    const price = size === "broto" ? selectedProduct.priceB : selectedProduct.priceG;
    const note = $("mp-note").value.trim();
    cart.push({ uid: uid(), productId: selectedProduct.id, number: selectedProduct.number, name: selectedProduct.name, size: size === "broto" ? "Broto" : "Grande", price, qty: selectedQty, note });
    saveCart(); hideOverlay("modal-product"); openCart();
  }

  function renderCart() {
    $("cart-empty").hidden = cart.length !== 0; $("cart-footer").hidden = cart.length === 0; $("cart-subtotal").textContent = money(cartTotal());
    $("cart-list").innerHTML = cart.map((item) => `<div class="cart-item" data-uid="${item.uid}">
      <div class="cart-item-info"><strong>${esc(item.number)} — ${esc(item.name)}</strong><span class="cart-item-meta">${esc(item.size)}${item.note ? ` · ${esc(item.note)}` : ""}</span><span class="cart-item-price">${money(item.price * item.qty)}</span></div>
      <div class="cart-item-actions"><button type="button" class="qty-btn" data-action="dec" data-uid="${item.uid}" aria-label="Diminuir">−</button><output>${item.qty}</output><button type="button" class="qty-btn" data-action="inc" data-uid="${item.uid}" aria-label="Aumentar">+</button><button type="button" class="btn-remove" data-uid="${item.uid}">Remover</button></div>
    </div>`).join("");
  }

  function openCart() { renderCart(); showOverlay("drawer-cart"); $("cart-close").focus(); $("nav-home")?.classList.remove("active"); $("nav-cart")?.classList.add("active"); }
  function closeCart() { hideOverlay("drawer-cart"); $("nav-cart")?.classList.remove("active"); $("nav-home")?.classList.add("active"); }
  function changeQty(id, delta) { const item = cart.find((entry) => entry.uid === id); if (!item) return; item.qty += delta; if (item.qty <= 0) cart = cart.filter((entry) => entry.uid !== id); saveCart(); renderCart(); }

  function openCheckout() { if (!cart.length) return; closeCart(); showOverlay("modal-checkout"); toggleAddressFields(); $("ck-name").focus(); }
  function closeCheckout() { hideOverlay("modal-checkout"); }
  function toggleAddressFields() {
    const delivery = document.querySelector('input[name="order-type"]:checked')?.value === "entrega";
    $("address-fields").hidden = !delivery;
    ["ck-street", "ck-number", "ck-neighborhood"].forEach((id) => { if ($(id)) $(id).required = delivery; });
  }

  function buildWhatsAppMessage(data) {
    const lines = ["*Pedido — Pizzaria Novo Milenium*", "", `*Cliente:* ${data.name}`, `*Telefone:* ${data.phone}`, `*Tipo:* ${data.type === "entrega" ? "Entrega" : "Retirada"}`];
    if (data.type === "entrega") {
      lines.push("", "*Endereço:*", `${data.street}, ${data.number}${data.complement ? ` — ${data.complement}` : ""}`, `${data.neighborhood}${data.cep ? ` — CEP ${data.cep}` : ""}`);
      if (data.reference) lines.push(`Ref.: ${data.reference}`);
    }
    lines.push("", "*Itens:*");
    cart.forEach((item) => { lines.push(`${item.qty}x ${item.number} — ${item.name} (${item.size}) — ${money(item.price * item.qty)}`); if (item.note) lines.push(`Obs.: ${item.note}`); });
    lines.push("", `*Total:* ${money(cartTotal())}`); if (data.notes) lines.push(`*Observação:* ${data.notes}`);
    return lines.join("\n");
  }

  function submitOrder(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = {
      name: form.elements.name.value.trim(), phone: form.elements.phone.value.trim(), type: form.querySelector('input[name="order-type"]:checked')?.value || "entrega",
      street: form.elements.street?.value.trim() || "", number: form.elements.number?.value.trim() || "", complement: form.elements.complement?.value.trim() || "", neighborhood: form.elements.neighborhood?.value.trim() || "", cep: form.elements.cep?.value.trim() || "", reference: form.elements.reference?.value.trim() || "", notes: form.elements.notes.value.trim()
    };
    const url = `https://wa.me/${window.STORE.phone}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
    cart = []; saveCart(); closeCheckout(); window.open(url, "_blank", "noopener,noreferrer");
  }

  function bindEvents() {
    $("categories").addEventListener("click", (event) => { const button = event.target.closest("[data-cat]"); if (!button) return; activeCategory = button.dataset.cat; renderCategories(); renderProducts(); });
    $("product-grid").addEventListener("click", (event) => { const button = event.target.closest(".btn-plus"); if (button && !button.disabled) return openProduct(Number(button.dataset.id)); const item = event.target.closest(".product-item"); if (item) openProduct(Number(item.dataset.id)); });
    $("product-grid").addEventListener("keydown", (event) => { if (event.key !== "Enter" && event.key !== " ") return; const item = event.target.closest(".product-item"); if (item) { event.preventDefault(); openProduct(Number(item.dataset.id)); } });
    $("search").addEventListener("input", (event) => { searchQuery = event.target.value; $("search-clear").hidden = !searchQuery; renderProducts(); });
    $("search-clear").addEventListener("click", () => { $("search").value = ""; searchQuery = ""; $("search-clear").hidden = true; renderProducts(); $("search").focus(); });
    $("btn-search-toggle").addEventListener("click", () => { const open = $("search-bar").hidden; $("search-bar").hidden = !open; $("btn-search-toggle").setAttribute("aria-expanded", String(open)); if (open) $("search").focus(); });
    $("mp-close").addEventListener("click", () => hideOverlay("modal-product")); $("mp-backdrop").addEventListener("click", () => hideOverlay("modal-product")); $("mp-add").addEventListener("click", addToCart);
    $("mp-qty-dec").addEventListener("click", () => { selectedQty = Math.max(1, selectedQty - 1); $("mp-qty").textContent = selectedQty; }); $("mp-qty-inc").addEventListener("click", () => { selectedQty = Math.min(99, selectedQty + 1); $("mp-qty").textContent = selectedQty; });
    $("btn-cart-desk").addEventListener("click", openCart); $("nav-cart").addEventListener("click", openCart); $("nav-home").addEventListener("click", () => { closeCart(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    $("cart-close").addEventListener("click", closeCart); $("cart-backdrop").addEventListener("click", closeCart); $("cart-back").addEventListener("click", closeCart); $("cart-continue").addEventListener("click", openCheckout);
    $("cart-list").addEventListener("click", (event) => { const button = event.target.closest("[data-uid]"); if (!button) return; if (button.dataset.action === "inc") changeQty(button.dataset.uid, 1); else if (button.dataset.action === "dec") changeQty(button.dataset.uid, -1); else if (button.classList.contains("btn-remove")) changeQty(button.dataset.uid, -999); });
    $("ck-close").addEventListener("click", closeCheckout); $("ck-backdrop").addEventListener("click", closeCheckout); $("form-checkout").addEventListener("submit", submitOrder);
    document.querySelectorAll('input[name="order-type"]').forEach((radio) => radio.addEventListener("change", toggleAddressFields));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") { hideOverlay("modal-product"); closeCart(); closeCheckout(); } });
  }

  function init() { renderCategories(); renderProducts(); updateCartBadge(); bindEvents(); toggleAddressFields(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
