import StartupCard from "@/components/StartupCard";
import SearchForm from "@/components/SearchForm";
import { StartupTypeCard } from "@/components/StartupCard";

import { sanityFetch } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const session = await auth();

  console.log(session?.id);
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Présentez votre startup,
          <br />
          rencontrez des entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Soumettez des idées, votez sur des projets et faites-vous remarquer
          dans le cadre de concours virtuels. virtuels.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        {query
          ? `Résultats de la recherche pour "${query}"`
          : "Toutes les startups"}

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <li className="no-results">Aucune startup trouvée </li>
          )}
        </ul>
      </section>
    </>
  );
}
