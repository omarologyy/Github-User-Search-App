import { useState } from "react";
import SearchForm from "./components/form/SearchForm";
import UserProfile from "./components/user/UserProfile";

const App = () => {
  const [userName, setUserName] = useState("omarologyy");

  return (
    <main className="mx-auto max-w-6xl px-8 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">
        GitHub User Profile Viewer
      </h1>
      <SearchForm userName={userName} setUserName={setUserName} />
      <UserProfile userName={userName} />
    </main>
  );
};
export default App;
