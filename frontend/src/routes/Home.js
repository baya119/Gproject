import Banner from "../componets/Banner";
import Navbar from "../componets/Navbar";
import BannerImg from "../assets/pimg6.jpg";
import Services from "../componets/Services";
import Footer from "../componets/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Banner
        cName="banner"
        banImg={BannerImg}
        title="welcome to encharet"
        text="Ethiopia's the first online bidding platform"
        buttonText="sign up"
        url="/register"
        btnClass="show"
      />
      <Services />
      <Footer />
    </>
  );
}
export default Home;
