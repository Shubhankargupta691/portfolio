import { Navbar, Footer } from '../components/layout';
import {
    Hero,
    ContentGrid,
    Philosophy,
    Experience,
    Proof,
    Contact
} from '../components/sections';
import BackgroundDepth from '../components/BackgroundDepth';

const Home = () => {
    return (
        <>
            <BackgroundDepth />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <ContentGrid />
                <Philosophy />
                <Experience />
                <Proof />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Home;
