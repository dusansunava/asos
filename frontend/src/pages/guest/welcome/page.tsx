import { useTheme } from "@/providers/theme";
import { Suspense, lazy } from "react";
const Chart = lazy(() => import("react-apexcharts"));

const WelcomePage = () => {
  const { theme } = useTheme();

  const options = {
    chart: {
      id: "basic-bar",
      background: "hsla(0, 0%, 0%, 0)",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    theme: {
      mode: theme,
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: theme,
        shadeIntensity: 0.65,
      },
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <div>
      <div className="w-[500px] overflow-auto flex items-center justify-center">
        <div className="w-[500px] h-[500px]  min-w-[500px]">
          <Suspense fallback={""}>
            <Chart
              options={options}
              series={series}
              type="bar"
              width={500}
              height={400}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
