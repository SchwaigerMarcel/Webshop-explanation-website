import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products"; 
import { ProductDetail } from "./pages/ProductDetail"; 
import { About } from "./pages/About"; 
import { Schleifservice } from "./pages/Schleifservice";
import { Härteservice } from "./pages/Härteservice";
import { Impressum } from "./pages/Impressum";
import { Datenschutz } from "./pages/Datenschutz";
import { Kontakt } from "./pages/Kontakt";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        path: "/",
        element: <Home />, 
      },
      {
        path: "/produkte", 
        element: <Products />, 
      },
      {
        path: "produkte/:id", 
        element: <ProductDetail />,
      },
      {
        // Pfad auf "über" mit Umlaut geändert
        path: "/über-uns",
            element: <About />,
      },
      {
        path: "/schleifservice",
        element: <Schleifservice />,
      },
      {
        path: "/härteservice",
        element: <Härteservice />,
      },
      {
        path: "/impressum",
        element: <Impressum />,
      },
      {
        path: "/datenschutz",
        element: <Datenschutz />,
      },
      {
        path: "/kontakt",
        element: <Kontakt />,
      }

      
    ],
  },
]);