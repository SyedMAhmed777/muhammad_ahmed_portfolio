import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PayGoDashCaseStudy from "@/pages/PayGoDashCaseStudy";
import LumenCaseStudy from "@/pages/LumenCaseStudy";
import JsoorBrandGuide from "@/pages/JsoorBrandGuide";
import NicotinaCaseStudy from "@/pages/NicotinaCaseStudy";
import SereneCaseStudy from "@/pages/SereneCaseStudy";
import AllProjects from "@/pages/AllProjects";
import { useHashLocation } from "@/hooks/use-hash-location";


const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={AllProjects} />
      <Route path="/case-study/paygo-dash" component={PayGoDashCaseStudy} />
      <Route path="/case-study/lumen" component={LumenCaseStudy} />
      <Route path="/brand-guide/jsoor" component={JsoorBrandGuide} />
      <Route path="/case-study/nicotina" component={NicotinaCaseStudy} />
      <Route path="/case-study/serene" component={SereneCaseStudy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <WouterRouter hook={useHashLocation}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
