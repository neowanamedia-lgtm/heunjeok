import { ButtonLink } from "@/components/ButtonLink";
import { isLocale, t, type Locale } from "@/lib/i18n";

export default function Home({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ko") as Locale;
  const d = t(locale);

  return (
    <section className="max-w-3xl mx-auto mt-24 text-center space-y-8">
      <div className="space-y-2">
        <h1 className="text-5xl font-semibold tracking-tight">{d.brand}</h1>
        <p className="text-base text-neutral-500">{d.brandSub}</p>
      </div>

      <p className="text-lg text-neutral-600">{locale === "ko" ? d.taglineKo : d.taglineEn}</p>

      <div className="flex justify-center gap-4 pt-6 flex-wrap">
        <ButtonLink href={`/${locale}/write`} variant="primary">
          {d.ctaWrite}
        </ButtonLink>
        <ButtonLink href={`/${locale}/posts`} variant="secondary">
          {d.ctaBrowse}
        </ButtonLink>
      </div>
    </section>
  );
}
