import { NavBar } from "@/components";

export default function GeneralLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center p-24">
          <h1 className="text-lg">Aca hay un layout</h1>
          {children}
        </div>
      </>
    );
  }