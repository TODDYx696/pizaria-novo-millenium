/* Pizzaria Novo Milenium — Loja de delivery */

(function () {
  "use strict";

  const CART_KEY = "nm_cart_v1";
  let cart = loadCart();
  let activeCategory = "todas";
  let searchQuery = "";
  let selectedProduct = null;

  function money(v) {
    if (v == null || Number.isNaN(v)) return "Consultar";
    return "R$ " + v.toFixed(2).replace(".", ",");
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function cartCount() {
    return cart.reduce((s, i) => s + i.qty, 0);
  }

  function cartTotal() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function updateCartBadge() {
    const count = cartCount();
    const total = cartTotal();
    const badge = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total-label");
    const btn = document.getElementById("btn-cart");
    if (badge) {
      badge.textContent = count;
      badge.hidden = count === 0;
    }
    if (totalEl) totalEl.textContent = count > 0 ? money(total) : "";
    if (btn) btn.classList.toggle("has-items", count > 0);
  }

  function filteredProducts() {
    let list = window.PRODUCTS.slice();
    if (activeCategory === "mais-pedidas") {
      list = list.filter((p) => p.tags && p.tags.includes("mais-pedidas"));
    } else if (activeCategory === "salgadas") {
      list = list.filter((p) => p.tags && p.tags.includes("salgadas"));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.number.includes(q)
      );
    }
    return list;
  }

  function productCard(p) {
    const hasPrice = p.priceG != null;
    const priceHtml = hasPrice
      ? `<div class="prices"><span class="price-g"><strong>G</strong> ${money(p.priceG)}</span><span class="price-b"><strong>B</strong> ${money(p.priceB)}</span></div>`
      : `<div class="prices"><span class="price-consult">Preço sob consulta</span></div>`;
    const imgHtml = p.img
      ? `<img src="${p.img}" alt="${p.name}" loading="lazy" width="120" height="120">`
      : `<div class="img-placeholder" aria-hidden="true"><span>${p.number}</span></div>`;
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-img">${imgHtml}</div>
        <div class="product-body">
          <div class="product-top">
            <span class="product-num">${p.number}</span>
            <h3 class="product-name">${p.name}</h3>
          </div>
          <p class="product-desc">${p.desc}</p>
          ${priceHtml}
        </div>
        <button type="button" class="btn-add" data-id="${p.id}" aria-label="Adicionar ${p.name}" ${!hasPrice ? "disabled" : ""}>
          ${hasPrice ? "+" : "\u2014"}
        </button>
      </article>`;
  }

  function renderProducts() {
    const grid = document.getElementById("product-grid");
    const empty = document.getElementById("products-empty");
    const list = filteredProducts();
    if (!list.length) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    grid.innerHTML = list.map(productCard).join("");
  }

  function renderCategories() {
    const el = document.getElementById("categories");
    el.innerHTML = window.CATEGORIES.map(
      (c) =>
        `<button type="button" class="cat-btn ${c.id === activeCategory ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`
    ).join("");
  }

  function openProductModal(id) {
    const p = window.PRODUCTS.find((x) => x.id === id);
    if (!p || p.priceG == null) return;
    selectedProduct = p;
    const modal = document.getElementById("modal-product");
    document.getElementById("mp-name").textContent = p.name;
    document.getElementById("mp-desc").textContent = p.desc;
    document.getElementById("mp-num").textContent = p.number;
    document.getElementById("mp-price-g").textContent = money(p.priceG);
    document.getElementById("mp-price-b").textContent = money(p.priceB);
    document.getElementById("mp-qty").value = 1;
    document.getElementById("mp-note").value = "";
    document.querySelectorAll('input[name="size"]').forEach((r) => {
      r.checked = r.value === "grande";
    });
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    document.getElementById("modal-product").hidden = true;
    document.body.style.overflow = "";
    selectedProduct = null;
  }

  function addFromModal() {
    if (!selectedProduct) return;
    const size = document.querySelector('input[name="size"]:checked')?.value || "grande";
    const qty = Math.max(1, parseInt(document.getElementById("mp-qty").value, 10) || 1);
    const note = document.getElementById("mp-note").value.trim();
    const price = size === "broto" ? selectedProduct.priceB : selectedProduct.priceG;
    cart.push({
      uid: uid(),
      productId: selectedProduct.id,
      number: selectedProduct.number,
      name: selectedProduct.name,
      size: size === "broto" ? "Broto" : "Grande",
      price,
      qty,
      note
    });
    saveCart();
    closeProductModal();
    openCart();
  }

  function openCart() {
    renderCart();
    document.getElementById("drawer-cart").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    document.getElementById("drawer-cart").hidden = true;
    document.body.style.overflow = "";
  }

  function renderCart() {
    const list = document.getElementById("cart-list");
    const empty = document.getElementById("cart-empty");
    const footer = document.getElementById("cart-footer");
    const subtotalEl = document.getElementById("cart-subtotal");
    if (!cart.length) {
      list.innerHTML = "";
      empty.hidden = false;
      footer.hidden = true;
      return;
    }
    empty.hidden = true;
    footer.hidden = false;
    subtotalEl.textContent = money(cartTotal());
    list.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item" data-uid="${item.uid}">
        <div class="cart-item-info">
          <strong>${item.number} — ${item.name}</strong>
          <span class="cart-item-meta">${item.size}${item.note ? " · " + item.note : ""}</span>
          <span class="cart-item-price">${money(item.price * item.qty)}</span>
        </div>
        <div class="cart-item-actions">
          <button type="button" class="qty-btn" data-action="dec" data-uid="${item.uid}" aria-label="Diminuir">−</button>
          <span class="qty-val">${item.qty}</span>
          <button type="button" class="qty-btn" data-action="inc" data-uid="${item.uid}" aria-label="Aumentar">+</button>
          <button type="button" class="btn-remove" data-uid="${item.uid}" aria-label="Remover">Remover</button>
        </div>
      </div>`
      )
      .join("");
  }

  function changeQty(uid, delta) {
    const item = cart.find((i) => i.uid === uid);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter((i) => i.uid !== uid);
    saveCart();
    renderCart();
  }

  function removeItem(uid) {
    cart = cart.filter((i) => i.uid !== uid);
    saveCart();
    renderCart();
  }

  function openCheckout() {
    if (!cart.length) return;
    closeCart();
    document.getElementById("modal-checkout").hidden = false;
    document.body.style.overflow = "hidden";
    toggleAddressFields();
  }

  function closeCheckout() {
    document.getElementById("modal-checkout").hidden = true;
    document.body.style.overflow = "";
  }

  function toggleAddressFields() {
    const type = document.querySelector('input[name="order-type"]:checked')?.value || "entrega";
    const addr = document.getElementById("address-fields");
    if (addr) addr.hidden = type !== "entrega";
  }

  function buildWhatsAppMessage(data) {
    const lines = [];
    lines.push("*Pedido — Pizzaria Novo Milenium*");
    lines.push("");
    lines.push(`*Cliente:* ${data.name}`);
    lines.push(`*Telefone:* ${data.phone}`);
    lines.push(`*Tipo:* ${data.type === "entrega" ? "Entrega" : "Retirada"}`);
    if (data.type === "entrega") {
      lines.push("");
      lines.push("*Endereço:*");
      lines.push(`${data.street}, ${data.number}${data.complement ? " — " + data.complement : ""}`);
      lines.push(`${data.neighborhood} — CEP ${data.cep}`);
      if (data.reference) lines.push(`Ref.: ${data.reference}`);
    }
    lines.push("");
    lines.push("*Itens:*");
    cart.forEach((item) => {
      lines.push(`• ${item.qty}x ${item.number} ${item.name} (${item.size}) — ${money(item.price * item.qty)}`);
      if (item.note) lines.push(`  Obs: ${item.note}`);
    });
    lines.push("");
    lines.push(`*Subtotal:* ${money(cartTotal())}`);
    if (data.notes) {
      lines.push("");
      lines.push(`*Observações do pedido:* ${data.notes}`);
    }
    lines.push("");
    lines.push(`*Total:* ${money(cartTotal())}`);
    return lines.join("\n");
  }

  function submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const type = form.querySelector('input[name="order-type"]:checked')?.value || "entrega";
    const notes = form.notes.value.trim();
    if (!name || !phone) {
      alert("Preencha nome e telefone.");
      return;
    }
    const data = {
      name,
      phone,
      type,
      notes,
      street: form.street?.value.trim() || "",
      number: form.number?.value.trim() || "",
      complement: form.complement?.value.trim() || "",
      neighborhood: form.neighborhood?.value.trim() || "",
      cep: form.cep?.value.trim() || "",
      reference: form.reference?.value.trim() || ""
    };
    if (type === "entrega") {
      if (!data.street || !data.number || !data.neighborhood) {
        alert("Preencha rua, número e bairro para entrega.");
        return;
      }
    }
    const msg = buildWhatsAppMessage(data);
    const url = `https://wa.me/${window.STORE.phone}?text=${encodeURIComponent(msg)}`;
    cart = [];
    saveCart();
    closeCheckout();
    window.open(url, "_blank", "noopener");
  }

  function bindEvents() {
    document.getElementById("categories")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      renderCategories();
      renderProducts();
    });
    document.getElementById("search")?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
    document.getElementById("product-grid")?.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".btn-add");
      if (addBtn && !addBtn.disabled) {
        openProductModal(parseInt(addBtn.dataset.id, 10));
        return;
      }
      const card = e.target.closest(".product-card");
      if (card) openProductModal(parseInt(card.dataset.id, 10));
    });
    document.getElementById("mp-close")?.addEventListener("click", closeProductModal);
    document.getElementById("mp-backdrop")?.addEventListener("click", closeProductModal);
    document.getElementById("mp-add")?.addEventListener("click", addFromModal);
    document.getElementById("mp-qty-dec")?.addEventListener("click", () => {
      const input = document.getElementById("mp-qty");
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
    });
    document.getElementById("mp-qty-inc")?.addEventListener("click", () => {
      const input = document.getElementById("mp-qty");
      input.value = (parseInt(input.value, 10) || 1) + 1;
    });
    document.getElementById("btn-cart")?.addEventListener("click", openCart);
    document.getElementById("cart-close")?.addEventListener("click", closeCart);
    document.getElementById("cart-backdrop")?.addEventListener("click", closeCart);
    document.getElementById("cart-continue")?.addEventListener("click", openCheckout);
    document.getElementById("cart-back")?.addEventListener("click", closeCart);
    document.getElementById("cart-list")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-uid]");
      if (!btn) return;
      const u = btn.dataset.uid;
      if (btn.dataset.action === "inc") changeQty(u, 1);
      else if (btn.dataset.action === "dec") changeQty(u, -1);
      else if (btn.classList.contains("btn-remove")) removeItem(u);
    });
    document.getElementById("ck-close")?.addEventListener("click", closeCheckout);
    document.getElementById("ck-backdrop")?.addEventListener("click", closeCheckout);
    document.querySelectorAll('input[name="order-type"]').forEach((r) => {
      r.addEventListener("change", toggleAddressFields);
    });
    document.getElementById("form-checkout")?.addEventListener("submit", submitOrder);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProductModal();
        closeCart();
        closeCheckout();
      }
    });
  }

  function init() {
    document.getElementById("store-name").textContent = window.STORE.name;
    document.getElementById("store-phone").textContent = window.STORE.phoneDisplay;
    document.getElementById("store-address").textContent = window.STORE.address;
    renderCategories();
    renderProducts();
    updateCartBadge();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
