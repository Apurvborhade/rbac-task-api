import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerHref,
  children,
}: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">

      <div className="w-full max-w-md">

        <div className="
          rounded-3xl
          bg-neutral-950
          border border-neutral-800
          p-12
          shadow-[0_30px_80px_rgba(0,0,0,0.8)]
        ">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-semibold text-white tracking-tight">
              {title}
            </h1>

            <p className="text-neutral-500 mt-3 text-sm">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-neutral-500">
            {footerText}{" "}
            <Link
              href={footerHref}
              className="text-white hover:underline"
            >
              {footerLinkText}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}