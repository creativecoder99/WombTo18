import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ImpactCounters from "@/components/ImpactCounters";
import ProgramCards from "@/components/ProgramCards";
import FinancialTransparency from "@/components/FinancialTransparency";
import WallOfKindness from "@/components/WallOfKindness";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import StoriesOfImpact from "@/components/StoriesOfImpact";
import MediaCoverage from "@/components/MediaCoverage";

export default function Home() {
    return (
        <>
            <HeroSection />
            <TrustSection />
            <ImpactCounters />
            <ProgramCards />
            <FinancialTransparency />
            <WallOfKindness />
            <Testimonials />
            <StoriesOfImpact />
            <MediaCoverage />
            <FAQSection />
        </>
    );
}
