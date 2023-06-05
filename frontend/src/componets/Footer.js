import "./Footerstyles.css"

function Footer() {
    return (
        <div className="footer">
            <div className="top">
                <div>
                    <h1> encharet</h1>
                    <p> choose the best one</p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-squre"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-squre"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-behance-squre"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-twitter-squre"></i>
                    </a>
                </div>

            </div>


            <div className="bottom">
                <div>
                    <h3>encharet</h3>
                    <a href="/home">About Us</a>
                    <a href="/">Servies</a>
                    <a href="/">Testmonial</a>
                    <a href="/">Terms & Conditions</a>
                    <a href="/">Privacy Policy</a>
                </div>
                <div>
                    <h3>Community</h3>
                    <a href="/">Issues</a>
                    <a href="/">Blog</a>
                    <a href="/">Media Center</a>
                </div>
                <div>
                    <h3>Quick links</h3>
                    <a href="/">E Tender</a>
                    <a href="/">E Procurement</a>
                    <a href="/">sitemap</a>
                    <a href="/">Tools</a>
                </div>
                <div>
                    <h3>Help</h3>
                    <a href="/">Support</a>
                    <a href="/">Troubleshoot</a>
                    <a href="/">Contact</a>
                </div>
            </div>
        </div>
    );
}
export default Footer;