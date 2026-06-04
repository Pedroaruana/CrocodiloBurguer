import { useState, useRef, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import AuthModal from './components/AuthModal'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryNav from './components/CategoryNav'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartBar from './components/CartBar'
import CartDrawer from './components/CartDrawer'
import PromoBanner from './components/PromoBanner'
import FlyingItems from './components/FlyingItem'
import CheckoutPage from './components/CheckoutPage'
import LegalBanner from './components/LegalBanner'
import OrdersPage from './components/OrdersPage'
import { categories, products, restaurant } from './data/menu'
import './App.css'

export default function App() {
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeCategory, setActiveCategory] = useState('destaques')
  const [showCheckout, setShowCheckout] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  const sectionRefs = useRef({})
  const isScrolling = useRef(false)

  const isSearching = search.trim().length > 0

  useEffect(() => {
    if (isSearching) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [isSearching])

  function handleCategoryClick(categoryId) {
    setActiveCategory(categoryId)
    isScrolling.current = true
    sectionRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => { isScrolling.current = false }, 700)
  }

  const term = search.trim().toLowerCase()
  const filtered = term
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      )
    : products

  const grouped = categories.reduce((acc, cat) => {
    acc[cat.id] = filtered.filter((p) => p.category === cat.id)
    return acc
  }, {})

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Header
            restaurant={restaurant}
            onLoginClick={() => setShowAuth(true)}
            onOrdersClick={() => setShowOrders(true)}
          />

          <div className="sticky-top">
            <SearchBar value={search} onChange={setSearch} />
            {!isSearching && (
              <CategoryNav
                categories={categories}
                active={activeCategory}
                onSelect={handleCategoryClick}
              />
            )}
          </div>

          <main className="main-content">
            {!isSearching && <PromoBanner />}
            {!isSearching && <LegalBanner />}

            {isSearching ? (
              <div className="search-results-section">
                <h2 className="section-title">
                  🔍 {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                </h2>
                {filtered.length === 0 ? (
                  <div className="empty-search">
                    <span>🐊</span>
                    <p>Nenhum produto encontrado</p>
                    <small>Tente outro termo</small>
                  </div>
                ) : (
                  filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))
                )}
              </div>
            ) : (
              categories.map((cat) => {
                const items = grouped[cat.id]
                if (!items?.length) return null
                return (
                  <section
                    key={cat.id}
                    className="category-section"
                    data-category={cat.id}
                    ref={(el) => { sectionRefs.current[cat.id] = el }}
                  >
                    <h2 className="section-title">{cat.emoji} {cat.label}</h2>
                    {items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </section>
                )
              })
            )}
          </main>

          <CartBar />
          <CartDrawer onCheckout={() => setShowCheckout(true)} />
          <FlyingItems />

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          {showCheckout && <CheckoutPage onClose={() => setShowCheckout(false)} />}
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
          {showOrders && <OrdersPage onClose={() => setShowOrders(false)} />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
