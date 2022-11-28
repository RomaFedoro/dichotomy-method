import React, { memo, useEffect, useRef, useState } from "react";
import Form from "../containers/Form";
import Graph from "../components/Graph";
import { DEFAULT_VALUES } from "../constants/form";
import { InlineMath } from "react-katex";
import Solution from "../components/Solution";
import { useSolution } from "../hooks/useSolution";
import styles from "./styles.module.css";
import Container from "../components/Container";
import drawGraph from "../units/drawGraph";
import FUNCTIONS from "../constants/func";
import EXTREMUMS from "../constants/extremum";

const App = () => {
  const [isSolitionVisible, setIsSolitionVisible] = useState(false);
  const {
    total,
    ref,
    result: { a, b, x },
    params: { func, funcId, start, end, precisionCount, precision, extremumId },
    handleSubmit,
  } = useSolution(DEFAULT_VALUES, setIsSolitionVisible);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Метод дихотомии для решения задач одномерной оптимизации</h1>
        {isSolitionVisible ? (
          <>
            <Container label="Задача">
              <div className={styles.text}>
                Дана функция&nbsp;
                <InlineMath>{FUNCTIONS[funcId].text}</InlineMath>. Найти{" "}
                {EXTREMUMS[extremumId].text.toLowerCase()} на отрезке
                x&nbsp;∈&nbsp;[{start};&nbsp;{end}] с&nbsp;точностью
                ε&nbsp;=&nbsp;
                {precision}
              </div>
            </Container>
            <Container label="Количество итераций">
              <div className={styles.text}>n = {total}</div>
            </Container>
            {a !== undefined && b !== undefined && (
              <Container label="Точка находится в диапозоне">
                <div className={styles.text}>
                  a = {a.toFixed(precisionCount)}
                </div>
                <div className={styles.text}>
                  b = {b.toFixed(precisionCount)}
                </div>
              </Container>
            )}
            {x !== undefined && (
              <Container label="Ответ">
                <div className={styles.text}>
                  x = {x.toFixed(precisionCount)}
                </div>
                <div className={styles.text}>
                  f(x) = {func(x).toFixed(precisionCount)}
                </div>
              </Container>
            )}
            <button onClick={() => setIsSolitionVisible(false)}>
              Ввести новые значения
            </button>
          </>
        ) : (
          <Form defaultValues={DEFAULT_VALUES} onSubmit={handleSubmit} />
        )}
      </div>
      <Graph ref={ref} />
    </div>
  );
};

export default memo(App);

