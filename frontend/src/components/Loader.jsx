function Loader({ message = "Analyzing medical parameters..." }) {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{message}</p>
    </div>
  );
}

export default Loader;
