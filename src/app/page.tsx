import Header from "@/components/ui/home/Header";
import Properties from "@/components/ui/home/Properties"
import Choose_us from "@/components/ui/home/Choose_us";
import Reviews from "@/components/ui/home/Reviews";
import Agents from "@/components/ui/home/Agents";
import Footer from "@/components/common/Footer";


async function getListings() {
  const res = await fetch('https://replication.sparkapi.com/v1/listings?_limit=20', {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY_HERE',  // or whatever auth method your key uses
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}

// Then in your page:
const listings = await getListings();




export default function Home() {
  return (
    <>
      <Header />
      <Properties />
      <Agents />
      <Choose_us />
      <Reviews />

      <Footer />
    </>
  );
}
