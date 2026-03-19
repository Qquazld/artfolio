const ArtworkCard = ({
  artwork,
  onViewDetails,
  onDelete,
  onUpdate,
  isAdmin,
}) => {
  return (
    <div
      onClick={() => onViewDetails(artwork)}
      className="group bg-main-surface dark:bg-dark-surface border-main-border dark:border-dark-border relative w-full cursor-pointer overflow-hidden rounded-sm border shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="main-bg-surface dark:bg-dark-surface aspect-square overflow-hidden">
        <img
          src={artwork.imageUrl || "/placeholder-art.jpg"}
          loading="lazy"
          decoding="async"
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-3 text-center">
        <h3 className="font-display text-main-text dark:text-dark-text-main truncate text-xl font-semibold">
          {artwork.artist}
        </h3>

        <div className="mt-1 flex items-center justify-center gap-2">
          <p className="text-main-text dark:text-dark-text-main text-sm font-medium">
            {artwork.title}
          </p>
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <div className="border-main-border dark:border-dark-border mt-4 flex justify-center gap-4 border-t pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate(artwork);
              }}
              className="button-standard"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(artwork._id);
              }}
              className="button-standard"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;
