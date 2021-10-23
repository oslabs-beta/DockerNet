anychart.onDocumentReady(function () {
  // create data

  const data = {
    nodes: [
      { id: 'Network-1', group: 'network', port: '3000' },
      { id: 'Container-1', group: 'container', port: '3000' },
      { id: 'Container-2', group: 'container', port: '3000' },
      { id: 'Container-3', group: 'container', port: '3000' },
      { id: 'Container-4', group: 'container', port: '3000' },
    ],
    edges: [
      { from: 'Container-1', to: 'Network-1' },
      { from: 'Container-2', to: 'Network-1' },
      { from: 'Container-3', to: 'Network-1' },
      { from: 'Container-4', to: 'Network-1' },
    ],
  };

  // create a chart and set the data
  const chart = anychart.graph(data);

  // enable labels of nodes
  chart.nodes().labels().enabled(true);

  // set the container id
  chart.container('container');

  // initiate drawing the chart
  chart.draw();
});

// anychart.onDocumentReady(function () {
//   // create data
//   // var data = {
//   //   nodes: [
//   //     { id: "Network-1", group: "network", port: "3000" },
//   //     // { id: "Network-2", group: "network", port: "3001" },
//   //     // { id: "Network-3", group: "network", port: "3002" },
//   //     // { id: "Network-4", group: "network", port: "3003" },
//   //     { id: "Container-1", group: "container", port: "3000" },
//   //     { id: "Container-2", group: "container", port: "3000" },
//   //     { id: "Container-3", group: "container", port: "3000" },
//   //     { id: "Container-4", group: "container", port: "3000" },
//   //     // { id: "Container-5", group: "container", port: "3001" },
//   //     // { id: "Container-6", group: "container", port: "3001, 3002" },
//   //     // { id: "Container-7", group: "container", port: "3002" },
//   //     // { id: "Container-8", group: "container", port: "3003" }
//   //   ],
//   //   edges: [
//   //     { from: "Container-1", to: "Network-1" },
//   //     { from: "Container-2", to: "Network-1" },
//   //     { from: "Container-3", to: "Network-1" },
//   //     // { from: "Container-3", to: "Network-2" },
//   //     { from: "Container-4", to: "Network-1" },
//   //     // { from: "Container-5", to: "Network-2" },
//   //     // { from: "Container-6", to: "Network-2" },
//   //     // { from: "Container-6", to: "Network-3" },
//   //     // { from: "Container-7", to: "Network-3" },
//   //     // { from: "Container-8", to: "Network-4" }
//   //   ]
//   // };

//   var data = {
//     nodes: [
//       { id: "Network-1", group: "network", port: "3000" },
//       { id: "Container-1", group: "container", port: "3000" },
//       { id: "Container-2", group: "container", port: "3000" },
//       { id: "Container-3", group: "container", port: "3000" },
//       { id: "Container-4", group: "container", port: "3000" },
//     ],
//     edges: [
//       { from: "Container-1", to: "Network-1" },
//       { from: "Container-2", to: "Network-1" },
//       { from: "Container-3", to: "Network-1" },
//       { from: "Container-4", to: "Network-1" },
//     ]
//   };

//   // create a chart and set the data
//   var chart = anychart.graph(data);

//   // prevent zooming the chart with the mouse wheel
//   // chart.interactivity().zoomOnMouseWheel(false);

//   // enable labels of nodes
//   chart.nodes().labels().enabled(true);

//   // configure labels of nodes
//   // chart
//   //   .nodes()
//   //   .labels()
//   //   .format(function () {
//   //     return this.id.toUpperCase() + "\n(" + this.getData("group") + ")";
//   //   });
//   // chart.nodes().labels().fontSize(12);
//   // chart.nodes().labels().fontWeight(600);

//   // // configure labels of nodes in groups
//   // chart.group("network").labels().fontColor("#00bfa5");
//   // chart.group("container").labels().fontColor("#ffa000");

//   // // config group colors
//   // chart.group("network").normal().fill("#00bfa5");
//   // chart.group("container").normal().fill("#ffa000");

//   // // configure tooltips
//   // chart.tooltip().useHtml(true);
//   // chart.tooltip().format(function () {
//   //   if (this.type == "node") {
//   //     return (
//   //       "<span style='font-weight:bold'>" +
//   //       this.id +
//   //       "</span><br>port: " +
//   //       this.getData("port") +
//   //       "</span><br>siblings: " +
//   //       this.siblings.length +
//   //       "<br>group: " +
//   //       this.getData("group")
//   //     );
//   //   } else {
//   //     return this.getData("from") + " -> " + this.getData("to");
//   //   }
//   // });

//   // // set the chart title
//   // chart.title("Network Graph: Labels and Tooltips (Formatting Functions)");

//   // set the container id
//   chart.container("container");

//   // initiate drawing the chart
//   chart.draw();
// });
