
	function highlightFeature(e) {
	//When the users hover over the polygons, they are highlighted
    var layer = e.target;
    layer.setStyle({weight: 5,color: '#666',dashArray: '',fillOpacity: 0.7});
	info.update(layer.feature.properties);
	}

	function resetHighlight(e) {
	//When the users hover out of the polygon,the highlight is removed
		Ward_M.resetStyle(e.target);
		info.update();
	}

	function onEachWard(feature,layer) {
	//Within the map for every feature showing labels
	
	
	//What to do when user hovers over
    layer.on({
		
        mouseover: highlightFeature,
        mouseout: resetHighlight
		
    });
	
	}
	
	function style_Parli(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'green',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}
	
	function style_GBA(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}
	
	function style_Ass(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}


	function style_Ward(feature) {
	
	return {
	    fillColor: 'white',
		weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0
	
		};
	
	}
	
	function style_Ward_Transparent(feature) {
	
	return {
	    fillColor: 'white',
		weight: 0,
        opacity: 0,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0
	
		};
	
	}

	function style_Scenario(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function getColours(Corp) {
	var chosencolour = 'blue';
	if (Corp=="East") 
	{
		chosencolour='cyan';
	}
	else if (Corp=="West") 
	{
		chosencolour='red';
	}
	else if (Corp=="North") 
	{
		chosencolour='green';
	}
	else if (Corp=="South") 
	{
		chosencolour='orange';
	}
	else if (Corp=="Central") 
	{
		chosencolour='pink';
	}
	
	return chosencolour;
	
	}
	
	function style_Scenario_v2(feature) {
	
	return {
	    fillColor: getColours(feature.properties['NewCorp']),
		weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.3
		};
	
	}
		
	function style_BBMPOLD(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	
	
	
	
	//Do classification based on the merged data
	
	var zoom=10;
	
	
	
	latstart=13;
	longstart=77.5;	
	
	var map = L.map('map', {zoomControl: false}).setView([latstart, longstart], zoom);
	var zoomControl = L.control.zoom({ position: 'bottomleft' }).addTo(map);

	var Parli_M=L.geoJson(ParliConst, {style: style_Parli});
	var Ass_M=L.geoJson(AssConst, {style: style_Ass});
	var Ward_M=L.geoJson(BBMPWards, {style: style_Ward_Transparent});
	var Ward_N=L.geoJson(BBMPWards, {style: style_Ward});
	var GBA_M=L.geoJson(GBA, {style: style_GBA});
	var BBMP_OLD_M=L.geoJson(bbmpold, {style: style_BBMPOLD});
    var scmap=L.geoJson(BBMP522, {style: style_Scenario});

	
	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{    maxZoom: 20,    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);

	info = L.control({position: "topright"});

	info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'hover'); // create a div with a class "info"
    this.update();
    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) { 	
    this._div.innerHTML =  (props ? ' Ward Name: <b>' + props['Ward_Name'] + '</b><br />Ward Number: <b>'+ props['Ward_No']+ '</b><br />Assembly: <b>'+ props['Assembly_C']
        : '');
	};
	
	info.addTo(map);
	
	function bgswitch() {
		map.removeLayer(googlebg);
		if (document.getElementById('bgbox').value=="roadmap") 
  {
      googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
  } 
  else if (document.getElementById('bgbox').value=="hybrid") 
  {
	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

  }
		
		else if (document.getElementById('bgbox').value=="satellite") 
		{
			googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
		}
		
		else if (document.getElementById('bgbox').value=="terrain") 
		{
			googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
		}
		
	}

function scswitch() {
		map.removeLayer(scmap);
		if (document.getElementById('scbox').value=="500") 
  {
      scmap=L.geoJson(BBMPOpt2, {style: style_Scenario_v2}).addTo(map);
  } 
  
		
		else if (document.getElementById('scbox').value=="522") 
		{
			scmap=L.geoJson(BBMP522, {style: style_Scenario_v2}).addTo(map);

		}
		drawbasic();
	}

	function drawbasic() {
	map.removeLayer(Ward_M);
	/*
	Ward_M=L.geoJson(BBMPWards, {style: style_Ward,onEachFeature: function (feature, layer) {layer.bindPopup("<table  style='width:500px;height:100%;font-size:12px'><tr><td><b>Ward Name:</b> "+feature.properties.Ward_Name +"<br><br><b>Number:</b> "+feature.properties.Ward_No+"<br><br><b>Assembly:</b> "+feature.properties.Assembly_C+"<br><br><b>Parliament: </b>"+feature.properties.MP_Constit+"<br><br><b>Scenario 5.1:</b> "+feature.properties.Sc5_1+"<br><br><b>Scenario 5.1.1:</b> "+feature.properties.Sc5_1_1+"<br><br><b>Scenario 5.2:</b> "+feature.properties.Sc5_2+"<br><br><b>Scenario 5.2.2:</b> "+feature.properties.Sc5_2_2+"</td></tr></table>")}}).addTo(map);
	
	*/
	Ward_M=L.geoJson(BBMPWards, {style: style_Ward_Transparent,onEachFeature: onEachWard}).addTo(map);
	}


	function funcswitch() {
    // check if checkbox is checked
	map.eachLayer(function (layer) {
		if (layer!=googlebg)
		{
        map.removeLayer(layer);
		}
    });
    
  
  if ($('#assbox').is(":checked"))
  {
	  map.removeLayer(Ass_M);
      Ass_M=L.geoJson(AssConst, {style: style_Ass}).addTo(map);
	  
  } 
  
  if ($('#gbabox').is(":checked"))
  {
	  map.removeLayer(GBA_M);
      GBA_M=L.geoJson(GBA, {style: style_Ass}).addTo(map);
	  
  } 
  if ($('#wardbox').is(":checked"))
  {
	  map.removeLayer(Ward_N);
	  Ward_N=L.geoJson(BBMPWards, {style: style_Ward}).addTo(map);
      
	  
  } 
  scswitch();
  /*
  if ($('#bbmpoldbox').is(":checked") )
  {
      BBMP_OLD_M=L.geoJson(bbmpold, {style: style_BBMPOLD}).addTo(map);
  } 
  */
  
  
  
  }
	
	
	
	
	function drawmap(){
	
	//Title for the map
	
		//Initial view
	  
	//L.tileLayer(OSM_URL, {attribution: OSM_ATTRIB,id: 'examples.map-20v6611k', opacity:0.7}).addTo(map);
	
	
	/*
	Google Maps
<input type="checkbox" id="googlecheck">
<br>
	if (document.getElementById('googlecheck').checked)
	{
	var googleLayer = new L.Google('ROADMAP');
    map.addLayer(googleLayer);
	}
	*/
	
	/*
	for (i=0; i<POList.length; i++)
	      L.piechartMarker(
          L.latLng([POList_JS[i]["Latitude"], POList_JS[i]["Longitude"]]),
          {
			  radius:15,
              data: [
                  { name: 'Group A', value: POList_JS[i]["Group_A"], style: { fillStyle: 'rgba(255,0,0,.6)', strokeStyle: 'rgba(255,0,0,.95)'}},
                  { name: 'Group B', value: POList_JS[i]["Group_B"], style: { fillStyle: 'rgba(0,80,0,.6)', strokeStyle: 'rgba(255,0,0,.95)'} },
                  { name: 'Group C', value: POList_JS[i]["Group_C"], style: { fillStyle: 'rgba(244, 196, 48,.6)', strokeStyle: 'rgba(255,0,0,.95)'} },
                  
              ]
          ,
	
	onEachFeature: function (feature, layer) {
				layer.bindPopup("<table  style='width:500px;height:100%;font-size:12px'><tr><td><b>Name:</b> "+feature.properties.Name +"<br><br><b>Team:</b> "+feature.properties.Team+"<br><br><b>Languages:</b> "+feature.properties.Language+"<br><br><b>Bio: </b>"+feature.properties.AY+"</td><td ><img src=data/Pics/"+String(feature.properties.SlNo)+'.jpg  style="width:200px;height:250px;"></td></tr></table>', {
				maxWidth : 600
				}
				);
			}}
      ).addTo(map);
	
	*/
    
    
    }
	
	
	funcswitch();
	drawbasic();
	