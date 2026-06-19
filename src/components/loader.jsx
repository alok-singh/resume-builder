const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-[rgba(0,0,0,0.9)]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-400 animate-spin"></div>
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-violet-600 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
