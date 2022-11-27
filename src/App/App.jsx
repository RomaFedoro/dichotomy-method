import React, { memo, useEffect, useState } from "react";
import Form from "../containers/Form";
import Graph from "../components/Graph";
import { DEFAULT_VALUES } from "../constants/form";
import Solution from "../components/Solution";
import { useParams } from "../hooks/useParams";
import styles from "./styles.module.css";
import Container from "../components/Container";

const App = () => {
  const [isSolitionVisible, setIsSolitionVisible] = useState(false);
  const { params, numberRectangles, ref, handleSubmit } = useParams(
    DEFAULT_VALUES,
    setIsSolitionVisible
  );

  return (
    <div className={styles.container}>
      <Graph ref={ref} />
      <div className={styles.form}>
        <h1>Метод серединных прямоугольников</h1>
        <Form
          defaultValues={DEFAULT_VALUES}
          onSubmit={handleSubmit}
          readOnly={isSolitionVisible}
        />
        {isSolitionVisible && (
          <>
            <Container label="Количество прямоугольников">
              <div className={styles.text}>n = {numberRectangles}</div>
            </Container>
            <Solution params={params} />
            <button onClick={() => setIsSolitionVisible(false)}>
              Ввести новые значения
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(App);

