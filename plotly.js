//function for plotting data  
function getPlot(id) {
 //json data                                                          
  d3.json("samples.json").then((sampledata)=> {
    console.log(sampledata)
    
    //filter samples by id
    var samples = data.samples.filter(q => q.id.toString() === id)[0];
    console.log(samples);

    //top 10 results
    var sampleresults = samples.sample_results.slice(0,10).reverse();

    //top 10 otu ids + reversing info
    var OTU_top = (samples.otu_ids.slice(0,10)).reverse();

    //map otu id's
    var OTU_id = OTU_top.map(d => "OTU" + i)

    //labels for plot
    var labels = samples.otu_labels.slice(0, 10);

    //trace label
    var trace = {
        x: sampleresults,
        y: OTU_id,
        text: labels,
        marker: {
        color: 'green'},
        type:"bar",
        orientation: "h",
    };

    //data variable
    var data = [trace];

    //plot info
    var layout = {
        title: "Top 10 Info",
        yaxis:{
        tickmode:"linear",

        },
        margin: {
            l: 50,
            r: 50,
            t: 50,
            b: 20

        }
      };

    //bar plot
    Plotly.newPlot("bar", data, layout);


    //info for bubble chart
    var trace1 = {
        x: samples.otu_ids,
        y: samples.sample_results,
        mode: "markers",
        marker: {
            size: samples.sample_results,
            color: samples.otu_ids

        },
        text: samples.otu_labels

    };

    //bubble plot layout
    var layout_bubble = {
        xaxis:{title: "ID for OTU"},
        height: 400,
        width: 800

    };

    //data variable
    var data1 = [trace1];

    //bubble plot
    Plotly.newPlot("bubble", data1, layout_bubble);


    //wash freq.
    var wash = data.metadata.map(i => d.wash)
    console.log(`wash freq: ${wash}`)


    //info for guage chart   
    var data_guage = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseFloat(wash),
        title: { text: `Weekly Wash` },
        type: "indicator",

        mode: "guage+number",
        guage: { axis: { range: [null, 10] },
               steps: [
                { range: [0, 2], color: "blue" },
                { range: [2, 4], color: "green" },
                { range: [4, 6], color: "red" },
                { range: [6, 8], color: "orange" },
                { range: [8, 10],color: "purple" },
               ]}


            }
        ];

    var layout_guage = {
        width: 600,
        height: 500,
        margin: { t: 30, b: 60, 1:100, r:100 }
    };
    Plotly.newPlot("guage", data_guage, layout_guage);
        });
    }
    
    //function for data
    function getInfo(id) {
       
   //read json file
    d3.json("samples.json").then((data)=> {

    //metadata info for demo panel
    var metadata = data.metadata;
    console.log(metadata)

    //filter md info by id
    var result = metadata.filter(meta => meta.id.toString() ===id)[0];

    //demo info for panel
    var demoinfo = d3.select("#sample-md");

    //drop info
    demoinfo.html("");

    //id data and append
    object.entries(result).forEach((key) => {
        demoinfo.append("h5").text(key[0].toUpperCase() + ": " +key[1] + "\n");

        });
    });
    
    }

    //change event
    function optionChanged(id) {
        getPlot(id);
        getInfo(id);

    }

    //data rendering
    function init() {
       
    //dropdown
    var dropdown = d3.select("#selectdata");

    //read data
    d3.json("samples.json").then((data)=> {
    console.log(data)


    //get id data to dropdown menu
     data.names.forEach(function(name) {
     dropdown.append("options").text(name).property("values");
            
      });

    //call functions
    getPlot(data.names[0]);
    getInfo(data.names[0]);

        });

    }

init();