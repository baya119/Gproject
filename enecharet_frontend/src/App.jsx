import { Flowbite } from "flowbite-react"
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import { Outlet } from "react-router-dom";

function App() {

  const customTheme = {
    button: {
      color: {
        primary: 'bg-red-500 hover:bg-red-600',
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <NavbarComponent />
      <div className="flex flex-col h-screen my-10">
        <div className="px-4 lg:m-2 md:px-8 flex-1">
          <Outlet />
        </div>
        <FooterComponent />
      </div>
    </Flowbite>
  )
}

export default App
