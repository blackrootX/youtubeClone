import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeLayout> {children}</HomeLayout>
    </div>
  );
};

export default Layout;
