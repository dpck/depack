const loading = require('indicatrix')

loading('Code is loading', new Promise(r => setTimeout(r, 10000)))
