import AppBreadcrumb, { type BreadcrumbItem } from "src/components/shared/AppBreadcrumb";
import Container from "src/components/shared/Container";

// Green banner with the filter's logo, e.g. /products?brand=... (same look as the category banner)
export default function FilterHero({
  title,
  subtitle,
  image,
  breadcrumb,
}: {
  title: string;
  subtitle: string;
  image: string;
  breadcrumb: BreadcrumbItem[];
}) {
  return (
    <section className="bg-gradient-to-br from-green-600 to-green-400 py-10 text-white">
      <Container className="space-y-4">
        <AppBreadcrumb items={breadcrumb} />
        <div className="flex items-center gap-5">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
            <span className="flex size-14 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote API images */}
              <img src={image} alt={title} className="size-full object-contain" />
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-1 text-white/80">{subtitle}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
