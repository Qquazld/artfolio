const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-main-surface dark:bg-dark-surface modal-animate relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm border border-black/5 p-1 shadow-2xl dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="button-close absolute top-2 right-2 z-110 bg-white/20 text-white hover:bg-white/40"
        >
          ✕
        </button>
        <div className="bg-art-container flex w-full grow justify-center">
          <img
            src={artwork.imageUrl || "/placeholder-art.jpg"}
            alt={`${artwork.title} by ${artwork.artist}`}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 pt-4 pb-4 text-center">
          <div>
            <h2 className="font-display text-main-text dark:text-dark-text-main text-2xl font-semibold italic">
              {artwork.title}
            </h2>
            <p className="font-display text-main-text dark:text-dark-text-main mt-1 text-xl font-semibold">
              {artwork.artist}
            </p>
            <p className="text-main-text-secondary dark:text-dark-text-tertiary mt-2 text-base leading-relaxed">
              {artwork.year && (
                <span className="text-base italic">
                  {artwork.year}
                  {artwork.description ? ". " : ""}
                </span>
              )}
              {/* Replace ' x ' with '×' for proper typographic dimensions display (e.g. "60 × 80 cm") */}
              {artwork.description?.replace(/ x /g, " × ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
