import Container from "src/components/shared/Container";
import Newsletter from "./Newsletter";
import AppDownloadCard from "./AppDownloadCard";

// Newsletter form + mobile app card in one rounded panel
export default function NewsletterSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 dark:from-background dark:to-muted/40">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] border border-emerald-100/50 bg-[linear-gradient(161deg,var(--color-gray-100)_0%,white_50%,var(--color-red-50)_100%)] shadow-[0_25px_50px_-12px_rgba(0,188,125,0.1)] dark:border-border dark:bg-none dark:bg-card">
          <span className="absolute -end-20 -top-40 size-80 rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-200/0 blur-[32px]" />
          <span className="absolute -bottom-32 -start-16 size-64 rounded-full bg-gradient-to-tr from-teal-200/30 to-teal-200/0 blur-[32px]" />
          <div className="relative flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:p-14">
            <Newsletter />
            <div className="flex flex-col justify-center lg:w-[524px] lg:shrink-0 lg:border-s lg:border-emerald-100 lg:ps-8 dark:lg:border-border">
              <AppDownloadCard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
