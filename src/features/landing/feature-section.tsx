"use client";

import { motion } from "framer-motion";
import { BarChart2, Brain, Globe, Shield, Zap, Users } from "lucide-react";

const features = [
    {
        name: "AI-Powered Analysis",
        description: "Our advanced algorithms analyze market trends 24/7 to identify the best opportunities.",
        icon: Brain,
    },
    {
        name: "Real-time Data",
        description: "Get up-to-the-second market data and news to make informed decisions instantly.",
        icon: Zap,
    },
    {
        name: "Global Coverage",
        description: "Access data from major stock exchanges around the world in one unified platform.",
        icon: Globe,
    },
    {
        name: "Portfolio Tracking",
        description: "Monitor your investments with detailed performance metrics and visualizations.",
        icon: BarChart2,
    },
    {
        name: "Secure Platform",
        description: "Bank-grade encryption and security measures to keep your data and assets safe.",
        icon: Shield,
    },
    {
        name: "Community Insights",
        description: "Connect with other investors, share strategies, and learn from the community.",
        icon: Users,
    },
];

export function FeatureSection() {
    return (
        <section className="py-24 sm:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Powerful features for modern investors
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        We provide the tools and insights you need to navigate the complex world of stock investing with confidence.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col"
                            >
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                                    <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
