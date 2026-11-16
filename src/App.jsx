import { useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Search, ShoppingBag, Heart,
  Menu, X, Plus, Minus, Trash2, SlidersHorizontal, ChevronRight,
  Instagram, Facebook, MoveUpRight, Check, Truck, ShieldCheck, RotateCcw
} from "lucide-react";
import { categories, products } from "./data/products";

const money = value => new Intl.NumberFormat("en-KE", {
  style: "currency", currency: "KES", maximumFractionDigits: 0
}).format(value);

function Brand({ light = false }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="#" aria-label="ZAYRO home">
    <img src="/zayro-mark.svg" alt="" /><span>ZAYRO</span><i>®</i>
  </a>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => products.filter(p => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product, size) {
    if (!size) { setNotice("Choose a size first."); return; }
    setCart(current => {
      const existing = current.find(item => item.id === product.id && item.size === size);
      return existing
        ? current.map(item => item.id === product.id && item.size === size ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, size, qty: 1 }];
    });
    setSelected(null);
    setSelectedSize("");
    setCartOpen(true);
    setNotice("");
  }

  function updateQty(id, size, delta) {
    setCart(current => current.map(item => item.id === id && item.size === size
      ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  }

  function toggleWish(id) {
    setWishlist(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  }

  return <div className="app-shell">
    <div className="announcement"><span>NEW SEASON. NEW ENERGY.</span><b>Complimentary delivery on orders over KES 8,000</b><a href="#shop">Shop the edit <ArrowUpRight size={13}/></a></div>
    <header className="site-header">
      <button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button>
      <Brand />
      <nav className={mobileOpen ? "main-nav nav-open" : "main-nav"}>
        <a href="#shop" onClick={() => setMobileOpen(false)}>Shop all</a>
        <a href="#categories" onClick={() => setMobileOpen(false)}>Collections</a>
        <a href="#story" onClick={() => setMobileOpen(false)}>Our story</a>
        <a href="#footer" onClick={() => setMobileOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search/></button>
        <button className="icon-button wishlist-action" aria-label="Wishlist" onClick={() => setNotice(wishlist.length ? `${wishlist.length} saved item${wishlist.length > 1 ? "s" : ""}` : "Your wishlist is waiting for a little love.")}><Heart/><span>{wishlist.length}</span></button>
        <button className="bag-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>Bag</span><b>{cartCount}</b></button>
      </div>
    </header>

    {searchOpen && <div className="search-panel"><Search size={18}/><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sneakers, bags, everyday essentials..." /><button onClick={() => { setSearch(""); setSearchOpen(false); }}><X size={18}/></button></div>}

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> THE EVERYDAY, REIMAGINED</div>
          <h1>Find your<br/><em>own</em> rhythm<span className="hero-period">.</span></h1>
          <p>Good things to wear. Better ways to move. Discover pieces made for wherever your day takes you.</p>
          <div className="hero-buttons"><a className="button button-dark" href="#shop">Explore the collection <ArrowUpRight size={17}/></a><a className="text-link" href="#categories">Discover more <ArrowDownRight size={16}/></a></div>
          <div className="hero-footnote"><span>01 / 04</span><div className="progress"><i/></div><span>THE NEW EVERYDAY</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90" alt="Contemporary street style fashion editorial"/></div>
          <div className="hero-sticker"><span>STYLE</span><strong>HAS<br/>NO<br/>RULES</strong><i>↗</i></div>
          <div className="hero-caption"><span>THE ZAYRO EDIT</span><b>01 — EVERYDAY ICONS</b></div>
          <div className="hero-orbit">Z</div>
        </div>
        <div className="hero-side-label">MADE FOR YOUR EVERY DAY · NAIROBI / EVERYWHERE</div>
      </section>

      <section className="ticker" aria-label="Brand statement"><div>STYLE WITHOUT LIMITS <b>✳</b> MOVE YOUR WAY <b>✳</b> MAKE IT YOURS <b>✳</b> STYLE WITHOUT LIMITS <b>✳</b> MOVE YOUR WAY <b>✳</b></div></section>

      <section className="category-section section-wrap" id="categories">
        <div className="section-heading"><div><div className="eyebrow">A LITTLE SOMETHING FOR EVERY YOU</div><h2>Find your <em>thing.</em></h2></div><a className="text-link" href="#shop">View all categories <ArrowUpRight size={16}/></a></div>
        <div className="category-grid">{categories.map((cat, index) => <a href="#shop" className={`category-card ${cat.tone}`} key={cat.name} onClick={() => setActiveCategory(cat.name)}>
          <img src={cat.image} alt={cat.name}/><div className="category-overlay"/><div className="category-number">0{index + 1}</div><div className="category-info"><div><span>{cat.note}</span><h3>{cat.name}</h3></div><b><ArrowUpRight size={19}/></b></div>
        </a>)}</div>
      </section>

      <section className="shop-section section-wrap" id="shop">
        <div className="section-heading shop-heading"><div><div className="eyebrow">THE GOOD STUFF</div><h2>Fresh on the <em>scene.</em></h2><p>New finds, everyday favourites and pieces worth keeping.</p></div><a className="text-link desktop-link" href="#shop">Explore everything <ArrowUpRight size={16}/></a></div>
        <div className="shop-toolbar"><div className="filter-tabs">{["All","Sneakers","Women","Men","Accessories"].map(c => <button key={c} className={activeCategory === c ? "active" : ""} onClick={() => setActiveCategory(c)}>{c}</button>)}</div><span><SlidersHorizontal size={15}/> {filtered.length} pieces</span></div>
        <div className="product-grid">{filtered.map(product => <article className="product-card" key={product.id}>
          <div className="product-image" onClick={() => { setSelected(product); setSelectedSize(""); }}>
            <img src={product.image} alt={product.name} loading="lazy"/>{product.tag && <span className="product-tag">{product.tag}</span>}
            <button className={`wish-button ${wishlist.includes(product.id) ? "wished" : ""}`} onClick={e => { e.stopPropagation(); toggleWish(product.id); }} aria-label="Add to wishlist"><Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"}/></button>
            <button className="quick-add" onClick={e => { e.stopPropagation(); setSelected(product); setSelectedSize(""); }}>Quick add <Plus size={15}/></button>
          </div>
          <div className="product-meta"><div><h3>{product.name}</h3><span>{product.color}</span></div><strong>{money(product.price)}</strong></div>
          <div className="product-category">{product.category}</div>
        </article>)}</div>
        {filtered.length === 0 && <div className="empty-state">No pieces found. Try another search or category.</div>}
        <div className="mobile-all"><a className="button button-outline" href="#shop">Explore all pieces <ArrowRight size={16}/></a></div>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85" alt="Lifestyle fashion portrait"/></div>
        <div className="story-copy"><div className="eyebrow"><span className="eyebrow-dot"/> A DIFFERENT KIND OF EVERYDAY</div><h2>Not here to<br/>fit in. Here to<br/><em>feel like you.</em></h2><p>We believe personal style should feel easy, expressive and entirely yours. ZAYRO brings together the pieces that make getting dressed the best part of the day.</p><a className="button button-dark" href="#shop">Get to know the edit <ArrowUpRight size={17}/></a><div className="story-doodle">Z<span>®</span></div></div>
      </section>

      <section className="promise-row section-wrap">
        <div><Truck/><h3>Delivery that moves</h3><p>Convenient delivery across Kenya.</p></div>
        <div><ShieldCheck/><h3>Shopping, made easy</h3><p>Clear product details and secure checkout.</p></div>
        <div><RotateCcw/><h3>Here to help</h3><p>Support when you need a hand.</p></div>
      </section>

      <section className="newsletter">
        <div className="newsletter-shape">Z</div><div className="eyebrow">THE GOOD STUFF, FIRST</div><h2>A little more <em>ZAYRO.</em></h2><p>Fresh drops, new finds and a reason to look forward to your inbox.</p><form onSubmit={e => { e.preventDefault(); setNotice("Thanks for joining the ZAYRO list. Newsletter signup will be connected soon."); e.target.reset(); }}><input type="email" placeholder="Your email address" required/><button type="submit">Count me in <ArrowUpRight size={16}/></button></form><small>No noise. Just the good stuff.</small>
      </section>
    </main>

    <footer id="footer"><div className="footer-main"><div className="footer-brand"><Brand light/><p>Style without limits.<br/>Made for your every day.</p><div className="socials"><a href="#footer" aria-label="Instagram"><Instagram/></a><a href="#footer" aria-label="Facebook"><Facebook/></a></div></div><div className="footer-links"><div><b>EXPLORE</b><a href="#shop">Shop all</a><a href="#categories">Collections</a><a href="#story">Our story</a></div><div><b>NEED A HAND?</b><a href="mailto:hello@zayro.co.ke">Contact us</a><a href="#footer">Delivery information</a><a href="#footer">Returns & exchanges</a></div><div><b>THE DETAILS</b><a href="#footer">Privacy policy</a><a href="#footer">Terms of service</a><a href="#footer">FAQs</a></div></div></div><div className="footer-bottom"><span>© 2026 ZAYRO. ALL RIGHTS RESERVED.</span><span>MADE FOR YOUR EVERY DAY <b>✳</b> KENYA</span><a href="#">BACK TO TOP ↑</a></div></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">YOUR PICKS</span><h2>Your bag <em>({cartCount})</em></h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X/></button></div>
      {cart.length === 0 ? <div className="cart-empty"><div className="empty-bag"><ShoppingBag/></div><h3>Your bag is taking a breather.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explore the collection <ArrowRight size={16}/></button></div> : <>
        <div className="cart-items">{cart.map(item => <div className="cart-item" key={`${item.id}-${item.size}`}><img src={item.image} alt={item.name}/><div className="cart-item-info"><b>{item.name}</b><span>Size: {item.size} · {item.color}</span><strong>{money(item.price)}</strong><div className="qty-control"><button onClick={() => updateQty(item.id,item.size,-1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => updateQty(item.id,item.size,1)}><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => updateQty(item.id,item.size,-item.qty)} aria-label="Remove item"><Trash2 size={16}/></button></div>)}</div>
        <div className="cart-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><p>Delivery fees are calculated at checkout.</p><button className="button button-dark checkout-button" onClick={() => setNotice("Checkout is a frontend preview. Connect the Flask orders and Daraja payment API before accepting live payments.")}>Continue to checkout <ArrowUpRight size={17}/></button><small>Secure checkout · M-Pesa integration coming with backend</small></div>
      </>}</aside></div>}

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="quick-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={() => setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div className="quick-info"><div className="eyebrow">{selected.category}</div><h2>{selected.name}</h2><strong className="quick-price">{money(selected.price)}</strong><p>{selected.description}</p><span className="size-label">SELECT SIZE</span><div className="size-options">{selected.sizes.map(size => <button key={size} className={selectedSize === size ? "chosen" : ""} onClick={() => { setSelectedSize(size); setNotice(""); }}>{size}</button>)}</div>{notice && <div className="inline-notice">{notice}</div>}<button className="button button-dark add-button" onClick={() => addToCart(selected, selectedSize)}>Add to bag <ShoppingBag size={17}/></button><small>Delivery across Kenya · Final delivery fee shown at checkout</small></div></div></div>}

    {notice && !selected && <div className="toast"><Check size={17}/>{notice}<button onClick={() => setNotice("")}><X size={15}/></button></div>}
  </div>;
}

export default App;
