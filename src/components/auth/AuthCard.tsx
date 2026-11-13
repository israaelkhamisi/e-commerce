import BrandName from "./BrandName";
import ResetSteps from "./ResetSteps";

// White card that wraps the forgot / verify / reset forms
export default function AuthCard({
  title,
  subtitle,
  step,
  children,
}: {
  title: string;
  subtitle: React.ReactNode;
  step: 1 | 2 | 3;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-8 rounded-2xl bg-white p-6 shadow-xl sm:p-12 dark:bg-gray-900">
      <div className="space-y-2 text-center">
        <BrandName className="block text-3xl font-bold" />
        <h1 className="pt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
        <p className="font-medium text-gray-600 dark:text-gray-300">{subtitle}</p>
      </div>
      <ResetSteps current={step} />
      {children}
    </div>
  );
}
