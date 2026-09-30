import { useUIStore } from './store/useUIStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StudioView } from './components/studio/StudioView';
import { TemplatesGallery } from './components/templates/TemplatesGallery';
import { HowItWorksView } from './components/how-it-works/HowItWorksView';

export default function App() {
  const { activeView, toastMessage } = useUIStore();

  return (
    <div className="min-h-screen bg-bg-base text-slate-100 flex flex-col selection:bg-primary/30">
      <Navbar />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 rounded-lg bg-surface-card border border-primary/50 text-white text-xs font-semibold shadow-lg shadow-black/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {toastMessage}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'studio' && <StudioView />}
        {activeView === 'templates' && <TemplatesGallery />}
        {activeView === 'how-it-works' && <HowItWorksView />}
      </main>

      <Footer />
    </div>
  );
}
