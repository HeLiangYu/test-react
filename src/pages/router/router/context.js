import React from "react";
export const routerContext = React.createContext();
routerContext.displayName = "Navigation";

export const locationContext = React.createContext();
locationContext.displayName = "Location";
