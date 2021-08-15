function LoadGaugeChart(id)
{
  console.log("Load guage for id :", id)

  if(id == undefined)
  {
      return;
  }
  var wfreq = 0;
  d3.json("samples.json").then((data)=> {
    var metadata = data.metadata;    
    var sample = metadata.filter(entry => entry.id.toString() === id)[0];
    console.log("Inside LoadGauge",sample);
    wfreq = Number(sample.wfreq);

    console.log("Washing Freq: " + wfreq);
    // The guage chart
    var gaugedata = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: {text: `Belly Button Washing Frequency`},
        type: "indicator",       
        mode: "gauge+number",        
        gauge: { axis: { range: [0, 9] },
                 bar: {'color': "steelblue"},
                 bgcolor: 'lightgrey'
               }
            
        }
      ];
      var gaugelayout = { 
          width: 600, 
          height: 600, 
          margin: { t: 20, b: 40, l:100, r:100 } 
        };

      Plotly.newPlot("gauge", gaugedata, gaugelayout);
    });
}

