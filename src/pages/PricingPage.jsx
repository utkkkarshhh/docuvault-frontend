"use client"

import { useNavigate, Link } from "react-router-dom"
import { PRICING_TIERS } from "@/utils/mockData"
import { ROUTES } from "@/constants/routeConfig"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function PricingPage() {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("authToken")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link
            to={ROUTES.HOME}
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            DocuVault
          </Link>
          <Link
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
            className="text-foreground hover:text-primary transition-colors"
          >
            {isAuthenticated ? "Dashboard" : "Sign In"}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your document management needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`card relative flex flex-col ${
                  tier.highlighted
                    ? "ring-2 ring-primary scale-105 md:scale-100 shadow-lg"
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

      {/* FAQ Section */}
      <section className="section bg-secondary/30 border-y border-border">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express) and digital payment methods."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all plans include a 14-day free trial. No credit card required to get started."
              },
              {
                question: "What happens if I exceed my storage limit?",
                answer: "You can either upgrade to a higher plan or purchase additional storage as needed. We'll notify you before you hit the limit."
              },
            ].map((faq, idx) => (
              <div key={idx} className="card">
                <h3 className="font-semibold text-lg text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground">Choose your plan and start your 14-day free trial today.</p>
          </div>
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="btn btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2024 DocuVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
