import ArtworkCard from "./ArtworkCard";

const ArtworkGrid = ({
  artworks,
  onDelete,
  onUpdate,
  isAdmin,
  onViewDetails,
}) => {
  if (artworks.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-main-text-secondary dark:text-dark-text-tertiary text-xl">
          No matches found. Try using different keywords.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full py-8">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork._id}
            artwork={artwork}
            onViewDetails={onViewDetails}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtworkGrid;
