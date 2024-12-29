import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Briefcase, Factory, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Your Logo
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  IT Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/services/cybersecurity" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">Cybersecurity</div>
                        <p className="text-sm text-muted-foreground">Protect your business with enterprise-grade security</p>
                      </Link>
                      <Link to="/services/cloud" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">Cloud Solutions</div>
                        <p className="text-sm text-muted-foreground">Seamless cloud migration and management</p>
                      </Link>
                      <Link to="/services/infrastructure" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">IT Infrastructure</div>
                        <p className="text-sm text-muted-foreground">Build and maintain robust IT systems</p>
                      </Link>
                      <Link to="/services/support" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">IT Support</div>
                        <p className="text-sm text-muted-foreground">24/7 technical support and maintenance</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/industries/healthcare" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">Healthcare</div>
                        <p className="text-sm text-muted-foreground">HIPAA-compliant IT solutions</p>
                      </Link>
                      <Link to="/industries/finance" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">Finance</div>
                        <p className="text-sm text-muted-foreground">Secure financial technology solutions</p>
                      </Link>
                      <Link to="/industries/manufacturing" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">Manufacturing</div>
                        <p className="text-sm text-muted-foreground">Modern manufacturing IT solutions</p>
                      </Link>
                      <Link to="/industries/retail" className="block p-3 hover:bg-slate-50 rounded-lg">
                        <div className="font-medium mb-1">Retail</div>
                        <p className="text-sm text-muted-foreground">Technology for modern retail</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/#contact-form" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};