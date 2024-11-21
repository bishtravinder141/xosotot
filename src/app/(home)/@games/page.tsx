import onearmed from "@assets/images/home/one-armed.png";
import { getExternalGames } from "@data/external-game";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function HomeGamesSlot() {
  const t = await getTranslations();
  const games = await getExternalGames();

  if (games.length < 1) {
    return null;
  }

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-3 font-bold text-blue-500">
        {t("Other games")}
        <NextImage alt="Other games" className="size-5 shrink-0" height={20} src={onearmed} width={20} />
      </h2>

      <div className="-mx-5 flex gap-3 overflow-x-auto px-5">
        {games.map((game) => (
          <NextLink
            className="flex size-40 shrink-0 flex-col rounded-lg bg-gray-900 text-white"
            href={game.link}
            key={game.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            <figure className="relative flex grow overflow-hidden rounded-lg">
              <NextImage alt="Bonus" className="grow object-cover" height={160} src={game.logo} width={160} />
              <figcaption className="absolute inset-x-0 top-0 p-2.5 text-sm font-bold tracking-wide">
                {game.name}
              </figcaption>
            </figure>
          </NextLink>
        ))}
      </div>
    </section>
  );
}
