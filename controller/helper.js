module.exports = {

    render: function (view, req, res, locals = {}) {
        res.render(view, locals, function (err, html) {
            delete req.session.notification;
            delete req.session.notificationtype; 
            res.send(html);
        });
    },

    getRefference : function (model,callback){
        model.getAll(function (error, rows, fields) {
            if (error) {
                callback(error);
            } else {
                //console.log(rows);
                callback(null,rows);
            }
        });
    },

     


}