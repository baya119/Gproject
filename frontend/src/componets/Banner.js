import "./BannerStyle.css";
function Banner(props) {
    return(
        <>
        <div className={props.cName}>
            <img alt ="bannerImg" src={props.banImg}/>
        </div>
        <div className="banner-text">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <a href={props.url} className={props.btnClass}>
            {props.buttonText}
            </a>

        </div>
        </>
    )
}
export default Banner;