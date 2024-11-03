import React from "react";

const About = () => {
    return (
        <div className="about-page">
            <h1>About Us</h1>
            <p>Welcome to ENSMoviesLibrary, your go-to platform for renting and exploring a wide selection of movies from various genres!</p>
            
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
    );
};

export default About;
