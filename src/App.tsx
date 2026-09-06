import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { LandingPage } from '@/pages/LandingPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProblemsMarketplacePage } from '@/pages/ProblemsMarketplacePage';
import { ChallengeDetailPage } from '@/pages/ChallengeDetailPage';
import { PostProblemPage } from '@/pages/PostProblemPage';
import { AIMatchingPage } from '@/pages/AIMatchingPage';
import { CompareProposalsPage } from '@/pages/CompareProposalsPage';
import { ProvidersPage } from '@/pages/ProvidersPage';
import { ProviderProfilePage } from '@/pages/ProviderProfilePage';
import { ProjectWorkspacePage } from '@/pages/ProjectWorkspacePage';
import { IndustryFundingPage } from '@/pages/IndustryFundingPage';
import { GovernmentPage } from '@/pages/GovernmentPage';
import { ImpactDashboardPage } from '@/pages/ImpactDashboardPage';
import { CitizenDashboardPage } from '@/pages/CitizenDashboardPage';
import { StudentDashboardPage } from '@/pages/StudentDashboardPage';
import { UniversityDashboardPage } from '@/pages/UniversityDashboardPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { LoginPage } from '@/pages/LoginPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone pages (no nav/footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/government" element={<GovernmentPage />} />
          <Route path="/dashboard/citizen" element={<CitizenDashboardPage />} />
          <Route path="/dashboard/student" element={<StudentDashboardPage />} />
          <Route path="/dashboard/university" element={<UniversityDashboardPage />} />

          {/* Pages with navbar + footer */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/problems" element={<Layout><ProblemsMarketplacePage /></Layout>} />
          <Route path="/problems/:id" element={<Layout><ChallengeDetailPage /></Layout>} />
          <Route path="/providers" element={<Layout><ProvidersPage /></Layout>} />
          <Route path="/providers/:id" element={<Layout><ProviderProfilePage /></Layout>} />
          <Route path="/post-problem" element={<Layout><PostProblemPage /></Layout>} />
          <Route path="/ai-matching" element={<Layout><AIMatchingPage /></Layout>} />
          <Route path="/compare-proposals" element={<Layout><CompareProposalsPage /></Layout>} />
          <Route path="/projects/smart-irrigation" element={<Layout><ProjectWorkspacePage /></Layout>} />
          <Route path="/industry-funding" element={<Layout><IndustryFundingPage /></Layout>} />
          <Route path="/impact" element={<Layout><ImpactDashboardPage /></Layout>} />
          <Route path="/notifications" element={<Layout><NotificationsPage /></Layout>} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
