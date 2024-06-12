import { Empty } from "antd";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "../../Config/SupabaseConfig";
import logo from "../../assets/logoRoberval1.jpg";

Chart.register(CategoryScale);

function exportToCsv(filename, rows) {
  const csvContent = rows.map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// eslint-disable-next-line react/prop-types
function Charts({ selectedYear, clickExcel, clickPdf }) {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenu",
        data: [],
        fill: true,
        backgroundColor: "rgba(10, 700, 122, 0.2)",
        borderColor: "rgba(10, 700, 122, 1)",
        borderWidth: 2,
      },
      {
        label: "Dépense",
        data: [],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    async function fetchDataChart() {
      try {
        const { data: incomeData, error: incomeError } = await supabase
          .from("income")
          .select("date, amount");

        const { data: expenseData, error: expenseError } = await supabase
          .from("expense")
          .select("date, amount");

        if (incomeError || expenseError) {
          console.error(
            "Erreur lors de la récupération des données :",
            incomeError || expenseError,
          );
        } else {
          const filteredIncomeData = incomeData.filter(
            (entry) => dayjs(entry.date).year() == selectedYear,
          );
          const filteredExpenseData = expenseData.filter(
            (entry) => dayjs(entry.date).year() == selectedYear,
          );

          const incomeByMonth = Array(12).fill(0);
          const expenseByMonth = Array(12).fill(0);

          filteredIncomeData.forEach((entry) => {
            const monthIndex = dayjs(entry.date).month();
            incomeByMonth[monthIndex] += entry.amount;
          });
          filteredExpenseData.forEach((entry) => {
            const monthIndex = dayjs(entry.date).month();
            expenseByMonth[monthIndex] += entry.amount;
          });

          setChartData({
            labels: [
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre",
            ],
            datasets: [
              {
                ...chartData.datasets[0],
                data: incomeByMonth,
              },
              {
                ...chartData.datasets[1],
                data: expenseByMonth,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchDataChart();
  }, [selectedYear, chartData]);

  function handleExport() {
    const rows = [
      ["Mois", "Revenu", "Dépense"],
      ...chartData.labels.map((label, index) => [
        label,
        chartData.datasets[0].data[index],
        chartData.datasets[1].data[index],
      ]),
    ];
    exportToCsv(`donnees-${selectedYear}.csv`, rows);
  }

  const exportToPdf = async () => {
    const canvas = chartRef.current.getElementsByTagName("canvas")[0];
    const imgData = canvas.toDataURL("image/png");
    const qrCodeDataURL = await QRCode.toDataURL(
      "https://institutionmixteroberval.com/",
    );
    const pdf = new jsPDF("landscape");
    const pageWidth = pdf.internal.pageSize.getWidth(); // Get page width
    const pageHeight = pdf.internal.pageSize.getHeight(); // Get page height
    const centerX = pageWidth / 2; // Calculate center x position

    // Add logo
    pdf.addImage(logo, "PNG", 10, 10, 40, 40); // Place logo on the left

    // Add QR Code
    pdf.addImage(qrCodeDataURL, "PNG", pageWidth - 50, 10, 40, 40); // Place QR code on the right

    // Add header text
    pdf.setFontSize(16);
    pdf.text("INSTITUTION MIXTE ROBERVAL", centerX, 30, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("Chart Graphique", centerX, 40, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("ANNEE ACADEMIQUE 2023 - 2024", centerX, 50, { align: "center" });

    // Add chart image
    pdf.addImage(imgData, "PNG", 10, 70, pageWidth - 20, 100); // Center chart image by adjusting x position and width

    // Add footer
    pdf.setFontSize(10);
    pdf.setTextColor(150);
    pdf.text("@2023 Tous droits réservés", centerX, pageHeight - 10, {
      align: "center",
    });

    pdf.save("chart.pdf");
  };

  useEffect(() => {
    if (clickExcel) {
      handleExport();
    }

    if (clickPdf) {
      exportToPdf();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickExcel, clickPdf]);

  return (
    <div>
      {chartData.labels.length > 0 ? (
        <div ref={chartRef} id="chart">
          <Line
            className="h-80 w-96 "
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      ) : (
        <Empty description={"Aucune donnée pour ce moment"} />
      )}
    </div>
  );
}

export default Charts;
