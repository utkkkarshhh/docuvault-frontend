"use client"

import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routeConfig"
import { PRICING_TIERS } from "@/utils/mockData"
import { CheckCircle, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-primary">DocuVault</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.PRICING)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm text-primary font-medium">Now Available: Professional Plans</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Secure Document Management for Modern Teams
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Store, organize, and share your documents with enterprise-grade security. Trusted by thousands of professionals worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => navigate(ROUTES.REGISTER)}
                className="btn btn-primary px-8 py-3 text-lg font-semibold flex items-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate(ROUTES.PRICING)}
                className="btn btn-secondary px-8 py-3 text-lg font-semibold"
              >
                View Pricing
              </button>
            </div>

            <div className="pt-8 text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      </section>

      {/* Features Section */}
      <section className="section bg-secondary/30 border-y border-border">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need for secure document management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "End-to-end encryption and compliance with industry standards including ISO 27001 and GDPR."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Search through thousands of documents in milliseconds with our advanced indexing system."
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Detailed insights into your document usage, access patterns, and team activity."
              },
            ].map((feature, idx) => (
              <div key={idx} className="card space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`card relative flex flex-col ${
                  tier.highlighted
                    ? "ring-2 ring-primary scale-105 md:scale-100"
                    : ""
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge badge-primary">{tier.badge}</span>
                  </div>
                )}

                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                  </div>

                  <div className="space-y-2">
                    {tier.customPrice ? (
                      <div className="text-3xl font-bold text-foreground">Custom</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                        <span className="text-muted-foreground">{tier.billingPeriod}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className={`w-full mt-8 py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlighted
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary/5 border-t border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join thousands of teams managing their documents securely with DocuVault.</p>
          </div>
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="btn btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
          >
            Start Your Free Trial <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-primary mb-4">DocuVault</div>
              <p className="text-sm text-muted-foreground">Secure document management for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigate(ROUTES.PRICING)} className="hover:text-primary">Pricing</button></li>
                <li><a href="#features" className="hover:text-primary">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="#terms" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#help" className="hover:text-primary">Help Center</a></li>
                <li><a href="#contact" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DocuVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
