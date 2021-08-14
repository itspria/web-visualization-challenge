function LoadGaugeChart(id)
{
  d3.json("samples.json").then((data)=> {
    var wfreq = data.metadata.filter(f => f.id.toString() === id)[0];
    wfreq = wfreq.wfreq;
    console.log("Washing Freq: " + wfreq);
  });
    // The guage chart
    var data_g = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: {text: `Belly Button Washing Frequency`},
        type: "indicator",
        
        mode: "gauge+number",
        gauge: { axis: { range: [null, 9] },
                 steps: [
                  {range: [0, 1], color: "white"},
                  {range: [1, 2], color: "white"},
                  {range: [2, 3], color: "white"},
                  {range: [3, 4], color: "white"},
                  {range: [4, 5], color: "white"},
                  {range: [5, 6], color: "white"},
                  {range: [6, 7], color: "white"},
                  {range: [7, 8], color: "white"},
                  {range: [8, 9], color: "white"}
                ]}
            
        }
      ];
      var layout_g = { 
          width: 700, 
          height: 600, 
          margin: { t: 20, b: 40, l:100, r:100 } 
        };
      Plotly.newPlot("gauge", data_g, layout_g);
}

