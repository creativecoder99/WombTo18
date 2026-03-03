import ProgramCards from "@/components/ProgramCards";

export const metadata = {
    title: "Programs | WombTo18 Foundation",
};

export default function ProgramsPage() {
    return (
        <div className="pt-10">
            <div className="max-w-7xl mx-auto px-4 mb-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Our Programs</h1>
                <p className="text-slate-600">Discover where we are making an impact and how you can help.</p>
            </div>
            <ProgramCards />
        </div>
    );
}
