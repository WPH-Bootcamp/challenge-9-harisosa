import Categories from "@/features/home/Categories";
import Hero from "@/features/home/Hero";
import {Recommended} from "@/features/home/Recommended";


export default function HomePage() {
    return (
        <main>
            <Hero />
            <section className="mx-auto max-w-6xl px-4">
                <Categories />
                <div className="mt-10">
                    <Recommended />
                </div>
            </section>
        </main>
    );
}
