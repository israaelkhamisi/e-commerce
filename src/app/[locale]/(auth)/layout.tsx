import Container from "src/components/shared/Container";

// Shared wrapper for every auth screen; each page decides its own columns
export default function AuthLayout({ children }: LayoutProps<"/[locale]">) {
  return <Container className="py-10 lg:py-16">{children}</Container>;
}
