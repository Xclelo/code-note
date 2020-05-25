var massmap = require("./lib/massmap_2d/massmap")
var addLayerWMTS = require("./addLayerWMTS")

import * as massmap_layer from "./massmap-layer"
import * as massmap_utils from "./massmap-utils"
import * as thematic from "./thematic"

window.massmap = massmap
Object.defineProperty(window.massmap, 'addLayerWMTS', { value: addLayerWMTS })
Object.defineProperty(window.massmap, 'basicMap', { value: massmap_layer })
Object.defineProperty(window.massmap, 'basicUtils', { value: massmap_utils })
Object.defineProperty(window.massmap, 'thematic', { value: thematic })

