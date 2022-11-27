import React from "react";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import NumberField from "./components/NumberField";
import PrecisionField from "./components/PrecisionField";
import SelectFunc from "./components/SelestFunc";
import styles from "./styles.module.css";

const Form = ({ defaultValues, onSubmit, onBlur, readOnly }) => {
  const { handleSubmit, control } = useForm({ defaultValues });

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
      onBlur={onBlur}
    >
      <Container label="Функция">
        <SelectFunc control={control} nameField="funcId" disabled={readOnly} />
      </Container>
      <Container label="Входные данные">
        <NumberField
          label="a ="
          control={control}
          nameField="start"
          placeholder="Введите начальное значение"
          disabled={readOnly}
        />
        <NumberField
          label="b ="
          control={control}
          nameField="end"
          placeholder="Введите конечное значение"
          disabled={readOnly}
        />
      </Container>
      <Container label="Точность">
        <PrecisionField
          control={control}
          nameField="precisionCount"
          disabled={readOnly}
        />
      </Container>
      {!readOnly && <button type="submit">Вычислить</button>}
    </form>
  );
};

export default Form;
