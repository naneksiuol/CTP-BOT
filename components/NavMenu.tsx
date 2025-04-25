"use client"

import * as React from "react"
import { BarChart2, HelpCircle, Info, LayoutDashboard, Brain, Activity, GraduationCap, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

// Add the following imports:
import { useMobile } from "@/hooks/use-mobile"

const components: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "ML Dashboard",
    href: "/dashboard",
    description: "Access our comprehensive ML trading dashboard.",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    title: "Technical Analysis",
    href: "/dashboard?tab=ml-dashboard",
    description: "Get AI-powered technical analysis for any asset.",
    icon: <BarChart2 className="w-4 h-4" />,
  },
  {
    title: "Market Sentiment",
    href: "/dashboard?tab=sentiment",
    description: "Analyze market sentiment with Together AI.",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    title: "Advanced AI Models",
    href: "/dashboard?tab=advanced-ai",
    description: "Access Fortune 500 grade AI models for superior market predictions.",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    title: "Saved Predictions",
    href: "/dashboard?tab=saved",
    description: "View and manage your saved ML predictions.",
    icon: <BarChart2 className="w-4 h-4" />,
  },
  {
    title: "Pro Predictor",
    href: "/pro-predictor",
    description: "Access our advanced AI-powered trading analysis tool.",
    icon: <BarChart2 className="w-4 h-4" />,
  },
  {
    title: "Expected Move",
    href: "/expected-move",
    description: "Calculate expected price ranges with our proprietary AI-Implied Volatility model.",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    title: "Trading Strategies",
    href: "/trading-strategies",
    description: "Learn about advanced AI-powered trading strategies used by Fortune 500 companies.",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    title: "University",
    href: "/university",
    description: "Access comprehensive educational resources for traders.",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about Cyber Trader Pro and its creators.",
    icon: <Info className="w-4 h-4" />,
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Find answers to frequently asked questions.",
    icon: <HelpCircle className="w-4 h-4" />,
  },
]

// Update the NavMenu component to conditionally render the menu based on screen size.
export function NavMenu() {
  const isMobile = useMobile()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {isMobile ? <NavigationMenuTrigger>Menu</NavigationMenuTrigger> : null}
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href} icon={component.icon}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center">
            {icon}
            <div className="text-sm font-medium leading-none ml-2">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
