export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-base-200/50">
      <div className="mx-auto w-[75%]">
        <div className="flex flex-col pt-12 pb-10 gap-y-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xl font-bold text-primary">MyMovies</div>
            <h4 className="text-sm text-zinc-400 max-w-2xl">
              This site is a hobby prodject creayted by Erik Cerne. The site
              uses the TMDB API via my own backend. Vissit the 
              <a
                href="https://github.com/erikcerne/MyMovie-Backend"
                className="text-primary hover:underline"
              >
                backend
              </a>
               and 
              <a
                href="https://github.com/erikcerne/MyMovie-Frontend"
                className="text-primary hover:underline"
              >
                frontend
              </a>
               repositorys on github to see more.
            </h4>
            <div className="text-xs text-zinc-500 mt-10s">
              Erik.cerne2@gmail.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
