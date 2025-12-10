import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col mt-20 items-center  from-gray-50 to-blue-100 ">
      {/* Company Logo */}
      <div className="mb-6">
        <Image
          src="/Digital-Resolution-Logo.png.webp"
          alt="Digital Resolution Logo"
          width={250}
          height={40}
          className="object-contain "
        />
      </div>

      {/* Welcome Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
        Welcome to <span className="text-blue-600">Digital Resolution</span>
      </h1>

      {/* Subheading */}
      <p className="mt-3 text-lg sm:text-xl text-gray-600 text-center max-w-xl">
        Task Management Dashboard — streamline your workflow, empower your team,
        and stay productive.
      </p>

      {/* Call to Action */}
    </main>
  );
}
