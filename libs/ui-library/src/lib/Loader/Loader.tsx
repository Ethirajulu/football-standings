export const Loader = () => {
  const dotBaseClasses = "relative inline-flex rounded-full h-3 w-3";
  const pingEffectClasses = "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75";

  return (
    <div className="flex space-x-4 justify-center items-center p-4" role="status" aria-live="polite">
      <span className="sr-only">Loading...</span>
      
      {/* Dot 1 */}
      <span className="relative flex h-3 w-3">
        <span className={`${pingEffectClasses} bg-sky-500`} style={{ animationDelay: '0s' }}></span>
        <span className={`${dotBaseClasses} bg-sky-600`}></span>
      </span>
      
      {/* Dot 2 */}
      <span className="relative flex h-3 w-3">
        <span className={`${pingEffectClasses} bg-sky-500`} style={{ animationDelay: '0.2s' }}></span>
        <span className={`${dotBaseClasses} bg-sky-600`}></span>
      </span>
      
      {/* Dot 3 */}
      <span className="relative flex h-3 w-3">
        <span className={`${pingEffectClasses} bg-sky-500`} style={{ animationDelay: '0.4s' }}></span>
        <span className={`${dotBaseClasses} bg-sky-600`}></span>
      </span>
    </div>
  );
};