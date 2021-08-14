init();

//Create the plots
function CreatePlot(id) {
    
    d3.json("samples.json").then((data)=> {
        
        // Get sample for id
        var reqSample = data.samples.filter(s => s.id.toString() === id)[0];                
        var samplevalues = reqSample.sample_values.slice(0, 10).reverse();
         
        // Get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU = (reqSample.otu_ids.slice(0, 10)).reverse();        
        var sorted_OTU = OTU.map(x => "OTU " + x)  
        console.log("OTU IDS: " + sorted_OTU);  
  
        // Get the labels, reverse it.
        var labels = reqSample.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);
  
        // The bar plot
        var bartrace = {
            x: samplevalues,
            y: sorted_OTU,
            text: labels,
            marker: {
              color: 'cornflowerblue',
                },
            type:"bar",
            orientation: "h",
        }; 
        
        var barlayout = {
            xaxis:{title: "Top 10 OTUs"},
            height: 475,
            width: 450
        };
        var bardata = [bartrace]; 
        Plotly.newPlot("bar", bardata, barlayout);
      
        // The bubble chart
        var bubbletrace = {
            x: reqSample.otu_ids,
            y: reqSample.sample_values,
            mode: "markers",
            marker: {
                size: reqSample.sample_values,
                color: reqSample.otu_ids
            },
            text: reqSample.otu_labels
  
        };
          
        var bubblelayout = {
            xaxis:{title: "Comparison of all sample values for "+id},
            height: 600,
            width: 1000
        };
  
        var bubbledata = [bubbletrace];
        Plotly.newPlot("bubble", bubbledata, bubblelayout);                      
      });

      //LoadGaugeChart(id);  
  }  

//Initialize the controls and plots
function init() {
    //Read the data
    d3.json("samples.json").then((data)=> {
       
        data.names.forEach((name) => {
            d3.select("#selDataset")
            .append("option")
            .text(name)
            .property("value");
        });
        CreatePlot(data.names[0]);
        GetDemographicInfo(data.names[0]);
    });
};

//Option Changed Event Handler
d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(id){
    CreatePlot(id);
    GetDemographicInfo(id);
};

//Demographic info
function GetDemographicInfo(id){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata);

        //filter demo info data by id
        var filterResult = metadata.filter(info => info.id.toString() === id)[0];

        var panelBody = d3.select("#sample-metadata");

        //empty the demo info panel each time before getting new data
        panelBody.html("");

        Object.entries(filterResult).forEach((key)=>{
            panelBody.append("p").text(key[0] + ":" + key[1]);
        });
    });
};