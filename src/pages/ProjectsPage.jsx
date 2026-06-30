import { Navbar, Footer } from '../components/layout';
import { Projects } from '../components/sections';
import BackgroundDepth from '../components/BackgroundDepth';

const ProjectsPage = () => {
    return (
        <>
            <BackgroundDepth />
            <Navbar />
            <main className="relative z-10">
                <Projects />
            </main>
            <Footer />
        </>
    );
};

export default ProjectsPage;