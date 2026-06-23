export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samay Raina",
    jobTitle: "Comedian, YouTuber, Chess Streamer",
    url: "https://samayraina.co",
    sameAs: [
      "https://youtube.com/@SamayRaina",
      "https://instagram.com/samayraina",
      "https://twitter.com/ReheSamay",
      "https://twitch.tv/samayraina",
    ],
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: "India's Got Latent Season 2",
    organizer: {
      "@type": "Person",
      name: "Samay Raina",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
    </>
  );
}
