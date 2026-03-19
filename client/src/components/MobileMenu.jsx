import { useAuth } from "../context/AuthContext";

// Rendered in App.jsx fragment to escape Header's backdrop-blur stacking context
const MobileMenu = ({ onClose, onAddClick, onLoginClick }) => {
  const { user, logout } = useAuth();

  const handleAction = (action) => {
    onClose();
    action();
  };

  return (
    <div
      className="bg-main-bg/40 dark:bg-dark-bg/40 modal-animate fixed inset-0 top-20 z-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="border-main-border dark:border-dark-border flex flex-col gap-4 justify-self-center border-t px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          {user ? (
            <>
              <button
                onClick={() => handleAction(onAddClick)}
                className="button-standard w-full"
              >
                Add Artwork
              </button>
              <button
                onClick={() => handleAction(logout)}
                className="button-standard w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleAction(onLoginClick)}
              className="button-standard w-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
