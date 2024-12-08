import React from "react";
import '../styles/login.css'; // Import the same CSS for consistency

const About = () => {
    return (
        <div className="App"> {/* Use App class for consistent body background */}
            <h1 className="login-heading">About Us</h1> {/* Use login-heading for the main title */}
            <div className="login-page"> {/* Use login-page to style the main container */}
                <section className="about-content">
                    <h2>Our Mission</h2>
                    <p>At ENSMoviesLibrary, we aim to provide an extensive movie library for everyone, from blockbusters to indie films, all available for seamless online rental.</p>

                    <h2>Our Story</h2>
                    <p>Founded by movie enthusiasts, ENSMoviesLibrary was built to make renting movies easy and enjoyable. With a passion for cinema, we are here to share the magic of films with you.</p>

                    <h2>Why Choose Us?</h2>
                    <div className="why-choose-us">
                        <p>Extensive collection of movies</p>
                        <p>User-friendly experience</p>
                        <p>Affordable pricing and flexible rental options</p>
                        <p>Regularly updated movie categories</p>
                    </div>
                </section>

                <section className="contact">
                    <h2>Contact Us</h2>
                    <p>Email: support@ensmovieslibrary.com</p>
                    <p>Phone: +123-456-7890</p>
                    <p>Follow us on social media for updates on new releases and special promotions!</p>
                </section>
            </div>
        </div>
    );
};

export default About;
