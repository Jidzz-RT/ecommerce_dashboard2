async function fetchDataAndRenderChart(
  apiEndpoint,
  chartElementId,
  chartConfig
) {
  try {
    let response = await fetch(apiEndpoint);
    let data = await response.json();
    const ctx = document.getElementById(chartElementId).getContext("2d");
    new Chart(ctx, chartConfig(data));
  } catch (error) {
    console.error("Error fetching or rendering chart:", error);
  }
}

fetchDataAndRenderChart("/api/orders_over_time", "ordersChart", (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Number of Orders",
        data: data.counts,
        // ... other configPython
      },
    ],
  },
  // ... other options
}));

fetchDataAndRenderChart("/api/low_stock_levels", "stockChart", (data) => ({
  type: "bar",
  data: {
    labels: data.products,
    datasets: [
      {
        label: "Low Stock",
        data: data.quantities,
        // ... other config
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false, // This will hide the x-axis labels
      },
    },
  },
}));

fetchDataAndRenderChart(
  "/api/most_popular_products",
  "popularProductsChart",
  (data) => ({
    type: "bar",
    data: {
      labels: data.map((item) => item.product_name),
      datasets: [
        {
          label: "Quantity Sold",
          data: data.map((item) => item.total_quantity),
          // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          display: false, // This will hide the x-axis labels
        },
      },
    },
  })
);

// Revenue Generation Chart
fetchDataAndRenderChart("/api/revenue_generation", "revenueChart", (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Total Revenue",
        data: data.revenues,
        // ... other config
      },
    ],
  },
  // ... other options
}));

// Product Category Popularity Chart
fetchDataAndRenderChart(
  "/api/product_category_popularity",
  "categoryPopularityChart",
  (data) => ({
    type: "pie",
    data: {
      labels: data.categories,
      datasets: [
        {
          label: "Total Sales",
          data: data.sales,
          // ... other config
        },
      ],
    },
  })
);

// Payment Method Popularity Chart
fetchDataAndRenderChart(
  "/api/payment_method_popularity",
  "paymentMethodChart",
  (data) => ({
    type: "pie",
    data: {
      labels: data.methods,
      datasets: [
        {
          label: "Transaction Count",
          data: data.counts,
          // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: false, // This will hide the x-axis labels
        },
      },
    },
  })
);

// Temperature Over Time Chart
fetchDataAndRenderChart(
  "/api/temperature_over_time",
  "temperatureChart",
  (data) => ({
    type: "line",
    data: {
      labels: data.daily.time,
      datasets: [
        {
          label: "Temperature (°C)",
          data: data.daily.temperature_2m_max,
          borderColor: "rgba(255, 0, 0, 1)",
          backgroundColor: "rgba(200, 0, 192, 0.2)",
          fill: false,
        },
      ],
    },
    // ... other options can be added as needed
  })
);
