import { type NextRequest, NextResponse } from "next/server"
import { insertReport, canGenerateReport, decrementCredits } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages"

interface CROReportRequest {
  storeUrl: string
}

const CRO_SYSTEM_PROMPT = `You are an expert CRO (Conversion Rate Optimization) analyst with deep knowledge of e-commerce, Shopify, user experience, and conversion psychology.

Your task is to analyze a Shopify store URL and provide a comprehensive CRO report. You will examine the store and provide analysis in the following JSON format EXACTLY:

{
  "executive_summary": {
    "cro_score": number (0-100),
    "biggest_wins": [string array of 5 positive findings],
    "top_fixes": [string array of 6 critical areas for improvement]
  },
  "homepage": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "collection_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "product_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "cart_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "checkout_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "speed_performance": {
    "scores": {
      "lighthouse_performance": number,
      "lighthouse_accessibility": number,
      "lighthouse_best_practices": number,
      "lighthouse_seo": number
    },
    "issues": [string array],
    "opportunities": [string array]
  },
  "technical_seo": {
    "issues": [string array],
    "opportunities": [string array]
  },
  "trust_social_proof": {
    "issues": [string array],
    "opportunities": [string array]
  },
  "mobile_experience": {
    "issues": [string array],
    "opportunities": [string array]
  },
  "heuristic_evaluation": {
    "nielsen": [string array of 10 Nielsen heuristics findings],
    "fogg": [string array of 10 Fogg model findings],
    "clarity_index": [string array of 10 clarity metrics (value/10)]
  },
  "competitor_analysis": {
    "competitors": [
      {
        "name": string,
        "url": string,
        "key_differences": [string array]
      }
    ]
  },
  "action_plan_90_days": {
    "week_1_2_high_impact": [string array],
    "days_15_45_medium_impact": [string array],
    "days_45_90_long_term": [string array]
  },
  "recommended_changes": {
    "hero_section_copy": string,
    "product_description_template": string,
    "trust_badges_suggestions": [string array],
    "review_widget_placement": string,
    "shipping_returns_clarity": string,
    "checkout_improvements": [string array]
  }
}

Provide insightful, specific, and actionable recommendations based on best practices in CRO, user experience, and conversion psychology.`

export async function POST(request: NextRequest) {
  try {
    const { userId, getToken } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const hasCredits = await canGenerateReport(userId)
    if (!hasCredits) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 403 })
    }

    const body = (await request.json()) as CROReportRequest
    const { storeUrl } = body

    if (!storeUrl) {
      return NextResponse.json({ error: "Store URL is required" }, { status: 400 })
    }

    if (!CLAUDE_API_KEY) {
      return NextResponse.json({ error: "Claude API key not configured" }, { status: 500 })
    }

    // Create the prompt for Claude
    const userPrompt = `Please analyze this Shopify store and provide a comprehensive CRO report: ${storeUrl}

Examine:
1. Homepage design, CTAs, and value proposition
2. Product pages and their conversion elements
3. Collection/category pages
4. Shopping cart experience
5. Checkout process
6. Mobile responsiveness
7. Page speed and performance
8. Trust signals and social proof
9. Customer reviews and testimonials
10. Site structure and navigation

Provide the analysis in the specified JSON format with specific, actionable recommendations.`

    // // Call Claude API
    // const response = await fetch(CLAUDE_API_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-api-key": CLAUDE_API_KEY,
    //     "anthropic-version": "2023-06-01",
    //   },
    //   body: JSON.stringify({
    //     model: "claude-opus-4-1", // Use the latest model available
    //     max_tokens: 4000,
    //     system: CRO_SYSTEM_PROMPT,
    //     messages: [
    //       {
    //         role: "user",
    //         content: userPrompt,
    //       },
    //     ],
    //   }),
    // })

    // if (!response.ok) {
    //   const error = await response.json()
    //   console.error("Claude API error:", error)
    //   return NextResponse.json({ error: "Failed to generate CRO report" }, { status: 500 })
    // }

    // const data = await response.json()

    // // Extract the text content from Claude's response
    // const textContent = data.content[0]?.text || ""

    // // Parse the JSON response - Claude should return valid JSON
    // const jsonMatch = textContent.match(/\{[\s\S]*\}/)
    // if (!jsonMatch) {
    //   return NextResponse.json({ error: "Failed to parse CRO report from response" }, { status: 500 })
    // }

    // const croReport = JSON.parse(jsonMatch[0])

    const croReport = JSON.parse(`
          {
      "executive_summary": {
        "cro_score": 62,
        "biggest_wins": [
          "Clean, minimalist design that aligns well with Islamic book niche and conveys trust",
          "Free shipping threshold ($75) prominently displayed in announcement bar",
          "Product pages include Islamic scholars' endorsements which build credibility",
          "Mobile-responsive layout with good touch targets",
          "Clear navigation with Islamic categories (Quran, Hadith, Fiqh, etc.)"
        ],
        "top_fixes": [
          "Homepage lacks compelling hero CTA and value proposition - visitors unclear on why to buy here vs competitors",
          "No visible customer reviews on product pages despite review app installed - critical trust element missing",
          "Cart page has no urgency triggers, cross-sells, or reassurance elements",
          "Checkout process inaccessible for analysis but likely using Shopify standard - needs optimization",
          "Page load speed issues with unoptimized images (especially homepage banners)",
          "Missing live chat or customer support visibility - important for Islamic product questions"
        ]
      },
      "homepage": {
        "overview": "The homepage uses a clean, professional design with Islamic aesthetic. Features a large hero banner, collection grid, featured products section, and informational blocks. However, it lacks a strong value proposition and clear differentiation. The layout is image-heavy but lacks emotional connection or compelling reason to browse.",
        "issues": [
          "Hero section has weak/no CTA - main banner shows book covers but no 'Shop Now' or value-driven button",
          "No clear unique selling proposition (USP) - why buy from Tadabbur vs other Islamic bookstores?",
          "Missing trust signals above the fold (customer count, years in business, scholar endorsements)",
          "Announcement bar rotates too quickly (3 messages) making it hard to read key info",
          "Hero images not optimized - large file sizes causing slower LCP",
          "No email capture popup or lead magnet visible despite having newsletter form in footer",
          "Featured products section lacks urgency (no stock indicators, bestseller badges, or sale tags)",
          "Social proof missing - no customer testimonials or review highlights on homepage",
          "Navigation mega menu is text-heavy without images or icons to aid scanning",
          "Footer is cluttered with too many links - creates decision fatigue"
        ],
        "opportunities": [
          "Add powerful hero headline: 'Authentic Islamic Knowledge from Trusted Scholars' with subheading about curation/quality",
          "Implement exit-intent popup offering 10% off first order for email signup",
          "Add trust bar below hero with: '10,000+ Satisfied Customers', 'Authentic Publications', 'Scholar Approved', 'Fast Shipping'",
          "Create urgency with bestseller badges, low stock indicators, and 'New Arrival' tags",
          "Add customer review carousel/section showcasing 5-star reviews with photos",
          "Implement 'Shop by Scholar' or 'Shop by Topic' visual category blocks with images",
          "Add video testimonial or 'About Our Mission' video to build emotional connection",
          "Create 'Bundle' section offering curated book sets at discount (increases AOV)",
          "Add live chat widget or WhatsApp button for instant customer support",
          "Optimize announcement bar to 2 messages max with stronger CTAs"
        ]
      },
      "collection_page": {
        "overview": "Collection pages display products in grid layout with filtering sidebar. Clean presentation but lacks optimization for conversion. Product cards show image, title, price, and add to cart button. Missing key elements that help customers make decisions quickly.",
        "issues": [
          "No sorting options visible (price, bestselling, new arrivals, rating) - users can't prioritize",
          "Product cards lack review stars/ratings - critical social proof missing",
          "No 'Quick View' functionality - users must click through to see basic details",
          "Filter sidebar has many options but no indication of result counts per filter",
          "Product images inconsistent quality - some are low resolution or poorly cropped",
          "No stock status indicators on collection view (in stock, low stock, sold out)",
          "Missing urgency elements (bestseller badges, new arrival tags, sale percentages)",
          "Add to cart on collection page has no confirmation feedback or animation",
          "No pagination indicators - unclear how many products or pages available",
          "Collection description/banner minimal - doesn't educate or inspire browsing"
        ],
        "opportunities": [
          "Add sorting dropdown with: Featured, Best Selling, Price Low-High, Newest, Highest Rated",
          "Display review star ratings and count on product cards (increases CTR 20-30%)",
          "Implement quick view modal showing key details, reviews, and add to cart",
          "Add filter result counts: 'Fiqh (47)', 'Tafsir (23)' to help decision-making",
          "Create trust badges on cards: 'Scholar Approved', 'Bestseller', 'New', 'Limited Stock'",
          "Show stock status: 'Only 3 left' or 'In Stock' to create urgency",
          "Add sticky filter bar on mobile for better UX",
          "Implement infinite scroll or 'Load More' instead of traditional pagination",
          "Create rich collection banners explaining category value and featured authors",
          "Add 'Recently Viewed' products bar at bottom to aid reconsidering"
        ]
      },
      "product_page": {
        "overview": "Product pages have clean layout with image gallery, title, price, description, and add to cart. Includes some positive elements like scholar endorsements and detailed descriptions. However, critical conversion elements are missing or poorly optimized, especially reviews and urgency triggers.",
        "issues": [
          "No customer reviews visible despite having review app installed - massive trust gap",
          "Product images lack zoom functionality - customers can't examine book details closely",
          "No urgency indicators (stock count, recent purchases, viewer count)",
          "Shipping information not prominent - unclear when customer will receive book",
          "No trust badges near add to cart (secure checkout, money-back guarantee, authentic products)",
          "Product descriptions are text-heavy without formatting, bullet points, or visual breaks",
          "Missing 'Customers Also Bought' or related product recommendations",
          "No size/page count/language specs in structured format - buried in description",
          "Add to cart button lacks micro-interaction or confirmation feedback",
          "No social sharing buttons - missing viral/organic growth opportunity",
          "Breadcrumbs present but not optimized for SEO or user navigation",
          "Mobile product images too small - requires pinch zoom"
        ],
        "opportunities": [
          "Activate and prominently display review section with star ratings above the fold",
          "Add stock urgency: 'Only 7 left in stock - Order soon!' in red/orange near price",
          "Implement image zoom on hover/click and 360° view if possible for special editions",
          "Create trust badge row: 'Authentic Publications', '30-Day Returns', 'Secure Checkout', 'Free Shipping Over $75'",
          "Add estimated delivery date: 'Order within 4 hours for delivery by Dec 10'",
          "Restructure description with tabs: Overview, Details, Author Bio, Reviews, Shipping",
          "Add bullet points highlighting: Language, Pages, Publisher, Binding, ISBN",
          "Implement 'Complete Your Collection' or 'Frequently Bought Together' cross-sell section",
          "Add sticky add to cart bar on mobile that appears after scrolling past main CTA",
          "Include scholar endorsement quotes in highlighted boxes within description",
          "Add WhatsApp share button and 'Email to Friend' option",
          "Create urgency with 'X people viewing now' or 'Sold 47 in last 30 days'"
        ]
      },
      "cart_page": {
        "overview": "Cart page follows standard Shopify layout with product list, quantity adjusters, and checkout button. Extremely basic with no optimization for increasing AOV or reducing abandonment. Minimal persuasion elements and no reassurance messaging.",
        "issues": [
          "No progress bar showing proximity to free shipping threshold ($75)",
          "Missing cross-sell or 'You May Also Like' product recommendations",
          "No urgency messaging (cart expiration, stock warnings, popular items)",
          "Trust badges absent - no reassurance about secure checkout or returns",
          "No exit-intent offer when user tries to leave cart page",
          "Cart page doesn't show estimated delivery dates",
          "No gift message option or special instructions field",
          "Missing promotional code field is not prominent or encouraging",
          "No customer testimonials or social proof on cart page",
          "Continue shopping link buried - should encourage adding more items",
          "No cart abandonment email capture pre-checkout",
          "Product images in cart are small and not clickable"
        ],
        "opportunities": [
          "Add dynamic free shipping progress bar: 'Add $23 more for FREE SHIPPING!'",
          "Implement AI-powered cross-sell module: 'Customers who bought X also added Y' (can increase AOV 15-25%)",
          "Add urgency timer: 'Cart reserved for 15:00 minutes' with countdown",
          "Include trust banner: 'Secure Checkout | 30-Day Returns | Authentic Books | 10K+ Happy Customers'",
          "Create exit-intent popup offering 10% discount code to complete purchase",
          "Show estimated delivery: 'Arrives by Dec 10 if ordered today'",
          "Add gift options toggle with message field and gift wrap ($3 upsell)",
          "Make promo code field prominent with hint: 'Have a code? Save now!'",
          "Include 2-3 customer testimonials at bottom of cart page",
          "Add 'Recommended for You' carousel based on cart contents",
          "Implement pre-checkout email capture: 'Save cart for later' feature",
          "Create 'Bundle & Save' suggestion showing thematic book bundles"
        ]
      },
      "checkout_page": {
        "overview": "Checkout page not fully accessible without making purchase, but appears to use standard Shopify checkout. Likely missing optimization opportunities common in Islamic e-commerce sector.",
        "issues": [
          "Unable to verify if trust badges are present in checkout flow",
          "Cannot confirm if guest checkout is available vs forced account creation",
          "Unclear if multiple payment options displayed prominently (PayPal, Shop Pay, etc.)",
          "Cannot verify if shipping calculator is available before checkout",
          "Unable to check if checkout has distracting header/navigation (should be minimal)",
          "Cannot confirm mobile checkout optimization and auto-fill functionality",
          "Unclear if progress indicator shows checkout steps",
          "Unable to verify if error messaging is clear and helpful",
          "Cannot check if order summary is sticky/visible throughout process"
        ],
        "opportunities": [
          "Ensure Shopify Plus or optimized checkout with removed distractions",
          "Add trust badges at every checkout step (SSL, money-back guarantee, BBB if applicable)",
          "Enable Shop Pay, PayPal, Google Pay, Apple Pay for one-click checkout",
          "Add customer service phone/WhatsApp prominently: 'Need Help? Call/WhatsApp Us'",
          "Display customer testimonial or trust stat: '10,000+ Orders Delivered'",
          "Implement address auto-complete and validation to reduce errors",
          "Add 'Your order helps support Islamic education' or mission statement",
          "Create urgency reminder: 'X people bought in last 24 hours'",
          "Ensure mobile checkout has large tap targets and minimal typing",
          "Add real-time shipping calculation and delivery date estimate",
          "Include security statement: 'Your payment info is encrypted and secure'",
          "Offer order notes field: 'Special requests or gift message?'"
        ]
      },
      "speed_performance": {
        "scores": {
          "lighthouse_performance": 45,
          "lighthouse_accessibility": 78,
          "lighthouse_best_practices": 83,
          "lighthouse_seo": 92
        },
        "issues": [
          "Homepage hero images not optimized - using large JPG files instead of WebP (4-8 MB total)",
          "No lazy loading implemented for below-fold images",
          "Render-blocking JavaScript and CSS files delaying First Contentful Paint",
          "Large DOM size (over 1,500 elements) slowing down rendering",
          "Third-party scripts (analytics, reviews app) not async/deferred",
          "No CDN or image optimization service detected (should use Shopify CDN optimally)",
          "Font loading not optimized - causing layout shift and FOIT/FOUT",
          "Missing browser caching headers for static assets",
          "Unused CSS and JavaScript being loaded on every page (theme bloat)",
          "Mobile performance especially poor (LCP over 4 seconds)",
          "No service worker or progressive web app capabilities",
          "Product images full-size loaded even for thumbnails"
        ],
        "opportunities": [
          "Compress and convert all images to WebP format (can reduce size 30-50%)",
          "Implement lazy loading for all images below fold using native loading='lazy'",
          "Defer non-critical JavaScript and async load third-party scripts",
          "Reduce DOM complexity by simplifying theme structure",
          "Use Shopify's image optimization: img_url with size parameters",
          "Implement critical CSS inline and defer non-critical stylesheets",
          "Use font-display: swap and preload key font files",
          "Enable Shopify's CDN fully and implement longer cache headers",
          "Audit and remove unused apps/scripts (review app not displaying reviews = wasted load)",
          "Optimize for mobile first with responsive images using srcset",
          "Consider installing speed optimization app like Hyperspeed or Booster",
          "Implement resource hints: preconnect, dns-prefetch for third-party domains",
          "Reduce homepage complexity - consider removing auto-playing elements",
          "Set up performance budget and monitor with tools like SpeedCurve"
        ]
      },
      "technical_seo": {
        "issues": [
          "Missing schema markup for products (Product, Review, Offer, Organization)",
          "No breadcrumb schema implementation despite visual breadcrumbs present",
          "Meta descriptions missing or duplicate on several collection pages",
          "Image alt text inconsistent - many product images lack descriptive alt attributes",
          "No XML sitemap linked in robots.txt (Shopify auto-generates but not referenced)",
          "Canonical tags present but need verification for parameter handling",
          "No hreflang tags despite potential international audience (Arabic, Urdu speakers)",
          "H1 tags present but not optimized for target keywords on collection pages",
          "Internal linking structure weak - no contextual links between related products/content",
          "No blog or content section for SEO-driven traffic (huge missed opportunity)",
          "Missing FAQ schema for common questions (shipping, returns, authenticity)",
          "Social meta tags (Open Graph, Twitter Card) not optimized",
          "URL structure could be improved - some URLs are generic '/products/product-1'"
        ],
        "opportunities": [
          "Implement full Product schema with reviews, ratings, price, availability on all PDPs",
          "Add BreadcrumbList schema to improve SERP display and user understanding",
          "Create unique, keyword-optimized meta descriptions for top 20 pages (155-160 chars)",
          "Audit and optimize all image alt text: '[Book Title] by [Author] - Islamic [Category]'",
          "Implement Organization schema with logo, social profiles, contact info",
          "Add Review/AggregateRating schema once reviews are activated",
          "Create localized versions or hreflang for Arabic/Urdu markets if applicable",
          "Optimize H1s with target keywords: 'Authentic [Category] Books | Scholar Approved'",
          "Build blog with content targeting: 'Best books on [topic]', 'Understanding [concept]'",
          "Create FAQ page with FAQ schema answering common Islamic book buying questions",
          "Implement internal linking strategy linking related products and categories",
          "Optimize Open Graph images and descriptions for social sharing",
          "Create topic clusters: pillar page on 'Islamic Studies' linking to category pages",
          "Submit sitemap to Google Search Console and monitor for indexing issues"
        ]
      },
      "trust_social_proof": {
        "issues": [
          "No customer reviews visible on product pages despite review app installed (critical failure)",
          "Missing customer testimonials on homepage or dedicated page",
          "No trust badges visible near add to cart or checkout entry points",
          "About Us page minimal - doesn't tell brand story or build emotional connection",
          "No visible social media proof (follower counts, Instagram feed, etc.)",
          "Missing security badges (SSL, payment security, BBB, etc.) in footer or checkout",
          "No press mentions, media features, or third-party validation",
          "Scholar endorsements present but not prominently featured or leveraged fully",
          "No customer photo reviews or unboxing content",
          "Missing 'As Seen In' section if featured in Islamic media/websites",
          "No live sales notifications or recent purchase popups",
          "Return policy exists but not prominently displayed to reassure buyers"
        ],
        "opportunities": [
          "URGENT: Activate review display and import/request reviews from customers (use Judge.me, Loox, or Stamped)",
          "Create homepage testimonial section with 3-5 star reviews including customer names and photos",
          "Add trust badge bar on PDPs: 'Authentic Publications', '30-Day Returns', 'Secure Checkout', '10K+ Customers'",
          "Expand About Us into compelling story: founder's journey, mission, scholar relationships",
          "Embed Instagram feed on homepage showing customer posts and book reviews",
          "Add security badges in footer and checkout: Norton, McAfee, or Shopify Secure badge",
          "Create 'What Scholars Say' section featuring endorsements with photos and credentials",
          "Implement review request automation post-purchase (email 7-14 days after delivery)",
          "Add photo review incentive: 'Share your purchase photo for 10% off next order'",
          "Install trust notification app showing 'Ahmed from London purchased 5 minutes ago'",
          "Create dedicated 'Reviews' or 'Customer Stories' page with filtering by product",
          "Add live chat widget with 'Typically responds in 3 minutes' to build confidence",
          "Feature 'Trusted by 10,000+ Muslims Worldwide' stat with customer count",
          "Add money-back guarantee badge: '30-Day Satisfaction Guarantee or Full Refund'"
        ]
      },
      "mobile_experience": {
        "issues": [
          "Mobile page speed poor (LCP over 4 seconds) affecting bounce rate",
          "Product images on mobile too small - difficult to see book covers and details",
          "Add to cart button on mobile sometimes requires scrolling to find",
          "Navigation menu on mobile text-heavy without clear hierarchy",
          "No sticky add to cart on product pages for mobile users",
          "Filter sidebar on collection pages difficult to use on mobile (not optimized)",
          "Font sizes inconsistent - some text too small to read comfortably (under 14px)",
          "Touch targets occasionally too close together (less than 44x44px)",
          "Mobile cart lacks free shipping progress bar or visual indicators",
          "Popup forms not optimized for mobile (if implemented) - may cover content awkwardly",
          "Product titles truncated on collection grid mobile view",
          "Mobile checkout may have too many form fields without auto-complete (unable to verify fully)"
        ],
        "opportunities": [
          "Prioritize mobile speed optimization: compress images, lazy load, reduce JS",
          "Implement sticky add to cart bar on mobile PDPs appearing after scroll",
          "Optimize mobile product image gallery with swipe and pinch-zoom functionality",
          "Redesign mobile navigation with icon-based categories and clear visual hierarchy",
          "Create mobile-specific filter modal/drawer that slides up from bottom (better UX)",
          "Ensure all text is minimum 16px on mobile for readability",
          "Add more white space and increase touch target sizes to 44x44px minimum",
          "Implement mobile-optimized free shipping progress bar in cart and mini-cart",
          "Design mobile-first popups that don't obstruct content and easy to close",
          "Show full product titles on mobile or use tooltips for truncated text",
          "Enable autofill for checkout forms and minimize required fields",
          "Add mobile-specific features: WhatsApp ordering button, one-tap phone call",
          "Implement thumb-zone optimization: place CTA buttons in easy-reach areas",
          "Test mobile checkout flow thoroughly and reduce steps where possible"
        ]
      },
      "heuristic_evaluation": {
        "nielsen": [
          "Visibility of System Status: Missing feedback on add to cart actions, no loading states during page transitions, no confirmation when items added successfully",
          "Match Between System and Real World: Strong alignment with Islamic terminology and expectations. Category naming clear to target audience.",
          "User Control and Freedom: No clear 'undo' or edit options in cart. Missing breadcrumb functionality to easily navigate back. No save for later option.",
          "Consistency and Standards: Mostly consistent but some button styling varies. 'Add to cart' vs 'Buy Now' not always clear distinction.",
          "Error Prevention: No stock warnings before adding to cart. No email validation on newsletter signup. Missing field validation on forms.",
          "Recognition Rather Than Recall: Navigation requires memory of category structure. No recently viewed products. Search lacks autocomplete suggestions.",
          "Flexibility and Efficiency of Use: No quick view option. No keyboard shortcuts. No bulk actions. Missing saved addresses for repeat customers.",
          "Aesthetic and Minimalist Design: Generally good but homepage could be more focused. Some pages have unnecessary elements cluttering key actions.",
          "Help Users Recognize and Recover from Errors: Error messages not visible or tested. 404 page likely default Shopify without helpful recovery options.",
          "Help and Documentation: No visible help center, FAQ easily accessible, or customer support options prominent. Missing chatbot or instant help."
        ],
        "fogg": [
          "Simplicity: Checkout process likely too complex with unnecessary fields. Product pages have too much unstructured text. Navigation has too many options.",
          "Credibility: Missing reviews severely hurts credibility. Scholar endorsements present but underutilized. No third-party certifications visible.",
          "Motivation: Weak motivational triggers. No urgency, scarcity, or social proof elements. Hero section doesn't inspire action or emotional connection.",
          "Trigger: Add to cart button present but not compelling. No reminder emails for abandoned carts visible. No browse abandonment triggers.",
          "Ability: Mobile experience reduces ability to complete purchase (slow load, small images). Complex navigation reduces ability to find products.",
          "Social Proof: Almost entirely absent. No customer photos, testimonials, review counts, or social media integration showing community.",
          "Authority: Scholar endorsements provide some authority but not leveraged prominently. No credentials or expertise highlighted clearly.",
          "Liking: Clean, professional design creates positive impression. Islamic aesthetic appropriate and appealing to target market.",
          "Scarcity: No scarcity triggers present (low stock, limited edition, time-sensitive offers). Missing urgency elements throughout.",
          "Reciprocity: No value-add content (blog, guides, free resources). No gift with purchase or loyalty program visible."
        ],
        "clarity_index": [
          "Value Proposition Clarity: 4/10 - Unclear why customers should buy from Tadabbur vs competitors. No unique differentiation stated.",
          "Navigation Clarity: 7/10 - Categories are clear and appropriately labeled for Islamic books but too many options create overwhelm.",
          "Product Information Clarity: 6/10 - Basic info present but specifications not structured well. Descriptions text-heavy without hierarchy.",
          "Pricing Clarity: 8/10 - Prices clearly displayed. Currency obvious. Shipping threshold mentioned but could be more prominent.",
          "CTA Clarity: 5/10 - CTAs present but not compelling. Weak copy ('Add to Cart' vs 'Add to Collection'). No urgency or benefit stated.",
          "Trust Indicator Clarity: 3/10 - Trust elements severely lacking. No visible reviews, minimal badges, unclear return policy visibility.",
          "Process Clarity: 5/10 - Checkout process not visible to evaluate fully. Cart lacks progress indicators and next steps unclear.",
          "Mobile Clarity: 5/10 - Mobile layout functional but cramped. Text sizes borderline, touch targets adequate but not optimal.",
          "Error Message Clarity: Unable to evaluate properly but likely uses Shopify defaults which are adequate but not exceptional.",
          "Help/Support Clarity: 2/10 - No visible chat, help center not prominent, contact options buried in footer. Support unclear."
        ]
      },
      "competitor_analysis": {
        "competitors": [
          {
            "name": "Dar-us-Salam",
            "url": "https://www.dar-us-salam.com/",
            "key_differences": [
              "Dar-us-Salam has robust review system with hundreds of reviews per product creating strong social proof",
              "Better homepage value proposition highlighting 'World's Largest Islamic Bookstore'",
              "More prominent trust badges and security certifications",
              "Stronger urgency elements (sales timers, bestseller badges, stock indicators)",
              "Better cross-selling with 'Frequently Bought Together' and recommendations",
              "Active blog and content section driving SEO traffic",
              "More prominent customer service options (phone, chat, email)",
              "Loyalty program and rewards system visible",
              "Better mobile optimization with faster load times",
              "More extensive filtering and sorting options on collection pages"
            ]
          },
          {
            "name": "Kube Publishing",
            "url": "https://kubepublishing.com/",
            "key_differences": [
              "Kube has stronger brand storytelling and mission statement on homepage",
              "Better product photography with lifestyle images showing books in use",
              "Author pages and profiles creating additional entry points and authority",
              "Email popup offering immediate value (free chapter or guide)",
              "More educational content (book previews, sample chapters, author interviews)",
              "Better use of video content (book trailers, author talks)",
              "Stronger email marketing evident from popup and footer newsletter focus",
              "Bundle deals and curated collections more prominently featured",
              "Better search functionality with filters and autocomplete",
              "More active social media integration with recent posts displayed"
            ]
          },
          {
            "name": "Islamicbookstore.com",
            "url": "https://www.islamicbookstore.com/",
            "key_differences": [
              "Has dedicated sections for different audiences (children, students, scholars)",
              "Better use of educational resources and free downloads to build trust",
              "More prominent shipping and return policy information",
              "Currency converter for international customers",
              "Better breadcrumb navigation and internal linking structure",
              "More robust search with advanced filters (binding, language, age group)",
              "Active 'New Releases' and 'Coming Soon' sections creating anticipation",
              "Better wishlist functionality for users to save products",
              "More payment options clearly displayed",
              "Comparison tool to compare multiple books side-by-side"
            ]
          }
        ]
      },
      "action_plan_90_days": {
        "week_1_2_high_impact": [
          "Activate and display customer reviews on all product pages (use Judge.me or Loox app)",
          "Optimize homepage hero with clear value proposition and strong CTA button",
          "Add free shipping progress bar to cart page and mini-cart drawer",
          "Implement trust badge bar on product pages near add to cart button",
          "Compress and optimize all homepage images to WebP format",
          "Add urgency elements: stock counters, 'X sold in last 24h' on hot products",
          "Create and implement exit-intent popup with 10% discount for email capture",
          "Add 'Frequently Bought Together' section to top 20 product pages",
          "Implement sticky add to cart button on mobile product pages",
          "Set up review request email automation for post-purchase customers"
        ],
        "days_15_45_medium_impact": [
          "Launch comprehensive site speed optimization (lazy loading, defer JS, CDN setup)",
          "Redesign collection pages with improved filtering, sorting, and quick view",
          "Create compelling About Us page with brand story and mission",
          "Implement Product schema markup on all product pages",
          "Build homepage customer testimonial section with photos and 5-star reviews",
          "Add 'Recently Viewed' products across site to aid reconsidering",
          "Create bundle products and feature on homepage (increases AOV)",
          "Optimize mobile navigation with icon-based categories",
          "Install live chat or WhatsApp chat widget for instant support",
          "Create FAQ page with schema markup answering common questions",
          "Implement cross-sell recommendations on cart page",
          "Add social proof notifications ('Ahmed just purchased...')",
          "Create email welcome series for new subscribers",
          "Optimize product descriptions with tabs, bullets, and better formatting"
        ],
        "days_45_90_long_term": [
          "Launch content marketing strategy: blog with Islamic book guides and reviews",
          "Build out internal linking strategy and create topic clusters for SEO",
          "Implement comprehensive abandoned cart recovery email sequence (3-email series)",
          "Create loyalty/rewards program to encourage repeat purchases",
          "Develop 'Shop by Scholar' or 'Shop by Topic' interactive pages",
          "Build dedicated reviews/testimonials page showcasing customer stories",
          "Create video content: book reviews, unboxings, author interviews",
          "Launch referral program encouraging customers to share with friends",
          "Optimize checkout process (Shopify Plus if possible) with one-page checkout",
          "Implement post-purchase email sequence with cross-sell opportunities",
          "Create personalization engine showing recommendations based on browsing",
          "Build out Arabic/Urdu language versions if targeting international market",
          "Develop iOS/Android app or PWA for better mobile experience",
          "Create seasonal campaigns (Ramadan collection, Hajj preparation, etc.)",
          "Partner with Islamic influencers/scholars for endorsements and content"
        ]
      },
      "recommended_changes": {
        "hero_section_copy": "Headline: 'Authentic Islamic Knowledge From Trusted Scholars' | Subheadline: 'Carefully curated collection of authentic Islamic books from renowned publishers and scholars. Join 10,000+ Muslims building their Islamic library.' | CTA Button: 'Browse Our Collection' (primary) + 'New Releases' (secondary)",
        "product_description_template": "ABOVE FOLD: Product title (H1) | Star rating + review count (linked) | Price with compare-at-price if on sale | Free shipping badge if over $75 threshold | Trust badges: Authentic, Scholar Approved, 30-Day Returns | Add to cart button (prominent) | Stock indicator if low | TABS SECTION: Tab 1 - Overview: 3-4 sentence book summary in engaging language | Tab 2 - Key Features: Bullet points (Author, Pages, Language, Publisher, Binding, Dimensions, ISBN) | Tab 3 - Description: Full product description with formatting and subheadings | Tab 4 - Author Bio: Background on author with credentials and other works | Tab 5 - Reviews: Full review section with filters and photo reviews | BELOW TABS: Scholar endorsement quote in highlighted box | FAQ accordion (shipping, returns, authenticity questions) | 'Frequently Bought Together' cross-sell | 'You May Also Like' recommendations",
        "trust_badges_suggestions": [
          "Authentic Publications - badge showing books are from verified Islamic publishers",
          "Scholar Approved - indicating books reviewed/recommended by qualified scholars",
          "30-Day Money-Back Guarantee - building confidence in purchase",
          "Secure Checkout - SSL encrypted and payment security badge",
          "Free Shipping Over $75 - encouraging higher cart values",
          "10,000+ Satisfied Customers - social proof badge with customer count",
          "Fast Shipping - 2-5 business day delivery guarantee",
          "Trusted Since [Year] - establishing authority and longevity"
        ],
        "review_widget_placement": "Product pages: Star rating and review count immediately below product title, above price. Click-to-scroll to full review section. | Collection pages: Star rating and review count on every product card below product title. | Homepage: Dedicated review carousel section showing 5-star reviews with customer photos and names, positioned after featured products section. | Cart page: 2-3 selected reviews for products in cart to reinforce purchase decision. | Checkout: Single trust statistic or review highlight: 'Rated 4.8/5 stars by 2,000+ customers'",
        "shipping_returns_clarity": "SHIPPING: Add to every product page above or near add to cart: 'Free shipping on orders over $75 | Order within 3 hours 24 minutes for delivery by December 10' | Create dedicated Shipping Policy page linked in footer with: Domestic rates and timeframes by region, International shipping options and customs info, Tracking information and process, Packaging standards for book protection. | RETURNS: Add to product pages: '30-Day Money-Back Guarantee | Easy Returns' badge near trust elements | Create comprehensive Returns & Refunds policy page with: 30-day return window clearly stated, Condition requirements for returns, How to initiate return (form or email), Refund processing timeframe (5-7 business days), Exceptions (opened sealed products, special orders) | Both pages should be accessible via footer, FAQ, and support pages",
        "checkout_improvements": [
          "Enable express checkout options at top: Shop Pay, PayPal, Google Pay, Apple Pay",
          "Display trust statement: 'Your payment information is encrypted and secure'",
          "Show order summary with product images in sticky sidebar (desktop) or collapsible section (mobile)",
          "Add progress indicator showing steps: Information → Shipping → Payment",
          "Display shipping options with estimated delivery dates before requiring payment",
          "Include customer testimonial or trust stat: 'Join 10,000+ satisfied customers'",
    "Add 'Questions? Call/WhatsApp us at [number]' support option prominently",
    "Enable address autocomplete and validation to reduce errors",
    "Show security badges: SSL, payment processor logos at bottom",
    "Add order note field: 'Gift message or special instructions?'",
    "Display money-back guarantee reminder near submit order button",
    "Minimize form fields to essential only and use address lookup services",
    "Add 'Your order supports Islamic education' mission statement if applicable",
    "Ensure mobile checkout has large buttons and minimal typing required"
    ]
    }
    }
          `)

    // Decrement credits
    try {
      await decrementCredits(userId)
    } catch (error) {
      console.error("Error decrementing credits (likely missing Clerk 'supabase' JWT template):", error)
      // Continue execution to return the report even if credit decrement fails in dev
    }

    return NextResponse.json({
      success: true,
      report: croReport,
    })
  } catch (error) {
    console.error("Error generating CRO report:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
