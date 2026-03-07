"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronDown, ArrowRight, Sun, Moon, FileText, Shield, Zap, Users, Sparkles } from "lucide-react"
import { ROUTES } from "@/constants/routeConfig"
import { PRICING_TIERS } from "@/utils/mockData"

export default function LandingPage() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false)

  useEffect(() => {
    setIsAuthenticatedUser(!!localStorage.getItem("authToken"))
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DocuVault
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Docs
            </a>
          </div>

          {/* CTA + Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {!isAuthenticatedUser ? (
              <>
                <Link to={ROUTES.LOGIN} className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium hidden sm:block">
                  Sign In
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium text-sm">
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <Link to={ROUTES.DASHBOARD}>
                <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium text-sm">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Grid */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-accent/10" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-slide 30s linear infinite",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />

        {/* Content */}
        <div className="relative z-10 container text-center space-y-8 px-4">
          {/* Badge */}
          <div className="inline-block fade-in" style={{ animationDelay: '0ms' }}>
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <Sparkles size={16} />
                Welcome to the future of document management
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 fade-in" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Secure. <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">Smart.</span> Simple.
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of document management. Upload, share, and collaborate with unmatched security.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 fade-in" style={{ animationDelay: '200ms' }}>
            <Link to={isAuthenticatedUser ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
              <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold flex items-center gap-2 group hover:shadow-lg hover:shadow-primary/30">
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to={ROUTES.PRICING}>
              <button className="px-8 py-4 rounded-lg border border-primary/50 bg-transparent hover:bg-primary/10 transition-all font-semibold text-primary">
                View Pricing
              </button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 fade-in" style={{ animationDelay: '300ms' }}>
            <a href="#features" className="inline-block">
              <ChevronDown size={28} className="mx-auto text-primary/50 hover:text-primary transition-colors animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent border-y border-border/30">
        <div className="container space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold">Why choose DocuVault?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Everything you need to manage documents securely and efficiently
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Smart Upload", desc: "Instantly upload and organize documents with AI-powered tagging" },
              { icon: Shield, title: "Enterprise Security", desc: "End-to-end encryption for all your files and data" },
              { icon: Zap, title: "Lightning Fast", desc: "Access your documents in milliseconds with advanced search" },
              { icon: Users, title: "Easy Sharing", desc: "Collaborate seamlessly with granular permission controls" },
            ].map((feature, i) => (
              <div
                key={i}
                className="scroll-reveal p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:bg-card/50"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <feature.icon size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24">
        <div className="container space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier, i) => (
              <div
                key={i}
                className={`scroll-reveal rounded-xl border transition-all duration-300 p-8 ${
                  i === 1
                    ? "border-primary/50 bg-gradient-to-br from-primary/10 to-accent/5 shadow-lg shadow-primary/20 md:scale-105"
                    : "border-border/50 bg-card/30 backdrop-blur hover:border-primary/30 hover:bg-card/50"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-foreground/70 mb-6">{tier.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold">${tier.price}</span>
                  <span className="text-foreground/70">/month</span>
                </div>
                <button
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    i === 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                      : "border border-primary/30 text-primary hover:bg-primary/10"
                  }`}
                >
                  Get Started
                </button>
                <div className="mt-8 space-y-4">
                  {tier.features.slice(0, 3).map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-t border-b border-border/30">
        <div className="container text-center space-y-8 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to secure your documents?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join thousands of users trusting DocuVault with their most important files
          </p>
          <Link to={isAuthenticatedUser ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
            <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold text-lg inline-flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30">
              Start Free Today
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 bg-background/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DocuVault</h3>
              <p className="text-foreground/70 text-sm">Secure document management for modern teams</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href={ROUTES.PRICING} className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center text-foreground/70 text-sm">
            <p>&copy; 2024 DocuVault. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll Reveal Intersection Observer */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                  }
                });
              }, observerOptions);
              document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
            }
          `,
        }}
      />
    </div>
  )
}

