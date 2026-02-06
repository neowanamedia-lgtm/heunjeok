import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "primary"
      ? "border-neutral-900 hover:bg-neutral-900 hover:text-white"
      : "border-neutral-300 text-neutral-600 hover:border-neutral-900";

  return (
    <Link href={href} className={`px-6 py-3 border rounded-full transition ${cls}`}>
      {children}
    </Link>
  );
}
