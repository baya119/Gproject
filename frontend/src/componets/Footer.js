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
                    <h4>encharet</h4>
                    <a href="/">About Us</a>
                    <a href="/">Servies</a>
                    <a href="/">Clients</a>
                    <a href="/">Testmonial</a>
                    <a href="/">Terms & Conditions</a>
                    <a href="/">Privacy Policy</a>
                </div>
                <div>
                    <h4>Community</h4>
                    <a href="/">Github</a>
                    <a href="/">Issues</a>
                    <a href="/">Project</a>
                    <a href="/">Blog</a>
                    <a href="/">Media Center</a>
                </div>
                <div>
                    <h4>Quick links</h4>
                    <a href="/">about PP</a>
                    <a href="/">E Tender</a>
                    <a href="/">E Procurement</a>
                    <a href="/">sitemap</a>
                    <a href="/">Tools</a>
                </div>
                <div>
                    <h4>Help</h4>
                    <a href="/">Support</a>
                    <a href="/">Troubleshootin</a>
                    <a href="/">contact</a>
                </div>
            </div>
        </div>
    );
}
export default Footer;