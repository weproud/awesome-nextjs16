"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
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
                            Next.js 16으로
                            <span className="text-primary block">최고의 웹 앱 구축하기</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-lg text-muted-foreground"
                        >
                            Turbopack, Server Components, 그리고 강력한 타입 안정성으로 더 빠르고 안정적인 웹 애플리케이션을 만들어보세요.
                            최신 Next.js 16의 모든 기능을 활용한 프로젝트 템플릿입니다.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8 flex flex-wrap gap-x-6 gap-y-4"
                        >
                            <Button size="lg" asChild>
                                <Link href="/login">
                                    시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/feed">
                                    피드 둘러보기
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
                                            <Code2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Next.js 16</p>
                                            <p className="text-sm text-green-500">Turbopack 활성화</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium bg-green-500/10 text-green-500 px-2 py-1 rounded">최신</span>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: "App Router", value: "✓" },
                                        { label: "Server Components", value: "✓" },
                                        { label: "TypeScript", value: "✓" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                                                    <span className="text-primary font-bold">{item.value}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{item.label}</div>
                                                </div>
                                            </div>
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
