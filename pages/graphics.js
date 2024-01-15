import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
export default function Graphics() {
    return (
        <>
            <PageSEO title={`Projects - Advanced Computer Graphics Homeworks`} description={`Collection of homeworks done for Advanced Computer Graphics course at Waseda University.`} />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Homeworks
                    </h1>
                </div>
                    <div className="text-1xl font-bold">
                        <a href="/pages/house">Canvas Homework</a>
                    </div>
                    <div className="text-1xl font-bold">
                        <a href="/house">Shader Homework (1)</a>
                    </div>
                    <div className="text-1xl font-bold">
                        <a href="/house">Shader Homework (2)</a>
                    </div>
                    <div className="text-1xl font-bold">
                        <a href="/house">Shader Homework (3)</a>
                    </div>
                    <div className="text-1xl font-bold">
                        <a href="/house">3D WebGL Homework</a>
                    </div>
                    <div className="text-1xl font-bold">
                        <a href="/house">Lighting Homework</a>
                    </div>
                    <div className="text-1xl font-bold">
                        <a href="https://esslab.jp/~ess/en/teaching/2023/acg/individual/">Individual Project</a>
                    </div>
            </div>
        </>
    )
}