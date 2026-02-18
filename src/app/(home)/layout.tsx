import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <HomeLayout> {children}</HomeLayout>
    </div>
  );
};

export default Layout;
