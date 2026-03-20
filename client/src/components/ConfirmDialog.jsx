const ConfirmDialog = ({ onConfirm, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="modal-animate" onClick={(e) => e.stopPropagation()}>
        <div className="bg-main-surface dark:bg-dark-surface border-main-border dark:border-dark-border relative w-full max-w-md rounded-sm border p-8 shadow-lg">
          <button
            onClick={onClose}
            className="button-close absolute top-2 right-2"
          >
            ✕
          </button>

          <h2 className="text-main-text dark:text-dark-text-main mb-2 text-center text-2xl">
            Delete Artwork
          </h2>

          <p className="text-main-text-secondary dark:text-dark-text-tertiary mb-8 text-center text-sm">
            Are you sure you want to delete this artwork? This action cannot be
            undone.
          </p>

          <div className="flex gap-4">
            <button onClick={onClose} className="button-standard w-full">
              Cancel
            </button>
            <button onClick={onConfirm} className="button-standard w-full">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
