import FinancialTransparency from "@/components/FinancialTransparency";
import ImpactCounters from "@/components/ImpactCounters";

export const metadata = {
    title: "Impact & Transparency | WombTo18 Foundation",
};

export default function ImpactPage() {
    return (
        <div className="pt-10">
            <ImpactCounters />
            <FinancialTransparency />
        </div>
    );
}
