import Header from "@/components/ui/home/Header";
import Properties from "@/components/ui/home/Properties";
import Choose_us from "@/components/ui/home/Choose_us";
import Reviews from "@/components/ui/home/Reviews";
import Agents from "@/components/ui/home/Agents";
import Footer from "@/components/common/Footer";

import { getProperties } from '@/data/properties';

export default async function Home() {
  const properties = await getProperties(12);   // Live Spark data - 12 newest listings

  return (
    <>
      <Header />
      <Properties properties={properties} />
      <Agents />
      <Choose_us />
      <Reviews />
      <Footer />
    </>
  );
}
