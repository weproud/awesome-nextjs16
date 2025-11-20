"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
                    <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
                        >
                            Invest Smarter with
                            <span className="text-primary block">Data-Driven Insights</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-lg text-muted-foreground"
                        >
                            Get real-time market analysis, expert stock picks, and powerful tools to grow your portfolio. Join thousands of investors making better decisions today.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8 flex flex-wrap gap-x-6 gap-y-4"
                        >
                            <Button size="lg" asChild>
                                <Link href="/login">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/feed">
                                    View Latest Insights
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                    <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl bg-muted/50 p-8 border border-border/50 backdrop-blur-sm"
                        >
                            <div className="absolute -top-4 -right-4 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                            <div className="absolute -bottom-4 -left-4 -z-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-border pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <TrendingUp className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Market Sentiment</p>
                                            <p className="text-sm text-green-500">+2.4% Today</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium bg-green-500/10 text-green-500 px-2 py-1 rounded">Bullish</span>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-muted animate-pulse" />
                                                <div className="space-y-1">
                                                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                                                    <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
