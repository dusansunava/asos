import DataTable from "@/components/data-table/table";
import {
  exerciseColumns,
  exerciseFilters,
} from "@/pages/user/exerciseList/columns-filters";
import { ExercisesTabs } from "@/pages/user/exerciseList/layout";

const ExerciseListPage = () => {
  return (
    <DataTable
      columns={exerciseColumns}
      filters={exerciseFilters}
      url="/exercises/tableData"
    >
      <ExercisesTabs />
    </DataTable>
  );
};

export default ExerciseListPage;
