import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Briefcase, Factory, Mail, MapPin, Robot } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { title: "Cybersecurity", slug: "cybersecurity", description: "Protect your business with enterprise-grade security" },
  { title: "Cloud Solutions", slug: "cloud", description: "Seamless cloud migration and management" },
  { title: "IT Infrastructure", slug: "infrastructure", description: "Build and maintain robust IT systems" },
  { title: "Network Management", slug: "network", description: "Ensure optimal network performance" },
  { title: "Backup & Recovery", slug: "backup", description: "Protect your data with automated solutions" },
  { title: "IT Consulting", slug: "consulting", description: "Strategic technology planning" }
];

const industries = [
  { title: "Healthcare", slug: "healthcare", description: "HIPAA-compliant IT solutions" },
  { title: "Finance", slug: "finance", description: "Secure financial technology solutions" },
  { title: "Manufacturing", slug: "manufacturing", description: "Modern manufacturing IT solutions" },
  { title: "Retail", slug: "retail", description: "Technology for modern retail" },
  { title: "Legal", slug: "legal", description: "Secure document management solutions" },
  { title: "Education", slug: "education", description: "IT support for educational institutions" }
];

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
                      {services.map((service) => (
                        <Link 
                          key={service.slug}
                          to={`/services/${service.slug}`} 
                          className="block p-3 hover:bg-slate-50 rounded-lg"
                        >
                          <div className="font-medium mb-1">{service.title}</div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </Link>
                      ))}
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
                      {industries.map((industry) => (
                        <Link 
                          key={industry.slug}
                          to={`/industries/${industry.slug}`} 
                          className="block p-3 hover:bg-slate-50 rounded-lg"
                        >
                          <div className="font-medium mb-1">{industry.title}</div>
                          <p className="text-sm text-muted-foreground">{industry.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/ai-services" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
                >
                  <Robot className="h-4 w-4" />
                  AI Services
                </Link>
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