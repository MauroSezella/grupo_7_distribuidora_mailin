const path = require('path');

let mainController = {

    index: (req,res) => {
        res.render('index');
    }

}

module.exports = mainController;