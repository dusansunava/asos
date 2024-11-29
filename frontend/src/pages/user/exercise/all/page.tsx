import DataTable from "@/components/data-table/table";
import {
  exerciseColumns,
  exerciseFilters,
} from "@/pages/user/exercise/columns-filters";
import { ExercisesTabs } from "../layout";

const AllExercisesPage = () => {
  return (
    <DataTable
      columns={exerciseColumns}
      filters={exerciseFilters}
      url="/exercises/all"
    >
      <ExercisesTabs></ExercisesTabs>
    </DataTable>
  );
};

export default AllExercisesPage;
