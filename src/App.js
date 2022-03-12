import Header from "./components/Layout/Header";
import {Fragment} from "react";
import Meals from "./components/Meals/Meals";

export default function App() {
  return (
      <Fragment>
        <Header />
          <main>
              <Meals/>
          </main>
      </Fragment>
  );
}


