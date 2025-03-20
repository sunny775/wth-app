interface MetaTagsProps {
  title: string;
  description: string;
  path?: string;
  twitterDomain?: string;
  image?: string;
}

export default function MetaTags({
  title,
  description,
  path = "",
}: MetaTagsProps) {
  const { VITE_BASE_URL, VITE_TWITTER_DOMAIN, VITE_IMAGE_PATH } = process.env;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={`${VITE_BASE_URL}/${path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${VITE_BASE_URL}/${VITE_IMAGE_PATH}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={VITE_TWITTER_DOMAIN} />
      <meta property="twitter:url" content={`${VITE_BASE_URL}/${path}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${VITE_BASE_URL}/${VITE_IMAGE_PATH}`}
      />
    </>
  );
}
