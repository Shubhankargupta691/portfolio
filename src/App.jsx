import { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Home, Blog, BlogPost, ProjectsPage } from './pages';
import { scheduleHashScroll } from './lib/navigation';
import './index.css';

const ScrollManager = () => {
    const location = useLocation();
    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        if (!location.hash) {
            if (navigationType === 'POP') {
                return;
            }

            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return;
        }

        return scheduleHashScroll(location.hash);
    }, [location.pathname, location.hash, navigationType]);

    return null;
};

const ResumeRedirect = () => {
    useLayoutEffect(() => {
        window.location.replace("https://drive.google.com/file/d/1bh0ua0dD4cwWCKQMByde2S3jvlPpt36m/view?usp=sharing");
    }, []);
    return null;
};

function App() {
  return (
    <Router>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/writing" element={<Blog />} />
        <Route path="/writing/:slug" element={<BlogPost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resume" element={<ResumeRedirect />} />
        <Route path="/resume/" element={<ResumeRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
