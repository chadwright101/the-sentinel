export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center space-x-1.5">
      <div
        className="w-3 h-3 bg-dark-brown rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-3 h-3 bg-dark-brown rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-3 h-3 bg-dark-brown rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}
