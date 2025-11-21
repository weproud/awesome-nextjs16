"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
    return (
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative isolate overflow-hidden bg-primary px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
                >
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                        지금 바로 시작하세요
                        <br />
                        Next.js 16과 함께
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                        최신 기술 스택으로 구성된 프로젝트 템플릿으로 빠르게 개발을 시작하세요.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/login">무료로 시작하기</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                            <Link href="/admin">관리자 페이지 <span aria-hidden="true">→</span></Link>
                        </Button>
                    </div>
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.25" />
                        <defs>
                            <radialGradient id="gradient">
                                <stop stopColor="white" />
                                <stop offset={1} stopColor="white" />
                            </radialGradient>
                        </defs>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
