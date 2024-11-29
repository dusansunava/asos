import DataTable from "@/components/data-table/table";
import {
  exerciseColumns,
  exerciseFilters,
} from "@/pages/user/exercise/columns-filters";
import { ExercisesTabs } from "../layout";

const OwnedExercisesPage = () => {
  return (
    <DataTable
      columns={exerciseColumns}
      filters={exerciseFilters}
      url="/exercises/owned"
    >
      <ExercisesTabs></ExercisesTabs>
    </DataTable>
  );
};

export default OwnedExercisesPage;
