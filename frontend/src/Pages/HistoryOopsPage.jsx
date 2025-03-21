import Navbar from "@/Components/Navbar";
import HistoryFeed from "../components/HistoryFeed";
import Footer from "@/Components/Footer";

const HistoryOopsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16 pb-12">
        <Navbar/>
        <HistoryFeed />
        <Footer/>
      </main>
    </div>
  );
};

export default HistoryOopsPage;
