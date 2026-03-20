import { useState, useEffect } from "react";
import { getAllArtworks, deleteArtwork } from "../services/artService";

export const useArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artworkToDelete, setArtworkToDelete] = useState(null);

  useEffect(() => {
    const fetchAllArtworks = async () => {
      try {
        const data = await getAllArtworks();
        setArtworks(data);
      } catch (err) {
        setError("Failed to fetch artworks. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArtworks();
  }, []);

  // Handles both create and update
  const handleArtworkAdded = (updatedOrCreated) => {
    setArtworks((prevArtworks) => {
      const exists = prevArtworks.find(
        (art) => art._id === updatedOrCreated._id,
      );
      if (exists) {
        return prevArtworks.map((art) =>
          art._id === updatedOrCreated._id ? updatedOrCreated : art,
        );
      }
      // Add new artwork at the top of the grid
      return [updatedOrCreated, ...prevArtworks];
    });
  };

  const requestDelete = (id) => {
    setArtworkToDelete(id);
  };

  // Called when user confirms deletion in ConfirmDialog
  const confirmDelete = async () => {
    try {
      await deleteArtwork(artworkToDelete);
      setArtworks((prev) => prev.filter((art) => art._id !== artworkToDelete));
    } catch (error) {
      console.error("Deletion error:", error);
    } finally {
      setArtworkToDelete(null);
    }
  };

  const filteredArtworks = artworks.filter((art) => {
    const search = searchTerm.toLowerCase();
    return (
      art.title.toLowerCase().includes(search) ||
      art.artist.toLowerCase().includes(search)
    );
  });

  return {
    artworks,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filteredArtworks,
    artworksToShow: filteredArtworks.slice(0, visibleCount),
    handleLoadMore: () => setVisibleCount((prev) => prev + 8),
    handleArtworkAdded,
    artworkToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete: () => setArtworkToDelete(null),
    hasMore: visibleCount < filteredArtworks.length,
  };
};
