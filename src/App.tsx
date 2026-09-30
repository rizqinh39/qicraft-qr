import { useUIStore } from './store/useUIStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

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
        {activeView === 'studio' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Studio View Initialized</h2>
          </div>
        )}
        {activeView === 'templates' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Templates View Initialized</h2>
          </div>
        )}
        {activeView === 'how-it-works' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">How It Works View Initialized</h2>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
