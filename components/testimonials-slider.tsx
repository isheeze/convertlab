import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      author: "Sarah Chen",
      role: "E-commerce Manager",
      company: "TechStyle Co.",
      content: "ConvertLab helped us identify that we were missing customer reviews on product pages. After implementing the recommendations, our conversion rate jumped 23%!",
      metric: "+23%",
      metricLabel: "Conversion Rate",
      gradient: "from-violet-500 to-purple-500",
      avatar: "SC"
    },
    {
      author: "Marcus Williams",
      role: "Store Owner",
      company: "Urban Threads",
      content: "The detailed analysis saved us months of guessing. We got specific, actionable recommendations we could implement immediately.",
      metric: "+87%",
      metricLabel: "Revenue Growth",
      gradient: "from-emerald-500 to-teal-500",
      avatar: "MW"
    },
    {
      author: "Priya Patel",
      role: "Digital Strategist",
      company: "Luxe Beauty",
      content: "Best CRO tool we've used. The reports are comprehensive, professional, and the insights actually lead to real revenue growth.",
      metric: "+156%",
      metricLabel: "Customer LTV",
      gradient: "from-cyan-500 to-blue-500",
      avatar: "PP"
    },
    {
      author: "Liam Eriksson",
      role: "Head of Growth",
      company: "Nordic Outdoors",
      content: "We were skeptical at first, but ConvertLab uncovered friction points we never noticed. Fixing the checkout flow alone boosted our sales by 41% in just two weeks.",
      metric: "+41%",
      metricLabel: "Checkout Completion",
      gradient: "from-amber-500 to-orange-500",
      avatar: "LE"
    },
    {
      author: "Elena Rodriguez",
      role: "Marketing Director",
      company: "Purely Plant-Based",
      content: "The AI-powered heatmaps and session recordings gave us clarity we've never had before. Our AOV is up 68% after optimizing product bundles based on real user behavior.",
      metric: "+68%",
      metricLabel: "Average Order Value",
      gradient: "from-pink-500 to-rose-500",
      avatar: "ER"
    }
  ];

  // Auto-rotate logic
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500); // 4.5 seconds – feel free to change to 5000 (5s) etc.

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeTestimonial, testimonials.length]);

  // Reset timer when user manually selects a testimonial
  const handleCardClick = (index: number) => {
    setActiveTestimonial(index);
    // Timer will restart automatically because activeTestimonial changed
  };

  return (
    <section className="relative z-10 py-24 px-6 border-t border-emerald-200/50 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/60 border border-emerald-200/60 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Real Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Trusted by Store Owners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of e-commerce businesses using ConvertLab to boost their conversions
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className={`relative group cursor-pointer transition-all duration-500 ${
                activeTestimonial === i ? 'lg:scale-105' : 'lg:scale-95 lg:opacity-70'
              }`}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

              <div className="relative bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 min-h-[380px] flex flex-col">
                <div className={`inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white font-bold text-sm mb-6 shadow-lg`}>
                  <Zap className="w-4 h-4" />
                  {testimonial.metric}
                  <span className="text-xs opacity-90">{testimonial.metricLabel}</span>
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-4 pt-4 border-t border-emerald-200/50">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-emerald-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-10">
                  <Sparkles className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
