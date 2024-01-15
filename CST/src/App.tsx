import { QueryClient,  QueryClientProvider } from "react-query"
import AppContextProvider from "./context"
import Router from "./router"
import { DndContext as DndContextProvider } from '@dnd-kit/core'

const queryClient = new QueryClient();

function App() {
  return (
          <QueryClientProvider client={queryClient}>
            <DndContextProvider>
              <AppContextProvider>
                <Router />
              </AppContextProvider>
            </DndContextProvider>
          </QueryClientProvider>
    )
}

export default App