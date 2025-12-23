import React from "react";
import AppShell from "./components/layout/AppShell";
import { I18nProvider } from "./hooks/useI18n";
import { GeolocationProvider } from "./hooks/useGeolocation";
import { UnitsProvider } from "./hooks/useUnits";


function App() {
    return (
        <React.StrictMode>
            <I18nProvider>
                <GeolocationProvider>
                    <UnitsProvider>
                        <AppShell />
                    </UnitsProvider>
                </GeolocationProvider>
            </I18nProvider>
        </React.StrictMode>
    );
}

export default App;
