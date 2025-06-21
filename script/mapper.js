	
	
	function style_GBA(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_BBMPNEW(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_BBMPOLD(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'orange',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}
	
	function style_BDA(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}
	
	function style_BUD(feature) {
	
	return {
	    fillColor: 'white',
		weight:3,
        opacity: 1,
        color: 'brown',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}
	
	//Do classification based on the merged data
	
	var zoom=10;
	
	
	
	latstart=13;
	longstart=77.5;	
	
	var map = L.map('map', {zoomControl: false}).setView([latstart, longstart], zoom);
	
        var zoomControl = L.control.zoom({ position: 'bottomleft' }).addTo(map);
        
	var GBA_M=L.geoJson(gba, {style: style_GBA});
	var BBMP_NEW_M=L.geoJson(bbmpnew, {style: style_BBMPNEW});
	var BDA_M=L.geoJson(bda, {style: style_BDA});
	var BBMP_OLD_M=L.geoJson(bbmpold, {style: style_BBMPOLD});
	var BUD_M=L.geoJson(bud, {style: style_BUD});
	
	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{    maxZoom: 20,    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);


	
	
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
	
	
	function funcswitch() {
    // check if checkbox is checked
	map.eachLayer(function (layer) {
		if (layer!=googlebg)
		{
        map.removeLayer(layer);
		}
    });
    if ($("#gbabox").is(":checked"))
  {
      GBA_M=L.geoJson(gba, {style: style_GBA}).addTo(map);
  } 
  
  if ($('#bdabox').is(":checked"))
  {
      BDA_M=L.geoJson(bda, {style: style_BDA}).addTo(map);
  } 
  
  if ($('#bbmpnewbox').is(":checked") ) 
  {
      BBMP_NEW_M=L.geoJson(bbmpnew, {style: style_BBMPNEW}).addTo(map);
  } 
  
  if ($('#bbmpoldbox').is(":checked") )
  {
      BBMP_OLD_M=L.geoJson(bbmpold, {style: style_BBMPOLD}).addTo(map);
  } 
  
  if ($('#budbox').is(":checked")  )
  {
      BUD_M=L.geoJson(bud, {style: style_BUD}).addTo(map);
  } 
  
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
	
	
