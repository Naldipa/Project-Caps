export default function Feature({ iconClass, title, description, ariaLabel }) {
  return (
    <div
      className="border border-gray-100 rounded-lg p-6 flex flex-col items-center text-center"
      role="region"
      aria-label={ariaLabel}
    >
      <i className={`${iconClass} text-xl mb-2`}></i>
      <h2 className="font-normal mb-1">{title}</h2>
      <p className="text-xs text-gray-700">{description}</p>
    </div>
  );
}
