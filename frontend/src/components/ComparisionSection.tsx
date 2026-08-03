import Image, { StaticImageData } from "next/image";

type ComparisonCardProps = {
  title: string;
  description: string;
  beforeSrc: StaticImageData | string;
  afterSrc: StaticImageData | string;
  beforeLabel?: string;
  afterLabel?: string;
};

const ComparisonSection = ({
  title,
  description,
  beforeSrc,
  afterSrc,
  beforeLabel = "Original",
  afterLabel = "Masked",
}: ComparisonCardProps) => {
  const isGif =
  typeof beforeSrc === "string"
    ? beforeSrc.endsWith(".gif")
    : beforeSrc.src.endsWith(".gif");

  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        {description}
      </p>

      <div className="mt-8 flex flex-col lg:flex-row items-center justify-center gap-8">

        {/* Original */}
        <div className="flex flex-col items-center">
          <span className="mb-3 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 py-1 text-sm font-medium">
            {beforeLabel}
          </span>

          <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-2xl border shadow-lg">
            {isGif ? (
              <img
                src={typeof beforeSrc === "string" ? beforeSrc : beforeSrc.src}
                alt={beforeLabel}
                className="w-full max-w-md rounded-2xl border shadow-lg transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <Image
                src={beforeSrc}
                alt={beforeLabel}
                className="w-full max-w-md transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>

        <div className="hidden lg:block text-5xl text-zinc-400">
          →
        </div>

        <div className="block lg:hidden text-4xl text-zinc-400">
          ↓
        </div>

        {/* Masked */}
        <div className="flex flex-col items-center">
          <span className="mb-3 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
            {afterLabel}
          </span>

          <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-2xl border shadow-lg">
            {isGif ? (
              <img
                src={typeof afterSrc === "string" ? afterSrc : afterSrc.src}
                alt={afterLabel}
                className="w-full max-w-md rounded-2xl border shadow-lg transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <Image
                src={afterSrc}
                alt={afterLabel}
                className="w-full max-w-md transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;