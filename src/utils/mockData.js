/**
 * Mock data for feed, pricing, and download history
 * Replace with actual API calls when available
 */

// Pricing Tiers Mock Data
export const PRICING_TIERS = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for individuals and small teams",
    price: 29,
    period: "month",
    billingPeriod: "/month",
    features: [
      "Up to 10 documents",
      "5GB storage",
      "Basic search",
      "Email support",
      "30-day retention",
    ],
    buttonText: "Get Started",
    highlighted: false,
  },
  {
    id: 2,
    name: "Professional",
    description: "For growing teams and businesses",
    price: 79,
    period: "month",
    billingPeriod: "/month",
    features: [
      "Unlimited documents",
      "100GB storage",
      "Advanced search & filters",
      "Priority email support",
      "1-year retention",
      "Team collaboration",
      "Custom categories",
      "Export documents",
    ],
    buttonText: "Get Started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Enterprise",
    description: "For large organizations",
    price: null,
    customPrice: true,
    billingPeriod: "Custom",
    features: [
      "Unlimited everything",
      "Unlimited storage",
      "Advanced security",
      "24/7 phone support",
      "Lifetime retention",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics",
    ],
    buttonText: "Contact Sales",
    highlighted: false,
  },
]

// Community Feed Mock Data
export const MOCK_FEED_POSTS = [
  {
    id: 1,
    author: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "Document Manager",
    },
    title: "Best practices for document organization",
    content:
      "I've been using DocuVault for 6 months and found that organizing documents by project and date has improved our workflow efficiency by 40%. Here are my top tips...",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    category: "Tips & Tricks",
    likes: 24,
    comments: 8,
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300",
  },
  {
    id: 2,
    author: {
      id: "user2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      role: "Legal Team Lead",
    },
    title: "DocuVault transforms our legal document management",
    content:
      "Since implementing DocuVault across our legal department, we've reduced document retrieval time from 20 minutes to under 1 minute. The search functionality is incredible.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    category: "Case Study",
    likes: 45,
    comments: 12,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300",
  },
  {
    id: 3,
    author: {
      id: "user3",
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      role: "HR Manager",
    },
    title: "Secure document sharing with team members",
    content:
      "DocuVault's permission system makes it so easy to share documents securely with specific team members. No more accidental exposure of sensitive information!",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    category: "Security",
    likes: 32,
    comments: 6,
  },
  {
    id: 4,
    author: {
      id: "user4",
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      role: "Finance Director",
    },
    title: "ROI calculation for document management solutions",
    content:
      "I calculated the ROI for implementing DocuVault in our finance department. With reduced manual filing time and improved audit trails, we're saving approximately...",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: "Business",
    likes: 18,
    comments: 4,
  },
]

// Download History Mock Data
export const MOCK_DOWNLOAD_HISTORY = [
  {
    id: 1,
    fileName: "Q4_Financial_Report_2024.pdf",
    fileSize: "2.4 MB",
    downloadedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    category: "Financial",
    format: "pdf",
    status: "completed",
  },
  {
    id: 2,
    fileName: "Employee_Handbook_2024.docx",
    fileSize: "1.8 MB",
    downloadedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    category: "HR",
    format: "docx",
    status: "completed",
  },
  {
    id: 3,
    fileName: "Marketing_Strategy_Analysis.xlsx",
    fileSize: "856 KB",
    downloadedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    category: "Marketing",
    format: "xlsx",
    status: "completed",
  },
  {
    id: 4,
    fileName: "Project_Budget_Forecast.csv",
    fileSize: "234 KB",
    downloadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    category: "Projects",
    format: "csv",
    status: "completed",
  },
  {
    id: 5,
    fileName: "Client_Presentation_Q1.pdf",
    fileSize: "5.2 MB",
    downloadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: "Sales",
    format: "pdf",
    status: "completed",
  },
  {
    id: 6,
    fileName: "Compliance_Documentation.docx",
    fileSize: "1.2 MB",
    downloadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    category: "Legal",
    format: "docx",
    status: "completed",
  },
]

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDownloadDate = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}
