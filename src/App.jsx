import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const SectionTitle = ({ title, white = false }) => (
  <div className={`section-header reveal-fade ${white ? "mega-ornament" : ""}`}>
    <div className="ornament-line">
      <div className="ornament-diamond"></div>
    </div>
    <h2 className={`section-title playfair ${white ? "mega-section-title" : ""}`}>{title}</h2>
    <div className="ornament-line">
      <div className="ornament-diamond"></div>
    </div>
  </div>
);

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

// Helper for translations
const t = (lang, en, np) => (lang === "np" ? np : en);

const Header = ({ lang, handleLangToggle, servicesData, setBookingForm, setShowBookingModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: t(lang, "Home", "गृह"), path: "/" },
    { name: t(lang, "Services", "सेवाहरू"), path: "/services" },
    { name: t(lang, "Samagri", "सामग्री"), path: "/samagri" },
    { name: t(lang, "Subha Sait", "शुभ साइत"), path: "/subha-sait" },
    { name: t(lang, "Rashifal", "राशिफल"), path: "/rashifal" },
    { name: t(lang, "Track Booking", "ट्र्याकिङ"), path: "/track-booking" },
  ];

  return (
    <nav className={`header ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}>
      <div className="container nav-content">
        <div className="logo" onClick={() => { navigate("/"); window.scrollTo(0, 0); closeMenu(); }} style={{cursor: "pointer"}}>
          <svg className="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50" y="72" fontSize="70" fontFamily="sans-serif" fontWeight="bold" fill="#A7692B" textAnchor="middle">ॐ</text>
          </svg>
          <div className="logo-text-block">
            <h2 className="playfair">{t(lang, "Purohit Sewa", "पुरोहित सेवा")}</h2>
            <span className="logo-tagline">{t(lang, "Vedic Solutions for Every Ceremony", "हरेक समारोहको लागि वैदिक समाधान")}</span>
          </div>
        </div>

        {/* Hamburger Icon */}
        <button className={`hamburger-menu ${mobileMenuOpen ? "active" : ""}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span><span></span><span></span>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={location.pathname === link.path ? "active" : ""} onClick={closeMenu}>
              {link.name}
            </Link>
          ))}

          <div className="mobile-nav-actions">
            <button className="lang-toggle-btn" onClick={() => { handleLangToggle(); closeMenu(); }}>
              {lang === "en" ? "नेपाली" : "English"}
            </button>

            <button className="nav-btn" onClick={() => { closeMenu(); setBookingForm(f => ({...f, service: servicesData[0]?.id || ""})); setShowBookingModal(true); }}>{t(lang, "Book Now", "बुक गर्नुहोस्")}</button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

const Footer = ({ lang, navigate }) => (
  <footer className="mega-footer">
    <div className="container reveal-fade">
      <div className="footer-main-grid">
        <div className="footer-brand-col">
          <div className="logo footer-logo">
            <svg className="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50" y="72" fontSize="70" fontFamily="sans-serif" fontWeight="bold" fill="#F0D7B6" textAnchor="middle">ॐ</text>
            </svg>
            <div className="logo-text-block">
              <h2 className="playfair" style={{ color: "white" }}>{t(lang, "Purohit Sewa", "पुरोहित सेवा")}</h2>
            </div>
          </div>
          <p className="footer-about">
            {t(lang, "Dedicated to preserving and providing authentic Vedic rituals and services to every doorstep. Our certified Pandits ensure your spiritual journey is performed with absolute purity and devotion.", "प्रमाणित पण्डितहरूद्वारा शुद्ध र भक्तिपूर्ण वैदिक अनुष्ठानहरू घरदैलोमै उपलब्ध गराउने हाम्रो लक्ष्य हो। तपाईंको आध्यात्मिक यात्रालाई पवित्र बनाउन हामी प्रतिबद्ध छौं।")}
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com/purohitsewa" target="_blank" rel="noreferrer" className="social-link" title="Facebook">FB</a>
            <a href="https://instagram.com/purohitsewa" target="_blank" rel="noreferrer" className="social-link" title="Instagram">IG</a>
            <a href="https://wa.me/97798XXXXXXXX" target="_blank" rel="noreferrer" className="social-link" title="WhatsApp">WA</a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>{t(lang, "Quick Navigation", "द्रुत नेभिगेसन")}</h4>
            <ul className="footer-link-list">
              <li><Link to="/">{t(lang, "Home", "गृह पृष्ठ")}</Link></li>
              <li><Link to="/services">{t(lang, "All Services", "सबै सेवाहरू")}</Link></li>
              <li><Link to="/samagri">{t(lang, "Samagri List", "सामग्री सूची")}</Link></li>
              <li><Link to="/subha-sait">{t(lang, "Subha Sait", "शुभ साइत")}</Link></li>
              <li><Link to="/rashifal">{t(lang, "Daily Rashifal", "दैनिक राशिफल")}</Link></li>
              <li><Link to="/track-booking">{t(lang, "Track Booking", "ट्र्याकिङ")}</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>{t(lang, "Puja Services", "पूजा सेवाहरू")}</h4>
            <ul className="footer-link-list">
              <li><Link to="/services">{t(lang, "Marriage Puja", "विवाह पूजा")}</Link></li>
              <li><Link to="/services">{t(lang, "Griha Pravesh", "गृह प्रवेश")}</Link></li>
              <li><Link to="/services">{t(lang, "Bratabandha", "व्रतबन्ध")}</Link></li>
              <li><Link to="/services">{t(lang, "Pasni Ceremony", "पास्नी उत्सव")}</Link></li>
              <li><Link to="/services">{t(lang, "Satyanarayan Puja", "सत्यनारायण पूजा")}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t(lang, "Get in Touch", "सम्पर्क गर्नुहोस्")}</h4>
            <ul className="footer-contact-list">
              <li>📍 {t(lang, "Kathmandu, Nepal", "काठमाडौं, नेपाल")}</li>
              <li>📞 +977 9801234567</li>
              <li>✉️ info@purohitsewa.com</li>
              <li>⏰ 6:00 AM - 9:00 PM</li>
            </ul>
            <div className="admin-link-footer" style={{ marginTop: "1.5rem" }}>
               <a href={`${API_BASE.replace('/api', '')}/admin/`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", opacity: "0.6", color: "white", textDecoration: "underline" }}>
                 {t(lang, "Staff Login", "कर्मचारी लगइन")}
               </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-flex">
          <p>© {new Date().getFullYear()} {t(lang, "Purohit Sewa. Empowering Vedic Traditions.", "पुरोहित सेवा। वैदिक परम्पराको संरक्षण।")}</p>
          <div className="footer-legal">
            <a href="#">{t(lang, "Terms", "शर्तहरू")}</a>
            <a href="#">{t(lang, "Privacy", "गोपनीयता")}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const HomeView = ({ t, lang, servicesData, dbSubhaSait, tithiInfo, testimonialsData, activePuja, setActivePuja, activeSamagriDict, pujaTabs, statusLookup, setStatusLookup, statusResults, handleStatusLookup, statusLoading, playBellSound, carouselRef, setBookingForm, setShowBookingModal, navigate, bsMonths, saitYear, saitMonth, setSaitYear, setSaitMonth, selectedCeremony, setSelectedCeremony, ceremonyColors }) => (
  <div className="home-page">
    {/* Hero Section */}
    <section className="hero" id="home">
      <div className="temple-bell-container" onClick={playBellSound} title="Ring the Bell!">
        <svg className="temple-bell-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bellGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A86A2E"/><stop offset="50%" stopColor="#F0D7B6"/><stop offset="100%" stopColor="#A86A2E"/>
            </linearGradient>
          </defs>
          <path d="M16 1C14.3 1 13 2.3 13 4v2h6V4C19 2.3 17.7 1 16 1ZM15 4V3c0-.6.4-1 1-1s1 .4 1 1v1h-2Z" fill="#A86A2E"/>
          <path d="M16 6c-4.4 0-8 3.6-8 8c0 3-2 6.5-4 8h24c-2-1.5-4-5-4-8c0-4.4-3.6-8-8-8Z" fill="url(#bellGrad)" stroke="#5E120A" strokeWidth="1" strokeLinejoin="round"/>
          <path d="M8 14h16" stroke="#5E120A" strokeWidth="0.5" opacity="0.5"/><path d="M7.5 17h17" stroke="#F0D7B6" strokeWidth="0.8" opacity="0.8"/><path d="M6 20h20" stroke="#5E120A" strokeWidth="0.5" opacity="0.5"/><path d="M15 22v2h2v-2" fill="#5E120A"/><circle cx="16" cy="25" r="2.5" fill="url(#bellGrad)" stroke="#5E120A" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="container hero-content">
        <div className="hero-text reveal-left">
          <h1 className="hero-title playfair">
            {lang === "en" ? <>Book Certified Pandit<br/>for Any Puja or Ceremony</> : <>कुनै पनि पूजा वा समारोहको लागि<br/>प्रमाणित पण्डित बुक गर्नुहोस्</>}
          </h1>
          <div className="hero-title-separator"></div>
          <p className="hero-subtitle">{t(lang, "Trusted Vedic services with exact rituals, proper samagri, and Subha Sait guidance.", "सटीक अनुष्ठान, उचित सामग्री, र शुभ साइत मार्गदर्शनका साथ विश्वसनीय वैदिक सेवाहरू।")}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => { setBookingForm(f => ({...f, service: servicesData[0]?.id || ""})); setShowBookingModal(true); }}>{t(lang, "Book a Puja", "पूजा बुक गर्नुहोस्")}</button>
            <button className="btn-secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>{t(lang, "See Services", "सेवाहरू हेर्नुहोस्")}</button>
          </div>
        </div>
        <div className="hero-image-container reveal-right stagger-2">
          <div className="mandala-bg-huge"></div>
          <div className="temple-frame-wrapper">
            <img src="/images/hero.png" alt="Pandit performing puja" className="hero-img-front" />
            <div className="temple-pillar left"></div><div className="temple-pillar right"></div>
          </div>
        </div>
      </div>
      <svg className="hero-curve-bottom" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d="M0,90 C400,-30 800,180 1440,50 L1440,180 L0,180 Z" fill="#FDF8F0"></path>
      </svg>
    </section>

    {/* Popular Puja Services */}
    <section className="services-section" id="services">
      <div className="container">
        <SectionTitle title={t(lang, "Popular Puja Services", "लोकप्रिय पूजा सेवाहरू")} />
        <div className="services-carousel-wrapper">
          <button className="carousel-nav-btn prev" onClick={() => { 
            const scrollAmt = carouselRef.current?.offsetWidth || 300;
            carouselRef.current?.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
          }} aria-label="Previous service">‹</button>
          <div className="services-grid carousel-mode" ref={carouselRef}>
            {servicesData.slice(0, 8).map((service, index) => (
              <div key={index} className="service-card reveal-up">
                <div className="service-img-wrapper">
                  <img src={service.img || service.image_url || "/images/hero.png"} alt={service.title} />
                </div>
                <div className="service-info">
                  <h3 className="playfair">{service.title}</h3>
                  <p className="service-desc">{service.desc || service.description}</p>
                  <div className="service-footer">
                    <button className="btn-small" onClick={() => { setBookingForm(f => ({...f, service: service.id || ""})); setShowBookingModal(true); }}>{t(lang, "Book Now", "बुक गर्नुहोस्")}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-nav-btn next" onClick={() => {
            const scrollAmt = carouselRef.current?.offsetWidth || 300;
            carouselRef.current?.scrollBy({ left: scrollAmt, behavior: 'smooth' });
          }} aria-label="Next service">›</button>
        </div>
        <div className="view-all-services-wrapper reveal-up stagger-1" style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn-secondary" style={{ padding: "14px 40px" }} onClick={() => navigate("/services")}>
            {t(lang, "Explore All Services", "सबै सेवाहरू अन्वेषण गर्नुहोस्")} ➔
          </button>
        </div>
      </div>
    </section>

    {/* ── Subha Sait Section ── */}
    <section className="subhasait-section" id="subhasait">
      <div className="container">
        <SectionTitle title={t(lang, "Subha Sait & Tithi", "शुभ साइत र तिथि")} />
        <p style={{ textAlign: "center", color: "var(--text-body)", marginBottom: "2rem", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          {t(lang, "Auspicious dates for ceremonies, curated by our Pandit. Select month and year to view.", "हाम्रो पण्डितद्वारा उपलब्ध गराइएको समारोहका लागि शुभ साइतहरू। हेर्न महिना र वर्ष छान्नुहोस्।")}
        </p>

        <div className="sait-filter-bar reveal-up">
          <select value={saitMonth} onChange={e => setSaitMonth(Number(e.target.value))} className="sait-select">
            {saitMonth === "" && <option value="">Loading...</option>}
            {bsMonths.map((m, idx) => (
              <option key={idx} value={idx + 1}>{lang === 'np' ? m.np : m.en}</option>
            ))}
          </select>
          <select value={saitYear} onChange={e => setSaitYear(Number(e.target.value))} className="sait-select">
            {saitYear === "" && <option value="">Loading...</option>}
            {[2080,2081,2082,2083,2084,2085,2086,2087,2088,2089,2090].map(y => (
              <option key={y} value={y}>{y} BS</option>
            ))}
          </select>
          <select value={selectedCeremony} onChange={e => setSelectedCeremony(e.target.value)} className="sait-select">
            <option value="All">{t(lang, "All Ceremonies", "सबै समारोह")}</option>
            {["Marriage","Pasni","Bratabandha","Griha Pravesh","Puja","Other"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="sait-cards-grid">
          {(selectedCeremony === "All" ? dbSubhaSait : dbSubhaSait.filter(s => s.ceremony_type === selectedCeremony)).length === 0 ? (
            <div className="sait-empty reveal-scale">
              <span style={{ fontSize: "2rem" }}>🕉️</span>
              <p>{t(lang, "No auspicious dates found for this month.", "यो महिनाको लागि कुनै शुभ साइत भेटिएन।")}</p>
            </div>
          ) : (
            (selectedCeremony === "All" ? dbSubhaSait : dbSubhaSait.filter(s => s.ceremony_type === selectedCeremony)).map((s, i) => (
              <div key={s.id || i} className="premium-sait-card reveal-up stagger-1">
                <div className="tithi-date">
                  <span className="tithi-day-large">{s.bs_day}</span>
                  <div className="tithi-my">
                    <span>{lang === 'np' ? bsMonths[parseInt(s.nepali_date.split('-')[1], 10) - 1]?.np : bsMonths[parseInt(s.nepali_date.split('-')[1], 10) - 1]?.en} {s.bs_year}</span>
                  </div>
                </div>
                <div className="tithi-details-wrap">
                  <div className="tithi-badge" style={{color: ceremonyColors[s.ceremony_type]}}>{s.ceremony_type}</div>
                  <div className="tithi-badge">🌙 {s.tithi}</div>
                  <div className="tithi-badge">🕐 {s.time_range}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }} className="reveal-up stagger-1">
          <button className="btn-secondary" onClick={() => navigate("/subha-sait")}>
            {t(lang, "View Full Calendar", "पूरा पात्रो हेर्नुहोस्")} ➔
          </button>
        </div>
      </div>
    </section>

    {/* ── Why Choose Us ── */}
    <section className="features-section">
      <div className="container">
        <SectionTitle title={t(lang, "The Purohit Sewa Advantage", "पुरोहित सेवाको फाइदा")} />
        <div className="features-grid">
          {[
            { symbol: "ॐ", icon: "📜", title: t(lang, "Certified Pandits", "प्रमाणित पण्डितहरू"), desc: t(lang, "All our pujaris are traditionally trained with deep Vedic knowledge.", "हाम्रा सबै पुजारीहरू गहिरो वैदिक ज्ञानका साथ परम्परागत रूपमा प्रशिक्षित छन्।") },
            { symbol: "ॐ", icon: "🪔", title: t(lang, "Full Samagri Support", "पूर्ण सामग्री सहयोग"), desc: t(lang, "We provide detailed lists and can also arrange complete puja samagri.", "हामी विस्तृत सूचीहरू प्रदान गर्दछौं र पूर्ण पूजा सामग्री पनि व्यवस्था गर्न सक्छौं।") },
            { symbol: "ॐ", icon: "🗓️", title: t(lang, "Subha Sait Selection", "शुभ साइत चयन"), desc: t(lang, "Accurate planetary alignment checks for the maximum benefit of the ritual.", "अनुष्ठानको अधिकतम लाभको लागि सटीक ग्रह संरेखण जाँचहरू।") }
          ].map((f, i) => (
            <div key={i} className="feature-card reveal-scale stagger-1">
              <div className="corner corner-top-left"></div>
              <div className="corner corner-top-right"></div>
              <div className="corner corner-bottom-left"></div>
              <div className="corner corner-bottom-right"></div>
              
              <div className="feature-symbol-top">{f.symbol}</div>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="playfair">{f.title}</h3>
              <p>{f.desc}</p>
              
              <div className="feature-border-bottom"></div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Samagri Explorer */}
    <section className="samagri-section" id="samagri">
      <div className="container">
        <SectionTitle title={t(lang, "Samagri Required for Each Puja", "प्रत्येक पूजाको लागि आवश्यक सामग्री")} />
        <div className="samagri-container">
          <div className="samagri-left-panel reveal-left">
            <div className="samagri-card">
              <div className="samagri-selection-wrapper">
                <label>🕉️ {t(lang, "Choose Your Puja Ceremony", "पूजाको लागि समारोह रोज्नुहोस्")}</label>
                <select className="samagri-dropdown" value={activePuja} onChange={(e) => setActivePuja(e.target.value)}>
                  {pujaTabs.map((tab) => (
                    <option key={tab.key} value={tab.key}>{tab.label}</option>
                  ))}
                </select>
              </div>
              <ul className="samagri-list">
                {activeSamagriDict[activePuja]?.slice(0, 8).map((item, idx) => (
                  <li key={idx} className="samagri-item">
                    <span className="samagri-item-name">{item.name}</span>
                    <span className="dotted-leader"></span>
                    <span className="samagri-item-qty">{item.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="samagri-actions">
                <button className="btn-download" onClick={() => alert(t(lang, "PDF Download is being prepared.", "सामग्री PDF तयार हुँदैछ।"))}>📄 {t(lang, "List PDF", "सूची PDF")}</button>
                <button className="btn-primary-outline btn-small" onClick={() => navigate("/samagri")}>🔍 {t(lang, "View Full List", "पूर्ण सूची हेर्नुहोस्")}</button>
              </div>
            </div>
          </div>
          <div className="samagri-right-panel reveal-right">
            <div className="samagri-img-ornament-wrap">
              <img src={servicesData.find(s => s.title === activePuja)?.image_url || "/images/hero.png"} className="samagri-active-img" alt={activePuja} />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Testimonials ── */}
    <section className="testimonials-section">
      <div className="container">
        <SectionTitle title={t(lang, "Blessings from our Devotees", "हाम्रा भक्तहरूबाट आशीर्वाद")} />
        <div className="testimonials-grid">
          {[
            ...testimonialsData,
            { id: "mock1", rating: 5, content: "The pandit was extremely knowledgeable. All the rituals for our Griha Pravesh were performed exactly according to the Vedic scriptures. Highly recommended!", user_name: "Aarav Karki", location: "Kathmandu" },
            { id: "mock2", rating: 5, content: "Booking was so simple and they provided all the necessary samagri list ahead of time. The Bratabandha ceremony was beautiful and spiritual.", user_name: "Sneha Thapa", location: "Lalitpur" },
            { id: "mock3", rating: 5, content: "Excellent service! We had a Satyanarayan Puja at home and Pandit Ji explained the meaning of each mantra which made it truly special.", user_name: "Rahul Sharma", location: "Bhaktapur" }
          ].slice(0, 3).map((t_item, i) => (
            <div key={t_item.id || i} className="testimonial-card reveal-up stagger-1">
              <div className="corner corner-top-left"></div>
              <div className="corner corner-top-right"></div>
              <div className="corner corner-bottom-left"></div>
              <div className="corner corner-bottom-right"></div>
              
              <div className="quote-symbol-top">ॐ</div>
              <div className="quote-icon">“</div>
              
              <div className="testimonial-stars">
                {[...Array(5)].map((_, starIdx) => (
                  <span key={starIdx} className={(t_item.rating && starIdx < t_item.rating) || (!t_item.rating && starIdx < 5) ? "star-filled" : "star-empty"}>★</span>
                ))}
              </div>
              <p className="testimonial-text">{t_item.content || t_item.message}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar-wrapper">
                  {t_item.user_photo ? (
                    <img src={t_item.user_photo} alt={t_item.user_name} className="testimonial-avatar" />
                  ) : (
                    <div className="testimonial-avatar-fallback">ॐ</div>
                  )}
                </div>
                <div className="author-info">
                  <strong className="playfair">{t_item.user_name || t_item.name}</strong>
                  <span>{t_item.location || t(lang, "Devotee", "भक्त")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Status Track */}
    <section className="booking-status-section" id="track">
      <div className="container">
        <SectionTitle title={t(lang, "Track Your Booking", "आफ्नो बुकिङ ट्र्याक गर्नुहोस्")} />
        <div className="status-lookup-card reveal-scale">
          <form onSubmit={handleStatusLookup} className="status-lookup-form">
            <input type="text" placeholder={t(lang, "Phone or Email...", "फोन वा इमेल...")} value={statusLookup} onChange={e => setStatusLookup(e.target.value)} required />
            <button type="submit" className="btn-primary">{statusLoading ? t(lang, "Searching...", "खोज्दै...") : t(lang, "Check Status", "जाँच गर्नुहोस्")}</button>
          </form>
          {statusResults && <div className="status-results">{!statusResults.found ? <p>{t(lang, "No bookings found.", "बुकिङ भेटिएन।")}</p> : <div className="status-list">{statusResults.bookings.map(b => (
            <div key={b.id} className="status-item">
              <strong>{b.service}</strong> — <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
            </div>
          ))}</div>}</div>}
          <div style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid rgba(195,139,72,0.1)", paddingTop: "1.5rem" }}>
            <button className="btn-small" onClick={() => navigate("/track-booking")} style={{ background: "none", color: "var(--gold-dark)", border: "1px solid var(--gold-primary)" }}>
              {t(lang, "Open Full Tracking Page", "पूर्ण ट्र्याकिङ पृष्ठ खोल्नुहोस्")} ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AllServicesView = ({ t, lang, servicesData, setBookingForm, setShowBookingModal }) => (
  <div className="services-page">
    <div className="container" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
      <SectionTitle title={t(lang, "All Puja Services", "सबै पूजा सेवाहरू")} />
      <div className="services-grid show-all" style={{marginTop: "3rem"}}>
        {servicesData.map((service, index) => (
          <div key={index} className={`service-card reveal-up stagger-${(index % 4) + 1}`}>
            <div className="service-img-wrapper">
              <div className="service-rating"><span className="star-icon">★</span> {service.rating || "4.9"} <span className="reviews">({service.reviews || "100+"})</span></div>
              <img src={service.img || service.image_url || "/images/hero.png"} alt={service.title} />
            </div>
            <div className="service-info">
              <h3 className="playfair">{service.title}</h3>
              <p className="service-desc">{service.desc || service.description}</p>

              <div className="service-meta">
                <span className="service-tag">
                  <span className="meta-icon">⏱️</span> {service.duration || "2 Hours"}
                </span>
                <span className="service-tag">
                  <span className="meta-icon">🌺</span> {t(lang, "Samagri Included", "सामग्री सहित")}
                </span>
              </div>

              <div className="service-footer">
                <button className="btn-small" onClick={() => { setBookingForm(f => ({...f, service: service.id || ""})); setShowBookingModal(true); }}>{t(lang, "Book Now", "बुक गर्नुहोस्")}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const rashifalData = [
  { sign_en: "Aries", sign_np: "मेष", image: "/images/rashifal/mesh.webp", desc_en: "A good day for new beginnings and financial gains. Health remains stable.", desc_np: "नयाँ कामको थालनी र आर्थिक लाभको लागि राम्रो दिन छ। स्वास्थ्य स्थिर रहनेछ।" },
  { sign_en: "Taurus", sign_np: "वृष", image: "/images/rashifal/brish.webp", desc_en: "You may experience peace of mind and success in creative tasks.", desc_np: "मानसिक शान्ति र सिर्जनात्मक कार्यमा सफलता मिल्नेछ।" },
  { sign_en: "Gemini", sign_np: "मिथुन", image: "/images/rashifal/mithun.webp", desc_en: "Travel is highly favored. Be careful of unnecessary expenses.", desc_np: "यात्राको योग छ। अनावश्यक खर्चबाट जोगिनुहोला।" },
  { sign_en: "Cancer", sign_np: "कर्कट", image: "/images/rashifal/karkat.webp", desc_en: "Family life will be joyful. A pending work might get completed.", desc_np: "पारिवारिक जीवन खुशीमय हुनेछ। रोकिएको काम सम्पन्न हुन सक्छ।" },
  { sign_en: "Leo", sign_np: "सिंह", image: "/images/rashifal/singha.webp", desc_en: "Confidence will lead to success in professional life. Good time for investments.", desc_np: "आत्मविश्वासले व्यावसायिक जीवनमा सफलता दिलाउनेछ। लगानीको लागि राम्रो समय।" },
  { sign_en: "Virgo", sign_np: "कन्या", image: "/images/rashifal/kanya.webp", desc_en: "Spiritual interest will increase. Students will perform exceptionally well.", desc_np: "आध्यात्मिक रुची बढ्नेछ। विद्यार्थीहरूले राम्रो प्रदर्शन गर्नेछन्।" },
  { sign_en: "Libra", sign_np: "तुला", image: "/images/rashifal/tula.webp", desc_en: "Partnerships will be beneficial. Keep calm while making critical decisions.", desc_np: "साझेदारी लाभदायक हुनेछ। महत्वपूर्ण निर्णय लिँदा शान्त रहनुहोला।" },
  { sign_en: "Scorpio", sign_np: "वृश्चिक", image: "/images/rashifal/brischik.webp", desc_en: "Hard work brings fruitful rewards. Maintain a healthy diet today.", desc_np: "कडा परिश्रमले फलदायी परिणाम दिनेछ। आज खानपानमा ध्यान दिनुहोला।" },
  { sign_en: "Sagittarius", sign_np: "धनु", image: "/images/rashifal/dhanu.webp", desc_en: "Social prestige will rise. Spending time with loved ones is advised.", desc_np: "सामाजिक प्रतिष्ठा बढ्नेछ। प्रियजनहरूसँग समय बिताउन सल्लाह दिइन्छ।" },
  { sign_en: "Capricorn", sign_np: "मकर", image: "/images/rashifal/makar.webp", desc_en: "Career opportunities knock on your door. Avoid unnecessary arguments.", desc_np: "क्यारियरका अवसरहरू आउनेछन्। अनावश्यक तर्क-वितर्कबाट बच्नुहोस्।" },
  { sign_en: "Aquarius", sign_np: "कुम्भ", image: "/images/rashifal/kumbha.webp", desc_en: "Financial conditions will improve. A short trip could be highly refreshing.", desc_np: "आर्थिक अवस्थामा सुधार आउनेछ। छोटो यात्रा ताजापन दिनेछ।" },
  { sign_en: "Pisces", sign_np: "मीन", image: "/images/rashifal/meen.webp", desc_en: "A day filled with immense positive energy. Investments will yield good returns.", desc_np: "सकारात्मक उर्जाले भरिपूर्ण दिन। लगानीले राम्रो प्रतिफल दिनेछ।" },
];

const RashifalView = ({ t, lang, setBookingForm, setShowBookingModal }) => {
  const currentDate = new Date().toLocaleDateString(lang === 'np' ? 'ne-NP' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="rashifal-page">
      <div className="container" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="rashifal-header reveal-up">
          <SectionTitle title={t(lang, "Today's Rashifal", "आजको राशिफल")} />
          <p className="rashifal-date">📅 {currentDate}</p>
        </div>
        
        <div className="rashifal-grid">
          {rashifalData.map((r, i) => (
            <div className="rashifal-card h-patro-style reveal-up stagger-1" key={i}>
              <div className="rashifal-content">
                 <div className="rashifal-card-title">
                    <h3 className="playfair">{t(lang, r.sign_en, r.sign_np)}</h3>
                 </div>
                 <p className="rashifal-text">{t(lang, r.desc_en, r.desc_np)}</p>
                 <span className="rashifal-en-sub">{t(lang, "", r.sign_en)}</span>
              </div>
              <div className="rashifal-illustration-wrap">
                 <img src={r.image} alt={r.sign_en} className="rashifal-illustration" onError={(e) => { e.target.src = '/vite.svg'; e.target.style.opacity = '0.3' }} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="rashifal-cta reveal-up">
          <div className="rashifal-cta-content">
            <h3 className="playfair">{t(lang, "Detailed Astrology Consultation", "विस्तृत ज्योतिष परामर्श चाहनुहुन्छ?")}</h3>
            <p>{t(lang, "Book a one-on-one session with our expert Pandit for personalized horoscope reading, Kundali matchmaking, and planetary remedies.", "तपाईंको जन्म कुण्डली, ग्रह शान्ति र भविष्यफलको बारेमा हाम्रो दिग्गज पण्डितसँग व्यक्तिगत परामर्श लिनुहोस्।")}</p>
            <button className="btn-primary" onClick={() => { setBookingForm(f => ({...f, service: ""})); setShowBookingModal(true); }}>
              {t(lang, "Consult Astrologer", "ज्योतिष परामर्श लिनुहोस्")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const SubhaSaitView = ({ t, lang, saitMonth, setSaitMonth, bsMonths, saitYear, setSaitYear, selectedCeremony, setSelectedCeremony, dbSubhaSait, ceremonyColors }) => (
  <div className="subha-sait-page">
    <div className="container" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
      <SectionTitle title={t(lang, "Subha Sait Explorer", "शुभ साइत अन्वेषक")} />
      <p style={{ textAlign: "center", color: "var(--text-body)", marginBottom: "3rem", maxWidth: "700px", marginLeft: "auto", marginRight: "auto", fontSize: "1.1rem" }}>
        {t(lang, "Find the most auspicious dates and timings for your sacred ceremonies, curated by our expert Pandits according to the Vedic Calendar.", "वैदिक पात्रो अनुसार हाम्रा विज्ञ पण्डितहरूद्वारा उपलब्ध गराइएको तपाईंको पवित्र समारोहका लागि शुभ साइत र समयहरू यहाँ पाउनुहोस्।")}
      </p>

      <div className="sait-filter-bar reveal-up" style={{ marginBottom: "4rem" }}>
        <select value={saitMonth} onChange={e => setSaitMonth(Number(e.target.value))} className="sait-select">
          {bsMonths.map((m, idx) => (
            <option key={idx} value={idx + 1}>{lang === 'np' ? m.np : m.en}</option>
          ))}
        </select>
        <select value={saitYear} onChange={e => setSaitYear(Number(e.target.value))} className="sait-select">
          {[2080,2081,2082,2083,2084,2085,2086,2087,2088,2089,2090].map(y => (
            <option key={y} value={y}>{y} BS</option>
          ))}
        </select>
        <select value={selectedCeremony} onChange={e => setSelectedCeremony(e.target.value)} className="sait-select">
          <option value="All">{t(lang, "All Ceremonies", "सबै समारोह")}</option>
          {["Marriage","Pasni","Bratabandha","Griha Pravesh","Puja","Other"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="sait-cards-grid">
        {(selectedCeremony === "All" ? dbSubhaSait : dbSubhaSait.filter(s => s.ceremony_type === selectedCeremony)).length === 0 ? (
          <div className="sait-empty reveal-scale" style={{ gridColumn: "1/-1", padding: "5rem" }}>
            <span style={{ fontSize: "3rem" }}>🕉️</span>
            <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{t(lang, "No auspicious dates found for the selected criteria.", "छानिएको मापदण्डको लागि कुनै शुभ साइत भेटिएन।")}</p>
          </div>
        ) : (
          (selectedCeremony === "All" ? dbSubhaSait : dbSubhaSait.filter(s => s.ceremony_type === selectedCeremony)).map((s, i) => (
            <div key={s.id || i} className="premium-sait-card reveal-up stagger-1">
              <div className="tithi-date">
                <span className="tithi-day-large">{s.bs_day}</span>
                <div className="tithi-my">
                   <span>{lang === 'np' ? bsMonths[parseInt(s.nepali_date.split('-')[1], 10) - 1]?.np : bsMonths[parseInt(s.nepali_date.split('-')[1], 10) - 1]?.en} {s.bs_year}</span>
                </div>
              </div>
              <div className="tithi-details-wrap">
                <div className="tithi-badge" style={{color: ceremonyColors[s.ceremony_type], borderColor: ceremonyColors[s.ceremony_type]}}>{s.ceremony_type}</div>
                <div className="tithi-badge">🌙 {s.tithi}</div>
                <div className="tithi-badge">🕐 {s.time_range}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

const TrackBookingView = ({ t, lang, statusLookup, setStatusLookup, handleStatusLookup, statusLoading, statusResults, tithiInfo }) => (
  <div className="track-booking-page">
    <div className="container" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
      <SectionTitle title={t(lang, "Track Your Booking", "आफ्नो बुकिङ ट्र्याक गर्नुहोस्")} />
      
      <div className="status-lookup-card reveal-scale" style={{ maxWidth: "700px", margin: "4rem auto" }}>
        <p style={{ textAlign: "center", marginBottom: "2rem", opacity: 0.8 }}>
          {t(lang, "Enter your phone number or email address used during booking to check the real-time status of your request.", "आफ्नो बुकिङको स्थिति जाँच गर्न बुकिङ गर्दा प्रयोग गरिएको फोन नम्बर वा इमेल ठेगाना राख्नुहोस्।")}
        </p>
        <form onSubmit={handleStatusLookup} className="status-lookup-form">
          <input 
            type="text" 
            placeholder={t(lang, "Phone or Email...", "फोन वा इमेल...")} 
            value={statusLookup} 
            onChange={e => setStatusLookup(e.target.value)} 
            required 
            style={{ fontSize: "1.1rem", padding: "1.2rem" }}
          />
          <button type="submit" className="btn-primary" style={{ padding: "0 2.5rem" }}>
            {statusLoading ? t(lang, "Searching...", "खोज्दै...") : t(lang, "Check Status", "जाँच गर्नुहोस्")}
          </button>
        </form>

        {statusResults && (
          <div className="status-results" style={{ marginTop: "3rem", borderTop: "1px solid rgba(195,139,72,0.1)", paddingTop: "2rem" }}>
            {!statusResults.found ? (
              <div className="status-empty">
                <p style={{ color: "var(--gold-dark)", fontWeight: "600" }}>❌ {t(lang, "No bookings found for this contact.", "यो सम्पर्कको लागि कुनै बुकिङ भेटिएन।")}</p>
              </div>
            ) : (
              <div className="status-list">
                <h4 style={{ marginBottom: "1.5rem", color: "var(--text-dark)" }}>{t(lang, "Your Recent Bookings:", "तपाईंका हालैका बुकिङहरू:")}</h4>
                {statusResults.bookings.map(b => (
                  <div key={b.id} className="status-item premium-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", marginBottom: "1rem", background: "#fff", borderRadius: "12px", border: "1px solid rgba(195,139,72,0.15)" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "1.1rem" }}>{b.service}</strong>
                      <span style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>📅 {b.date}</span>
                    </div>
                    <span className={`status-badge-pill ${b.status.toLowerCase()}`} style={{ padding: "0.5rem 1.2rem", borderRadius: "50px", fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase" }}>{b.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="track-help-info reveal-up" style={{ textAlign: "center", marginTop: "5rem" }}>
         <div className="help-icon" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📞</div>
         <h4 className="playfair">{t(lang, "Need Help with your Booking?", "बुकिङमा सहयोग चाहिन्छ?")}</h4>
         <p style={{ opacity: 0.7, maxWidth: "500px", margin: "0.5rem auto 1.5rem" }}>{t(lang, "If you're unable to find your booking or have any questions, feel free to contact our support team.", "यदि तपाईंले आफ्नो बुकिङ फेला पार्न सक्नुभएन वा कुनै प्रश्नहरू छन् भने, हाम्रो सहयोग टोलीलाई सम्पर्क गर्नुहोस्।")}</p>
         <button className="btn-secondary" onClick={() => window.location.href='mailto:support@purohitsewa.com'}>support@purohitsewa.com</button>
      </div>
    </div>
  </div>
);

const SamagriView = ({ t, lang, activePuja, setActivePuja, activeSamagriDict, pujaTabs, setShowBookingModal }) => (
  <div className="samagri-page">
    <div className="container" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
      <SectionTitle title={t(lang, "Ritual Samagri Explorer", "अनुष्ठान सामग्री अन्वेषक")} />
      <p style={{ textAlign: "center", color: "var(--text-body)", marginBottom: "4rem", maxWidth: "700px", margin: "0 auto 4rem", fontSize: "1.1rem" }}>
        {t(lang, "Comprehensive item lists curated for every Vedic ceremony. Select a ritual from the side to begin preparation.", "हरेक वैदिक समारोहका लागि तयार गरिएको व्यापक सामग्री सूची। तयारी सुरु गर्न साइडबाट एउटा अनुष्ठान चयन गर्नुहोस्।")}
      </p>

      <div className="samagri-main-layout">
        {/* Sidebar Tabs for many events */}
        <aside className="samagri-sidebar reveal-left">
          <div className="sidebar-group-label">{t(lang, "Select Ceremony", "समारोह चयन गर्नुहोस्")}</div>
          <div className="samagri-vertical-tabs">
            {pujaTabs.map((tab) => (
              <button
                key={tab.key}
                className={`v-tab-btn ${activePuja === tab.key ? "active" : ""}`}
                onClick={() => setActivePuja(tab.key)}
              >
                <span className="v-tab-icon">🕉️</span>
                <span className="v-tab-text">{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="samagri-content-area reveal-right">
          {activePuja && activeSamagriDict[activePuja] ? (
            <div className="samagri-premium-card">
              <div className="samagri-card-banner">
                <div className="banner-overlay">
                  <h3 className="playfair">{activePuja} {t(lang, "Samagri", "सामग्री")}</h3>
                  <p>{t(lang, "Essential items for a complete ritual", "पूर्ण अनुष्ठानका लागि आवश्यक सामग्रीहरू")}</p>
                </div>
              </div>
              
              <div className="samagri-list-container">
                <ul className="samagri-refined-list">
                  {activeSamagriDict[activePuja].map((item, idx) => (
                    <li key={idx} className="samagri-row">
                      <div className="item-main">
                        <span className="item-bullet">✦</span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <div className="item-leader"></div>
                      <div className="item-quantity">{item.qty}</div>
                    </li>
                  ))}
                </ul>

                <div className="samagri-actions">
                  <button className="btn-primary-outline">
                    📥 {t(lang, "Download List", "सूची डाउनलोड गर्नुहोस्")}
                  </button>
                  <button className="btn-primary" onClick={() => setShowBookingModal(true)}>
                    🕉️ {t(lang, "Book this Service", "यो सेवा बुक गर्नुहोस्")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="samagri-selection-prompt">
              <div className="prompt-inner">
                <span>🕉️</span>
                <p>{t(lang, "Please select a ceremony from the sidebar to view its required samagri.", "सामग्री हेर्नको लागि साइडबारबाट एउटा समारोह चयन गर्नुहोस्।")}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const navigate = useNavigate();
  const [activePuja, setActivePuja] = useState("Bratabandha");
  const [lang, setLang] = useState("np"); 
  const [servicesData, setServicesData] = useState([]);
  const [tithiInfo, setTithiInfo] = useState(null);
  const [dbSubhaSait, setDbSubhaSait] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([
    {
      id: "mock1",
      rating: 5,
      content: "The pandit was extremely knowledgeable. All the rituals for our Griha Pravesh were performed exactly according to the Vedic scriptures. Highly recommended!",
      user_name: "Aarav Karki",
      location: "Kathmandu"
    },
    {
      id: "mock2",
      rating: 5,
      content: "Booking was so simple and they provided all the necessary samagri list ahead of time. The Bratabandha ceremony was beautiful and spiritual.",
      user_name: "Sneha Thapa",
      location: "Lalitpur"
    },
    {
      id: "mock3",
      rating: 5,
      content: "Excellent service! We had a Satyanarayan Puja at home and Pandit Ji explained the meaning of each mantra which made it truly special.",
      user_name: "Rahul Sharma",
      location: "Bhaktapur"
    }
  ]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    full_name: "", phone: "", email: "", date: "", time: "10:00", address: "", details: "", service: ""
  });
  const [activeCalTab, setActiveCalTab] = useState("Marriage");
  const [selectedCeremony, setSelectedCeremony] = useState("All");
  const [saitMonth, setSaitMonth] = useState("");
  const [saitYear, setSaitYear] = useState("");
  const carouselRef = useRef(null);

  const [statusLookup, setStatusLookup] = useState("");
  const [statusResults, setStatusResults] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const handleLangToggle = () => {
    setLang(prevLang => prevLang === "en" ? "np" : "en");
  };

  // Dynamic Samagri generation from backend servicesData
  const pujaTabs = servicesData.map(s => ({ 
    key: s.title, 
    label: s.title 
  }));

  const activeSamagriDict = {};
  servicesData.forEach(s => {
    const list = s.samagri_list ? s.samagri_list.split(',').map(item => {
      const trimmed = item.trim();
      return {
        name: trimmed,
        qty: t(lang, "As required", "आवश्यकता अनुसार")
      };
    }) : [];
    activeSamagriDict[s.title] = list;
  });

  useEffect(() => {
    // Fetch one-time data on mount
    fetch(`${API_BASE}/tithi/`)
      .then(res => res.json())
      .then(data => {
        setTithiInfo(data);
        setSaitYear(data.bs_year);
        setSaitMonth(data.bs_month);
      }).catch(console.error);

    fetch(`${API_BASE}/services/`)
      .then(res => res.json())
      .then(data => {
        setServicesData(data);
        if (data.length > 0) {
          // Default to first service if not set or if current active is not in new data
          setActivePuja(data[0].title);
        }
      }).catch(console.error);

    fetch(`${API_BASE}/testimonials/`)
      .then(res => res.json())
      .then(setTestimonialsData).catch(console.error);
  }, []);

  useEffect(() => {
    if (saitYear && saitMonth) {
      const saitUrl = new URL(`${API_BASE}/subhasait/`);
      saitUrl.searchParams.append("bs_year", saitYear);
      saitUrl.searchParams.append("bs_month", saitMonth);
      fetch(saitUrl)
        .then(res => res.json())
        .then(setDbSubhaSait)
        .catch(console.error);
    }
  }, [saitMonth, saitYear]);

  // Re-fetch services when modal opens if not loaded
  useEffect(() => {
    if (showBookingModal && servicesData.length === 0) {
      fetch(`${API_BASE}/services/`)
        .then(r => r.json())
        .then(d => setServicesData(d))
        .catch(() => {});
    }
  }, [showBookingModal]);

  const location = useLocation();

  // Global Scroll Reveal Animation Hook
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const checkAndObserve = () => {
      const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
      // Force immediate check for newly added elements
      elements.forEach(el => {
        observer.unobserve(el);
        observer.observe(el);
      });
    };
    
    // Initial check
    checkAndObserve();

    // Re-run safely whenever content loads or location changes
    const timeoutId = setTimeout(checkAndObserve, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [servicesData, dbSubhaSait, testimonialsData, location.pathname, lang]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.service) {
      alert("Please select a puja service.");
      return;
    }
    try {
      const resp = await fetch(`${API_BASE}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm)
      });
      if (resp.ok) {
        alert("Booking submitted successfully! Our team will contact you soon.");
        setShowBookingModal(false);
        setBookingForm({ full_name: "", phone: "", email: "", date: "", time: "10:00", address: "", details: "", service: "" });
      } else {
        const err = await resp.json();
        alert("Error: " + JSON.stringify(err));
      }
    } catch (err) {
      alert("Error submitting booking. Please try again.");
    }
  };

  const handleAdminAdd = (day, monthIdx) => {
    const year = saitYear; // Use current saitYear from state
    const month = monthIdx + 1;
    const adminUrl = `http://127.0.0.1:8000/admin/api/subhasait/add/?bs_year=${year}&bs_month=${month}&bs_day=${day}&nepali_date=${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    window.open(adminUrl, '_blank');
  };


  const bsMonths = [
    { en: "Baishakh", np: "बैशाख" },
    { en: "Jestha", np: "जेठ" },
    { en: "Ashar", np: "असार" },
    { en: "Shrawan", np: "साउन" },
    { en: "Bhadra", np: "भदौ" },
    { en: "Ashwin", np: "असोज" },
    { en: "Kartik", np: "कात्तिक" },
    { en: "Mangsir", np: "मंसिर" },
    { en: "Poush", np: "पुष" },
    { en: "Magh", np: "माघ" },
    { en: "Falgun", np: "फागुन" },
    { en: "Chaitra", np: "चैत" }
  ];

  const ceremonyColors = {
    'Marriage': '#e74c8b',
    'Pasni': '#10b981',
    'Bratabandha': '#6366f1',
    'Griha Pravesh': '#f59e0b',
    'Puja': '#ef4444',
    'Other': '#888'
  };

  const playBellSound = (e) => {
    const audioUrl = "https://cdn.pixabay.com/audio/2025/09/25/audio_5dd1b620f1.mp3";
    let ringCount = 0;
    const ringInterval = setInterval(() => {
      const audio = new Audio(audioUrl);
      audio.volume = 0.8;
      audio.playbackRate = 1.3;
      audio.play();
      ringCount++;
      if(ringCount >= 12) clearInterval(ringInterval);
    }, 120);

    const bellTarget = e.currentTarget;
    bellTarget.classList.add("swing");
    setTimeout(() => {
      bellTarget.classList.remove("swing");
    }, 1500);
  };



  const handleStatusLookup = async (e) => {
    e.preventDefault();
    if (!statusLookup.trim()) return;
    setStatusLoading(true);
    setStatusResults(null);
    try {
      const isEmail = statusLookup.includes("@");
      const param = isEmail ? `email=${encodeURIComponent(statusLookup)}` : `phone=${encodeURIComponent(statusLookup)}`;
      const resp = await fetch(`${API_BASE}/booking-status/?${param}`);
      const data = await resp.json();
      setStatusResults(data);
    } catch (err) {
      setStatusResults({ found: false, message: "Could not connect to the server." });
    }
    setStatusLoading(false);
  };

  return (
    <>
      <div className={`purohit-sewa ${lang === 'np' ? 'lang-np' : ''}`}>
        <ScrollToTop />
        <Header lang={lang} handleLangToggle={handleLangToggle} servicesData={servicesData} setBookingForm={setBookingForm} setShowBookingModal={setShowBookingModal} />

        <Routes>
          <Route path="/" element={
            <HomeView
              t={t} lang={lang} servicesData={servicesData} dbSubhaSait={dbSubhaSait} tithiInfo={tithiInfo}
              testimonialsData={testimonialsData} activePuja={activePuja} setActivePuja={setActivePuja}
              activeSamagriDict={activeSamagriDict} pujaTabs={pujaTabs} statusLookup={statusLookup}
              setStatusLookup={setStatusLookup} statusResults={statusResults}
              handleStatusLookup={handleStatusLookup} statusLoading={statusLoading}
              playBellSound={playBellSound} carouselRef={carouselRef}
              setBookingForm={setBookingForm} setShowBookingModal={setShowBookingModal} navigate={navigate}
              bsMonths={bsMonths} saitYear={saitYear} saitMonth={saitMonth} setSaitYear={setSaitYear} setSaitMonth={setSaitMonth}
              selectedCeremony={selectedCeremony} setSelectedCeremony={setSelectedCeremony} ceremonyColors={ceremonyColors}
            />
          } />
          <Route path="/services" element={
            <AllServicesView t={t} lang={lang} servicesData={servicesData} setBookingForm={setBookingForm} setShowBookingModal={setShowBookingModal} />
          } />
          <Route path="/samagri" element={
            <SamagriView t={t} lang={lang} activePuja={activePuja} setActivePuja={setActivePuja} activeSamagriDict={activeSamagriDict} pujaTabs={pujaTabs} tithiInfo={tithiInfo} setShowBookingModal={setShowBookingModal} />
          } />
          <Route path="/rashifal" element={
            <RashifalView t={t} lang={lang} setBookingForm={setBookingForm} setShowBookingModal={setShowBookingModal} />
          } />
          <Route path="/subha-sait" element={
            <SubhaSaitView t={t} lang={lang} saitMonth={saitMonth} setSaitMonth={setSaitMonth} bsMonths={bsMonths} saitYear={saitYear} setSaitYear={setSaitYear} selectedCeremony={selectedCeremony} setSelectedCeremony={setSelectedCeremony} dbSubhaSait={dbSubhaSait} ceremonyColors={ceremonyColors} />
          } />
          <Route path="/track-booking" element={
            <TrackBookingView t={t} lang={lang} statusLookup={statusLookup} setStatusLookup={setStatusLookup} handleStatusLookup={handleStatusLookup} statusLoading={statusLoading} statusResults={statusResults} />
          } />
        </Routes>

        <section className="pandit-details-section">
          <div className="container">
            <div className="pandit-details-card reveal-up stagger-1">
              <div className="pandit-image-wrapper">
                <img src="/images/hero.png" alt="Pandit Ram Prasad Sharma" className="pandit-profile-img" />
                <div className="pandit-badge">{t(lang, "Head Pandit", "प्रमुख पण्डित")}</div>
              </div>
              <div className="pandit-info">
                <h2 className="playfair">{t(lang, "Pandit Ram Prasad Sharma", "पण्डित राम प्रसाद शर्मा")}</h2>
                <div className="pandit-credentials">
                  <span>🎓 {t(lang, "Acharya in Vedic Karmakanda", "वैदिक कर्मकाण्डमा आचार्य")}</span>
                  <span>⭐ {t(lang, "15+ Years Experience", "१५+ वर्षको अनुभव")}</span>
                </div>
                <p className="pandit-bio">
                  {t(lang, "With profound knowledge passed down through generations, Pandit Ram Prasad ensures every ceremony is performed with exact Vedic precision. Authenticity, devotion, and a deep understanding of scriptures stand at the core of every puja he conducts.", "पुस्तौं पुस्तादेखि हस्तान्तरण हुँदै आएको गहिरो ज्ञानका साथ, पण्डित राम प्रसादले हरेक समारोह ठ्याक्कै वैदिक शुद्धताका साथ सम्पन्न भएको सुनिश्चित गर्नुहुन्छ। उहाँले सञ्चालन गर्ने हरेक पूजाको केन्द्रमा प्रामाणिकता, भक्ति र धर्मशास्त्रको गहिरो बुझाइ हुन्छ।")}
                </p>
                <div className="pandit-contact">
                  <button className="btn-primary" onClick={() => { setBookingForm(f => ({...f, service: servicesData[0]?.id || ""})); setShowBookingModal(true); }}>
                    {t(lang, "Book the Pandit", "पण्डित बुक गर्नुहोस्")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer lang={lang} navigate={navigate} />
      </div>

      {showBookingModal && (
        <div className="modal-backdrop" onClick={() => setShowBookingModal(false)}>
          <div className="modal booking-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowBookingModal(false)}>✕</button>
            <div className="booking-modal-header">
              <h2 className="playfair">{t(lang, "Book Your Puja", "तपाईको पूजा बुक गर्नुहोस्")}</h2>
              <p className="booking-modal-sub">{t(lang, "Fill in the details below. Our Pandit will confirm via email.", "कृपया विवरणहरू भर्नुहोस्। हाम्रो पण्डितले तपाईंलाई सम्पर्क गर्नुहुनेछ।")}</p>
            </div>
            <form onSubmit={handleBookingSubmit} className="booking-form">

              <div className="form-group">
                <label>{t(lang, "Select Puja / Service *", "पूजा / सेवा चयन गर्नुहोस् *")}</label>
                <select
                  value={bookingForm.service}
                  onChange={e => setBookingForm({...bookingForm, service: e.target.value})}
                  required
                  style={{ fontFamily: "inherit", fontSize: "1rem", cursor: "pointer" }}
                >
                  <option value="">{t(lang, "-- Choose a service --", "-- सेवा चयन गर्नुहोस् --")}</option>
                  {servicesData.length > 0 ? servicesData.map(s => (
                    <option key={s.id} value={s.id}>{s.title} — {s.price}</option>
                  )) : (
                    <option value="" disabled>{t(lang, "Loading services...", "सेवाहरू लोड हुँदैछ...")}</option>
                  )}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t(lang, "Full Name *", "पूरा नाम *")}</label>
                  <input type="text" placeholder={t(lang, "e.g. Ram Prasad Sharma", "उदाहरण: राम प्रसाद शर्मा")} value={bookingForm.full_name} onChange={e => setBookingForm({...bookingForm, full_name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>{t(lang, "Phone Number *", "फोन नम्बर *")}</label>
                  <input type="tel" placeholder="98XXXXXXXX" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>{t(lang, "Email Address", "इमेल ठेगाना")} <span className="label-note">({t(lang, "for confirmation", "पुष्टिको लागि")})</span></label>
                <input type="email" placeholder="your@email.com" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t(lang, "Date of Ceremony *", "समारोहको मिति *")}</label>
                  <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>{t(lang, "Preferred Time *", "उपयुक्त समय *")}</label>
                  <input type="time" value={bookingForm.time} onChange={e => setBookingForm({...bookingForm, time: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>{t(lang, "Ceremony Address *", "समारोह हुने ठेगाना *")}</label>
                <textarea placeholder={t(lang, "Enter full address", "पूरा ठेगाना लेख्नुहोस्")} value={bookingForm.address} onChange={e => setBookingForm({...bookingForm, address: e.target.value})} required rows="2"></textarea>
              </div>
              <div className="form-group">
                <label>{t(lang, "Additional Details", "थप विवरणहरू")} <span className="label-note">({t(lang, "optional", "ऐच्छिक")})</span></label>
                <textarea placeholder={t(lang, "Any special requests...", "कुनै विशेष अनुरोध...")} value={bookingForm.details} onChange={e => setBookingForm({...bookingForm, details: e.target.value})} rows="3"></textarea>
              </div>
              <div className="booking-info-note">
                ℹ️ {t(lang, "Your booking is pending until accepted by our Pandit.", "तपाईको बुकिङ पण्डितले स्वीकार नगरेसम्म विचाराधीन रहनेछ।")}
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
                🕉️ {t(lang, "Submit Booking Request", "बुकिङ अनुरोध पठाउनुहोस्")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
