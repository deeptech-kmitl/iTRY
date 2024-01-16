export default function TabNavBar() {
  return (
    <>
      <ul className="flex-grow flex justify-center" >
        <a
          className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
          href="#"
          data-te-nav-link-ref
        >
          Home
        </a>
        <a
          className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="#"
          data-te-nav-link-ref
        >
          Staff
        </a>
      </ul>
    </>
  )
}