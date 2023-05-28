import advert1 from "../assets/pimg3.png"
import advert2 from "../assets/pimg4.jpg"
import advert3 from "../assets/pimg7.jpeg"
import ServicesData from "./ServicesData";
import "./ServicesStyle.css"

const Services = () => {
    return (
        
        <div className="service">
            <h1>our services</h1>
            <p> lojffdkjxfbvkdfbvckdfbckvbfkcvbkfbckvbkzmlxxkzndxknckd</p> 
        <ServicesData
        className="first-ser"
        heading =  "abebe beso bela"
        text = "Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipis"
        img1={advert1}
        />
        <ServicesData
        className="first-ser-reverse"
        heading =  "abebe beso bela"
        text = "Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipis"
        img1={advert2}
        />
        <ServicesData
        className="first-ser"
        heading =  "abebe beso bela"
        text = "Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipis"
        img1={advert3}
        />
        </div>
        
    );
};
export default Services;