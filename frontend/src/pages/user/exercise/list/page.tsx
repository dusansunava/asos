import DataTable from "@/components/data-table/table";
import {
  exerciseColumns,
  exerciseFilters,
} from "@/pages/user/exercise/columns-filters";
import ExercisesLayout from "../layout";

const ExerciseListPage = () => {
  return (
    <div>
    <ExercisesLayout></ExercisesLayout>
    <DataTable
      columns={exerciseColumns}
      filters={exerciseFilters}
      url="/exercises/table"
    >
    </DataTable>
    </div>
  );
};

export default ExerciseListPage;
