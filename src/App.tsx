import { BrowserRouter, Routes, Route } from "react-router-dom";
import Destination from "./pages/Destination";
import Search from "./pages/Search";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Destination />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/search/:city" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
