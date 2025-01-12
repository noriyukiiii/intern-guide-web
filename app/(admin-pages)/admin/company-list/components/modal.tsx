const Modal = ({
    imageUrl,
    onClose,
  }: {
    imageUrl: string;
    onClose: () => void;
  }) => {
    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50"
        onClick={onClose}
      >
        <div className="bg-white p-4 rounded-lg">
          <img
            src={imageUrl}
            alt="Company Logo"
            className="w-full h-auto max-w-[500px]"
          />
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default Modal;