import { useState } from "react";
import { createArtwork, updateArtwork } from "../services/artService";

// Handles both create and update — initialData presence determines the mode
const ArtworkForm = ({ onArtworkAdded, onClose, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [artist, setArtist] = useState(initialData?.artist || "");
  const [year, setYear] = useState(initialData?.year || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    // Regex for URL validation
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i;
    if (!urlPattern.test(imageUrl)) {
      return "Please enter a valid image URL (jpg, png, webp, etc.)";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    setError(null);

    const artworkData = {
      title,
      artist,
      imageUrl,
      description,
      year,
    };

    try {
      if (initialData) {
        const updatedData = await updateArtwork(initialData._id, artworkData);
        onArtworkAdded(updatedData);
      } else {
        const newArtwork = await createArtwork(artworkData);
        onArtworkAdded(newArtwork);
        setTitle("");
        setArtist("");
        setYear("");
        setImageUrl("");
        setDescription("");
      }
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Connection Error";
      setError("Error : " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-animate w-full max-w-2xl"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-main-surface dark:bg-dark-surface border-main-border dark:border-dark-border relative mx-auto max-w-2xl rounded-sm border p-8 shadow-lg transition-colors duration-300"
        >
          <button
            type="button"
            onClick={onClose}
            className="button-close absolute top-2 right-2 z-110"
          >
            ✕
          </button>
          <div>
            <h2 className="text-main-text dark:text-dark-text-main mb-6 text-center text-2xl">
              {initialData ? "Update Artwork" : "Add New Artwork"}
            </h2>
            {error && (
              <p className="mb-4 text-center text-sm font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label
                  className="mb-1 w-24 text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="title"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="input-standard max-w-md flex-1"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label
                  className="mb-1 w-24 text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="artist"
                >
                  Artist:
                </label>
                <input
                  type="text"
                  id="artist"
                  className="input-standard max-w-md flex-1"
                  name="artist"
                  required
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label
                  className="mb-1 w-24 text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="year"
                >
                  Year:
                </label>
                <input
                  type="text"
                  id="year"
                  className="input-standard max-w-md flex-1"
                  name="year"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label
                  className="mb-1 w-24 text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="imageUrl"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  className="input-standard max-w-md flex-1"
                  name="imageUrl"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label
                  className="mb-1 w-24 text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  className="input-standard max-w-md flex-1"
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-center pt-6">
                <button
                  className="button-standard"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      {/* CSS Spinner */}
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      <span>Envoi...</span>
                    </>
                  ) : initialData ? (
                    "Update Artwork"
                  ) : (
                    "Create Artwork"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkForm;
