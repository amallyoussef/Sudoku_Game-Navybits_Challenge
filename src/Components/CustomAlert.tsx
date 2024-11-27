interface CustomAlertProps {
  message: string;
  onClose: () => void;
}
const CustomAlert = ({ message, onClose }: CustomAlertProps) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
        <button className="custom-alert-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
