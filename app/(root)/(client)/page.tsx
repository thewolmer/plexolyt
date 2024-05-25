import { LocationPinIcon } from '@/components/Icons';

import { Featured } from './components/Featured';

export default function SetupPage() {
  return (
    <main className="flex flex-col ">
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <section className="mx-auto flex h-[50vh] max-w-3xl flex-col items-center justify-center gap-2 px-10 md:px-5">
        <h1 className="text-center text-4xl font-bold md:text-6xl">Plexolyt Cables</h1>
        <div className="text-center text-base ">
          <p>Manufacturer Of PVC Insulated Flexible Wire, Multi Strand Wire Aluminum Cable Since 2023</p>
          <p className="flex items-center  justify-center gap-2">
            <LocationPinIcon className="size-5" /> New Delhi, Delhi.
          </p>
        </div>
      </section>
      <Featured />
    </main>
  );
}
