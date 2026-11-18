const Loading = () => (
  <div className="space-y-2 mt-6 animate-pulse">
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className="h-12 rounded-2xl bg-muted" />
    ))}
  </div>
);

export default Loading;
