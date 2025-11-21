"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Layers, Database, Palette, Rocket } from "lucide-react";

const features = [
    {
        name: "Turbopack 빌드",
        description: "Webpack보다 700배 빠른 Turbopack으로 개발 경험을 혁신하세요.",
        icon: Zap,
    },
    {
        name: "Server Components",
        description: "React Server Components로 더 나은 성능과 SEO를 제공합니다.",
        icon: Layers,
    },
    {
        name: "타입 안정성",
        description: "TypeScript와 Zod를 활용한 완벽한 타입 안정성을 경험하세요.",
        icon: Shield,
    },
    {
        name: "Prisma ORM",
        description: "타입 안전한 데이터베이스 쿼리와 마이그레이션을 손쉽게 관리하세요.",
        icon: Database,
    },
    {
        name: "Shadcn UI",
        description: "아름답고 접근성 높은 컴포넌트로 빠르게 UI를 구축하세요.",
        icon: Palette,
    },
    {
        name: "최적화된 성능",
        description: "자동 코드 분할, 이미지 최적화 등으로 최고의 성능을 제공합니다.",
        icon: Rocket,
    },
];

export function FeatureSection() {
    return (
        <section className="py-24 sm:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">모든 것이 준비되어 있습니다</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        현대적인 웹 개발을 위한 강력한 기능들
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Next.js 16의 최신 기능과 검증된 라이브러리들로 구성된 프로덕션 레디 템플릿입니다.
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
