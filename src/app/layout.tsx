import { Nunito_Sans, Raleway } from "next/font/google";

const ralewayHeading = Raleway({subsets:['latin'],variable:'--font-heading'});

const nunitoSans = Nunito_Sans({subsets:['latin'],variable:'--font-sans'});


// The real root layout (<html lang dir>) lives in app/[locale]/layout.tsx
export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
