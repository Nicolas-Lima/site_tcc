function Container({ children, className = "" }) {
  return <div className={`container py-0 ${className}`}>{children}</div>;
}

export default Container;
