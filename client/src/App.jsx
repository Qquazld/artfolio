import { useState } from "react";
import { useArtworks } from "./hooks/useArtworks";
import { useAuth } from "./context/AuthContext";
import ArtworkForm from "./components/ArtworkForm";
import ArtworkGrid from "./components/ArtworkGrid";
import ArtworkModal from "./components/ArtworkModal";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";

function App() {
  const { isAdmin } = useAuth();
  // Hook
  const {
    artworks,
    filteredArtworks,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    artworksToShow,
    handleLoadMore,
    handleArtworkAdded,
    handleArtworkDeleted,
    hasMore,
  } = useArtworks();

  // Local UI states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) return <div className="loader">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    // Overlays rendered outside the main div (Artwork Modal, Create and Update Form, Mobile Menu)
    <>
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      {(isFormOpen || artworkToEdit) && (
        <ArtworkForm
          initialData={artworkToEdit}
          onArtworkAdded={(newArt) => {
            handleArtworkAdded(newArt);
            setIsFormOpen(false);
            setArtworkToEdit(null);
          }}
          onClose={() => {
            setIsFormOpen(false);
            setArtworkToEdit(null);
          }}
        />
      )}

      {isMobileMenuOpen && (
        <MobileMenu
          onClose={() => setIsMobileMenuOpen(false)}
          onAddClick={() => setIsFormOpen(true)}
          onLoginClick={() => setShowLogin(true)}
        />
      )}

      <div className="flex min-h-screen flex-col">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddClick={() => setIsFormOpen(true)}
          onLoginClick={() => setShowLogin(true)}
          isMenuOpen={isMobileMenuOpen}
          onMenuOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="mx-auto w-full max-w-6xl grow p-5">
          {searchTerm ? (
            <p className="mb-6">
              <b>{filteredArtworks.length}</b> result
              {filteredArtworks.length !== 1 && "s"} for "{searchTerm}"
            </p>
          ) : (
            <p className="mb-6">
              <b>{artworks.length}</b> artworks
            </p>
          )}

          <ArtworkGrid
            artworks={artworksToShow}
            onViewDetails={setSelectedArtwork}
            onDelete={(id) =>
              handleArtworkDeleted(id, () => {
                if (selectedArtwork?._id === id) setSelectedArtwork(null);
              })
            }
            onUpdate={setArtworkToEdit}
            isAdmin={isAdmin}
          />

          {hasMore && (
            <div className="mt-12 mb-8 flex justify-center">
              <button onClick={handleLoadMore} className="button-standard">
                Show More
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
